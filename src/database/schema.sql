-- database_schema.sql (for SQLite)

-- Table to store high-frequency CAN data logs
-- NOTE: Frequent inserts to this table (8/sec) are the source of the storage issues.
CREATE TABLE IF NOT EXISTS device_data_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    log_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    can_identifier TEXT NOT NULL,  -- The identifier for the CAN message (e.g., '0x1A0')
    metric_a REAL,                -- Corresponds to Motor Speed
    metric_b REAL,                -- Corresponds to Motor Temperature
    metric_c REAL,                -- Corresponds to Battery Voltage
    raw_can_frame TEXT            -- Stores the raw CAN message data
);

-- Note: The schema design reflects the functional requirement of logging multiple metrics
-- per CAN message frequency, which leads to the identified scalability issues.