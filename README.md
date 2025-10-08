# ⚙️ Motor Tuning Software (V.2 - NDA-Safe Portfolio)

This repository details **Version 2** of the Embedded System Control Application. This phase focused on **architectural optimization** and migrating the persistent data layer to improve deployment efficiency and stability on target hardware.

---

## 🚀 Project Overview

The core objective remains a robust Windows desktop application for embedded system control. V.2 specifically addressed the complexity of the previous database setup by migrating to a more streamlined, file-based solution.

- **Role:** Software Development Engineer
- **Duration:** July - August 2024
- **Project Version:** V.2 (Focus on Database Optimization and Stability)

### 💻 Technical Stack

The architecture was refined to maximize efficiency for a standalone desktop application.

| Category | Technologies Used |
| :--- | :--- |
| **Desktop Framework** | **Electron, Node.js** |
| **Frontend** | **React (latest)**, HTML, CSS, JavaScript |
| **Backend/API** | Node.js, Express.js |
| **Database (V.2)** | **SQLite** (Migration from MySQL for embedded local storage) |
| **Industrial Simulation** | Mock Controller (Simulated CAN Messages) |
| **Deployment** | Windows `.exe` Packaging |

### 🛠️ Tools and Testing Used

| Tool Category | Tools Used | Purpose |
| :--- | :--- | :--- |
| **API Testing** | **Postman** or **Insomnia** | Validating and debugging all Backend API endpoints. |
| **CAN Bus Monitoring** | **PCAN-View Software** | Used for real-time monitoring and debugging of raw CAN bus messages. |
| **Database Management** | **SQLite tools / Editors** | Managing the lightweight, file-based database structure. |
| **Development** | **Node.js, npm/Yarn** | Package management and runtime environment. |

---

## 🔄 Architectural Improvement in V.2

The most significant update in Version 2 was the migration of the persistent data layer:

> **Database Transition:** Switched the primary local store from **MySQL** (an external server-based application) to **SQLite** (a lightweight, serverless, file-based database).
>
> **Benefit:** This change drastically simplifies deployment, eliminates the need for users to install and configure an external server, and improves the application's overall stability and resource footprint in a standalone `.exe` environment.

---

## ✨ Features & Accomplishments

All core features from V.1 were maintained and enhanced within the new architecture:

1.  **Seamless Desktop Deployment:** Maintained a reliable, standalone desktop application packaged as a single `.exe` file.
2.  **Embedded Database Integration:** Successfully implemented and integrated **SQLite**, embedding the database directly into the application's file system for zero-configuration persistence.
3.  **Data Logging & Export Utility:** Continued to log continuous, high-speed data to the local store, with functionality to export collected information into a standardized **CSV format**.
4.  **Hardware Simulation:** Maintained robust communication with the **mock controller** to simulate high-frequency CAN messages.

---

## 📈 Challenges and Performance Optimization

The core performance challenges identified in V.1 remained the focus for optimization planning in V.2, with a particular focus on how the new SQLite database would impact these issues.

| Identified Challenge | Solution Strategy (Planned/Proposed) |
| :--- | :--- |
| **High Processing Load** | High frequency data processing (8 times per second) led to excessive CPU and RAM usage. | **Strategy:** Implement intelligent **throttling and buffering** mechanisms to **decouple data ingestion from storage** and reduce unnecessary processing demands. |
| **Memory & Storage Saturation** | Intensive data storage caused high RAM consumption and rapid local disk filling. | **Strategy:** Conduct comprehensive memory leak analysis; leverage SQLite's lighter footprint and implement efficient **data retention and archival** policies. |
| **Scalability & Data Redundancy** | The current data model risked redundant entries, limiting the system's ability to scale. | **Strategy:** Refactor the data model to enforce uniqueness and adopt a modular architecture, preparing for higher message throughput. |

---

## 📂 Project Structured Folder

This structure reflects the V.2 architecture, featuring the lightweight, serverless database file:

## Project Structure

```
motor-tuning-portfolio-v2/
│
├─ src/
│   ├─ frontend/         # Electron + React application interface
│   ├─ backend/          # Node.js + Express REST API server
│   └─ database/         #SQLITE schema definition and sample data scripts
│
├─ tests/
│   └─ api-tests/        # Postman or Insomnia API testing collections
│
├─ diagrams/
│   ├─ system_architecture.png
│   └─ data_flow.png
│
├─ mockups/
│   └─ *.png files       # All application mockup screenshots (NDA-safe)
│
├─ docs/
│   └─ installation.md   # Simplified instructions to run the mock environment
│
└─ README.md
```
---
# ⚙️ System Architecture Diagram (Component View)

The architecture is a hybrid desktop application packaged by Electron, utilizing a standard three-tier local service model connected to embedded hardware.

### 1.1 Application Layers and Components

| Layer/Component | Technology/Role | Notes |
| :--- | :--- | :--- |
| **External Hardware** | Motor Control Unit (MCU), CAN Bus | The source of high-frequency data (Telemetry). |
| **Hardware Interface** | PCAN Driver (Native C/C++) | Low-level driver for OS-to-CAN communication. |
| **Desktop Wrapper** | **Electron** | Packages and runs both the Node.js Backend (Main Process) and the Frontend (Renderer Process) for the **Motor Tuning Software V2**. |
| **Application Layer (Backend)** | **Node.js / Express.js** | The core business logic. Manages the PCAN interface, runs the local REST API (`http://localhost:3000`), and executes the high-frequency data processing/logging loop. |
| **Data Layer** | **SQLite Database** | Local persistent storage for all raw and processed device logs (the storage is rapidly consumed due to 8Hz writes). |
| **Presentation Layer (Frontend)**| **HTML, CSS, JavaScript** | The User Interface. Communicates with the local Express API to display live data and trigger exports. |

### 1.2 Component Interaction Flow

The flow illustrates the chain of communication from hardware to the user interface:

```mermaid
graph TD
    A[Motor Control Unit] --> B(CAN Bus);
    B --> C(PCAN Driver);
    C -->|Native IPC / Bindings| D(Node.js Backend);
    D -->|Local REST API / HTTP| E(Electron Frontend);
    E --> F[User Interface];
    D -.->|SQLite Connection| G(Local Storage / DB File);

    style A fill:#f9f,stroke:#333
    style D fill:#ccf,stroke:#333
    style E fill:#eef,stroke:#333

---
# Data Flow Diagram (DFD)

This Data Flow Diagram details the movement of data through the **Motor Tuning Software V2** system, particularly highlighting the high-frequency logging mechanism.

## 1. Level 0: Context Diagram

This shows the system as a single process interacting with its external environment.

| External Entity | Data Sent In | Data Sent Out |
| :--- | :--- | :--- |
| **User** | Configuration Commands, Export Request | Live Telemetry Display, Status Messages |
| **Embedded Device** | High-Frequency CAN Messages | - |
| **Local File System**| - | Data Logs (CSV File) |

**Flow:**

1.  **Embedded Device** $\xrightarrow{\text{8Hz CAN Messages}}$ **Motor Tuning Software V2 Desktop App**
2.  **User** $\xrightarrow{\text{Configuration/Commands}}$ **Motor Tuning Software V2 Desktop App**
3.  **Motor Tuning Software V2 Desktop App** $\xrightarrow{\text{Live Telemetry Display}}$ **User**
4.  **Motor Tuning Software V2 Desktop App** $\xrightarrow{\text{Data Logs (CSV)}}$ **Local File System**

---

## 2. Level 1: Detailed DFD (Logging and Export Paths)

This diagram details the core processes and the local data store, illustrating the path of a CAN message from acquisition to logging and user presentation.

### Processes:

* **P1 (CAN Acquisition & Processing):** Reads and parses raw frames (8Hz cycle).
* **P2 (Data Logging Service):** Handles SQL `INSERT` operations at the high frequency (8/sec) into the local database.
* **P3 (UI & API Management):** The Express service that exposes data to the Frontend and handles user requests (like Export).
* **P4 (Data Export):** Retrieves all logs from the database and converts the data into CSV format for file export.

### Data Store:

* **D1 (Log Database - SQLite):** Persistent storage for all collected telemetry data.

### Data Flow Path:

1.  **Embedded Device** $\xrightarrow{\text{Raw CAN Frames (8Hz)}} \text{P1 (Acquisition)}$
2.  **P1** $\xrightarrow{\text{Live Data Cache}} \text{P3 (API Management)}$
3.  **P1** $\xrightarrow{\text{Processed Log Entry (8Hz)}} \text{P2 (Logging Service)}$
4.  **P2** $\xrightarrow{\text{SQL INSERT}} \text{D1 (Log Database)}$
    * ***PERFORMANCE BOTTLENECK:*** *The extreme frequency of this step leads to high CPU/RAM usage and rapid local disk storage consumption.*
5.  **User** $\xrightarrow{\text{Request Live View}} \text{P3}$
6.  **P3** $\xrightarrow{\text{Live Telemetry Data}} \text{User}$
7.  **User** $\xrightarrow{\text{Request Export}} \text{P3}$
8.  **P3** $\xrightarrow{\text{Export Command}} \text{P4 (Data Export)}$
9.  **P4** $\xrightarrow{\text{SELECT All Logs}} \text{D1}$
10. **P4** $\xrightarrow{\text{CSV File}} \text{Local File System} \xrightarrow{\text{Download}} \text{User}$

---

### ⭐ Skills Demonstrated in V.2

* **Architectural Refactoring:** Successful migration from a server-based DB (MySQL) to an embedded DB (SQLite).
* **Electron/Node.js Development** and packaging for Windows.
* Frontend development with **React (latest)**.
* Database design and integration using **SQLite** for standalone applications.
* Advanced problem-solving for memory management and deployment efficiency.

## 🔌 Running the Application

1.  Ensure your **[CAN Interface Type] Interface** is connected to your PC and the **Motor Control Unit hardware** is powered on.
2.  Launch the application (`mcuapp.exe`).
3.  The frontend UI will automatically connect to the local backend service and begin displaying live telemetry data streamed from the embedded device.

### 🔒 Note on Confidentiality

* No proprietary source code, specific company names, or sensitive internal data is included in this repository.
* The project is designed to demonstrate technical capabilities in compliance with Non-Disclosure Agreements (NDAs).

### Project Status: **✅ Completed**
*(July - August 2024)*