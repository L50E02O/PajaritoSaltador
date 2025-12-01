/**
 * Módulo de renderizado en Canvas
 */

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.assets = {};
    this.setupCanvas();
  }

  /**
   * Configura el canvas con el tamaño adecuado
   */
  setupCanvas() {
    // Tamaño base del juego
    const baseWidth = 400;
    const baseHeight = 600;

    // Ajustar a la pantalla manteniendo aspect ratio
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    let scale = Math.min(maxWidth / baseWidth, maxHeight / baseHeight, 1);
    scale = Math.max(scale, 0.5); // Mínimo 50% del tamaño original

    this.canvas.width = baseWidth;
    this.canvas.height = baseHeight;
    this.canvas.style.width = `${baseWidth * scale}px`;
    this.canvas.style.height = `${baseHeight * scale}px`;

    // Escalar contexto para mantener resolución
    this.ctx.scale(1, 1);
  }

  /**
   * Carga los assets del juego
   * @param {Object} assetPaths - Objeto con rutas de assets {bird, pipe, background}
   * @returns {Promise} - Promesa que resuelve cuando todos los assets están cargados
   */
  async loadAssets(assetPaths) {
    try {
      // Si no hay imágenes, usar formas geométricas
      this.assets.bird = await this.createBirdShape();
      this.assets.pipe = await this.createPipeShape();
      this.assets.background = null; // Fondo se dibuja con gradiente
    } catch (error) {
      console.error('Error cargando assets:', error);
      // Fallback a formas geométricas
      this.assets.bird = await this.createBirdShape();
      this.assets.pipe = await this.createPipeShape();
    }
  }

  /**
   * Crea una forma de pajarito (fallback si no hay imagen)
   * @returns {Promise<Image>} - Imagen del pajarito
   */
  async createBirdShape() {
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 30;
    const ctx = canvas.getContext('2d');

    // Cuerpo del pajarito (círculo)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(20, 15, 12, 0, Math.PI * 2);
    ctx.fill();

    // Ojo
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(25, 12, 3, 0, Math.PI * 2);
    ctx.fill();

    // Pico
    ctx.fillStyle = '#FF8C00';
    ctx.beginPath();
    ctx.moveTo(32, 15);
    ctx.lineTo(40, 12);
    ctx.lineTo(40, 18);
    ctx.closePath();
    ctx.fill();

    // Alas
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.ellipse(15, 20, 8, 5, -0.3, 0, Math.PI * 2);
    ctx.fill();

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = canvas.toDataURL();
    });
  }

  /**
   * Crea una forma de tubo (fallback si no hay imagen)
   * @returns {Promise<Image>} - Imagen del tubo
   */
  async createPipeShape() {
    const canvas = document.createElement('canvas');
    canvas.width = 60;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Tubo verde
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, 0, 60, 400);

    // Borde
    ctx.strokeStyle = '#006400';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 60, 400);

    // Detalles
    ctx.fillStyle = '#32CD32';
    ctx.fillRect(5, 5, 50, 20);
    ctx.fillRect(5, 375, 50, 20);

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = canvas.toDataURL();
    });
  }

  /**
   * Limpia el canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Dibuja el fondo
   */
  drawBackground() {
    // Gradiente de cielo
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.5, '#98D8E8');
    gradient.addColorStop(1, '#B0E0E6');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Nubes simples
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.drawCloud(80, 100);
    this.drawCloud(250, 150);
    this.drawCloud(150, 250);
  }

  /**
   * Dibuja una nube simple
   * @param {number} x - Posición X
   * @param {number} y - Posición Y
   */
  drawCloud(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 20, 0, Math.PI * 2);
    this.ctx.arc(x + 25, y, 25, 0, Math.PI * 2);
    this.ctx.arc(x + 50, y, 20, 0, Math.PI * 2);
    this.ctx.fill();
  }

  /**
   * Dibuja el pajarito
   * @param {Object} bird - Objeto pajarito {x, y, width, height, rotation}
   */
  drawBird(bird) {
    this.ctx.save();
    this.ctx.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);
    this.ctx.rotate(bird.rotation || 0);
    this.ctx.drawImage(
      this.assets.bird,
      -bird.width / 2,
      -bird.height / 2,
      bird.width,
      bird.height
    );
    this.ctx.restore();
  }

  /**
   * Dibuja un tubo
   * @param {Object} pipe - Objeto tubo {x, y, width, height}
   */
  drawPipe(pipe) {
    this.ctx.drawImage(
      this.assets.pipe,
      pipe.x,
      pipe.y,
      pipe.width,
      pipe.height
    );
  }

  /**
   * Dibuja todos los tubos
   * @param {Array} pipes - Array de objetos tubo
   */
  drawPipes(pipes) {
    pipes.forEach(pipe => {
      this.drawPipe(pipe);
    });
  }
}

export default Renderer;

