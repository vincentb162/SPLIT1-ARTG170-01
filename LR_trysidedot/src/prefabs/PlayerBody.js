class PlayerBody extends Player {
    constructor(scene, x, y) {
        super(scene, x, y, 'player-body');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.play('frontjump');
        // Set Properties
        this.alive = true;
        this.walkAcceleration = 900;
        this.maxSpeed = 350;
        this.setMaxVelocity(this.maxSpeed);
        this.drag = 0.01;
        this.dashSpeed = 500;
        this.isAttack = false;
        this.attackDuration = 0;
        this.attackDuration_MAX = 25;
        this.setDamping(true);
        this.isteleport = false; 
    }

    update() {
        if (this.alive == false) {
            return;
        }

        // Controls Attack Logic
        if (this.isAttack == true && this.attackDuration > 0) {
            this.attackDuration -= 1;
        }

        if (this.attackDuration <= 0) {
            this.isAttack = false
            this.setMaxVelocity(this.maxSpeed);
        }

        // Controls Player Movement
        if (keyW.isDown) {
            this.play('backjump');
            this.setAccelerationY(-this.walkAcceleration);
        } else if (keyS.isDown) {
            this.play('frontjump');
            this.setAccelerationY(this.walkAcceleration);
        }

        if (keyA.isDown) {
            this.play('leftjump');
            this.setAccelerationX(-this.walkAcceleration);
        } else if (keyD.isDown) {
            this.play('rightjump');
            this.setAccelerationX(this.walkAcceleration);
        }

        if (!(keyA.isDown || keyS.isDown || keyW.isDown || keyD.isDown)){this.scene.robotEmitter.setAlpha(0);}
            

        if (keyW.isUp && keyS.isUp) {
            this.setAccelerationY(0);
            this.setDragY(this.drag);
        }

        if (keyA.isUp && keyD.isUp) {
            this.setAccelerationX(0);
            this.setDragX(this.drag);
        }

    }

    attack(px, py, hitbox) {
        if (this.isAttack != false) {
            return;
        }
        // Grabs the angle by calculating this dist to x, y
        this.dirX = 1;
        this.dx = px - this.x;
        if (this.dx < 0) {
            this.dirX = -1;
        }

        this.dirY = 1;
        this.dy =  - (py - this.y);
        if (this.dy > 0) {
            this.dirY = -1;
        }

        this.angle = Math.atan(this.dy/this.dx);

        this.isAttack = true;
        this.attackDuration = this.attackDuration_MAX;
        this.setMaxVelocity(this.dashSpeed);
        this.setVelocityX(this.dirX * this.dashSpeed * Math.cos(this.angle));
        this.setVelocityY((-1) * this.dirX * this.dashSpeed * Math.sin(this.angle));
    }
}