var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main =
{
	vol: 50
};

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();

	alert('1 - javascript load');

	// set var
	var loadPlayer;

	function loadPlayer() {
		alert('2 - load player');
		if (document.querySelector('#player')) {
			alert('3 - check player DOM');
			// get API
			var tag = document.createElement('script'),
	        firstScriptTag = document.getElementsByTagName('script')[0];
			tag.src = 'https://www.youtube.com/iframe_api';
    		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	    	var videoList = [],
		        playCount = 0,
		        player;

	    	var video_ID = {
				'v_0': 'ASO_zypdnsQ',
    			'v_1': 'mTSuiGubCHE',
				'v_2': 'V8BTsiMxyaQ',
				'v_3': 'n-BXNXvTvV4',
				'v_4': 'CRJDQQXS4uE',
				'v_5': '7wvNwOPprBE',
				'v_6': 'IZkYdqRWKaY',
				'v_7': '9Y15es8OY0U',
				'v_8': 'DDs5bXh4erM',
				'v_9': 'LWV-f6dMN3Q'
    	    };

    	    // videoList array
    	    for(var key in video_ID) {
    	        var value = video_ID[key];
    	        videoList.push(value);
    	    }
    	    // channelList[0] = videoList;

    	    function playChannel() {
    	        // init player
    	    		alert('5 - init player');
    	        player = new YT.Player('player', {
    	        	width: '1280',
    	            height: '720',
    	            videoId: videoList[0],
    	            playerVars: {
	            		rel: 1,
    	                autoplay: 0,
    	                disablekb: 0,
    	                showsearch: 0,
    	                showinfo: 0,
    	                controls: 0,
    	                wmode: 'opaque',
    	                hd: 1,
    	                html5: 1,
    	                iv_load_policy: 3
    	            },
    	            events: {
    	                'onReady'            : onPlayerReady,
    	                'onStateChange'  : onPlayerStateChange
    	            }
    	        });

    	        // play video
    	        function onPlayerReady(event) {
    	            event.target.playVideo();
    	        }
    	        alert('player--' + player);
    	        Main.player = player;
    	    }

    	    // play list loop
    	    function onPlayerStateChange(event) {
    	        if (event.data === 0) {
    	            alert('Next');
    	            playCount++;
    	            if (playCount > (videoList.length -1)) {
    	                playCount = 0;
    	            }
    	            player.loadVideoById(videoList[playCount]);
    	            player.playVideo();
    	        }
    	    }

    	    function onYouTubeIframeAPIReady() {
	    		playChannel();
    	    }

    	    setTimeout(function() {
	    		onYouTubeIframeAPIReady();
	    		alert('4 - iframe api ready');
    	    }, 1200);
		}
	}

	loadPlayer();
};

Main.onUnload = function()
{

};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			break;
		case tvKey.KEY_UP:
			alert("UP");
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			break;
		default:
			alert("Unhandled key");
			break;
		case 71:
			alert('play');
			Main.player.playVideo();
			break;
		case 74:
			alert('pause');
			Main.player.pauseVideo();
			break;
		case 7:
			alert('vol up');
			alert(Main.vol);
			if (Main.player.isMuted()) {
                Main.player.unMute();
            }
            if (100 > Main.vol) {
				Main.player.setVolume(Main.vol++);
				document.querySelector('#vol').innerHTML = Main.vol;
            }
			break;
		case 11:
			alert('vol down');
			alert(Main.vol);
			if (Main.player.isMuted()) {
                Main.player.unMute();
            }
            if (Main.vol > 0) {
				Main.player.setVolume(Main.vol--);
				document.querySelector('#vol').innerHTML = Main.vol;
            }
			break;
		case 27:
			alert('mute');
			if (Main.player.isMuted()) {
                Main.player.unMute();
            } else {
				Main.player.mute();
            }
			break;
	}
};
