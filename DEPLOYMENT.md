# 🚀 Guía de Despliegue en Producción (Render + Netlify)

Esta guía detalla el procedimiento paso a paso para subir tu proyecto Full-Stack a internet de forma gratuita y profesional.

---

## 🖥️ Paso 1: Desplegar el Backend en Render

El backend almacena las cotizaciones e historial de contactos en `database/db_mock.json` y corre sobre un servidor Express en el puerto 5000.

1. Regístrate o inicia sesión en **[Render.com](https://render.com/)**.
2. Haz clic en **New +** y selecciona **Web Service**.
3. Conecta tu repositorio de GitHub `dayronsena123/ayuda_escolar_pro_web`.
4. Configura los siguientes parámetros en el formulario:
   - **Name**: `ayuda-escolar-pro-backend`
   - **Language**: `Node`
   - **Branch**: `main`
   - **Build Command**: `npm run install:backend`
   - **Start Command**: `npm run start:backend`
5. En la sección **Environment Variables**, añade la siguiente variable:
   - **Key**: `PORT`
   - **Value**: `5000`
6. Haz clic en **Create Web Service**. 
7. Una vez completado, Render te proporcionará una URL pública (ejemplo: `https://ayuda-escolar-pro-backend.onrender.com`). **Copia esta URL**, ya que la necesitaremos en el frontend.

---

## 🌐 Paso 2: Conectar el Frontend con el Backend en Producción

En tu frontend, los archivos de scripts calculadores deben apuntar a la URL pública del backend que acabas de crear:

1. Abre el archivo `frontend/assets/js/calc-academia.js`, `frontend/assets/js/calc-webdev.js` y `frontend/assets/js/main.js`.
2. Busca la variable `API_URL` al inicio del archivo y cámbiala por la URL de tu backend en Render:
   ```javascript
   const API_URL = "https://ayuda-escolar-pro-backend.onrender.com";
   ```
3. Guarda los cambios y haz un push a tu repositorio de GitHub.

---

## 🎨 Paso 3: Desplegar el Frontend en Netlify

El frontend es estático y se despliega rápidamente en Netlify:

1. Regístrate o inicia sesión en **[Netlify.com](https://www.netlify.com/)**.
2. Haz clic en **Add new site** y selecciona **Import an existing project**.
3. Conecta tu cuenta de GitHub y elige tu repositorio.
4. Configura los parámetros de compilación:
   - **Base directory**: Dejar en blanco o escribir `./`
   - **Build command**: Dejar en blanco
   - **Publish directory**: `frontend`
5. Haz clic en **Deploy site**.
6. ¡Listo! Netlify creará una URL segura para tu frontend (ejemplo: `https://ayuda-escolar-pro.netlify.app`).

---

## 📝 Resumen de URLs
Una vez terminado el proceso, tendrás dos enlaces:
1. **Tu Web Cliente**: `https://tu-nombre-de-sitio.netlify.app` (La que le compartes a tus clientes de secundaria/universidad y prospectos de desarrollo web).
2. **Tu Backend API**: `https://tu-servidor-backend.onrender.com` (Donde se reciben y guardan todas las peticiones).
