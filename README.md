<div align="center">

# FOODGUARD X

### AI + ML + Graph Intelligence + Blockchain Food Safety Platform for India

**Predict → Prevent → Trace → Simulate → Act**

An AI-powered digital twin of India's food ecosystem — predicting risk before it happens, tracing every batch, simulating contamination spread, and giving authorities a prioritized action plan.

[![Status](https://img.shields.io/badge/Status-Active%20Development-2ea44f?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](#)

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)
![Neo4j](https://img.shields.io/badge/Neo4j-008CC1?style=flat-square&logo=neo4j&logoColor=white)
![Hyperledger](https://img.shields.io/badge/Hyperledger%20Fabric-2F3134?style=flat-square&logo=hyperledger&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

</div>

---

## Table of Contents

1. [The Problem](#1-the-problem)
2. [Core Idea — Digital Twin](#2-core-idea--digital-twin)
3. [End-to-End Workflow](#3-end-to-end-workflow)
4. [System Architecture](#4-system-architecture)
5. [Technology Stack](#5-technology-stack)
6. [Digital Food DNA](#6-digital-food-dna)
7. [Predictive & Investigative Intelligence](#7-predictive--investigative-intelligence)
8. [AI Vision, Citizen Network & What-If Simulator](#8-ai-vision-citizen-network--what-if-simulator)
9. [Blockchain Food Passport](#9-blockchain-food-passport)
10. [Live India Risk Map & Consumer Experience](#10-live-india-risk-map--consumer-experience)
11. [AI Agent Architecture](#11-ai-agent-architecture)
12. [Data Model](#12-data-model)
13. [Security, Privacy & Responsible AI](#13-security-privacy--responsible-ai)
14. [Observability & MLOps](#14-observability--mlops)
15. [Project Structure](#15-project-structure)
16. [API Design](#16-api-design)
17. [Key User Journeys](#17-key-user-journeys)
18. [Why This Is Different](#18-why-this-is-different)
19. [Real-World Example](#19-real-world-example)
20. [Roadmap & Getting Started](#20-roadmap--getting-started)

---

## 1. The Problem

Food safety in India today is mostly **reactive**.

```mermaid
flowchart LR
    A[Food Problem] --> B[People Get Sick] --> C[Complaint] --> D[Inspection] --> E[Testing] --> F[Recall]
    style A fill:#7f1d1d,stroke:#ef4444,color:#fff
    style B fill:#7f1d1d,stroke:#ef4444,color:#fff
    style C fill:#78350f,stroke:#f59e0b,color:#fff
    style D fill:#78350f,stroke:#f59e0b,color:#fff
    style E fill:#78350f,stroke:#f59e0b,color:#fff
    style F fill:#14532d,stroke:#22c55e,color:#fff
```

FOODGUARD X flips the model:

```mermaid
flowchart LR
    A[Food Data] --> B[AI Detects Signals] --> C[Predict Risk] --> D[Find Root Cause] --> E[Simulate Spread] --> F[Recommend Action] --> G[Prevent Crisis]
    style A fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style B fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style C fill:#312e81,stroke:#818cf8,color:#fff
    style D fill:#312e81,stroke:#818cf8,color:#fff
    style E fill:#4c1d95,stroke:#a78bfa,color:#fff
    style F fill:#14532d,stroke:#22c55e,color:#fff
    style G fill:#052e16,stroke:#22c55e,color:#fff
```

Traditional food safety asks *"Is this food unsafe?"* — FOODGUARD X asks:

> **"Where could a problem happen next, why, how could it spread, and what should we do before it becomes a crisis?"**

---

## 2. Core Idea — Digital Twin

FOODGUARD X builds a live digital twin of the food journey, enriched with environmental, regulatory, and human signals.

```mermaid
flowchart LR
    S[Supplier] --> F[Factory] --> L[Lab] --> W[Warehouse] --> T[Transport] --> D[Distributor] --> R[Retailer] --> C[Consumer]
    classDef n fill:#0f172a,stroke:#38bdf8,color:#e2e8f0
    class S,F,L,W,T,D,R,C n
```

| Signal Type | Examples |
|---|---|
| Environmental | Weather, geography, flood/temperature data |
| Regulatory | Inspections, lab reports |
| Operational | Storage, humidity, transport logs |
| Human | Consumer & citizen complaints |
| Historical | Past incidents and recurring failures |

---

## 3. End-to-End Workflow

```mermaid
flowchart TD
    A[Data Ingestion] --> B[Validation & Normalization] --> C[Digital Food DNA] --> D[AI / ML Analysis]
    D --> E[Risk Prediction & Anomaly Detection] --> F[Graph Investigation] --> G[Contamination Simulation]
    G --> H[AI Recommendation] --> I[Human / Authority Action] --> J[Blockchain Audit] --> K[Feedback → Model Learning]
    K -.improves.-> D

    classDef ingest fill:#082f49,stroke:#0ea5e9,color:#e0f2fe
    classDef ai fill:#3b0764,stroke:#c084fc,color:#f3e8ff
    classDef action fill:#052e16,stroke:#22c55e,color:#dcfce7
    class A,B,C ingest
    class D,E,F,G,H ai
    class I,J,K action
```

---

## 4. System Architecture

```mermaid
flowchart TB
    subgraph L1["Data Sources"]
        A1[Suppliers · IoT · Labs · Warehouses · Transport · Weather · Citizens]
    end
    subgraph L2["Ingestion"]
        B1[API Gateway · AWS IoT · EventBridge · Streaming]
    end
    subgraph L3["Storage"]
        C1[S3 · Operational DB · Time-Series · Search · Data Lake]
    end
    subgraph L4["Intelligence"]
        D1[ML · Computer Vision · Forecasting · Anomaly Detection · GNN · LLM Agents]
    end
    subgraph L5["Graph Intelligence"]
        E1[Neo4j / Amazon Neptune]
    end
    subgraph L6["AI Agent Layer"]
        F1[Orchestrator + 8 Specialized Agents]
    end
    subgraph L7["Blockchain"]
        G1[Hyperledger Fabric]
    end
    subgraph L8["Application Layer"]
        H1[Command Center · Inspectors · Labs · Businesses · Consumers]
    end

    L1 --> L2 --> L3 --> L4
    L4 --> L5 --> L6
    L6 --> L7
    L6 --> L8

    style L1 fill:#0c1e3e,stroke:#38bdf8
    style L2 fill:#0f2942,stroke:#0ea5e9
    style L3 fill:#1c1a3e,stroke:#818cf8
    style L4 fill:#2e1065,stroke:#c084fc
    style L5 fill:#3b1d0f,stroke:#fb923c
    style L6 fill:#4c1d95,stroke:#e879f9
    style L7 fill:#1a2e1a,stroke:#22c55e
    style L8 fill:#083344,stroke:#22d3ee
```

**Graph layer** models `Supplier → Batch → Factory → Warehouse → Transport → Distributor → Retailer → Consumer`, surfacing hidden multi-hop connections. **Blockchain** (permissioned, Hyperledger Fabric) is used selectively — batch identity, lab verification, inspections, audit history — not for general app data.

---

## 5. Technology Stack

<table>
<tr><th>Layer</th><th>Technology</th><th>Purpose</th></tr>
<tr><td>Frontend</td><td><img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/></td><td>Command Center UI</td></tr>
<tr><td>Maps</td><td><img src="https://img.shields.io/badge/Mapbox-000000?style=flat-square&logo=mapbox&logoColor=white"/></td><td>India risk visualization</td></tr>
<tr><td>Backend</td><td><img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"/> <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white"/></td><td>APIs & AI services</td></tr>
<tr><td>AI / ML</td><td><img src="https://img.shields.io/badge/Amazon%20Bedrock-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/> <img src="https://img.shields.io/badge/SageMaker-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/> <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white"/></td><td>LLM agents, training, computer vision</td></tr>
<tr><td>Graph</td><td><img src="https://img.shields.io/badge/Neo4j-008CC1?style=flat-square&logo=neo4j&logoColor=white"/></td><td>Supply-chain intelligence</td></tr>
<tr><td>Blockchain</td><td><img src="https://img.shields.io/badge/Hyperledger%20Fabric-2F3134?style=flat-square&logo=hyperledger&logoColor=white"/></td><td>Tamper-evident audit trail</td></tr>
<tr><td>Storage</td><td><img src="https://img.shields.io/badge/Amazon%20S3-569A31?style=flat-square&logo=amazons3&logoColor=white"/> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white"/> <img src="https://img.shields.io/badge/OpenSearch-005EB8?style=flat-square&logo=opensearch&logoColor=white"/></td><td>Raw data, app data, search</td></tr>
<tr><td>Events / IoT</td><td><img src="https://img.shields.io/badge/AWS%20IoT-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/> <img src="https://img.shields.io/badge/EventBridge-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/></td><td>Real-time ingestion</td></tr>
<tr><td>Compute</td><td><img src="https://img.shields.io/badge/ECS%20%2F%20EKS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/> <img src="https://img.shields.io/badge/Lambda-FF9900?style=flat-square&logo=awslambda&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/></td><td>Containers & serverless</td></tr>
<tr><td>Auth / Ops</td><td>Cognito · <img src="https://img.shields.io/badge/CloudWatch-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/> · <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white"/></td><td>Identity, monitoring, CI/CD</td></tr>
</table>

> Table reflects the target architecture. See [`docs/architecture/`](./docs/architecture) for what's actually implemented vs. planned.

---

## 6. Digital Food DNA

Every batch gets a unique, traceable identity through its entire journey.

```mermaid
flowchart LR
    ID["Batch M492"] --> S[Source] --> SU[Supplier] --> FA[Factory] --> LT[Lab] --> WH[Warehouse] --> TR[Transport] --> RE[Retailer] --> CO[Consumer]
    classDef dna fill:#1e1b4b,stroke:#818cf8,color:#e0e7ff
    class ID,S,SU,FA,LT,WH,TR,RE,CO dna
```

```text
Current Safety Score:   84/100
Predicted (+24h):       62/100
Predicted (+48h):       31/100
```

**Time Machine** — the same score is projected forward:

```mermaid
flowchart LR
    N["NOW · Safe"] --> H24["+24h · Moderate"] --> H48["+48h · High"] --> H72["+72h · Critical"]
    style N fill:#052e16,stroke:#22c55e,color:#dcfce7
    style H24 fill:#422006,stroke:#f59e0b,color:#fef3c7
    style H48 fill:#7c2d12,stroke:#fb923c,color:#ffedd5
    style H72 fill:#7f1d1d,stroke:#ef4444,color:#fee2e2
```

---

## 7. Predictive & Investigative Intelligence

**Contamination Spread Simulator** — models how a batch could travel through the network:

```mermaid
flowchart TD
    W[Warehouse] --> DA[Distributor A] --> CA[City A]
    W --> DB[Distributor B] --> CB[City B]
    W --> DC[Distributor C] --> CC[City C]
    style W fill:#7f1d1d,stroke:#ef4444,color:#fff
    style DA fill:#78350f,stroke:#f59e0b,color:#fff
    style DB fill:#78350f,stroke:#f59e0b,color:#fff
    style DC fill:#78350f,stroke:#f59e0b,color:#fff
```

Answers: *"Which single intervention could reduce the highest potential exposure?"*

**Food Crime-Scene Investigator** — connects scattered signals into an evidence chain:

```text
23 Complaints → Same Product → Same Batch → Same Distributor → Same Warehouse → Possible Origin
```

Outputs a possible source, supporting evidence, confidence score, and a recommended investigation — **never** an automatic accusation.

**Unknown Risk Detector** — flags statistically unusual combinations (complaint clusters, abnormal temperature, unexpected graph links) that no fixed rule was written for:

```text
⚠ NEW FOOD SAFETY ANOMALY DETECTED
```

**Inspector Copilot** — prioritizes where human attention matters most:

```text
1. Warehouse #17     Risk 94/100   Cold-chain anomaly + downstream spread
2. Restaurant #42    Risk 87/100   Complaint cluster + supplier pattern
```

---

## 8. AI Vision, Citizen Network & What-If Simulator

| Feature | Input | Output |
|---|---|---|
| **AI Vision Inspector** | Food/packaging images, storage photos | Explainable flags — e.g. *"Seal geometry differs from expected pattern"* (a risk indicator, not a lab diagnosis) |
| **Citizen Network** | Photo, video, voice, location, QR | Clusters unrelated reports into a possible common batch/product |
| **What-If Simulator** | Scenario question (*"close this warehouse?"*) | Estimated affected batches, exposure reduction, and new disruptions — estimates, not guarantees |

---

## 9. Blockchain Food Passport

```mermaid
flowchart LR
    P[Produced] --> T[Tested] --> S[Stored] --> Tr[Transported] --> I[Inspected] --> So[Sold]
    classDef bc fill:#1a2e1a,stroke:#22c55e,color:#dcfce7
    class P,T,S,Tr,I,So bc
```

Each event becomes a tamper-evident record on **Hyperledger Fabric**. Blockchain preserves what was reported — it does not independently verify that the underlying data was true.

---

## 10. Live India Risk Map & Consumer Experience

```text
🟢 LOW   🟡 WATCH   🟠 HIGH   🔴 CRITICAL
```

Selecting a region always explains *why* — complaint spikes, cold-chain anomalies, weather, supply concentration, history.

**Consumer flow:**

```mermaid
flowchart LR
    A[Scan QR] --> B[Food DNA] --> C[Current Risk] --> D[Predicted Risk] --> E["SAFE 92/100"]
    classDef c fill:#052e16,stroke:#22c55e,color:#dcfce7
    class A,B,C,D,E c
```

---

## 11. AI Agent Architecture

```mermaid
flowchart TD
    O[AI Orchestrator]
    O --> RA[Risk Agent] --> RDB[(Risk DB)]
    O --> GA[Graph Agent] --> GDB[(Graph DB)]
    O --> IA[Investigation Agent] --> EV[(Evidence)]
    O --> VA[Vision Agent] --> IMG[(Images)]
    O --> FA[Forecast Agent] --> TS[(Time Series)]
    O --> InsA[Inspector Agent] --> SimA[Simulation Agent] --> CitA[Citizen Agent]

    classDef orch fill:#4c1d95,stroke:#e879f9,color:#fdf4ff
    classDef agent fill:#1e1b4b,stroke:#818cf8,color:#e0e7ff
    classDef store fill:#0c4a6e,stroke:#38bdf8,color:#e0f2fe
    class O orch
    class RA,GA,IA,VA,FA,InsA,SimA,CitA agent
    class RDB,GDB,EV,IMG,TS store
```

Nine agents, one orchestrator — each owns one job (risk, graph, investigation, vision, forecast, inspection, simulation, citizen reports), coordinated centrally so recommendations stay consistent and explainable.

---

## 12. Data Model

```mermaid
erDiagram
    SUPPLIER ||--o{ FOODBATCH : produces
    FOODBATCH ||--o{ LABORATORY : tested_by
    FOODBATCH ||--o{ WAREHOUSE : stored_at
    FOODBATCH ||--o{ TRANSPORT : transported_by
    FOODBATCH ||--o{ DISTRIBUTOR : distributed_to
    DISTRIBUTOR ||--o{ RETAILER : supplies
    CONSUMERREPORT }o--|| FOODBATCH : references
    INCIDENT }o--|| FOODBATCH : linked_to
```

---

## 13. Security, Privacy & Responsible AI

- RBAC, encryption at rest/in transit, rate-limited APIs, full audit logs
- Permissioned blockchain — only verified participants can write
- Citizen identity never exposed publicly; public data is aggregated/anonymized
- **Human approval required for all high-impact actions** (recalls, shutdowns, alerts)

**Limits, stated plainly:** predictions are probabilistic; computer vision is a risk indicator, not a lab test; simulations are estimates; citizen reports can contain false positives; AI recommendations always need human validation; blockchain can't make false input true; model quality depends on data quality.

---

## 14. Observability & MLOps

```mermaid
flowchart LR
    D[Data] --> M[Model] --> P[Prediction] --> F[Feedback] --> Mo[Monitoring] --> R[Retraining] --> V[Validation] --> De[Deployment]
    De -.-> M
    classDef ops fill:#083344,stroke:#22d3ee,color:#cffafe
    class D,M,P,F,Mo,R,V,De ops
```

Model versioning, drift detection, prediction/API/infra monitoring, rollback, CI/CD, automated testing.

---

## 15. Project Structure

```text
foodguard-x/
├── apps/            # web (command center), inspector, consumer
├── services/        # api, risk-engine, graph-engine, vision-engine,
│                       forecast-engine, simulation-engine, investigation-engine
├── agents/          # orchestrator + 8 specialized agents
├── blockchain/      # Hyperledger Fabric chaincode & network config
├── ml/              # training, inference, evaluation, feature-engineering
├── data/            # schemas, pipelines, samples
├── infrastructure/  # terraform, docker, kubernetes
├── docs/            # architecture, api, decisions
└── README.md
```

---

## 16. API Design

```text
POST /api/v1/batches                          GET /api/v1/batches/{id}/risk
POST /api/v1/incidents                         GET /api/v1/incidents/{id}/investigation
GET  /api/v1/risk/india                        GET /api/v1/risk/region/{id}
POST /api/v1/simulation                        POST /api/v1/vision/analyze
POST /api/v1/lab/analyze                       POST /api/v1/citizen/report
```

> Example routes — see [`docs/api/`](./docs/api) for what's live.

---

## 17. Key User Journeys

<table>
<tr><th>Authority</th><th>Inspector</th><th>Business</th><th>Consumer</th></tr>
<tr valign="top">
<td>Login → Risk Map → Threat → Investigation → Graph → Simulation → Action</td>
<td>Copilot → Priorities → Site Visit → Vision Inspector → Evidence → Submit</td>
<td>Register Batch → Lab Report → Track DNA → Monitor Risk → Resolve</td>
<td>Scan QR → Food Passport → Safety Score → Why → Act</td>
</tr>
</table>

---

## 18. Why This Is Different

| Traditional | FOODGUARD X |
|---|---|
| Reactive | Predictive |
| Manual investigation | AI-assisted investigation |
| Static records | Connected food graph |
| Test after problem | Forecast before crisis |
| Basic traceability | Digital Food DNA |
| Simple recall | Contamination simulation |
| Historical data only | Continuous self-learning |

---

## 19. Real-World Example

```mermaid
flowchart TD
    A["Milk Batch M492"] --> B[Cold-chain temp rises] --> C[AI flags anomaly] --> D[Score falls, forecast worsens]
    D --> E[Complaints appear] --> F[Graph Agent finds common warehouse] --> G[Simulation models spread]
    G --> H[Inspector Copilot prioritizes site] --> I[Authority investigates] --> J[Blockchain logs it all] --> K[Outcome feeds back into training]
    classDef s fill:#1e1b4b,stroke:#818cf8,color:#e0e7ff
    class A,B,C,D,E,F,G,H,I,J,K s
```

A temperature sensor drifts out of range → the score drops and the forecast worsens → complaints trickle in → the graph reveals they all trace to one warehouse → a simulation estimates how far the batch may have spread → the warehouse becomes today's top inspection priority — all before it becomes a public health story.

---

## 20. Roadmap & Getting Started

| Phase | Focus |
|---|---|
| 1 — MVP | Batch tracking, Food DNA, risk scoring, dashboard, citizen reporting |
| 2 — Intelligence | Graph intelligence, forecasting, anomaly detection |
| 3 — Advanced AI | Vision, agents, contamination simulation, what-if engine |
| 4 — National Scale | IoT, multi-state deployment, enterprise integrations, full MLOps |

```bash
git clone https://github.com/<your-org>/foodguard-x.git
cd foodguard-x

# Backend
cd services/api && npm install && npm run dev

# ML services
cd ../../ml && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt

# Frontend
cd ../apps/web && npm install && npm run dev

# Or run everything with Docker
docker-compose up --build
```

---

<div align="center">

## FOODGUARD X
### Predict. Prevent. Trace. Simulate. Act.
**A digital brain for India's food-safety ecosystem.**

</div>
