export default class Game extends Phaser.Scene {
    constructor() {
        super("gameScene");
    }

    preload() {
        // Aquí cargarías los assets (imágenes, sonidos, etc.)
    }

    create() {
        // Crear la pala que sigue al mouse
        this.paddle = this.add.rectangle(400, 550, 100, 20, 0x00ff00);
        this.physics.add.existing(this.paddle, true); // True para hacer la pala estática

        // Crear la pelota con una velocidad inicial
        this.ball = this.add.circle(400, 300, 10, 0xff0000);
        this.physics.add.existing(this.ball);
        this.ball.body.setBounce(1, 1);
        this.ball.body.setCollideWorldBounds(true);
        this.ball.body.setVelocity(200, 200); // Velocidad inicial de la pelota

        // Crear el obstáculo
        this.brick = this.add.rectangle(400, 200, 80, 30, 0x0000ff);
        this.physics.add.existing(this.brick, true);

        // Hacer que la pelota destruya el obstáculo al colisionar
        this.physics.add.collider(this.ball, this.brick, this.hitBrick, null, this);

        // Hacer que la pelota rebote en la pala
        this.physics.add.collider(this.ball, this.paddle);
    }

    update() {
        // Hacer que la pala siga el movimiento del mouse
        this.input.on('pointermove', (pointer) => {
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 50, 750); // Evitar que la pala salga del canvas
        });
    }

    hitBrick(ball, brick) {
        brick.destroy(); // Destruir el obstáculo al colisionars
    }
}