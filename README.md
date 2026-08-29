<div align="center">

<img width="100%" src="https://img.shields.io/badge/-%20-1e3a8a?style=flat-square" height="4"/>

# ⬡ FOODGUARD X

### The AI Digital Twin of India's Food Safety Ecosystem

<h3>Predict → Prevent → Trace → Simulate → Act</h3>

We don't wait for the first person to get sick. We find the warning signal first.

<br/>

[![Status](https://img.shields.io/badge/STATUS-ACTIVE_DEVELOPMENT-2ea44f?style=for-the-badge&labelColor=0d1117)](#)
[![License](https://img.shields.io/badge/LICENSE-MIT-3b82f6?style=for-the-badge&labelColor=0d1117)](LICENSE)
[![Scale](https://img.shields.io/badge/SCALE-NATIONAL-a855f7?style=for-the-badge&labelColor=0d1117)](#)

<br/>

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)
![Neo4j](https://img.shields.io/badge/Neo4j-008CC1?style=flat-square&logo=neo4j&logoColor=white)
![Hyperledger](https://img.shields.io/badge/Hyperledger_Fabric-2F3134?style=flat-square&logo=hyperledger&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

<img width="100%" src="https://img.shields.io/badge/-%20-1e3a8a?style=flat-square" height="4"/>

</div>

<br/>

<table align="center">
<tr>
<td align="center" width="20%"><h3>9</h3><sub>AI AGENTS</sub></td>
<td align="center" width="20%"><h3>8</h3><sub>SUPPLY-CHAIN NODES</sub></td>
<td align="center" width="20%"><h3>72h</h3><sub>RISK FORECAST WINDOW</sub></td>
<td align="center" width="20%"><h3>1</h3><sub>NATIONAL DIGITAL TWIN</sub></td>
</tr>
</table>

<br/>

## Table of Contents

`01` [The Problem](#01--the-problem) · `02` [Core Idea](#02--core-idea--digital-twin) · `03` [Workflow](#03--end-to-end-workflow) · `04` [Architecture](#04--system-architecture) · `05` [Tech Stack](#05--technology-stack)

`06` [Digital Food DNA](#06--digital-food-dna--time-machine) · `07` [Simulation & Investigation](#07--simulation--investigation-engine) · `08` [Vision · Citizen · What-If](#08--vision-citizen-network--what-if-simulator) · `09` [Blockchain Passport](#09--blockchain-food-passport) · `10` [Risk Map & Consumer UX](#10--live-risk-map--consumer-experience)

`11` [AI Agent Architecture](#11--ai-agent-architecture) · `12` [Data Model](#12--data-model) · `13` [Security & Responsible AI](#13--security-privacy--responsible-ai) · `14` [Observability](#14--observability--mlops) · `15` [Project Structure](#15--project-structure)

`16` [API Design](#16--api-design) · `17` [User Journeys](#17--key-user-journeys) · `18` [Why It's Different](#18--why-this-is-different) · `19` [Real-World Walkthrough](#19--real-world-walkthrough) · `20` [Roadmap & Setup](#20--roadmap--getting-started)

<br/>

## 01 — The Problem

<table>
<tr>
<td width="50%" valign="top">

**Today — reactive by design**

```mermaid
flowchart TD
    A[Food Problem] --> B[People Get Sick]
    B --> C[Complaint]
    C --> D[Inspection]
    D --> E[Recall]
    style A fill:#450a0a,stroke:#ef4444,color:#fecaca
    style B fill:#450a0a,stroke:#ef4444,color:#fecaca
    style C fill:#451a03,stroke:#f59e0b,color:#fed7aa
    style D fill:#451a03,stroke:#f59e0b,color:#fed7aa
    style E fill:#052e16,stroke:#22c55e,color:#bbf7d0
```

</td>
<td width="50%" valign="top">

**FOODGUARD X — predictive by design**

```mermaid
flowchart TD
    A[Food Data] --> B[AI Detects Signals]
    B --> C[Predict Risk]
    C --> D[Simulate Spread]
    D --> E[Prevent Crisis]
    style A fill:#1e1b4b,stroke:#818cf8,color:#e0e7ff
    style B fill:#1e1b4b,stroke:#818cf8,color:#e0e7ff
    style C fill:#312e81,stroke:#a78bfa,color:#ede9fe
    style D fill:#4c1d95,stroke:#c084fc,color:#f3e8ff
    style E fill:#052e16,stroke:#22c55e,color:#bbf7d0
```

</td>
</tr>
</table>

> Traditional food safety asks **"Is this food unsafe?"**
> FOODGUARD X asks — **"Where could a problem happen next, why, how far could it spread, and what should we do before it's a crisis?"**

<br/>

## 02 — Core Idea · Digital Twin

A live, connected model of India's entire food journey — enriched with every signal around it.

```mermaid
flowchart LR
    S(("Supplier")) --> F(("Factory")) --> L(("Lab")) --> W(("Warehouse")) --> T(("Transport")) --> D(("Distributor")) --> R(("Retailer")) --> C(("Consumer"))
    classDef n fill:#0f172a,stroke:#38bdf8,color:#e2e8f0,stroke-width:2px
    class S,F,L,W,T,D,R,C n
```

| Signal | Feeds |
|:--|:--|
| 🌦 Environmental | Weather, geography, flood & temperature data |
| 📋 Regulatory | Inspections, laboratory reports |
| 📦 Operational | Storage conditions, humidity, transport logs |
| 🗣 Human | Consumer & citizen complaints |
| 🕰 Historical | Past incidents, recurring failure patterns |

<br/>

## 03 — End-to-End Workflow

```mermaid
flowchart LR
    A[Ingestion] --> B[Validate & Normalize] --> C[Food DNA] --> D[AI / ML Analysis]
    D --> E[Risk + Anomaly Detection] --> F[Graph Investigation] --> G[Contamination Simulation]
    G --> H[AI Recommendation] --> I[Authority Action] --> J[Blockchain Audit] --> K[Feedback Loop]
    K -.retrains.-> D

    classDef ingest fill:#082f49,stroke:#0ea5e9,color:#e0f2fe
    classDef ai fill:#3b0764,stroke:#c084fc,color:#f3e8ff
    classDef action fill:#052e16,stroke:#22c55e,color:#dcfce7
    class A,B,C ingest
    class D,E,F,G,H ai
    class I,J,K action
```

<br/>

## 04 — System Architecture

```mermaid
flowchart TB
    subgraph L1["① Data Sources"]
        A1["Suppliers · IoT · Labs · Warehouses · Transport · Weather · Citizens"]
    end
    subgraph L2["② Ingestion"]
        B1["API Gateway · AWS IoT · EventBridge · Streaming"]
    end
    subgraph L3["③ Storage"]
        C1["S3 · Operational DB · Time-Series · Search · Data Lake"]
    end
    subgraph L4["④ Intelligence Layer"]
        D1["ML · Computer Vision · Forecasting · Anomaly Detection · GNN · LLM Agents"]
    end
    subgraph L5["⑤ Graph Intelligence"]
        E1["Neo4j / Amazon Neptune"]
    end
    subgraph L6["⑥ AI Agent Layer"]
        F1["Orchestrator + 8 Specialized Agents"]
    end
    subgraph L7["⑦ Blockchain"]
        G1["Hyperledger Fabric"]
    end
    subgraph L8["⑧ Application Layer"]
        H1["Command Center · Inspectors · Labs · Businesses · Consumers"]
    end

    L1 --> L2 --> L3 --> L4
    L4 --> L5 --> L6
    L6 --> L7
    L6 --> L8

    style L1 fill:#0c1e3e,stroke:#38bdf8,color:#e2e8f0
    style L2 fill:#0f2942,stroke:#0ea5e9,color:#e2e8f0
    style L3 fill:#1c1a3e,stroke:#818cf8,color:#e2e8f0
    style L4 fill:#2e1065,stroke:#c084fc,color:#f3e8ff
    style L5 fill:#3b1d0f,stroke:#fb923c,color:#ffedd5
    style L6 fill:#4c1d95,stroke:#e879f9,color:#fdf4ff
    style L7 fill:#1a2e1a,stroke:#22c55e,color:#dcfce7
    style L8 fill:#083344,stroke:#22d3ee,color:#cffafe
```

The **graph layer** models `Supplier → Batch → Factory → Warehouse → Transport → Distributor → Retailer → Consumer`, surfacing hidden multi-hop links a flat database would miss. **Blockchain** is used surgically — batch identity, lab verification, inspections, audit history — never as a database for everything.

<br/>

## 05 — Technology Stack

<table>
<tr><th>Layer</th><th>Stack</th><th>Purpose</th></tr>
<tr><td><b>Frontend</b></td><td><img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/></td><td>Command Center UI</td></tr>
<tr><td><b>Maps</b></td><td><img src="https://img.shields.io/badge/Mapbox-000000?style=flat-square&logo=mapbox&logoColor=white"/></td><td>India risk visualization</td></tr>
<tr><td><b>Backend</b></td><td><img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"/> <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white"/></td><td>APIs & AI services</td></tr>
<tr><td><b>AI / ML</b></td><td><img src="https://img.shields.io/badge/Bedrock-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/> <img src="https://img.shields.io/badge/SageMaker-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/> <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white"/></td><td>LLM agents, training, vision</td></tr>
<tr><td><b>Graph</b></td><td><img src="https://img.shields.io/badge/Neo4j-008CC1?style=flat-square&logo=neo4j&logoColor=white"/></td><td>Supply-chain intelligence</td></tr>
<tr><td><b>Blockchain</b></td><td><img src="https://img.shields.io/badge/Hyperledger_Fabric-2F3134?style=flat-square&logo=hyperledger&logoColor=white"/></td><td>Tamper-evident audit trail</td></tr>
<tr><td><b>Storage</b></td><td><img src="https://img.shields.io/badge/S3-569A31?style=flat-square&logo=amazons3&logoColor=white"/> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white"/> <img src="https://img.shields.io/badge/OpenSearch-005EB8?style=flat-square&logo=opensearch&logoColor=white"/></td><td>Raw data, app data, search</td></tr>
<tr><td><b>Events / IoT</b></td><td><img src="https://img.shields.io/badge/AWS_IoT-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/> <img src="https://img.shields.io/badge/EventBridge-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/></td><td>Real-time ingestion</td></tr>
<tr><td><b>Compute</b></td><td><img src="https://img.shields.io/badge/ECS%2FEKS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/> <img src="https://img.shields.io/badge/Lambda-FF9900?style=flat-square&logo=awslambda&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/></td><td>Containers & serverless</td></tr>
<tr><td><b>Auth / Ops</b></td><td>Cognito · <img src="https://img.shields.io/badge/CloudWatch-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/> · <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white"/></td><td>Identity, monitoring, CI/CD</td></tr>
</table>

> Reflects target architecture — see `docs/architecture/` for implemented vs. planned.

<br/>

## 06 — Digital Food DNA & Time Machine

```mermaid
flowchart LR
    ID(("M492")) --> S[Supplier] --> F[Factory] --> L[Lab] --> W[Warehouse] --> T[Transport] --> R[Retailer] --> C[Consumer]
    classDef dna fill:#1e1b4b,stroke:#818cf8,color:#e0e7ff
    class ID,S,F,L,W,T,R,C dna
```

```
Current Safety Score:   84 / 100
Predicted (+24h):       62 / 100
Predicted (+48h):       31 / 100
```

```mermaid
flowchart LR
    N["NOW · Safe"] --> H24["+24h · Moderate"] --> H48["+48h · High"] --> H72["+72h · Critical"]
    style N fill:#052e16,stroke:#22c55e,color:#dcfce7
    style H24 fill:#422006,stroke:#f59e0b,color:#fef3c7
    style H48 fill:#7c2d12,stroke:#fb923c,color:#ffedd5
    style H72 fill:#450a0a,stroke:#ef4444,color:#fee2e2
```

<br/>

## 07 — Simulation & Investigation Engine

**Contamination Spread Simulator** — models how a batch could travel through the network:

```mermaid
flowchart TD
    W(("Warehouse")) --> DA[Distributor A] --> CA[City A]
    W --> DB[Distributor B] --> CB[City B]
    W --> DC[Distributor C] --> CC[City C]
    style W fill:#450a0a,stroke:#ef4444,color:#fff
    style DA fill:#451a03,stroke:#f59e0b,color:#fff
    style DB fill:#451a03,stroke:#f59e0b,color:#fff
    style DC fill:#451a03,stroke:#f59e0b,color:#fff
```

> **Core question it answers:** *"Which single intervention could reduce the highest potential exposure?"*

**Food Crime-Scene Investigator** — turns scattered complaints into an evidence chain:

```
23 Complaints → Same Product → Same Batch → Same Distributor → Same Warehouse → Possible Origin
```

**Unknown Risk Detector** — flags statistically unusual combinations no rule was ever written for:

```
⚠ NEW FOOD SAFETY ANOMALY DETECTED
```

**AI Inspector Copilot** — prioritizes where human attention matters most:

```
1. Warehouse #17     Risk 94/100   Cold-chain anomaly + downstream spread
2. Restaurant #42    Risk 87/100   Complaint cluster + supplier pattern
```

> None of this accuses anyone automatically — it generates evidence-based leads for human authorities.

<br/>

## 08 — Vision, Citizen Network & What-If Simulator

| Feature | Input | Output |
|:--|:--|:--|
| **AI Vision Inspector** | Food / packaging images, storage photos | Explainable flags — *"Seal geometry differs from expected pattern"* — a risk indicator, not a lab diagnosis |
| **Citizen Network** | Photo, video, voice, location, QR | Clusters unrelated reports into one possible common batch |
| **What-If Simulator** | *"Close this warehouse?"* | Estimated exposure reduction & new disruptions — estimates, not guarantees |

<br/>

## 09 — Blockchain Food Passport

```mermaid
flowchart LR
    P((Produced)) --> T((Tested)) --> S((Stored)) --> Tr((Transported)) --> I((Inspected)) --> So((Sold))
    classDef bc fill:#1a2e1a,stroke:#22c55e,color:#dcfce7
    class P,T,S,Tr,I,So bc
```

Every event becomes a tamper-evident record on **Hyperledger Fabric**. It preserves what was reported — it cannot make false input data true.

<br/>

## 10 — Live Risk Map & Consumer Experience

```
🟢 LOW      🟡 WATCH      🟠 HIGH      🔴 CRITICAL
```

Selecting a region always explains **why** — complaint spikes, cold-chain anomalies, weather, supply concentration, history.

```mermaid
flowchart LR
    A[Scan QR] --> B[Food DNA] --> C[Current Risk] --> D[Predicted Risk] --> E(("SAFE · 92/100"))
    classDef c fill:#052e16,stroke:#22c55e,color:#dcfce7
    class A,B,C,D,E c
```

<br/>

## 11 — AI Agent Architecture

```mermaid
flowchart TD
    O(("Orchestrator"))
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

Nine agents, one orchestrator — each owns one job, coordinated centrally so recommendations stay consistent and explainable.

<br/>

## 12 — Data Model

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

<br/>

## 13 — Security, Privacy & Responsible AI

- RBAC · encryption at rest/in transit · rate-limited, audited APIs
- Permissioned blockchain — only verified participants can write
- Citizen identity never exposed publicly; public data is aggregated/anonymized
- **Human approval required for every high-impact action** (recalls, shutdowns, alerts)

> Predictions are probabilistic. Vision output is a risk indicator, not a lab test. Simulations are estimates, not guarantees. AI recommendations always need human validation.

<br/>

## 14 — Observability & MLOps

```mermaid
flowchart LR
    D[Data] --> M[Model] --> P[Prediction] --> F[Feedback] --> Mo[Monitoring] --> R[Retraining] --> V[Validation] --> De[Deployment]
    De -.-> M
    classDef ops fill:#083344,stroke:#22d3ee,color:#cffafe
    class D,M,P,F,Mo,R,V,De ops
```

Model versioning · drift detection · prediction/API/infra monitoring · rollback · CI/CD · automated testing.

<br/>

## 15 — Project Structure

```
foodguard-x/
├── apps/            web · inspector · consumer
├── services/         api · risk-engine · graph-engine · vision-engine
│                     forecast-engine · simulation-engine · investigation-engine
├── agents/           orchestrator + 8 specialized agents
├── blockchain/       Hyperledger Fabric chaincode & network config
├── ml/               training · inference · evaluation · feature-engineering
├── data/             schemas · pipelines · samples
├── infrastructure/   terraform · docker · kubernetes
├── docs/             architecture · api · decisions
└── README.md
```

<br/>

## 16 — API Design

```
POST /api/v1/batches                 GET  /api/v1/batches/{id}/risk
POST /api/v1/incidents               GET  /api/v1/incidents/{id}/investigation
GET  /api/v1/risk/india              GET  /api/v1/risk/region/{id}
POST /api/v1/simulation              POST /api/v1/vision/analyze
POST /api/v1/lab/analyze             POST /api/v1/citizen/report
```

<br/>

## 17 — Key User Journeys

<table>
<tr><th>Authority</th><th>Inspector</th><th>Business</th><th>Consumer</th></tr>
<tr valign="top">
<td>Login → Risk Map → Threat → Investigation → Graph → Simulation → Action</td>
<td>Copilot → Priorities → Site Visit → Vision Inspector → Evidence → Submit</td>
<td>Register Batch → Lab Report → Track DNA → Monitor Risk → Resolve</td>
<td>Scan QR → Passport → Safety Score → Why → Act</td>
</tr>
</table>

<br/>

## 18 — Why This Is Different

| Traditional | FOODGUARD X |
|:--|:--|
| Reactive | Predictive |
| Manual investigation | AI-assisted investigation |
| Static records | Connected food graph |
| Test after the problem | Forecast before the crisis |
| Simple recall | Contamination simulation |
| Historical data only | Continuous self-learning |

<br/>

## 19 — Real-World Walkthrough

```mermaid
flowchart TD
    A["Milk Batch M492"] --> B[Cold-chain temp rises] --> C[AI flags anomaly] --> D[Score falls, forecast worsens]
    D --> E[Complaints appear] --> F[Graph finds common warehouse] --> G[Simulation models spread]
    G --> H[Copilot prioritizes site] --> I[Authority investigates] --> J[Blockchain logs it] --> K[Outcome feeds training]
    classDef s fill:#1e1b4b,stroke:#818cf8,color:#e0e7ff
    class A,B,C,D,E,F,G,H,I,J,K s
```

A sensor drifts out of range → score drops, forecast worsens → complaints trickle in → the graph traces them to one warehouse → simulation estimates the spread → the warehouse becomes today's top priority — all before it becomes a public health story.

<br/>

## 20 — Roadmap & Getting Started

| Phase | Focus |
|:--|:--|
| **1 · MVP** | Batch tracking, Food DNA, risk scoring, dashboard, citizen reporting |
| **2 · Intelligence** | Graph intelligence, forecasting, anomaly detection |
| **3 · Advanced AI** | Vision, agents, contamination simulation, what-if engine |
| **4 · National Scale** | IoT, multi-state deployment, enterprise integrations, full MLOps |

```bash
git clone https://github.com/<your-org>/foodguard-x.git && cd foodguard-x

cd services/api && npm install && npm run dev              # Backend
cd ../../ml && pip install -r requirements.txt && python main.py   # ML services
cd ../apps/web && npm install && npm run dev                # Frontend

docker-compose up --build                                    # Or full stack
```

---

<div align="center">

<img width="100%" src="https://img.shields.io/badge/-%20-1e3a8a?style=flat-square" height="4"/>

### FOODGUARD X
**Predict · Prevent · Trace · Simulate · Act**

*A digital brain for India's food-safety ecosystem.*

</div>
