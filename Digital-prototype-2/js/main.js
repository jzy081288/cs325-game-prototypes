
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('player', 'assets/guy.png', 16, 16); //https://opengameart.org/content/animated-character
    game.load.spritesheet('ghost', 'assets/ghost.png', 32, 32); //https://opengameart.org/content/upwards-floating-soul
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);

}

var sprite;
var player;
var ghost;
var timer = 0;
var timerText; 
var lives;

function create() {

    //  player
    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    //  ghost
    ghost = game.add.group();
    ghost.enableBody = true;
    ghost.physicsBodyType = Phaser.Physics.ARCADE;

    createGhost();

    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    for (var i = 0; i < 3; i++) 
    {
        var player = lives.create(game.world.width - 100 + (30 * i), 60, 'player');
        player.anchor.setTo(0.5, 0.5);
        player.angle = 90;
        player.alpha = 0.4;
    }

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

    //  Timer
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    timerText = game.add.text(10, 10, 'Time: 0', { font: '34px Arial', fill: '#fff' });

    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

}

function createGhost () {

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var ghost = ghost.create(x * 48, y * 50, 'ghost');
            ghost.anchor.setTo(0.5, 0.5);
            ghost.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            ghost.play('fly');
            ghost.body.moves = false;
        }
    }

    ghost.x = 100;
    ghost.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(ghost).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);
}

function setupPlayer (player) {

    player.anchor.x = 0.5;
    player.anchor.y = 0.5;
    player.animations.add('kaboom');

}

function descend() {

    ghost.y += 10;

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

    //  Run collision
    game.physics.arcade.overlap(ghost, player, collisionHandler, null, this);

}

function updateCounter() {

    timer++;

    timerText.setText('Time: ' + timer);

}

function collisionHandler(ghost, player) {

    //  When ghost hits plyer, player die
    player.kill();

    live = lives.getFirstGhost();

    if(live) {
        live.kill();
    }

    var explosion = explosions.getFirstExists(false);
    explosion.reset(palyer.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    if(lives.countLiving() < 1) {
        player.kill();

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }
}

function restart () {

    //  A new level starts
    
    //resets the life count
    lives.callAll('revive');
    //  And brings the ghost back from the dead :)
    ghost.removeAll();
    createGhost();

    //revives the player
    player.revive();
    //hides the text
    stateText.visible = false;

}
