(function () {
	function SongPlayer (Fixtures) {
		var SongPlayer = {};
		
		/**
		* @desc Album information
		* @type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();
		
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
				SongPlayer.currentSong.playing = null;
			}	
			
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			
			SongPlayer.currentSong = song;
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
		* @function getSongIndex
		* @desc Finds the index of a song from the provided album data.
		* @param {Object} song
		*/
		var getSongIndex = function (song) {
			return currentAlbum.songs.indexOf(song);
		};
		
		/**
		* @method SongPlayer.currentSong
		* @desc Active song object from list of songs
		* @type {Object}
		*/
		SongPlayer.currentSong = null;
		
		/**
		* @method SongPlayer.play
		* @desc Sets and plays a song or plays a different song based on whether or not song is or is not currently playing.
		* @param {Object} song
		*/
		SongPlayer.play = function (song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
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
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		/**
		* @method SongPlayer.previous
		* @desc Sets and plays the song directly before the current song using the songs index.
		* @param {Object} song
		*/
		SongPlayer.previous = function () {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if (currentSongIndex < 0) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		
		return SongPlayer;
	}
	
	angular
		.module ('blocJams')
		.factory ('SongPlayer',  ['Fixtures', SongPlayer]);
})();

