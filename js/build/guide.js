(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
(function($) {
    'use strict';
        //load modal mask
        $('<div id="mask"></div>').appendTo('body');

        //modal windows
        $('body').on('click', '.modal', function(e) {
            //remove existing modal window
            $('#modal-window').remove();

            var content;

            //Checks if href points to media or a div that is defined in the DOM
            if ($(this).attr('href').match('^#')) {
                var contentID = $(this).attr('href');
                content = $(contentID).html();
            } else {
                content = $(this).attr('href');
            }

            var fullContent = content;
            var vidParameters = '?vq=hd720&autoplay=1&showinfo=0&rel=0';
            //if youtube video or images passed into modal
            if(content.indexOf('youtube.com/embed/') !== -1){
                fullContent = '<iframe src="'+ content + vidParameters +'" allowfullscreen="allowfullscreen"></iframe>';
            }else if(content.indexOf('vimeo.com/') !== -1){
                var vidId = content.split('vimeo.com/');
                vidId = vidId[1];
                fullContent = '<iframe src="//player.vimeo.com/video/'+ vidId +'?color=9C191E&amp;autoplay=1" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'

            }else if(content.indexOf('jpg') !== -1 || content.indexOf('png') !== -1){
                fullContent = '<img src="'+ content +'">';
            }

            //load modal window with content passed
            $('<div id="modal-window" class="window">'+ fullContent +'<a href="#" class="close">X</a></div>').appendTo('body');

            var maskHeight = $(document).height();
            var maskWidth = $(window).width();

            $('#mask').css({'width':maskWidth,'height':maskHeight});

            $('#mask').show();

            $('.window').css('top', ( $(window).height() - $('.window').height() ) / 2+$(window).scrollTop() + 'px');
            $('.window').css('left', ( $(window).width() - $('.window').width() ) / 2+$(window).scrollLeft() + 'px');

            $('.window').fadeIn();

            e.preventDefault();
            return false;
        });

        //if close button is clicked
        $('body').on('click', '.window .close', function (e) {
            //Cancel the link behavior
            e.preventDefault();
            $('#mask, .window').fadeOut();
            $('.window iframe').remove();
        });

        //if mask is clicked
        $('#mask').on('click', function (e) {
            //Cancel the link behavior
            e.preventDefault();
            $('#mask, .window').hide();
            $('.window iframe').remove();
        });

        // Change modal window size repsonsive
        function checkWindowSize(e) {
            $('.window').css('top', ( $(window).height() - $('.window').height() ) / 2+$(window).scrollTop() + 'px');
            $('.window').css('left', ( $(window).width() - $('.window').width() ) / 2+$(window).scrollLeft() + 'px');
            $('#mask').css({'width':$(window).width(),'height':$(document).height()});
        }
        $(window).bind('resize', checkWindowSize);

}(jQuery));
},{}]},{},[2,1])