# 🚀 Ayuda Escolar Pro & Web Development Portal

¡Bienvenido al repositorio corporativo de **Ayuda Escolar Pro & Web Development**! Este proyecto es una plataforma **Full-Stack profesional** diseñada con un estilo estético **Neón Premium (Dark Mode)** y optimizada para maximizar conversiones y captar clientes directamente a tu chat de WhatsApp.

El portal divide de manera interactiva dos líneas de negocio:
1. **Ayuda Escolar**: Cotización interactiva y pedidos de tareas (diapositivas Canva/PPT, monografías, redacción de ensayos, matemáticas, infografías y mapas conceptuales).
2. **Desarrollo Web**: Exhibición de portafolio de tus 3 proyectos reales (Hotel Dubai, Rico Pez, Lennin Sorteos) y cotizador interactivo de landing pages y sitios web.

---

## 📁 Arquitectura del Repositorio

El repositorio está organizado siguiendo estándares de desarrollo empresarial para mantener una separación de conceptos limpia:

```
ayuda_escolar_pro_web/
│
├── frontend/                     # Cliente estático responsivo (Netlify-Ready)
│   ├── index.html                # Portal de bienvenida Split Hero
│   ├── tareas.html               # Cotizador académico y FAQs
│   ├── desarrollo.html           # Portafolio de proyectos y cotizador de webs
│   ├── contacto.html             # Enlaces de redes y formulario a WhatsApp
│   └── assets/                   # Estilos, scripts e imágenes (Logo y mockups)
│
├── backend/                      # Servidor API de Node.js + Express
│   ├── server.js                 # Servidor principal (maneja cotizaciones e historial)
│   └── package.json              # Dependencias del servidor backend
│
├── database/                     # Scripts y almacenamiento de persistencia
│   ├── init.sql                  # Script SQL de creación de tablas para producción
│   └── db_mock.json              # Base de datos simulada en JSON para desarrollo local
│
└── deploy/                       # Archivos de configuración de despliegue
    ├── netlify.toml              # Despliegue estático para Frontend
    └── render.yaml               # Despliegue de servicios Backend en Render
```

---

## ⚡ Tecnologías Utilizadas

* **Frontend**: HTML5 Semántico, CSS3 Moderno (Variables HSL, Efectos Glow, Glassmorphism), JavaScript (ES6+), FontAwesome Icons, Google Fonts (Outfit, Inter).
* **Backend**: Node.js, Express Framework, CORS.
* **Base de datos**: JSON local estructurado (`database/db_mock.json`) con inicializadores relacionales de SQL (`database/init.sql`).
* **Despliegue**: Netlify (Frontend), Render (Backend).

---

## ⚙️ Cómo Iniciar en Desarrollo Local

### Requisitos Previos
Debes tener instalado **[Node.js](https://nodejs.org/)** en tu computadora.

### Pasos para iniciar:
1. **Clonar o abrir el repositorio** en tu editor de código.
2. **Instalar dependencias del backend**:
   ```bash
   npm run install:backend
   ```
3. **Iniciar el Servidor Backend (Puerto 5000)**:
   ```bash
   npm run start:backend
   ```
4. **Abrir el Frontend**:
   Puedes abrir directamente el archivo `frontend/index.html` en tu navegador o usar el script de automatización local:
   ```bash
   npm run start:frontend
   ```

---

## 👨‍💻 Autor
* **Dayron Sena** - Desarrollador Full-Stack & Asesor Académico Premium.
* **GitHub**: [dayronsena123](https://github.com/dayronsena123)
* **Facebook**: [Ayuda Escolar Pro](https://web.facebook.com/profile.php?id=61577734536466)
* **TikTok**: [@futboll_25](https://www.tiktok.com/@futboll_25)
