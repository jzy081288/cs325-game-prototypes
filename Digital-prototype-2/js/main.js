
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('player', 'assets/guy.png', 16, 16); //https://opengameart.org/content/animated-character
    game.load.spritesheet('ghost', 'assets/ghost.png'); //https://opengameart.org/content/upwards-floating-soul

}

var sprite;
var player;
var ghost;
var timer = 0;
var timerText; 

function create() {

    //  player
    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    //  Timer
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    timerText = game.add.text(10, 10, 'Time: 0', { font: '34px Arial', fill: '#fff' });

}

function update() {

    //  only move when you click
    //if (game.input.mousePointer.isDown)
    //{
        //  400 is the speed it will move towards the mouse
    game.physics.arcade.moveToPointer(sprite, 400);

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(sprite.body, game.input.x, game.input.y))
        {
            sprite.body.velocity.setTo(0, 0);
        }
    // }
    // else
    // {
    //     sprite.body.velocity.setTo(0, 0);
    // }

}

function updateCounter() {

    counter++;

    timerText.setText('Time: ' + counter);

}
