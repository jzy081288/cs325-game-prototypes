"use strict";

GameStates.makeEndGame = function( game, shared ) {

	// var playButton = null;
	var stateText = null;
	var background;

	function goToMenu(pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//game.music.stop();

		//	And start the actual game
		game.state.start('MainMenu');

	}

	return {

		create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
			background = game.add.sprite(0, 0, 'preloaderBackground');
		
			stateText = game.add.text(game.world.centerX,game.world.centerY,'You Win!\nClick to Start again', { font: '40px Arial', fill: '#fff' });
    		stateText.anchor.setTo(0.5, 0.5);
			game.input.onTap.addOnce(goToMenu, this);
			//playButton = game.add.button( 303, 400, 'playButton', startGame, this, 'over', 'out', 'down');

		},

		update: function () {

		//	Do some nice funky main menu effect here

		}


	};
};

