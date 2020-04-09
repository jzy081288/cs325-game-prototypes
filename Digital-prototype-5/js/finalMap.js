"use strict";

GameStates.makeFinalGame = function( game, shared ) {
    // Create your own variables.
    //var bouncy = null;
    var dude = null;
    var map = null;
    var house = null;
    
    // function quitGame() {

    //     //  Here you should destroy anything you no longer need.
    //     //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //     //  Then let's go back to the main menu.
    //     game.state.start('EndGame');

    // }
    
    return {
    
        create: function () {
            this.map = this.add.image(0, 0, 'house');
            this.dude = this.add.image(400, 300, 'dude');

            this.house = this.add.image(300, 350, 'home');

            game.imput.mouse.capture = true;
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Accelerate the 'logo' sprite towards the cursor,
            // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
            // in X or Y.
            // This function returns the rotation angle that makes it visually match its
            // new trajectory.
            //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
            
            if (house.input.activePointer.leftButton.isDown) {this.houseMap();}

        }

        houseMap: function () {
            this.map.kill();
            this.dude.kill();
            this.house.kill();
            this.state.start('EndGame');
        }
    };
};
