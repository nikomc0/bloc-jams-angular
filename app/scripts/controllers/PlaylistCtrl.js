(function () {
	function PlaylistCtrl(Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
	}
	
	angular
		.module ('blocJams')
		.controller ('PlaylistCtrl', ['Fixtures', 'SongPlayer', PlaylistCtrl]);
})();