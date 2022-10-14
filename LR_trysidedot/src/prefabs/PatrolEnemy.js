class PatrolEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, textureKey);
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        //this.setVelocityX(velocity);   
        this.setImmovable();     
        this.setInteractive();
        // this.allowGravity = false;        
        
        //this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.alpha = 1;
        this.setFrame(4);
        this.textureKey = textureKey;
        this.direction = 0;
        
         //Enemy anime
         this.anims.create({
            key: 'enemyDown',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 0, end: 3, first: 0}),
            frameRate: 6,
            yoyo: false,
            repeat: -1
        });
        this.anims.create({
            key: 'enemyLeft',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 4, end: 7, first: 4}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
        this.anims.create({
            key: 'enemyRight',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 8, end: 11, first: 8}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
        this.anims.create({
            key: 'enemyUp',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 12, end: 15, first: 12}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
        this.anims.play('enemyDown')
        this.speed = 60
        this.body.setVelocity(0,this.speed)

        this.dir = Math.floor(Math.random() * 4)
        switch(this.dir){
            case 0:
                this.direction = 0;
                this.body.setVelocity(0,-this.speed) // Up
                this.anims.play('enemyUp')
                break
            case 1:
                this.direction = 1;
                this.body.setVelocity(-this.speed,0) //Left
                this.anims.play('enemyLeft')
                break
            case 2:
                this.direction = 2;
                this.body.setVelocity(0,this.speed) //Down
                this.anims.play('enemyDown')
                break
            case 3:
                this.direction = 3;
                this.body.setVelocity(this.speed,0) //Right
                this.anims.play('enemyRight')
                break
            default:
                break;
        }
    }
    create(){
        this.timedEvent = this.time.delayedCall(500,5, enemy.switchmotion(), this);
        this.on('pointerup', () => {
            //     console.log(game.input.mousePointer.x, game.input.mousePointer.y);
                // this.Phaser.Scene.add.sprite(this, game.input.mousePointer.x, game.input.mousePointer.y, 'brush')
             });
    }

    update(){
        // this.on('pointerup', () => {
        // //     console.log(game.input.mousePointer.x, game.input.mousePointer.y);
        //     // this.Phaser.Scene.add.sprite(this, game.input.mousePointer.x, game.input.mousePointer.y, 'brush')
        //    this.scene.addsticker();
        //  });

        if (this.x <= 400) {
            this.body.setVelocity(this.speed, 0) //Right
            this.anims.play('enemyRight')
            this.direction = 3;
        }
        if (this.x >= 800) {
            this.body.setVelocity(-this.speed, 0) //Left
            this.anims.play('enemyLeft')
            this.direction = 1;
        }
        if (this.y <= 400) {
            this.body.setVelocity(0, this.speed) //Down
            this.anims.play('enemyDown')
            this.direction = 2;
        }
        if (this.y >= 600) {
            this.body.setVelocity(0, -this.speed) // Up
            this.anims.play('enemyUp')
            this.direction = 0;
        }

        

        //     //console.log(possibleDirections);
        //     this.dir = Math.floor(Math.random() * 4)
        //     if (this.dir >= 4) {this.dir = 0;}
        //     switch(this.dir){
        //         case 0:
        //             this.body.setVelocity(0,-this.speed) // Up
        //             this.anims.play('enemyUp')
        //             break
        //         case 1:
        //             this.body.setVelocity(-this.speed,0) //Left
        //             this.anims.play('enemyLeft')
        //             break
        //         case 2:
        //             this.body.setVelocity(0,this.speed) //Down
        //             this.anims.play('enemyDown')
        //             break
        //         case 3:
        //             this.body.setVelocity(this.speed,0) //Right
        //             this.anims.play('enemyRight')
        //             break
        //         default:
        //             break;

        // }
    }

    switchmotion(){
        console.log("siwthc motion called")
    }
}
