-- SQL Script to initialize tables for Ayuda Escolar Pro Full-Stack Application
-- Can be imported into PostgreSQL or MySQL

-- Create Table for Academic Quotes
CREATE TABLE IF NOT EXISTS academic_quotes (
    id VARCHAR(50) PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    service VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    complexity VARCHAR(50) NOT NULL,
    urgency VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL
);

-- Create Table for Web Development Quotes
CREATE TABLE IF NOT EXISTS webdev_quotes (
    id VARCHAR(50) PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    project_type VARCHAR(100) NOT NULL,
    features TEXT[] NOT NULL, -- For PostgreSQL (use TEXT or a separate join table in MySQL)
    price VARCHAR(50) NOT NULL,
    time_estimate VARCHAR(50) NOT NULL
);

-- Create Table for Contact Leads
CREATE TABLE IF NOT EXISTS contact_leads (
    id VARCHAR(50) PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(150) NOT NULL,
    contact_info VARCHAR(150) NOT NULL,
    message TEXT NOT NULL
);
