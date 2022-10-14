// Sticker prefab
class UpSticker extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);  
    }

    update() {
        switch(this.scene.enemy.direction){
            case 0:
                this.alpha = 1;
                this.y-=1;
                break
            case 1:
                this.alpha = 0;
                this.x-=1
                break
            case 2:
                this.alpha = 0;
                this.y+=1
                break
            case 3:
                this.alpha = 0;
                this.x+=1
                break
            default:
                break;
        }
    }
}