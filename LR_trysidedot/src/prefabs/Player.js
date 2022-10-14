class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture = 'player-head') {
        super(scene, x, y, texture, 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set Properties
        this.alive = true;
        this.walkAcceleration = 600;
        this.maxSpeed = 300;
        this.setMaxVelocity(this.maxSpeed);
        this.drag = 0.25;
        this.dashSpeed = 700;
        this.isAttack = false;
        this.attackDuration = 0;
        this.attackDuration_MAX = 50;
        this.setBounce(0.5);
        this.setDamping(true);
        this.isupright = true;
        this.isteleport = false; //teleport state - animation depends on this property
    }

    setDeath() {
        this.alive = false;
    }
    

    update() {
        if (this.alive == false) {
            return;
        }

        if((-1.5 < this.rotation) && (this.rotation < 1.5)){ this.isupright = true;}
        else { this.isupright = false;}

        // Controls Attack Logic
        if (this.isAttack == true && this.attackDuration > 0) {
            this.attackDuration -= 1;
        }

        if (this.attackDuration <= 0) {
            this.isAttack = false
            this.setMaxVelocity(this.maxSpeed);
        }
        

        // Controls Player Movement ANIMATION
        if (keyW.isDown) {
            this.setAccelerationY(-this.walkAcceleration);
            //if/else chooses which animation to play based on if player is upside down or not
            if(this.isupright){ 
                if(!this.anims.isPaused){ //if start of game
                    this.play('rollup', true)
                 } else {
                    this.anims.resume();
                    if(this.anims.inReverse){this.anims.reverse()}
                }
            } else{ //PLAYER IS UPSIDEDOWN, W KEY IS DOWN
                if(!this.anims.isPaused){
                    this.playReverse('rollup', true) //if start of game
                } else { 
                this.anims.resume();
                if(!this.anims.inReverse){this.anims.reverse();}
                }
        }
    } else if (keyS.isDown) {
            this.setAccelerationY(this.walkAcceleration);
            if(this.isupright){
                if(!this.anims.isPaused){
                    this.playReverse('rollup', true)
                 } else {
                    this.anims.resume();
                    if(!this.anims.inReverse){this.anims.reverse();}
                 }
            } else { //PLAYER IS UPSIDEDOWN, S KEY IS DOWN
                if(!this.anims.isPaused){
                    this.play('rollup', true) //if start of game
                } else { 
                this.anims.resume();
                if(this.anims.inReverse){this.anims.reverse();}
                }
        }
        } else {
            //both uprolling and downrolling animation are stopped if key is W or S key is not being pressed down
            this.anims.pause();
            // console.log("currentframe :", this.anims.currentFrame);   
        }

        // SETS PLAYER ACCELERATION/VELOCITY
        if (keyA.isDown) {
            this.setAccelerationX(-this.walkAcceleration);
            this.setRotation(this.rotation - (5.5*(Math.PI/180)));
        } 
        else if (keyD.isDown) {
            if(this.x>970){this.scene.fromEmitter.setAlpha(1)} 
            //setAlpha to 1, after it is hidden at start (to hide initial explode method call on teleport emitter)
            this.setAccelerationX(this.walkAcceleration);
            this.setRotation(this.rotation + (5.5*(Math.PI/180)));
        }

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
        // this.sound.play('sound');
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

    collideWithEnemy(enemy) {
        let mx = enemy.x - this.x;
        if (mx < 0) {mx *= -1;}

        let my = enemy.y - this.y;
        if (my < 0) {my *= -1;}

        if (mx > my) {
            if (this.x < enemy.x) {
                this.setVelocityX(-1 * this.maxSpeed)
            } else {
                this.setVelocityX(this.maxSpeed)
            }
        } else {
            if (this.y < enemy.y) {
                this.setVelocityY(-1 * this.maxSpeed)
            } else {
                this.setVelocityY(this.maxSpeed)
            }
        }
    }
}