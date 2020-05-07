"use strict";

GameStates.makeLast = function( game, shared ) {
    // Create your own variables.
    //var bouncy = null;
    var dude = null;
    var map = null;
    var house = null;
    //var light = null;
    //var chat = null;
    var up = null;
    //var collect = 0;
    var notice;
    
    // function quitGame() {

    //     //  Here you should destroy anything you no longer need.
    //     //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //     //  Then let's go back to the main menu.
    //     game.state.start('EndGame');

    // }

    function houseMap() {
        this.chat.visible = true;
        this.notice = game.add.text(250, 485, 'The house is unlocked!\nWelcome back!', { font: '20px Arial', fill: '#fff' });
        this.chat.events.onInputDown.add(textOff, this);
    }

    // function collectLight() {
    //     this.chat.visible = true;
    //     this.notice = game.add.text(250, 485, 'Find the flashlight!\n Back to the cave!', { font: '20px Arial', fill: '#fff' });
    //     this.chat.events.onInputDown.add(textOff, this);
    //     this.light.visible = false;
    //     this.collect = 1;
    // }

    function lightCave() {
        this.map.kill();
        this.dude.kill();
        this.house.kill();
        this.up.kill();
        this.state.start('LightStart');
    }

    function textOff() {
        this.chat.visible = false;
        this.notice.visible = false;
        this.map.kill();
        this.dude.kill();
        this.house.kill();
        this.up.kill();
        this.state.start('EndGame');
    }
    
    return {
    
        create: function () {
            this.map = this.add.image(game.world.centerX, game.world.centerY, 'house');
            this.map.anchor.set(0.5);
            this.dude = this.add.image(400, 0, 'dude');
            this.dude.scale.setTo(2);

            this.house = this.add.image(300, 350, 'home');
            this.house.scale.setTo(2);

            //this.light = this.add.image(600, 300, 'light');

            this.chat = this.add.image(0, 450, 'box');
            this.chat.inputEnabled = true;
            this.chat.visible = false;

            // this.light.inputEnabled = true;
            // this.light.events.onInputDown.add(collectLight, this);

            this.house.inputEnabled = true;
            this.house.events.onInputDown.add(houseMap, this);

            this.up = this.add.image(375, 0, 'up');
            this.up.inputEnabled = true;
            this.up.events.onInputDown.add(lightCave, this);
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Accelerate the 'logo' sprite towards the cursor,
            // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
            // in X or Y.
            // This function returns the rotation angle that makes it visually match its
            // new trajectory.
            //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
            
            //if (house.input.activePointer.leftButton.isDown) {this.houseMap();}

        }

        // houseMap: function () {
        //     this.map.kill();
        //     this.dude.kill();
        //     this.house.kill();
        //     this.state.start('EndGame');
        // }
    };
};
