(function($) {
  'use strict';

  // replace video links for youtube to use embed
  $('.modal').each(function(){
    var videoUrl = $(this).attr('href');
    if(videoUrl.indexOf('youtube.com') !== -1){
      videoUrl = videoUrl.replace('watch?v=', 'embed/');
      $(this).attr('href', videoUrl);
    }
  });
    
}(jQuery));