(function($) {
  'use strict';
  var query = '(-webkit-min-device-pixel-ratio: 1.5),\
  (min--moz-device-pixel-ratio: 1.5),\
  (-o-min-device-pixel-ratio: 3/2),\
  (min-device-pixel-ratio: 1.5),\
  (min-resolution: 144dpi),\
  (min-resolution: 1.5dppx)';

  $('.modal').each(function() {
    var imgUrl;
    var video = $(this).attr('href');
    var videoText = $(this).text();
    var videoID;

    if(video.indexOf('youtube') > -1){
      videoID = video.replace('https://www.youtube.com/embed/', '');
      videoID = videoID.split('?')[0];
      $.ajax({
        type: 'GET',
        url: 'http://gdata.youtube.com/feeds/api/videos/'+ videoID +'?v=2&alt=json',
        cache: false,
        dataType:'jsonp',
        success: function(result){
          // If retina screen use larger image
          if (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches)) {
            imgUrl = result.entry.media$group.media$thumbnail[1].url;
          } else {
            imgUrl = result.entry.media$group.media$thumbnail[0].url;
          }
          $('.modal[href="' + video +'"]').html('<img src=\''+ imgUrl +'\' alt=\''+ videoText +' Thumbnail\' height=\'120\' /><span class="title">'+videoText+'</span>');

        }
      });
    }else{
      videoID = video.split('vimeo.com/')[1];
      $.ajax({
        type: 'GET',
        url: 'http://www.vimeo.com/api/v2/video/'+ videoID +'.json?callback=?request',
        cache: false,
        dataType:'jsonp',
        success: function(result){
          if (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches)) {
            imgUrl = result[0].thumbnail_large;
          } else {
            imgUrl = result[0].thumbnail_medium;
          }
          $('.modal[href="' + video +'"]').html('<img src=\''+ imgUrl +'\' alt=\''+ videoText +' Thumbnail\' height=\'120\' /><span class="title">'+videoText+'</span>');
        }
      });
    }

  });

}(jQuery));