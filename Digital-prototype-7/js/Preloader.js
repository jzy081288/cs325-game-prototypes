"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('titlePage', 'assets/start.png');
            game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
            // game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
            //	+ lots of other required assets here
            game.load.image( 'logo', 'assets/phaser.png' );
            // game.load.image( 'startBackground', 'assets/start.png' );
            game.load.image( 'dude', 'assets/man.png' );
            game.load.image( 'home', 'assets/houseIcon.png' );

            game.load.image( 'up', 'assets/icons/arrow-up.png' );
            game.load.image( 'down', 'assets/icons/arrow-down.png' );
            game.load.image( 'left', 'assets/icons/arrow-left.png' );
            game.load.image( 'right', 'assets/icons/arrow-right.png' );

            game.load.image( 'start', 'assets/maps/start.jpg' );
            game.load.image( 'house', 'assets/maps/house.jpg' );
            // game.load.image( 'cross', 'assets/maps/cross.jpg' );
            // game.load.image( 'river', 'assets/maps/river.jpg' );

            game.load.image( 'box', 'assets/box.png');
            game.load.image( 'light', 'assets/FlashLight.png');
            game.load.image( 'cave', 'assets/cave.png');
            game.load.image( 'key', 'assets/key.png');
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            // if (game.cache.isSoundDecoded('titleMusic') && ready == false)
            // {
            //     ready = true;
            //     game.state.start('MainMenu');
            // }
            game.state.start('MainMenu');
    
        }
    
    };
};
