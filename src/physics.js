/**
 * Módulo de física del juego
 */

/**
 * Aplica gravedad a un objeto
 * @param {Object} object - Objeto con propiedades {y, velocity}
 * @param {number} gravity - Fuerza de gravedad
 * @param {number} deltaTime - Tiempo transcurrido desde el último frame
 */
export function applyGravity(object, gravity, deltaTime) {
  object.velocity += gravity * deltaTime;
  object.y += object.velocity * deltaTime;
}

/**
 * Aplica un impulso hacia arriba (salto)
 * @param {Object} object - Objeto con propiedad velocity
 * @param {number} jumpForce - Fuerza del salto
 */
export function applyJump(object, jumpForce) {
  object.velocity = -jumpForce;
}

/**
 * Limita la velocidad vertical de un objeto
 * @param {Object} object - Objeto con propiedad velocity
 * @param {number} maxVelocity - Velocidad máxima permitida
 */
export function clampVelocity(object, maxVelocity) {
  if (object.velocity > maxVelocity) {
    object.velocity = maxVelocity;
  }
}

/**
 * Mantiene un objeto dentro de los límites verticales
 * @param {Object} object - Objeto con propiedades {y, height}
 * @param {number} minY - Límite superior
 * @param {number} maxY - Límite inferior
 * @returns {boolean} - true si el objeto está fuera de los límites
 */
export function checkBounds(object, minY, maxY) {
  if (object.y < minY) {
    object.y = minY;
    return true;
  }
  if (object.y + object.height > maxY) {
    object.y = maxY - object.height;
    return true;
  }
  return false;
}

