# Motor tuning Software - Embedded Control Desktop Interface (V.2) - Installation Guide

This guide provides instructions for installing and running the Embedded Control Desktop Interface (`.exe` version) on a Windows machine.

## Project Information (NDA-SAFE)
* **Product:** Motor tuning Software - Embedded Control Desktop Interface (V.2)

## Prerequisites

* A Windows PC (Laptop or Desktop).
* [CAN Interface Type] Interface hardware and Motor Control Unit hardware.

## Installation Steps (Using Pre-Built Executable)

### Step 1: Install Database Management System

The application relies on a local database (originally MySQL, but SQLite is used in source code) for data logging and retrieval.

1.  Download and install your chosen local DBMS (e.g., MySQL Server/Workbench for the bundled version).
2.  During installation, set the required administrative password as: `[SECURE_DEFAULT_PASSWORD]`
3.  **Database Installation Guide:** [LINK TO INTERNAL/PUBLIC DBMS INSTALLATION GUIDE]

### Step 2: Restore the Database

The application requires the initial database structure and data to function.

1.  **Download the database backup file:** [LINK TO SECURE DATABASE BACKUP LOCATION]
2.  Use your DBMS tool to restore the downloaded database backup file.

### Step 3: Extract and Locate the Application Executable

The main application is provided as a pre-built executable file.

1.  **Download the application ZIP file:** [LINK TO SECURE APPLICATION EXECUTABLE LOCATION]
2.  Unzip (Extract) the downloaded file.
3.  Navigate to the extracted directory to find the main application file:
    * `\[app-folder-name]\mcuapp.exe`

### Step 4: Install Embedded Device Driver

The application requires the specific device driver (e.g., PCAN Driver) to communicate with the embedded Motor Control Unit.

1.  **Download the required Driver:** [LINK TO SECURE DRIVER DOWNLOAD PAGE]
2.  Install the driver according to the provided instructions.

### Step 5: Connect Hardware and Run Application

1.  Connect your **[CAN Interface Type] interface** to your PC and the **Motor Control Unit hardware**.
2.  Launch the application by double-clicking the executable:
    * `\[app-folder-name]\mcuapp.exe`

The application will now communicate with the embedded device and begin its data logging process.
