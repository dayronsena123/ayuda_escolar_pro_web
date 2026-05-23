# 🐙 Manual de Git para Desarrollo Profesional

Esta guía contiene los comandos fundamentales y el flujo de trabajo sugerido (**Git Flow**) para gestionar el desarrollo de **Ayuda Escolar Pro & Web Development** de forma colaborativa y ordenada.

---

## 🛠️ Flujo de Ramas (Git Flow Simplificado)

1. **`main`**: Rama de producción. Contiene el código 100% estable que está en línea. No se edita directamente.
2. **`develop`**: Rama de integración. Aquí se unen todas las nuevas características antes de pasar a producción.
3. **`feature/*`**: Ramas de características. Se crean para desarrollar nuevas funciones o páginas individuales.

---

## 💻 Comandos del Día a Día

### 1. Iniciar un cambio o nueva funcionalidad
Antes de empezar a codificar, crea una rama específica:
```bash
# Cambiarse a develop y jalar los últimos cambios
git checkout develop
git pull origin develop

# Crear y cambiarse a una nueva rama de feature
git checkout -b feature/nueva-calculadora
```

### 2. Guardar avances en tu rama local
Escribe commits claros y significativos que expliquen qué cambió:
```bash
# Ver qué archivos se modificaron
git status

# Agregar los archivos al área de preparación
git add .

# Confirmar los cambios con un mensaje en imperativo
git commit -m "feat: agrega cotizador interactivo de paginas web"
```

### 3. Subir tu rama a GitHub
```bash
git push origin feature/nueva-calculadora
```

### 4. Integrar cambios a Develop (Merge)
Una vez probada tu funcionalidad en desarrollo local:
```bash
# Cambiar a develop
git checkout develop

# Integrar feature a develop
git merge feature/nueva-calculadora

# Subir develop actualizado a GitHub
git push origin develop

# Eliminar la rama local (opcional)
git branch -d feature/nueva-calculadora
```

### 5. Lanzamiento a Producción (Main)
Cuando consideres que todo en `develop` es estable y listo para Netlify/Render:
```bash
git checkout main
git merge develop
git push origin main
git checkout develop
```

---

## 📝 Convención de Mensajes de Commit (Conventional Commits)
Usa prefijos para mantener tu historial de confirmaciones legible y limpio:
- `feat:` Nueva funcionalidad (ej: `feat: agrega acordeon de faqs en tareas`)
- `fix:` Corrección de un error (ej: `fix: corrige error de suma en cotizador web`)
- `docs:` Cambios en la documentación (ej: `docs: actualiza manual de despliegue`)
- `style:` Estética o formatos de estilos sin tocar lógica de código (ej: `style: mejora brillo neon de botones`)
- `refactor:` Reestructuración de código sin cambiar funcionalidad (ej: `refactor: modulariza estilos css`)
