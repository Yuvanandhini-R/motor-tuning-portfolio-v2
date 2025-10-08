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

motor-tuning-portfolio-v2/
│
├─ src/
│   ├─ frontend/         # Electron + React application interface
│   ├─ backend/          # Node.js + Express REST API server
│   └─ database/         # SQLite database file (.db) and initialization scripts
│
├─ tests/
│   └─ api-tests/        # Postman or Insomnia collection
│
├─ diagrams/
│   ├─ system_architecture.png
│   └─ data_flow.png
│
├─ docs/
│   └─ installation.md   # Simplified instructions to run locally
│
└─ README.md


---

### ⭐ Skills Demonstrated in V.2

* **Architectural Refactoring:** Successful migration from a server-based DB (MySQL) to an embedded DB (SQLite).
* **Electron/Node.js Development** and packaging for Windows.
* Frontend development with **React (latest)**.
* Database design and integration using **SQLite** for standalone applications.
* Advanced problem-solving for memory management and deployment efficiency.

### 🔒 Note on Confidentiality

* No proprietary source code, specific company names, or sensitive internal data is included in this repository.
* The project is designed to demonstrate technical capabilities in compliance with Non-Disclosure Agreements (NDAs).