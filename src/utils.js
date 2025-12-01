/**
 * Utilidades generales del juego
 */

/**
 * Carga una imagen de forma asíncrona
 * @param {string} src - Ruta de la imagen
 * @returns {Promise<Image>} - Promesa que resuelve con la imagen cargada
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Genera un número aleatorio entre min y max (inclusive)
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} - Número aleatorio
 */
export function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Obtiene el récord guardado en localStorage
 * @returns {number} - Puntuación récord
 */
export function getHighScore() {
  const score = localStorage.getItem('pajaritoHighScore');
  return score ? parseInt(score, 10) : 0;
}

/**
 * Guarda un nuevo récord en localStorage
 * @param {number} score - Nueva puntuación récord
 */
export function setHighScore(score) {
  localStorage.setItem('pajaritoHighScore', score.toString());
}

/**
 * Detecta si dos rectángulos se intersectan (colisión AABB)
 * @param {Object} rect1 - Primer rectángulo {x, y, width, height}
 * @param {Object} rect2 - Segundo rectángulo {x, y, width, height}
 * @returns {boolean} - true si hay colisión
 */
export function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

