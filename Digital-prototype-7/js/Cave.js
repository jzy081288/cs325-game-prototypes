"use strict";

GameStates.makeCave = function( game, shared ) {
    // Create your own variables.
    //var bouncy = null;
    var dude = null;
    var map = null;
    var chat = null;
    //var up = null;
    var down = null;
    var notice;
    
    // function quitGame() {

    //     //  Here you should destroy anything you no longer need.
    //     //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //     //  Then let's go back to the main menu.
    //     game.state.start('EndGame');

    // }

    function finalMap() {
        this.map.kill();
        this.dude.kill();
        //this.up.kill();
        this.down.kill();
        this.state.start('KeyStart');
    }

    function text() {
        this.key.visible = false;
        this.chat.visible = true;
        this.notice = game.add.text(250, 485, 'Find the key!\n Back to the house!', { font: '20px Arial', fill: '#fff' });
        //this.notice.text = "The cave is too dark! Need a flashlight!"
        this.chat.events.onInputDown.add(textOff, this);
    }

    function textOff() {
        this.chat.visible = false;
        this.notice.visible = false;
    }
    
    return {
    
        create: function () {
            this.map = this.add.image(game.world.centerX, game.world.centerY, 'cave');
            this.map.anchor.set(0.5);
            this.dude = this.add.image(400, 300, 'dude');
            this.dude.scale.setTo(2);

            this.chat = this.add.image(0, 450, 'box');
            this.chat.inputEnabled = true;
            this.chat.visible = false;

            this.key = this.add.image(350, 250, 'key');
            this.key.inputEnabled = true;
            this.key.events.onInputDown.add(text, this);

            //this.up = this.add.image(375, 0, 'up');
            this.down = this.add.image(574, 550, 'down');

            // up.inputEnabled = true;
            // down.inputEnabled = true;

            // down.events.onInputDown.add(finalMap, this);

            this.down.inputEnabled = true;
            this.down.events.onInputDown.add(finalMap, this);

            // this.up.inputEnabled = true;
            // this.up.events.onInputDown.add(text, this);
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Accelerate the 'logo' sprite towards the cursor,
            // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
            // in X or Y.
            // This function returns the rotation angle that makes it visually match its
            // new trajectory.
            //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
            
            // game.input.onTap.addOnce(quitGame, this);

        }

        // houseMap: function () {
        //     this.map.kill();
        //     this.dude.kill();
        //     this.up.kill();
        //     this.down.kill();
        //     this.state.start('EndGame');
        // }

        // finalMap: function() {
        //     this.map.kill();
        //     this.dude.kill();
        //     this.up.kill();
        //     this.down.kill();
        //     this.state.start('FinalMap');
        // }
    };
};
