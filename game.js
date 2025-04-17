const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('cat', 'assets/cat_emoji.png');
    this.load.image('bigJelly', 'assets/big_jelly.png');
    this.load.audio('collectSound', 'assets/collect_sound.mp3');
    this.load.audio('jellyCollectSound', 'assets/jelly_collect_sound.mp3');
    this.load.audio('jumpSound', 'assets/jump_sound.mp3');
    this.load.audio('landingSound', 'assets/landing_sound.mp3');
    this.load.audio('damageSound', 'assets/damage_sound.mp3');
    this.load.audio('enemyDefeatSound', 'assets/enemy_defeat_sound.mp3');
    this.load.audio('memoryRevealSound', 'assets/memory_reveal_sound.mp3');
    this.load.audio('gameOverSound', 'assets/game_over_sound.mp3');
    this.load.audio('menuNavigationSound', 'assets/menu_navigation_sound.mp3');
}

function create() {
    this.add.image(400, 300, 'sky');
    this.cat = this.physics.add.sprite(100, 450, 'cat');
    this.cat.setBounce(0.2);
    this.cat.setCollideWorldBounds(true);

    this.bigJelly = this.physics.add.group({
        key: 'bigJelly',
        repeat: 1,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.bigJelly.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.cat, this.bigJelly, collectBigJelly, null, this);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'cat', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('cat', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (this.cursors.left.isDown) {
        this.cat.setVelocityX(-160);
        this.cat.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
        this.cat.setVelocityX(160);
        this.cat.anims.play('right', true);
    } else {
        this.cat.setVelocityX(0);
        this.cat.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.cat.body.touching.down) {
        this.cat.setVelocityY(-330);
        this.sound.play('jumpSound');
    }
}

function collectBigJelly(cat, bigJelly) {
    bigJelly.disableBody(true, true);
    this.sound.play('jellyCollectSound');
    revealMemory();
}

function revealMemory() {
    // Implement the timeline reveal logic here
    this.sound.play('memoryRevealSound');
}
