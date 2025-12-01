# Pajarito Saltador

Juego tipo Flappy Bird desarrollado como PWA (Progressive Web App) completamente funcional offline. El juego es instalable en dispositivos móviles y de escritorio, y funciona sin conexión a internet después de la primera carga.

## Características

- Juego completamente funcional tipo Flappy Bird
- PWA instalable (Android, iOS, Windows, macOS, Linux)
- Funciona offline después de la primera carga
- Compatible con escritorio, móvil y tablets
- Sistema de puntuación y récord guardado en localStorage
- Arquitectura modular y escalable
- Optimizado para rendimiento

## Estructura del Proyecto

```
PajaritoSaltador/
├── public/
│   ├── index.html          # Página principal
│   ├── manifest.json       # Configuración de la PWA
│   ├── sw.js              # Service Worker (offline)
│   └── assets/            # Recursos (imágenes, iconos)
├── src/
│   ├── game.js            # Lógica principal del juego
│   ├── input.js           # Manejo de entrada (teclado, mouse, touch)
│   ├── physics.js         # Física del juego
│   ├── renderer.js        # Renderizado en Canvas
│   └── utils.js           # Utilidades generales
├── package.json
└── README.md
```

## Requisitos Previos

- Node.js (versión 14 o superior) - Opcional, solo si usas Vite
- Cualquier servidor HTTP estático

## Despliegue

### Desplegar en Vercel (Recomendado - Sin configuración adicional)

**La forma más simple:** Conectar GitHub directamente con Vercel

1. Sube tu código a GitHub
2. Ve a [Vercel](https://vercel.com) e inicia sesión con GitHub
3. Haz clic en "Add New Project"
4. Selecciona tu repositorio
5. Vercel detectará automáticamente la configuración de Vite
6. Haz clic en "Deploy"

**¡Listo!** Cada vez que hagas push a `main` o `master`, Vercel desplegará automáticamente. **No necesitas configurar tokens ni secrets.**

### Opción alternativa: Desde la CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Para producción
vercel --prod
```

### GitHub Actions (Opcional)

El workflow de GitHub Actions (`.github/workflows/deploy.yml`) es **completamente opcional**. Solo úsalo si quieres controlar el deploy desde GitHub Actions en lugar de que Vercel lo haga automáticamente.

Si decides usarlo, necesitas configurar estos secrets en tu repositorio:

1. Ve a Settings → Secrets and variables → Actions
2. Agrega los siguientes secrets:
   - `VERCEL_TOKEN`: Tu token de Vercel (obtener en https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID`: ID de tu organización (encontrado en `.vercel/project.json` después del primer deploy)
   - `VERCEL_PROJECT_ID`: ID del proyecto (encontrado en `.vercel/project.json`)

**Nota:** Si no configuras estos secrets, el workflow simplemente verificará que el build funcione, pero no desplegará. Vercel seguirá desplegando automáticamente desde su propia integración.

## Instalación y Ejecución

### Opción 1: Usando Vite (Recomendado para desarrollo)

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

El juego se abrirá automáticamente en `http://localhost:5173` (no necesitas escribir `/index.html` en la URL).

### Opción 2: Usando http-server

```bash
# Instalar http-server globalmente (si no lo tienes)
npm install -g http-server

# Ejecutar servidor desde la raíz del proyecto
npx http-server . -p 8080 -c-1
```

El juego estará disponible en `http://localhost:8080` (el `index.html` en la raíz se sirve automáticamente).

### Opción 3: Usando cualquier servidor estático

Puedes usar cualquier servidor HTTP estático que sirva archivos desde la raíz del proyecto:
- Python: `python -m http.server 8000`
- PHP: `php -S localhost:8000`
- Live Server (extensión de VS Code)

**Importante**: El juego debe servirse a través de HTTP/HTTPS. No funcionará correctamente si abres `index.html` directamente desde el sistema de archivos debido a las restricciones de CORS y Service Workers.

## Instalación como PWA

### En Android (Chrome/Edge)

1. Abre el juego en el navegador
2. Aparecerá un banner de "Agregar a la pantalla de inicio" o ve al menú (⋮) → "Instalar app"
3. Confirma la instalación
4. El juego aparecerá como una app en tu dispositivo

### En iOS (Safari)

1. Abre el juego en Safari
2. Toca el botón de compartir (□↑)
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma el nombre y toca "Agregar"

### En Windows (Edge/Chrome)

1. Abre el juego en el navegador
2. Busca el icono de instalación en la barra de direcciones o ve al menú → "Instalar Pajarito Saltador"
3. Confirma la instalación
4. El juego se instalará como una app de Windows

### En macOS (Safari/Chrome)

1. Abre el juego en el navegador
2. En Safari: Archivo → "Agregar a Dock" o usa el menú de compartir
3. En Chrome: Busca el icono de instalación en la barra de direcciones

### En Linux (Chrome/Edge/Firefox)

1. Abre el juego en el navegador
2. Busca la opción de instalación en el menú del navegador
3. Confirma la instalación

## Cómo Jugar

- **Salto**: Toca la pantalla, haz clic con el mouse o presiona la barra espaciadora
- **Objetivo**: Vuela entre los tubos sin chocar
- **Puntuación**: Gana puntos al pasar cada par de tubos
- **Récord**: Tu mejor puntuación se guarda automáticamente

## Desarrollo

### Arquitectura

El juego está diseñado con una arquitectura modular:

- **game.js**: Coordina todos los sistemas, maneja el estado del juego y el bucle principal
- **input.js**: Gestiona todas las entradas (teclado, mouse, touch)
- **physics.js**: Implementa la física del juego (gravedad, colisiones, límites)
- **renderer.js**: Se encarga del renderizado en Canvas y carga de assets
- **utils.js**: Funciones auxiliares (colisiones, localStorage, utilidades)

### Agregar Nuevas Funcionalidades

El código está preparado para expandirse fácilmente:

- **Nuevos modos de juego**: Agregar estados adicionales en `game.js`
- **Skins**: Modificar `renderer.js` para cargar diferentes assets
- **Sonidos**: Agregar un módulo `audio.js` y cargar archivos de audio
- **Dificultad progresiva**: Ajustar `pipeSpeed` y `pipeGap` dinámicamente
- **Animaciones**: Extender `renderer.js` con sistema de animaciones

### Assets

El juego funciona sin imágenes externas (usa formas geométricas generadas), pero puedes agregar:

- `bird.png`: Imagen del pajarito
- `pipe.png`: Imagen de los tubos
- `icon-192.png` e `icon-512.png`: Iconos de la PWA (requeridos para instalación)

Coloca estos archivos en `public/assets/`

## Service Worker

El Service Worker (`sw.js`) implementa una estrategia **offline-first**:

- Cachea todos los assets en la primera carga
- Funciona completamente offline después de la instalación
- Actualiza automáticamente cuando hay nueva versión disponible

## Compatibilidad

- Chrome/Edge (Android, Windows, Linux, macOS)
- Safari (iOS, macOS)
- Firefox (con soporte limitado de PWA)
- Dispositivos móviles y tablets
- Escritorio

## Solución de Problemas

### El Service Worker no se registra

- Asegúrate de servir el juego a través de HTTP/HTTPS (no `file://`)
- Verifica que `sw.js` esté en la raíz de `public/`
- Revisa la consola del navegador para errores

### El juego no se instala como PWA

- Verifica que `manifest.json` esté correctamente configurado
- Asegúrate de tener los iconos `icon-192.png` e `icon-512.png`
- El sitio debe servirse a través de HTTPS (o localhost para desarrollo)

### Problemas de rendimiento

- El juego está optimizado, pero en dispositivos muy antiguos puede ser necesario reducir la frecuencia de generación de tubos en `game.js`

## CI/CD

El proyecto incluye workflows de GitHub Actions:

- **CI**: Verifica que el proyecto compile correctamente en cada push y pull request
- **Deploy**: Despliega automáticamente a Vercel cuando se hace push a `main` o `master`

Los workflows están configurados en `.github/workflows/`

## Licencia

MIT

## Contribuciones

Este proyecto está diseñado para ser fácilmente extensible. Siéntete libre de agregar nuevas funcionalidades siguiendo la arquitectura modular establecida.
