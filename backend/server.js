const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, '..', 'database', 'db_mock.json');

// Middlewares
app.use(cors());
app.use(express.json());

// Helper function to read from DB
function readDatabase() {
    try {
        if (!fs.existsSync(DB_PATH)) {
            const initialData = { academia: [], webdev: [], contactos: [] };
            fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
            return initialData;
        }
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(raw);
    } catch (error) {
        console.error("Error reading database mock JSON:", error);
        return { academia: [], webdev: [], contactos: [] };
    }
}

// Helper function to write to DB
function writeDatabase(data) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error writing database mock JSON:", error);
    }
}

// Base Route
app.get('/', (req, res) => {
    res.json({
        message: "¡Bienvenido a la API Premium de Ayuda Escolar Pro!",
        status: "Online",
        endpoints: {
            academia: "POST /api/cotizar/academia",
            webdev: "POST /api/cotizar/webdev",
            contacto: "POST /api/contacto"
        }
    });
});

// Endpoint: Academia Cotización
app.post('/api/cotizar/academia', (req, res) => {
    const { service, quantity, complexity, urgency, price } = req.body;
    
    if (!service || !quantity || !complexity || !urgency || !price) {
        return res.status(400).json({ error: "Faltan campos requeridos en la solicitud." });
    }

    const db = readDatabase();
    const newEntry = {
        id: 'ACAD_' + Date.now(),
        fecha: new Date().toISOString(),
        service,
        quantity: parseInt(quantity),
        complexity,
        urgency,
        price
    };

    db.academia.push(newEntry);
    writeDatabase(db);

    console.log("Nueva cotización académica registrada:", newEntry);
    res.status(201).json({ success: true, message: "Cotización académica registrada con éxito.", data: newEntry });
});

// Endpoint: WebDev Cotización
app.post('/api/cotizar/webdev', (req, res) => {
    const { projectType, features, price, time } = req.body;

    if (!projectType || !price || !time) {
        return res.status(400).json({ error: "Faltan campos requeridos en la solicitud." });
    }

    const db = readDatabase();
    const newEntry = {
        id: 'WEB_' + Date.now(),
        fecha: new Date().toISOString(),
        projectType,
        features: features || [],
        price,
        time
    };

    db.webdev.push(newEntry);
    writeDatabase(db);

    console.log("Nueva cotización web registrada:", newEntry);
    res.status(201).json({ success: true, message: "Cotización web registrada con éxito.", data: newEntry });
});

// Endpoint: Contacto
app.post('/api/contacto', (req, res) => {
    const { name, contactInfo, message } = req.body;

    if (!name || !contactInfo || !message) {
        return res.status(400).json({ error: "Faltan campos requeridos en la solicitud." });
    }

    const db = readDatabase();
    const newEntry = {
        id: 'CONT_' + Date.now(),
        fecha: new Date().toISOString(),
        name,
        contactInfo,
        message
    };

    db.contactos.push(newEntry);
    writeDatabase(db);

    console.log("Nuevo lead de contacto registrado:", newEntry);
    res.status(201).json({ success: true, message: "Mensaje de contacto registrado con éxito.", data: newEntry });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Servidor activo corriendo en http://localhost:${PORT}`);
});
