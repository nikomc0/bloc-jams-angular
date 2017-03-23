(function () {
	function SongPlayer () {
		var SongPlayer = {};
		var currentSong = null;
		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;
		
		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function (song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				currentSong.playing = null;
			}	
			
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			
			currentSong = song;
		};
		
		/**
		* @function playSong
		* @desc Plays song and sets the song to currently playing and true.
		* @param {Object} song
		*/
		var playSong = function (song) {
			currentBuzzObject.play();
			song.playing = true;
		};
		
		/**
		* @method SongPlayer.play
		* @desc Sets and plays a song or plays a different song based on whether or not song is or is not currently playing.
		* @param {Object} song
		*/
		SongPlayer.play = function (song) {
			if (currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};
		
		/**
		* @method SongPlayer.pause
		* @desc Pauses a currently playing song and sets it to not currently playing and false
		* @param {Object} song
		*/
		SongPlayer.pause = function (song) {
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		return SongPlayer;
	}
	
	angular
		.module ('blocJams')
		.factory ('SongPlayer', SongPlayer);
})();

