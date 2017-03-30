(function () {
	function timecode() {
		return function (seconds) {
			seconds = buzz.toTimer(seconds);
			return seconds;
		};
	}

	angular 
		.module ('blocJams')
		.filter ('timecode', timecode);
})();
