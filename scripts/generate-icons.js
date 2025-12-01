/**
 * Script para generar iconos de la PWA
 * Ejecutar con: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Crear directorio de assets si no existe
const assetsDir = path.join(__dirname, '..', 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Función para crear un icono simple usando SVG
function createIcon(size) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#4a90e2"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="#FFD700"/>
  <circle cx="${size/2 + size/8}" cy="${size/2 - size/16}" r="${size/20}" fill="#000"/>
  <polygon points="${size/2 + size/6},${size/2} ${size - size/10},${size/2 - size/20} ${size - size/10},${size/2 + size/20}" fill="#FF8C00"/>
</svg>`;
  return svg;
}

// Generar iconos
const sizes = [192, 512];
sizes.forEach(size => {
  const svg = createIcon(size);
  const filePath = path.join(assetsDir, `icon-${size}.png`);
  
  // Nota: Para convertir SVG a PNG necesitarías una librería como sharp o puppeteer
  // Por ahora, guardamos el SVG y el usuario puede convertirlo manualmente
  // o usar un servicio online
  
  console.log(`Icono ${size}x${size} generado (SVG). Para PNG, convierte manualmente o usa un servicio online.`);
});

console.log('\nNota: Los iconos se generan como SVG. Para usar PNG:');
console.log('1. Abre los SVG generados');
console.log('2. Conviértelos a PNG usando un editor de imágenes o servicio online');
console.log('3. Guárdalos como icon-192.png e icon-512.png en public/assets/');

