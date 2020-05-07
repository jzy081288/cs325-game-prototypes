"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    //var bouncy = null;
    var dude = null;
    var map = null;
    var chat = null;
    var up = null;
    var down = null;
    
    // function quitGame() {

    //     //  Here you should destroy anything you no longer need.
    //     //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //     //  Then let's go back to the main menu.
    //     game.state.start('EndGame');

    // }

    function finalMap() {
            this.map.kill();
            this.dude.kill();
            this.up.kill();
            this.down.kill();
            this.state.start('FinalMap');
    }
    
    return {
    
        create: function () {
            this.map = this.add.image(0, 0, 'start');
            this.dude = this.add.image(400, 300, 'dude');

            this.chat = this.add.image(0, 450, 'box');
            this.chat.visible = false;

            this.up = this.add.image(375, 0, 'up');
            this.down = this.add.image(574, 550, 'down');

            // up.inputEnabled = true;
            // down.inputEnabled = true;

            // down.events.onInputDown.add(finalMap, this);

            this.down.inputEnabled = true;
            this.down.events.onInputDown.add(finalMap, this);
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

        },

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
