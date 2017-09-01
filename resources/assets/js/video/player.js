var dom = require('../dom');
var map = require('../array/map');
var extend = require('../object/extend');
var getYouTubeId = require('./getYouTubeId');
var youTubeReady = require('./youTubeReady');
// var analytics = require('../analytics');

// TODO: Create a reusable Video class from this
module.exports = (function(window, document, undefined) {

  var readyClass = 'is-ready';
  var activeClass = 'is-active';

  // Quality Pt. 1
  var VIDEO_QUALITY_OPTIONS = {
    quality: 'hd720',
    breakpoint: 768
  };

  /**
   * Force specific quality playback for YouTube videos.
   * @see http://stackoverflow.com/a/10757854/1786459
   * @param  {Element}  video
   * @param  {Object}   options  { quality: 'hd720', minWidth: 768 }
   * @return {Boolean}
   */
  function setQuality(video, options) {
    if (!video || typeof video.setPlaybackQuality !== 'function') {
      return false;
    }

    options = extend({
      quality: 'hd720',
      breakpoint: 768
    }, options);

    // Force high quality videos at breakpoint (assuming larger screens have better performance)
    if (dom.window.width() >= options.breakpoint) {
      video.setPlaybackQuality(options.quality);
    }

    return true;
  }

  /**
   * Load YouTube video player.
   * @param  {Element}  videoElement
   * @return {VideoPlayer}
   */
  function initVideoPlayer(videoElement) {
    var YT = window.YT;
    var videoOptions, videoId, playerOptions, videoPlayer;
    var videoContainer = dom.closest(videoElement, '.js-video-wrapper');

    // Wait for YouTube
    if (typeof YT === 'undefined') {
      console.log('Error: YouTube API failed to load.');
      return false;
    }

    // Require video ID
    if (!videoElement.id) {
      console.log('Error: No ID defined for video element', videoElement);
      return false;
    }

    // Get options
    videoOptions = extend({
      url: false,
      gaEventCategory: false
    }, JSON.parse(videoElement.getAttribute('data-video') || '{}'));

    // Require video URL
    if (!videoOptions.url) {
      console.log('Error: No video URL defined for video', videoElement);
      return false;
    }

    videoId = getYouTubeId(videoOptions.url);

    // Init player options
    playerOptions = {
      videoId: videoId,
      playerVars: {
        autohide: 1,       // Disable autohide when video ends
        autoplay: 0,       // Disable autoplay
        controls: 1,       // Show controls
        enablejsapi: 1,    // Enable JS
        // fs: 0,             // Disable default fullscreen button
        // iv_load_policy: 3, // Disable annotations
        modestbranding: 1,
        rel: 0,            // Hide related videos
        showinfo: 0,       // Hide video info
      },
      events: {}
    };

    // Allow custom dimensions
    if (videoOptions.width) { playerOptions.width = videoOptions.width; }
    if (videoOptions.height) { playerOptions.height = videoOptions.height; }

    /**
     * Ready event.
     * @param  {event}  event
     * @return {void}
     */
    playerOptions.events.onReady = function(event) {
      // Quality Pt. 2
      setQuality(event.target, VIDEO_QUALITY_OPTIONS);

      // Allow custom play buttons
      var playButtons = document.querySelectorAll('.js-video-open[data-video="#' + videoElement.id + '"]');
      map(playButtons, (button) => button.addEventListener('click', (e) => {
        if (videoPlayer) { videoPlayer.playVideo(); }
      }));

      // Add hover state to player buttons
      videoContainer.addEventListener('mouseover', () => {
        map(playButtons, (button) => button.classList.add(activeClass));
      });
      videoContainer.addEventListener('mouseout', () => {
        map(playButtons, (button) => button.classList.remove(activeClass));
      });

      // Pause and close video when user clicks outside
      window.addEventListener('click', (e) => {
        if (videoPlayer) {
          videoPlayer.pauseVideo();
          videoContainer.classList.remove(activeClass);
        }
      });

      videoContainer.classList.add(readyClass);
      map(playButtons, (button) => button.classList.add(readyClass));
    };

    /**
     * State events.
     * @param  {event}  event
     * @return {void}
     */
    playerOptions.events.onStateChange = function(event) {
      // Quality Pt. 3
      if (event.data === YT.PlayerState.BUFFERING) {
        setQuality(event.target, VIDEO_QUALITY_OPTIONS);
      }

      // CSS
      if (event.data === YT.PlayerState.BUFFERING ||
          event.data === YT.PlayerState.PLAYING) {
        videoContainer.classList.add(activeClass);
      }
      if (event.data === YT.PlayerState.ENDED) {
        videoContainer.classList.remove(activeClass);
      }

      // TODO: Analytics
      // if (videoOptions.gaEventCategory) {
      //   if (event.data === YT.PlayerState.PLAYING) {
      //     analytics.trackEvent.create({
      //       'eventCategory': videoOptions.gaEventCategory,
      //       'eventAction': 'Start Video',
      //       'eventLabel': 'https://www.youtube.com/watch?v=' + videoId
      //     });
      //   }
      //   if (event.data === YT.PlayerState.PAUSED) {
      //     analytics.trackEvent.create({
      //       'eventCategory': videoOptions.gaEventCategory,
      //       'eventAction': 'Stop Video',
      //       'eventLabel': 'https://www.youtube.com/watch?v=' + videoId
      //     });
      //   }
      //   if (event.data === YT.PlayerState.ENDED) {
      //     analytics.trackEvent.create({
      //       'eventCategory': videoOptions.gaEventCategory,
      //       'eventAction': 'Finish Video',
      //       'eventLabel': 'https://www.youtube.com/watch?v=' + videoId
      //     });
      //   }
      // }
    };

    videoPlayer = new YT.Player(videoElement, playerOptions);

    return videoPlayer;
  }



  // ------------------------------
  // Public
  // ------------------------------

  // Create array of unique video players based on play button hashes
  // var _hash;
  //
  // for (var i = 0; i < openButtons.length; i++) {
  //   _hash = openButtons[i].hash;
  //
  //   // If hash is null or element doesn't exist, continue
  //   if (!_hash || !document.querySelector(_hash)) {
  //     continue;
  //   }
  //
  //   // If player doesn't already exist, create a new one
  //   if (!videoPlayers.hasOwnProperty(_hash)) {
  //     videoPlayers[_hash] = new VideoPlayer(_hash);
  //   }
  //
  //   // Group buttons by hash
  //   openButtonsByHash[_hash] = openButtonsByHash[_hash] || []; // Create array if none exists
  //   openButtonsByHash[_hash].push(openButtons[i]);
  //
  //   // Add open event to all buttons for videos in array
  //   openButtons[i].addEventListener('click', videoPlayers[_hash].openClickListener);
  // }



  // ------------------------------
  // Public
  // ------------------------------

  return {
    init: () => youTubeReady(() => map(document.querySelectorAll('.js-video'), initVideoPlayer)),
    // create: () => new VideoPlayer()
  };

})(window, document);
