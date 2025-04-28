-- Active: 1731105146609@@localhost@3306@licencias_software
-- Crear base de datos 
CREATE DATABASE licencias_software;
USE licencias_software;

-- Tabla de usuarios
CREATE TABLE usuarios (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
tipo_usuario ENUM('admin', 'cliente') DEFAULT 'cliente',
creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de licencias
CREATE TABLE licencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    cantidad_disponible INT DEFAULT 0,
    imagen_url VARCHAR(255), -- <- Imagen de la licencia
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de transacciones (venta de licencias)
CREATE TABLE transacciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    licencia_id INT,
    cantidad INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (licencia_id) REFERENCES licencias(id) ON DELETE CASCADE
);
