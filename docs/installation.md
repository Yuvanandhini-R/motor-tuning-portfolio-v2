# ⬇️ Local Installation Guide (NDA-Safe Mockup)

This guide provides the steps required to set up and run the portfolio-ready, mock version of the **Embedded System Control Application**.

**Note:** This version simulates the full application stack (Frontend, Backend, Database) and **does not require actual physical hardware** or proprietary drivers to run.

---

## Prerequisites

Before starting, ensure you have the following software installed:

1.  **Node.js:** (LTS version recommended)
2.  **Git:** To clone this repository.
3.  **MySQL Server:** To host the application's local database.
4.  **MySQL Workbench or equivalent client:** For database restoration and management.
5.  **PCAN Driver:** (Optional, but recommended for realism) Installing the official driver demonstrates familiarity with the required industrial setup, though it is not needed to run the mock code.
    * *Download Link:* [PCAN Driver Download](https://www.peak-system.com/PCAN-View.242.0.html)

---

## Setup Steps

### Step 1: Clone the Repository

Clone this project repository to your local machine:

```bash
git clone [YOUR-REPOSITORY-URL] galaxi-motor-tuning-portfolio
cd galaxi-motor-tuning-portfolio
```

### Step 2: Database Setup

1. **Initialize MySQL:** Start your local MySQL server.
2. **Create Database:** Use MySQL Workbench or the command line to create a new, empty database (e.g., `create database mock_mcu_db;`).
3. **Restore Schema and Data:**
   * Navigate to `src/database/` in this repository.
   * Run the provided schema (`schema.sql`) and sample data scripts using MySQL Workbench to set up the tables and populate mock data.

### Step 3: Install Backend Dependencies

The backend handles the API logic and database communication.

```bash
cd src/backend
npm install
```

### Step 4: Install Frontend/Electron Dependencies

The frontend uses React and Electron to build the desktop UI.

```bash
cd ../frontend
npm install
```

### Step 5: Run the Application

The application requires the backend server and the Electron frontend to run concurrently.

**Start the Backend API (First Terminal):**

```bash
cd src/backend
node server.js
```

*(Wait for the console to confirm the API is running on the local port, e.g., `Mock Backend API running on port 3001`)*

**Start the Electron Frontend (Second Terminal):**

```bash
cd src/frontend
npm start
```

*(This command starts the Electron application, and the desktop window should appear.)*

### Step 6: Verify Functionality

If the setup is correct, the application window will open, and the UI will begin polling the local backend API and displaying mock data, successfully simulating a connected system.
