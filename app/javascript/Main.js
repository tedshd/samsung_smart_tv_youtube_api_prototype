var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main =
{
	playCount: 0,
	listCount: 1
};
var skipContinue;

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();

	alert('1 - javascript load');

	// set var
	var loadPlayer,
		currentTime;

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
		        player,
		        playLoop,
		        switchVideo;

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
						autohide: 0,
						modestbranding: 0,
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
    	            // player.loadPlaylist(videoList);
                    // player.setLoop(true);
                    // player.playVideo();
    	        }
    	        Main.player = player;
    	    }

    	    // play list loop
    	    function playLoop() {
    	    	setTimeout(
					function() {
						if (player.getDuration() === 0) {
							playLoop();
						}
					},
					1000
				);
	            Main.playCount++;
	            if (Main.playCount > (videoList.length -1)) {
	                Main.playCount = 0;
	            }
	            player.loadVideoById(videoList[Main.playCount]);
	            player.playVideo();
    	    }

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
				document.querySelector('#width').innerHTML = document.querySelector('#player').getAttribute('width');
                document.querySelector('#height').innerHTML = document.querySelector('#player').getAttribute('height');
                document.querySelector('#getPlaybackQuality').innerHTML = player.getPlaybackQuality();
                document.querySelector('#getDuration').innerHTML = player.getDuration();
                document.querySelector('#getPlaylist').innerHTML = player.getPlaylist();
                document.querySelector('#getCurrentTime').innerHTML = player.getCurrentTime();

                clearInterval(currentTime);
    	        if (event.data === 0) {
    	            // alert('Next');
    	            playLoop();

    	        }

    	        if (event.data === 1) {
                    currentTime = setInterval(
                        function () {
                            document.querySelector('#getCurrentTime').innerHTML = player.getCurrentTime();
                        },
                        900
                    );
                }
    	        // if (event.data === -1) {
    	        // 	alert('ERROR');
    	        // 	player.nextVideo();
    	        // }
    	    }

    	    function onYouTubeIframeAPIReady() {
	    		playChannel();
    	    }

    	    setTimeout(function() {
	    		onYouTubeIframeAPIReady();
	    		alert('4 - iframe api ready');
    	    }, 900);

    	    function switchVideo(switching) {
                clearTimeout(skipContinue);
                switch(switching) {
                    case 0:
                    Main.playCount--;
                    if (Main.playCount < 0) {
                        Main.playCount = Main.videoList.length -1;
                    }
                    break;
                    case 1:
                    Main.playCount++;
                    if (Main.playCount > (Main.videoList.length -1)) {
                        Main.playCount = 0;
                    }
                    break;
                }
                skipContinue = setTimeout(
                    function () {
                        player.loadVideoById(Main.videoList[Main.playCount]);
                        player.playVideo();
                    },
                    900
                );
            }
            Main.switchVideo = switchVideo;
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
			Main.switchVideo(0);
			// Main.playCount--;
   //          if (Main.playCount < 0) {
   //              Main.playCount = Main.videoList.length -1;
   //          }
   //          Main.player.loadVideoById(Main.videoList[Main.playCount]);
   //          Main.player.playVideo();
			// Main.player.previousVideo();
			if (Main.listCount === 1) {
				Main.listCount = Main.videoList.length;
			} else {
				Main.listCount--;
				document.querySelector('#play_list').innerHTML = Main.listCount;
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			Main.switchVideo(1);
			// Main.playCount++;
   //          if (Main.playCount > (Main.videoList.length -1)) {
   //              Main.playCount = 0;
   //          }
   //          Main.player.loadVideoById(Main.videoList[Main.playCount]);
   //          Main.player.playVideo();
			// Main.player.nextVideo();
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
                document.querySelector('#status').innerHTML = 'Play';
            }
            if (Main.player.getPlayerState() === 1) {
                Main.player.pauseVideo();
                document.querySelector('#status').innerHTML = 'Pause';
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
			if (Main.player.isMuted()) {
                Main.player.unMute();
            }
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
			break;
		case 11:
			alert('vol down');
			if (Main.player.isMuted()) {
                Main.player.unMute();
            }
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