import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  BatchRecord,
  ComplaintRecord,
  InvestigationDossier,
  SupplyChainNode,
  SupplyChainEdge,
  DatasetProfile,
  MLModelMetrics,
  SimulatorIntervention,
  TimeSimulationState,
  RiskLevel,
  NotificationItem,
  NotificationPreferences,
  DashboardFilterState,
} from '../types';
import {
  DEMO_BATCHES,
  DEMO_COMPLAINTS,
  DEMO_INVESTIGATIONS,
  DEMO_SUPPLY_CHAIN_NODES,
  DEMO_SUPPLY_CHAIN_EDGES,
} from '../data/delhiDemoData';
import { profileDataset, trainMLModelOnDataset } from '../services/mlEngine';

const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  enableExpirationAlerts: true,
  expirationThresholdDays: 3,
  enableTemperatureAlerts: true,
  tempDeviationThreshold: 2.0,
  enableMicrobialAlerts: true,
  enableHighRiskAlerts: true,
  riskScoreThreshold: 75,
  enableComplaintClusterAlerts: true,
  minComplaintsThreshold: 3,
  enableSoundAlerts: true,
  enableEmailDigest: true,
  digestFrequency: 'Daily',
};

const DEFAULT_DASHBOARD_FILTERS: DashboardFilterState = {
  search: '',
  category: 'All',
  status: 'All',
  dateRange: 'All',
  sortBy: 'risk_desc',
};

interface AppContextType {
  batches: BatchRecord[];
  complaints: ComplaintRecord[];
  investigations: InvestigationDossier[];
  supplyChainNodes: SupplyChainNode[];
  supplyChainEdges: SupplyChainEdge[];
  profile: DatasetProfile;
  activeModel: MLModelMetrics;
  modelsList: MLModelMetrics[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBatchId: string | null;
  setSelectedBatchId: (id: string | null) => void;
  selectedInvestigationId: string | null;
  setSelectedInvestigationId: (id: string | null) => void;
  timeSimulation: TimeSimulationState;
  interventions: SimulatorIntervention[];
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;

  // Notification System
  notifications: NotificationItem[];
  notificationPreferences: NotificationPreferences;
  updateNotificationPreferences: (prefUpdates: Partial<NotificationPreferences>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
  unreadNotificationsCount: number;
  criticalNotificationsCount: number;
  isNotificationModalOpen: boolean;
  setIsNotificationModalOpen: (open: boolean) => void;

  // Dashboard Advanced Search & Filters
  dashboardFilters: DashboardFilterState;
  setDashboardFilters: React.Dispatch<React.SetStateAction<DashboardFilterState>>;
  resetDashboardFilters: () => void;
  filteredAndSortedBatches: BatchRecord[];

  // Actions
  loadDemoData: () => void;
  setUploadedDataset: (batches: BatchRecord[], profile: DatasetProfile) => void;
  applyIntervention: (intervention: SimulatorIntervention) => void;
  removeIntervention: (targetId: string) => void;
  resetInterventions: () => void;
  startSimulation: () => void;
  pauseSimulation: () => void;
  resetSimulation: () => void;
  advanceSimulationHours: (hours: 1 | 6 | 24) => void;
  retrainModel: (algorithm?: 'Random Forest Classifier' | 'Gradient Boosting' | 'Isolation Forest Anomaly') => void;
  switchActiveModel: (version: string) => void;
  updateBatchStatus: (batchId: string, status: BatchRecord['inspection_status']) => void;
  
  // Computed dynamic stats
  overallRiskScore: number;
  overallRiskLevel: RiskLevel;
  totalBatchesCount: number;
  highCriticalCount: number;
  openComplaintsCount: number;
  activeInvestigationsCount: number;
  priorityLocationsCount: number;
  filteredBatches: BatchRecord[];
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [batches, setBatches] = useState<BatchRecord[]>(DEMO_BATCHES);
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(DEMO_COMPLAINTS);
  const [investigations, setInvestigations] = useState<InvestigationDossier[]>(DEMO_INVESTIGATIONS);
  const [supplyChainNodes, setSupplyChainNodes] = useState<SupplyChainNode[]>(DEMO_SUPPLY_CHAIN_NODES);
  const [supplyChainEdges, setSupplyChainEdges] = useState<SupplyChainEdge[]>(DEMO_SUPPLY_CHAIN_EDGES);
  
  const initialProfile = useMemo(() => profileDataset(DEMO_BATCHES, 'Delhi_Demo_Surveillance_Dataset.xlsx', 'DEMO'), []);
  const [profile, setProfile] = useState<DatasetProfile>(initialProfile);

  const initialModel = useMemo(() => trainMLModelOnDataset(DEMO_BATCHES, 'Random Forest Classifier', 'FOODGUARD-RISK-v1'), []);
  const [modelsList, setModelsList] = useState<MLModelMetrics[]>([initialModel]);
  const [activeModel, setActiveModel] = useState<MLModelMetrics>(initialModel);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>('BATCH-DL-9042');
  const [selectedInvestigationId, setSelectedInvestigationId] = useState<string | null>('INV-DL-001');
  const [interventions, setInterventions] = useState<SimulatorIntervention[]>([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState<boolean>(false);

  // Notification Preferences
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(() => {
    try {
      const saved = localStorage.getItem('foodguard_notification_prefs');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_NOTIFICATION_PREFERENCES;
  });

  const updateNotificationPreferences = (prefUpdates: Partial<NotificationPreferences>) => {
    setNotificationPreferences(prev => {
      const updated = { ...prev, ...prefUpdates };
      try {
        localStorage.setItem('foodguard_notification_prefs', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Dismissed & read notifications store
  const [dismissedNotificationIds, setDismissedNotificationIds] = useState<Set<string>>(new Set());
  const [readNotificationIds, setReadNotificationIds] = useState<Set<string>>(new Set());

  // Dashboard Advanced Filter State
  const [dashboardFilters, setDashboardFilters] = useState<DashboardFilterState>(DEFAULT_DASHBOARD_FILTERS);

  const resetDashboardFilters = () => {
    setDashboardFilters(DEFAULT_DASHBOARD_FILTERS);
    setSearchQuery('');
  };

  const [timeSimulation, setTimeSimulation] = useState<TimeSimulationState>({
    isActive: false,
    currentStep: 0,
    stepName: 'Baseline Time (T+0)',
    simulatedTime: '2026-08-28 07:00 IST',
    incidentNarrative: 'Initial sensor telemetry normal. Narela Bay 4 logger reporting baseline operations.',
    temperatureDrift: 0,
    activeAnomalies: 2,
    accumulatedComplaints: 6,
  });

  // Dynamic Notification Generation Engine based on active dataset, simulated date (2026-08-28), and preferences
  const notifications = useMemo<NotificationItem[]>(() => {
    const list: NotificationItem[] = [];
    const simulatedDate = new Date('2026-08-28T07:00:00Z');

    batches.forEach(b => {
      // 1. Expiration Date Alerts
      if (b.expiry_date) {
        const expiryDate = new Date(b.expiry_date + 'T23:59:59Z');
        const diffTime = expiryDate.getTime() - simulatedDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.max(0, Math.round(diffTime / (1000 * 60 * 60)));

        if (notificationPreferences.enableExpirationAlerts && diffDays <= notificationPreferences.expirationThresholdDays) {
          const notifId = `notif-expiry-${b.batch_id}`;
          if (!dismissedNotificationIds.has(notifId)) {
            const isSevere = diffDays <= 1;
            list.push({
              id: notifId,
              type: 'EXPIRATION',
              title: diffDays <= 1 ? `CRITICAL: Expiry in ${diffHours}h (${b.product_name})` : `Expiration Warning (${diffDays} days remaining)`,
              message: `${b.product_name} [${b.batch_id}] at ${b.warehouse_name} reaches shelf-life on ${b.expiry_date}. Immediate inventory audit or markdown recommended.`,
              timestamp: 'Just now',
              severity: isSevere ? 'CRITICAL' : 'HIGH',
              isRead: readNotificationIds.has(notifId),
              batchId: b.batch_id,
              productName: b.product_name,
              category: b.category,
              warehouseName: b.warehouse_name,
              expiryDate: b.expiry_date,
              hoursUntilExpiry: diffHours,
              daysUntilExpiry: diffDays,
              recommendedAction: diffDays <= 1 ? 'Dispatch quarantine notice and conduct shelf audit' : 'Prioritize distribution FIFO',
            });
          }
        }
      }

      // 2. Temperature Excursion Safety Alerts
      if (notificationPreferences.enableTemperatureAlerts && b.temp_deviation >= notificationPreferences.tempDeviationThreshold) {
        const notifId = `notif-temp-${b.batch_id}`;
        if (!dismissedNotificationIds.has(notifId)) {
          const isCritical = b.temp_deviation >= 5.0;
          list.push({
            id: notifId,
            type: 'SAFETY_TEMP',
            title: `Thermal Excursion (+${b.temp_deviation}°C): ${b.product_name}`,
            message: `Temperature sensor at ${b.warehouse_name} logged ${b.storage_temperature}°C against target ${b.target_temperature}°C. Risk of rapid spoilage.`,
            timestamp: '5m ago',
            severity: isCritical ? 'CRITICAL' : 'HIGH',
            isRead: readNotificationIds.has(notifId),
            batchId: b.batch_id,
            productName: b.product_name,
            category: b.category,
            warehouseName: b.warehouse_name,
            recommendedAction: 'Inspect chiller compressors & isolate temperature-compromised stock',
          });
        }
      }

      // 3. Microbial Safety Alerts
      if (notificationPreferences.enableMicrobialAlerts && b.microbial_cfu && b.microbial_cfu > 25000) {
        const notifId = `notif-microbial-${b.batch_id}`;
        if (!dismissedNotificationIds.has(notifId)) {
          list.push({
            id: notifId,
            type: 'SAFETY_MICROBIAL',
            title: `Elevated Microbial Load (${b.microbial_cfu.toLocaleString()} CFU/g)`,
            message: `Laboratory screening flagged elevated bacterial colony count for ${b.product_name} [${b.batch_id}]. Exceeds FSSAI standard safety threshold.`,
            timestamp: '12m ago',
            severity: 'CRITICAL',
            isRead: readNotificationIds.has(notifId),
            batchId: b.batch_id,
            productName: b.product_name,
            category: b.category,
            warehouseName: b.warehouse_name,
            recommendedAction: 'Issue immediate halt order and send duplicate culture to State Food Lab',
          });
        }
      }

      // 4. High Risk Score Alerts
      if (notificationPreferences.enableHighRiskAlerts && b.predicted_risk_score >= notificationPreferences.riskScoreThreshold) {
        const notifId = `notif-risk-${b.batch_id}`;
        if (!dismissedNotificationIds.has(notifId)) {
          list.push({
            id: notifId,
            type: 'SAFETY_RISK',
            title: `High Risk Index (${b.predicted_risk_score}/100): ${b.batch_id}`,
            message: `ML safety classifier flagged ${b.product_name} with multi-factor risk: ${b.contributing_factors[0] || 'Multiple anomalies detected'}.`,
            timestamp: '25m ago',
            severity: b.predicted_risk_score >= 85 ? 'CRITICAL' : 'HIGH',
            isRead: readNotificationIds.has(notifId),
            batchId: b.batch_id,
            productName: b.product_name,
            category: b.category,
            warehouseName: b.warehouse_name,
            recommendedAction: b.recommended_action,
          });
        }
      }

      // 5. Complaint Cluster Alerts
      if (notificationPreferences.enableComplaintClusterAlerts && b.complaint_count >= notificationPreferences.minComplaintsThreshold) {
        const notifId = `notif-cluster-${b.batch_id}`;
        if (!dismissedNotificationIds.has(notifId)) {
          list.push({
            id: notifId,
            type: 'COMPLAINT_CLUSTER',
            title: `Citizen Grievance Cluster (${b.complaint_count} reports)`,
            message: `${b.complaint_count} correlated consumer complaints reported for ${b.product_name} in ${b.area_name}. Potential downstream distribution issue.`,
            timestamp: '40m ago',
            severity: 'HIGH',
            isRead: readNotificationIds.has(notifId),
            batchId: b.batch_id,
            productName: b.product_name,
            category: b.category,
            warehouseName: b.warehouse_name,
            recommendedAction: 'Cross-reference retail points of sale in Saket & Defence Colony',
          });
        }
      }
    });

    // Add a system welcome / telemetry status notification
    const systemNotifId = 'notif-system-welcome';
    if (!dismissedNotificationIds.has(systemNotifId)) {
      list.push({
        id: systemNotifId,
        type: 'SYSTEM',
        title: 'Delhi Surveillance Grid Online',
        message: 'All 19 IoT cold-chain nodes & OpenStreetMap sensors connected. Automated expiration and thermal anomaly tracking active.',
        timestamp: '1h ago',
        severity: 'LOW',
        isRead: readNotificationIds.has(systemNotifId),
      });
    }

    // Sort by severity (CRITICAL first) and then unread
    return list.sort((a, b) => {
      const sevOrder: Record<string, number> = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      if (sevOrder[b.severity] !== sevOrder[a.severity]) {
        return sevOrder[b.severity] - sevOrder[a.severity];
      }
      return a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1;
    });
  }, [batches, notificationPreferences, dismissedNotificationIds, readNotificationIds]);

  const markNotificationRead = (id: string) => {
    setReadNotificationIds(prev => new Set(prev).add(id));
  };

  const markAllNotificationsRead = () => {
    const allIds = new Set(readNotificationIds);
    notifications.forEach(n => allIds.add(n.id));
    setReadNotificationIds(allIds);
  };

  const clearNotification = (id: string) => {
    setDismissedNotificationIds(prev => new Set(prev).add(id));
  };

  const clearAllNotifications = () => {
    const allIds = new Set(dismissedNotificationIds);
    notifications.forEach(n => allIds.add(n.id));
    setDismissedNotificationIds(allIds);
  };

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const criticalNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.isRead && (n.severity === 'CRITICAL' || n.severity === 'HIGH')).length;
  }, [notifications]);

  const loadDemoData = () => {
    setBatches(DEMO_BATCHES);
    setComplaints(DEMO_COMPLAINTS);
    setInvestigations(DEMO_INVESTIGATIONS);
    setSupplyChainNodes(DEMO_SUPPLY_CHAIN_NODES);
    setSupplyChainEdges(DEMO_SUPPLY_CHAIN_EDGES);
    setProfile(initialProfile);
    setSelectedBatchId('BATCH-DL-9042');
    setSelectedInvestigationId('INV-DL-001');
    setInterventions([]);
    setDismissedNotificationIds(new Set());
    setReadNotificationIds(new Set());
    resetDashboardFilters();
    resetSimulation();
  };

  const setUploadedDataset = (newBatches: BatchRecord[], newProfile: DatasetProfile) => {
    setBatches(newBatches);
    setProfile(newProfile);
    if (newBatches.length > 0) {
      setSelectedBatchId(newBatches[0].batch_id);
    }
    const updatedModel = trainMLModelOnDataset(newBatches, 'Random Forest Classifier', `FOODGUARD-USER-v${modelsList.length + 1}`);
    setModelsList(prev => [updatedModel, ...prev]);
    setActiveModel(updatedModel);
  };

  const applyIntervention = (intervention: SimulatorIntervention) => {
    setInterventions(prev => {
      const exists = prev.some(i => i.targetId === intervention.targetId && i.actionType === intervention.actionType);
      if (exists) return prev;
      return [...prev, intervention];
    });

    setBatches(prev =>
      prev.map(b => {
        if (
          (intervention.actionType === 'BLOCK_WAREHOUSE' && b.warehouse_id === intervention.targetId) ||
          (intervention.actionType === 'RECALL_BATCH' && b.batch_id === intervention.targetId) ||
          (intervention.actionType === 'BLOCK_DISTRIBUTOR' && b.distributor_id === intervention.targetId)
        ) {
          return {
            ...b,
            inspection_status: 'Action Taken',
            is_recalled: true,
            predicted_risk_score: Math.max(12, Math.round(b.predicted_risk_score * 0.35)),
            predicted_risk_level: 'LOW' as RiskLevel,
            recommended_action: 'Intervention active: Distribution halted and stock isolated.',
          };
        }
        return b;
      })
    );
  };

  const removeIntervention = (targetId: string) => {
    setInterventions(prev => prev.filter(i => i.targetId !== targetId));
    setBatches(DEMO_BATCHES);
  };

  const resetInterventions = () => {
    setInterventions([]);
    setBatches(DEMO_BATCHES);
  };

  const startSimulation = () => {
    setTimeSimulation(prev => ({ ...prev, isActive: true }));
  };

  const pauseSimulation = () => {
    setTimeSimulation(prev => ({ ...prev, isActive: false }));
  };

  const resetSimulation = () => {
    setTimeSimulation({
      isActive: false,
      currentStep: 0,
      stepName: 'Baseline Time (T+0)',
      simulatedTime: '2026-08-28 07:00 IST',
      incidentNarrative: 'Initial sensor telemetry normal. Narela Bay 4 logger reporting baseline operations.',
      temperatureDrift: 0,
      activeAnomalies: 2,
      accumulatedComplaints: 6,
    });
    setBatches(DEMO_BATCHES);
  };

  const advanceSimulationHours = (hours: 1 | 6 | 24) => {
    setTimeSimulation(prev => {
      let nextStep = prev.currentStep;
      let stepName = '';
      let simulatedTime = '';
      let narrative = '';
      let drift = prev.temperatureDrift;
      let anomalies = prev.activeAnomalies;
      let comp = prev.accumulatedComplaints;

      if (hours === 1) {
        nextStep = 1;
        stepName = '+1 Hour (T+1h)';
        simulatedTime = '2026-08-28 08:00 IST';
        drift = 2.4;
        anomalies = 3;
        comp = 10;
        narrative = 'Narela Bay 4 compressor sensor detects intermittent power trip. Chiller chamber temp drifts from 4.0°C to 6.4°C.';
      } else if (hours === 6) {
        nextStep = 2;
        stepName = '+6 Hours (T+6h)';
        simulatedTime = '2026-08-28 13:00 IST';
        drift = 7.8;
        anomalies = 6;
        comp = 18;
        narrative = 'Thermal abuse causes accelerated microbial replication in milk and fresh paneer batches. Citizen grievance calls rise in South Delhi.';
      } else {
        nextStep = 3;
        stepName = '+24 Hours (T+24h)';
        simulatedTime = '2026-08-29 07:00 IST';
        drift = 8.6;
        anomalies = 9;
        comp = 27;
        narrative = 'Full-scale cold-chain anomaly cascade detected. Downstream retail chillers in Connaught Place & Defence Colony reflect inventory spoilage.';
      }

      return {
        isActive: false,
        currentStep: nextStep,
        stepName,
        simulatedTime,
        incidentNarrative: narrative,
        temperatureDrift: drift,
        activeAnomalies: anomalies,
        accumulatedComplaints: comp,
      };
    });

    setBatches(prev =>
      prev.map(b => {
        if (b.warehouse_id === 'WH-DL-05') {
          const addedRisk = hours === 1 ? 8 : hours === 6 ? 24 : 35;
          const newScore = Math.min(99, b.predicted_risk_score + addedRisk);
          return {
            ...b,
            storage_temperature: Number((b.target_temperature + (hours === 1 ? 3.2 : hours === 6 ? 7.8 : 8.6)).toFixed(1)),
            temp_deviation: Number((hours === 1 ? 3.2 : hours === 6 ? 7.8 : 8.6).toFixed(1)),
            predicted_risk_score: newScore,
            predicted_risk_level: newScore > 80 ? 'CRITICAL' : 'HIGH',
            complaint_count: b.complaint_count + (hours === 1 ? 2 : hours === 6 ? 6 : 11),
          };
        }
        return b;
      })
    );
  };

  const retrainModel = (algorithm: 'Random Forest Classifier' | 'Gradient Boosting' | 'Isolation Forest Anomaly' = 'Random Forest Classifier') => {
    const newVersion = `FOODGUARD-RISK-v${modelsList.length + 1}`;
    const trained = trainMLModelOnDataset(batches, algorithm, newVersion);
    setModelsList(prev => [trained, ...prev]);
    setActiveModel(trained);
  };

  const switchActiveModel = (version: string) => {
    const found = modelsList.find(m => m.modelVersion === version);
    if (found) setActiveModel(found);
  };

  const updateBatchStatus = (batchId: string, status: BatchRecord['inspection_status']) => {
    setBatches(prev =>
      prev.map(b => (b.batch_id === batchId ? { ...b, inspection_status: status } : b))
    );
  };

  // Dynamically computed metrics across active dataset
  const dynamicStats = useMemo(() => {
    if (batches.length === 0) {
      return {
        overallRiskScore: 0,
        overallRiskLevel: 'LOW' as RiskLevel,
        totalBatchesCount: 0,
        highCriticalCount: 0,
        openComplaintsCount: 0,
        activeInvestigationsCount: 0,
        priorityLocationsCount: 0,
      };
    }

    const totalRiskSum = batches.reduce((acc, b) => acc + b.predicted_risk_score, 0);
    const avgScore = Math.round(totalRiskSum / batches.length);
    
    let level: RiskLevel = 'LOW';
    if (avgScore >= 75) level = 'CRITICAL';
    else if (avgScore >= 55) level = 'HIGH';
    else if (avgScore >= 35) level = 'MEDIUM';

    const highCritical = batches.filter(b => b.predicted_risk_level === 'HIGH' || b.predicted_risk_level === 'CRITICAL').length;
    const openComplaints = complaints.filter(c => c.status === 'Open' || c.status === 'Escalated').length;
    const activeInvs = investigations.filter(i => i.status === 'Active' || i.status === 'Review Required').length;
    const priorityLocs = new Set(batches.filter(b => b.predicted_risk_score > 60).map(b => b.area_name)).size;

    return {
      overallRiskScore: avgScore,
      overallRiskLevel: level,
      totalBatchesCount: batches.length,
      highCriticalCount: highCritical,
      openComplaintsCount: openComplaints,
      activeInvestigationsCount: activeInvs,
      priorityLocationsCount: priorityLocs,
    };
  }, [batches, complaints, investigations]);

  const filteredBatches = useMemo(() => {
    if (!searchQuery.trim()) return batches;
    const q = searchQuery.toLowerCase();
    return batches.filter(
      b =>
        b.batch_id.toLowerCase().includes(q) ||
        b.product_name.toLowerCase().includes(q) ||
        b.warehouse_name.toLowerCase().includes(q) ||
        b.supplier_name.toLowerCase().includes(q) ||
        b.area_name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }, [batches, searchQuery]);

  // Advanced Filtered and Sorted Batches for Dashboard
  const filteredAndSortedBatches = useMemo(() => {
    let result = [...batches];
    const simulatedDate = new Date('2026-08-28T07:00:00Z');

    // 1. Text Search Filter (combined with dashboardFilters.search or global searchQuery)
    const effectiveSearch = (dashboardFilters.search || searchQuery).trim().toLowerCase();
    if (effectiveSearch) {
      result = result.filter(
        b =>
          b.batch_id.toLowerCase().includes(effectiveSearch) ||
          b.product_name.toLowerCase().includes(effectiveSearch) ||
          b.warehouse_name.toLowerCase().includes(effectiveSearch) ||
          b.supplier_name.toLowerCase().includes(effectiveSearch) ||
          b.area_name.toLowerCase().includes(effectiveSearch) ||
          b.category.toLowerCase().includes(effectiveSearch) ||
          b.retailer_name.toLowerCase().includes(effectiveSearch)
      );
    }

    // 2. Category Filter
    if (dashboardFilters.category && dashboardFilters.category !== 'All') {
      result = result.filter(b => b.category.toLowerCase() === dashboardFilters.category.toLowerCase());
    }

    // 3. Status Filter
    if (dashboardFilters.status && dashboardFilters.status !== 'All') {
      const s = dashboardFilters.status;
      if (s === 'CRITICAL' || s === 'HIGH' || s === 'MEDIUM' || s === 'LOW') {
        result = result.filter(b => b.predicted_risk_level === s);
      } else if (s === 'Near Expiry') {
        result = result.filter(b => {
          if (!b.expiry_date) return false;
          const exp = new Date(b.expiry_date + 'T23:59:59Z');
          const diffDays = Math.ceil((exp.getTime() - simulatedDate.getTime()) / (1000 * 60 * 60 * 24));
          return diffDays <= 3;
        });
      } else if (s === 'Flagged for Review') {
        result = result.filter(b => b.inspection_status === 'Flagged for Review');
      } else if (s === 'Action Taken') {
        result = result.filter(b => b.inspection_status === 'Action Taken');
      }
    }

    // 4. Date Range Filter (based on production_date or expiry_date)
    if (dashboardFilters.dateRange && dashboardFilters.dateRange !== 'All') {
      const dr = dashboardFilters.dateRange;
      if (dr === 'Today') {
        result = result.filter(b => b.production_date === '2026-08-28' || b.expiry_date === '2026-08-28');
      } else if (dr === '7Days') {
        result = result.filter(b => {
          const prod = new Date(b.production_date);
          const diff = (simulatedDate.getTime() - prod.getTime()) / (1000 * 60 * 60 * 24);
          return diff >= 0 && diff <= 7;
        });
      } else if (dr === '30Days') {
        result = result.filter(b => {
          const prod = new Date(b.production_date);
          const diff = (simulatedDate.getTime() - prod.getTime()) / (1000 * 60 * 60 * 24);
          return diff >= 0 && diff <= 30;
        });
      } else if (dr === 'NearExpiry') {
        result = result.filter(b => {
          if (!b.expiry_date) return false;
          const exp = new Date(b.expiry_date + 'T23:59:59Z');
          const diffDays = Math.ceil((exp.getTime() - simulatedDate.getTime()) / (1000 * 60 * 60 * 24));
          return diffDays >= 0 && diffDays <= 5;
        });
      } else if (dr === 'Custom') {
        if (dashboardFilters.customStartDate) {
          const start = new Date(dashboardFilters.customStartDate);
          result = result.filter(b => new Date(b.production_date) >= start || new Date(b.expiry_date) >= start);
        }
        if (dashboardFilters.customEndDate) {
          const end = new Date(dashboardFilters.customEndDate);
          result = result.filter(b => new Date(b.production_date) <= end || new Date(b.expiry_date) <= end);
        }
      }
    }

    // 5. Sorting
    switch (dashboardFilters.sortBy) {
      case 'risk_desc':
        result.sort((a, b) => b.predicted_risk_score - a.predicted_risk_score);
        break;
      case 'risk_asc':
        result.sort((a, b) => a.predicted_risk_score - b.predicted_risk_score);
        break;
      case 'expiry_asc':
        result.sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime());
        break;
      case 'production_desc':
        result.sort((a, b) => new Date(b.production_date).getTime() - new Date(a.production_date).getTime());
        break;
      case 'complaints_desc':
        result.sort((a, b) => b.complaint_count - a.complaint_count);
        break;
      default:
        result.sort((a, b) => b.predicted_risk_score - a.predicted_risk_score);
    }

    return result;
  }, [batches, dashboardFilters, searchQuery]);

  return (
    <AppContext.Provider
      value={{
        batches,
        complaints,
        investigations,
        supplyChainNodes,
        supplyChainEdges,
        profile,
        activeModel,
        modelsList,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedBatchId,
        setSelectedBatchId,
        selectedInvestigationId,
        setSelectedInvestigationId,
        timeSimulation,
        interventions,
        isExportModalOpen,
        setIsExportModalOpen,
        notifications,
        notificationPreferences,
        updateNotificationPreferences,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotification,
        clearAllNotifications,
        unreadNotificationsCount,
        criticalNotificationsCount,
        isNotificationModalOpen,
        setIsNotificationModalOpen,
        dashboardFilters,
        setDashboardFilters,
        resetDashboardFilters,
        filteredAndSortedBatches,
        loadDemoData,
        setUploadedDataset,
        applyIntervention,
        removeIntervention,
        resetInterventions,
        startSimulation,
        pauseSimulation,
        resetSimulation,
        advanceSimulationHours,
        retrainModel,
        switchActiveModel,
        updateBatchStatus,
        filteredBatches,
        ...dynamicStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
