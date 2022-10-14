class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload(){
        this.load.image('bg_placeholder', './assets/bg_placeholder.png');
        this.load.image('brush', './assets/brush.png');
        this.load.audio('bg', './assets/bg.mp3');
        this.load.audio('fizz', './assets/fizz.mp3');
        this.load.audio('softbell', './assets/softbell.mp3');
        this.load.audio('hit', './assets/hit.mp3');
        this.load.audio('bg_layer', './assets/bg_layer.mp3');
        this.load.audio('upgrade', './assets/upgrade.mp3');
        this.load.audio('pufferfish', './assets/sound/pufferfish.mp3');
        this.load.audio('upgrade', './assets/upgrade.mp3'); 
    }
    create() {
        const bg = this.add.image(640, 360, 'bg_placeholder').setScrollFactor(0).setScale(1);
        this.sound.play('pufferfish', {volume:0.4, loop: true});

           //create Enemy
        this.enemies = this.add.group({ runChildUpdate: true });
        this.stickers = this.add.group({ runChildUpdate: true });


        this.enemy = new PatrolEnemy(this, 600, 500, 'enemy1').setInteractive();
        this.enemy.setScale(1, 1);
        this.enemies.add(this.enemy);

        this.enemy.on('pointerdown', function (pointer) {
            this.scene.sound.play('fizz', {volume:0.1, loop: false});
            switch(this.scene.enemy.direction){
                case 0:
                    this.sticker = new UpSticker(this.scene, game.input.mousePointer.x, game.input.mousePointer.y, 'brush');
                    this.scene.stickers.add(this.sticker);
                    break
                case 1:
                    this.sticker = new LeftSticker(this.scene, game.input.mousePointer.x, game.input.mousePointer.y, 'brush');
                    this.scene.stickers.add(this.sticker);
                    break
                case 2:
                    this.sticker = new DownSticker(this.scene, game.input.mousePointer.x, game.input.mousePointer.y, 'brush');
                    this.scene.stickers.add(this.sticker);
                    break
                case 3:
                    this.sticker = new RightSticker(this.scene, game.input.mousePointer.x, game.input.mousePointer.y, 'brush');
                    this.scene.stickers.add(this.sticker);
                    break
                default:
                    break;
            }
        });

        this.add.text(136, 8, '<- draw in here or click on the character to place stickers on it');
        this.catdraw = this.add.renderTexture(0, 0, 128, 128).setInteractive().setDepth(1000);
        //moves drawing to the rgith
        // this.catdraw.displayOriginX = 100;
        //moved drawing to the left

        this.catdraw.cursor = true;



        //not needed but makes rectangle to see area easier
        this.catgraphics = this.add.graphics().fillStyle(0x000000, 0).lineStyle(5, 0xffffff, 1).fillRect(0, 0, 128, 128).strokeRect(0, 0, 128, 128).setDepth(1000);
        var hsv = Phaser.Display.Color.HSVColorWheel();
        var i = 0;


        this.catdraw.on('pointerdown', function (pointer) {

            this.draw('brush', pointer.x - 8, pointer.y - 8, 1, hsv[i].color);
    
        });
        // this.catdraw.originX = 100;

        // enables drag drawing
        this.catdraw.on('pointermove', function (pointer) {

            if (pointer.isDown)
            {
                this.draw('brush', pointer.x - 8, pointer.y - 8, 1, '#bada55');
    
                i = Phaser.Math.Wrap(i + 1, 0, 360);
            }
    
        });

        var tt = this.catdraw.saveTexture('doodle');
        var hsv = Phaser.Display.Color.HSVColorWheel();

        var blocks = this.add.group({ key: 'doodle', repeat: 35, setScale: { x: 1, y: 0.1 } });
        // this.catdraw.setPosition(100,100);
    
        Phaser.Actions.GridAlign(blocks.getChildren(), {
            width: 7,
            height: 5,
            cellWidth: 128,
            cellHeight: 128,
            x: 128,
            y: 128,
            z:0
        });
    
        var i = 0;
    
        blocks.children.iterate(function (child) {
    
            this.tweens.add({
                targets: child,
                alpha: 0,
                ease: 'Sine.easeInOut',
                duration: 2500,
                delay: 0,
                repeat: -1,
                yoyo: true
            });

            this.tweens.add({
                targets: child,
                scaleX: 1,
                scaleY: 1,
                ease: 'Sine.easeInOut',
                duration: 400,
                delay: i * 50,
                repeat: -1,
                yoyo: true
            });
    
            i++;
    
            if (i % 14 === 0)
            {
                i = 0;
            }
    
        }, this);
        
        //insert animations
        // Define Keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Enables Pointer
        gamePointer = this.input.activePointer;

        // Adds Pointer Down Event for Player Attacks
        // this.input.on('pointerdown', () => {
        //     this.player.attack(gamePointer.worldX, gamePointer.worldY, this.playerAttacks);
        // }, this);

        // this.physics.add.overlap(this.enemy, this.water, () => {
        //     // this.boss.alive = false;
        //     console.log("newenemy overlapped water (its the title")
        // }, null, this);

        // // Implements collisions between player attacks and enemies
        // this.physics.add.overlap(this.playerAttacks, this.enemies, attackHit, null, this);
        // function attackHit (attack, enemy) {
        //     enemy.destroy();
        // }

        // camera
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 5000, 5000);
    }
    
    
    update() {

        // this.catdraw.camera.x+=1;
    }
}