/**
 * Módulo de manejo de entrada (teclado, mouse, touch)
 */

class InputManager {
  constructor() {
    this.jumpRequested = false;
    this.enabled = false;
    this.setupEventListeners();
  }

  /**
   * Configura todos los event listeners para entrada
   */
  setupEventListeners() {
    // Teclado - funciona siempre
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          if (this.enabled) {
            this.jumpRequested = true;
          }
        }
      }
    });

    // Mouse - solo cuando está habilitado
    window.addEventListener('mousedown', (e) => {
      const target = e.target;
      // No procesar si es un botón o está en las pantallas
      if (target.tagName === 'BUTTON' || 
          target.id === 'startScreen' || 
          target.id === 'gameOverScreen' ||
          target.closest('#startScreen') ||
          target.closest('#gameOverScreen')) {
        return;
      }
      
      if (this.enabled) {
        e.preventDefault();
        this.jumpRequested = true;
      }
    });

    // Touch - solo cuando está habilitado
    window.addEventListener('touchstart', (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || 
          target.id === 'startScreen' || 
          target.id === 'gameOverScreen' ||
          target.closest('#startScreen') ||
          target.closest('#gameOverScreen')) {
        return;
      }
      
      if (this.enabled) {
        e.preventDefault();
        this.jumpRequested = true;
      }
    });

    // Evitar scroll en móviles
    window.addEventListener('touchmove', (e) => {
      if (this.enabled) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  /**
   * Habilita o deshabilita el input
   * @param {boolean} enabled - Si el input está habilitado
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) {
      this.jumpRequested = false;
    }
  }

  /**
   * Verifica si se solicitó un salto y lo consume
   * @returns {boolean}
   */
  consumeJump() {
    if (this.jumpRequested) {
      this.jumpRequested = false;
      return true;
    }
    return false;
  }

  /**
   * Resetea el estado de entrada
   */
  reset() {
    this.jumpRequested = false;
  }
}

export default InputManager;

