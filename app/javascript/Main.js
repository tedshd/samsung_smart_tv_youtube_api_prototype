var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main =
{
	vol: 50,
	playCount: 0,
	listCount: 1
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
		// alert('2 - load player');
		if (document.querySelector('#player')) {
			alert('3 - check player DOM');
			// get API
			// var tag = document.createElement('script'),
	  //       firstScriptTag = document.getElementsByTagName('script')[0];
			// tag.src = 'https://www.youtube.com/iframe_api';
   //  		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	    	var videoList = [],
		        // playCount = 0,
		        player;

	    	var video_ID = {
				'v_2': 'V8BTsiMxyaQ',
				'v_5': 'ASO_zypdnsQ',
				'v_0': '7wvNwOPprBE',
    			'v_1': 'mTSuiGubCHE',
				'v_3': 'n-BXNXvTvV4',
				'v_4': 'CRJDQQXS4uE',
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
    	    Main.videoList = videoList;
    	    document.querySelector('#play_list').innerHTML = Main.listCount;
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
    	                autoplay: 1,
    	                disablekb: 0,
    	                showsearch: 0,
    	                showinfo: 0,
    	                controls: 1,
    	                wmode: 'opaque',
    	                hd: 1,
    	                html5: 1,
    	                iv_load_policy: 3
    	            },
    	            events: {
    	                'onReady'        : onPlayerReady,
    	                'onStateChange'  : onPlayerStateChange
    	            }
    	        });

    	        // play video
    	        function onPlayerReady(event) {
    	        	alert('onPlayerReady');
    	            // event.target.playVideo();
    	            player.loadPlaylist(videoList);
                    player.setLoop(true);
                    // player.playVideo();
    	        }
    	        alert('player--' + player);
    	        Main.player = player;
    	    }

    	    // play list loop
    	    function onPlayerStateChange(event) {
	            // get state
	            try {
				    var volume = webapis.audiocontrol.getVolume();
				    console.log("Volume is " + volume);
			    	document.querySelector('#vol').innerHTML = volume;
				} catch (error) {
				    console.log(error.name);
				}
    	    	document.querySelector('#getPlayerState').innerHTML = player.getPlayerState();
                document.querySelector('#getVideoBytesLoaded').innerHTML = player.getVideoBytesLoaded();
                document.querySelector('#getPlaybackQuality').innerHTML = player.getPlaybackQuality();
                document.querySelector('#getDuration').innerHTML = player.getDuration();
                document.querySelector('#getPlaylist').innerHTML = player.getPlaylist();
    	        if (event.data === 0) {
    	            alert('Next');
    	            Main.playCount++;
    	            if (Main.playCount > (videoList.length -1)) {
    	                Main.playCount = 0;
    	            }
    	            player.loadVideoById(videoList[Main.playCount]);
    	            player.playVideo();
    	        }
    	    }

    	    function onYouTubeIframeAPIReady() {
	    		playChannel();
    	    }

    	    setTimeout(function() {
	    		onYouTubeIframeAPIReady();
	    		alert('4 - iframe api ready');
    	    }, 900);
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
			// Main.playCount--;
   //          if (Main.playCount < 0) {
   //              Main.playCount = Main.videoList.length -1;
   //          }
   //          Main.player.loadVideoById(videoList[Main.playCount]);
   //          Main.player.playVideo();
			Main.player.previousVideo();
			if (Main.listCount === 1) {
				Main.listCount = Main.videoList.length;
			} else {
				Main.listCount--;
				document.querySelector('#play_list').innerHTML = Main.listCount;
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			// Main.playCount++;
   //          if (Main.playCount > (Main.videoList.length -1)) {
   //              Main.playCount = 0;
   //          }
   //          Main.player.loadVideoById(videoList[Main.playCount]);
   //          Main.player.playVideo();
			Main.player.nextVideo();
			if (Main.listCount === Main.videoList.length) {
				Main.listCount = 1;
			} else {
				Main.listCount++;
				document.querySelector('#play_list').innerHTML = Main.listCount;
			}
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
			if (Main.player.getPlayerState() === 2) {
                Main.player.playVideo();
            }
            if (Main.player.getPlayerState() === 1) {
                Main.player.pauseVideo();
            }
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
			try {
			    if (webapis.audiocontrol.setVolumeUp()) {
			        console.log("Volume is up");
			    }
			} catch (error) {
			    console.log(error.name);
			}
			try {
			    var volume = webapis.audiocontrol.getVolume();
			    console.log("Volume is " + volume);
		    	document.querySelector('#vol').innerHTML = volume;
			} catch (error) {
			    console.log(error.name);
			}
			// if (Main.player.isMuted()) {
   //              Main.player.unMute();
   //          }
   //          if (100 > Main.vol) {
			// 	Main.player.setVolume(Main.vol++);
			// 	document.querySelector('#vol').innerHTML = Main.vol;
   //          }
			break;
		case 11:
			alert('vol down');
			alert(Main.vol);
			try {
			    if (webapis.audiocontrol.setVolumeDown()) {
			        console.log("Volume is down");
			    }
			} catch (error) {
			    console.log(error.name);
			}
			try {
			    var volume = webapis.audiocontrol.getVolume();
			    console.log("Volume is " + volume);
		    	document.querySelector('#vol').innerHTML = volume;
			} catch (error) {
			    console.log(error.name);
			}
			// if (Main.player.isMuted()) {
   //              Main.player.unMute();
   //          }
   //          if (Main.vol > 0) {
			// 	Main.player.setVolume(Main.vol--);
			// 	document.querySelector('#vol').innerHTML = Main.vol;
   //          }
			break;
		case 27:
			if (Main.player.isMuted()) {
				alert('unMute');
                Main.player.unMute();
            } else {
				alert('Mute');
				Main.player.mute();
            }
			break;
	}
};
//