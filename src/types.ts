export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface BatchRecord {
  batch_id: string;
  product_name: string;
  category: 'Dairy' | 'Poultry' | 'Produce' | 'Frozen Foods' | 'Bakery' | 'Beverages';
  supplier_id: string;
  supplier_name: string;
  factory_id: string;
  factory_name: string;
  warehouse_id: string;
  warehouse_name: string;
  distributor_id: string;
  distributor_name: string;
  retailer_id: string;
  retailer_name: string;
  area_name: string;
  latitude: number;
  longitude: number;
  production_date: string;
  expiry_date: string;
  storage_temperature: number; // in °C
  target_temperature: number; // e.g. 4°C
  temp_deviation: number;
  humidity: number; // %
  ph_level?: number;
  microbial_cfu?: number;
  complaint_count: number;
  inspection_status: 'Passed' | 'Flagged for Review' | 'Lab Pending' | 'Action Taken';
  predicted_risk_score: number; // 0 - 100
  predicted_risk_level: RiskLevel;
  anomaly_score: number; // 0 - 1
  anomaly_flag: 'Normal' | 'Unusual' | 'Highly Unusual';
  contributing_factors: string[];
  recommended_action: string;
  blockchain_status: 'Verified' | 'Pending' | 'Flagged';
  is_recalled?: boolean;
}

export interface ComplaintRecord {
  complaint_id: string;
  batch_id: string;
  product_name: string;
  area: string;
  type: 'Off Odor / Taste' | 'Foreign Object' | 'Packaging Defect' | 'Suspected Food Poisoning' | 'Temperature Abuse' | 'Labeling Issue';
  date: string;
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Escalated';
  severity: 'Low' | 'Medium' | 'High';
  citizen_id: string; // Masked e.g. Citizen #C1024
  symptom_summary: string;
  potential_cluster_id?: string;
  retailer_name: string;
  warehouse_id: string;
}

export interface InvestigationDossier {
  investigation_id: string;
  title: string;
  risk_level: RiskLevel;
  status: 'Active' | 'Review Required' | 'Lab Testing' | 'Closed';
  created_at: string;
  primary_source: string;
  associated_batches: string[];
  associated_warehouse: string;
  associated_distributor: string;
  complaint_count: number;
  temp_anomaly_degrees: number;
  lab_status: 'Sample Dispatched' | 'Awaiting Culture Results' | 'Preliminary Positive' | 'Inconclusive';
  confidence_score: number; // 0 - 100%
  recommended_verification: string[];
  assigned_inspector: string;
  ai_hypothesis: string;
}

export interface SupplyChainNode {
  id: string;
  name: string;
  type: 'Supplier' | 'Factory' | 'Warehouse' | 'Distributor' | 'Retailer';
  area: string;
  risk_level: RiskLevel;
  active_batches: number;
  temp_avg: number;
  anomalies_count: number;
  lat: number;
  lng: number;
}

export interface SupplyChainEdge {
  from: string;
  to: string;
  flow_rate: string;
  status: 'Optimal' | 'Thermal Spike Detected' | 'Delayed' | 'Blocked';
}

export interface BlockchainBlock {
  event_id: string;
  batch_id: string;
  event_type: 'Produced' | 'Tested' | 'Stored' | 'Transported' | 'Inspected' | 'Distributed';
  timestamp: string;
  entity: string;
  payload_hash: string;
  previous_hash: string;
  current_hash: string;
  metadata: Record<string, string | number>;
  isValid: boolean;
}

export interface DatasetProfile {
  fileName: string;
  fileType: 'CSV' | 'XLSX' | 'PDF' | 'DEMO';
  fileSize: string;
  rowCount: number;
  columnCount: number;
  missingValuesCount: number;
  missingPercentage: number;
  duplicateCount: number;
  qualityScore: number; // 0 - 100
  columns: {
    name: string;
    detectedType: 'string' | 'number' | 'date' | 'category' | 'id';
    mappedStandardField: string;
    confidence: number;
    sampleValues: (string | number)[];
  }[];
  sheets?: string[];
  isDemoData: boolean;
}

export interface MLModelMetrics {
  modelName: string;
  modelVersion: string;
  algorithm: 'Random Forest Classifier' | 'Gradient Boosting' | 'Isolation Forest Anomaly';
  targetColumn: string;
  featuresUsed: string[];
  trainingDate: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  confusionMatrix: number[][];
  featureImportances: { feature: string; importance: number }[];
  isSupervised: boolean;
  status: 'Ready' | 'Training' | 'Failed';
}

export interface SimulatorIntervention {
  actionType: 'BLOCK_WAREHOUSE' | 'RECALL_BATCH' | 'BLOCK_DISTRIBUTOR' | 'AUDIT_SUPPLIER';
  targetId: string;
  targetName: string;
  timestamp: string;
}

export interface TimeSimulationState {
  isActive: boolean;
  currentStep: number; // 0: baseline, 1: +1h, 2: +6h, 3: +24h
  stepName: string;
  simulatedTime: string;
  incidentNarrative: string;
  temperatureDrift: number;
  activeAnomalies: number;
  accumulatedComplaints: number;
}

export type NotificationType =
  | 'EXPIRATION'
  | 'SAFETY_TEMP'
  | 'SAFETY_MICROBIAL'
  | 'SAFETY_RISK'
  | 'COMPLAINT_CLUSTER'
  | 'BLOCKCHAIN_FLAG'
  | 'SYSTEM';

export type NotificationSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  severity: NotificationSeverity;
  isRead: boolean;
  batchId?: string;
  productName?: string;
  category?: string;
  warehouseName?: string;
  expiryDate?: string;
  hoursUntilExpiry?: number;
  daysUntilExpiry?: number;
  recommendedAction?: string;
}

export interface NotificationPreferences {
  enableExpirationAlerts: boolean;
  expirationThresholdDays: number; // e.g. 1, 2, 3, 7
  enableTemperatureAlerts: boolean;
  tempDeviationThreshold: number; // e.g. 2.0°C
  enableMicrobialAlerts: boolean;
  enableHighRiskAlerts: boolean;
  riskScoreThreshold: number; // e.g. 75
  enableComplaintClusterAlerts: boolean;
  minComplaintsThreshold: number; // e.g. 3
  enableSoundAlerts: boolean;
  enableEmailDigest: boolean;
  digestFrequency: 'Immediate' | 'Hourly' | 'Daily';
}

export interface DashboardFilterState {
  search: string;
  category: string; // 'All' or specific category
  status: string; // 'All' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'Near Expiry' | 'Flagged for Review' | 'Action Taken'
  dateRange: string; // 'All' | 'Today' | '7Days' | '30Days' | 'NearExpiry' | 'Custom'
  customStartDate?: string;
  customEndDate?: string;
  sortBy: 'risk_desc' | 'risk_asc' | 'expiry_asc' | 'production_desc' | 'complaints_desc';
}
