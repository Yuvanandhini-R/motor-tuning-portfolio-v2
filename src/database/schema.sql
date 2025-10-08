-- FILE: src/database/schema.sql

-- NDA-SAFE MOCK CODE: This is a simplified schema reference, NOT the actual project database structure.

-- Table to log high-frequency CAN messages (e.g., 8 times per second)
CREATE TABLE IF NOT EXISTS can_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    can_id VARCHAR(10) NOT NULL,
    data_value DECIMAL(10, 4) NOT NULL,
    status_code INT
);

-- Table for system configuration settings and calibration values
CREATE TABLE IF NOT EXISTS system_config (
    setting_key VARCHAR(50) PRIMARY KEY,
    setting_value VARCHAR(255)
);

-- Insert mock configuration data
INSERT INTO system_config (setting_key, setting_value) VALUES
('app_version', 'V1.0.0-MOCK'),
('log_frequency_hz', '8');

-- Mock data insertion can be done via separate script to populate the database