(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function($) {
    'use strict';
    var html;
    $.ajax({
        type: 'POST',
        url: 'guide.json',
        contentType: 'text/plain; charset=UTF-8',
        dataType: 'json',
        cache: false,
        async: false,
        success: function(result){
            //console.log(result);
            for (var i = 0; i < result.length; i++){
                console.log(result)
                var categories = result[i].cat;
                var description = result[i].info.description;
                var articleList = result[i].info.articles;
                var itemList = result[i].items;
                var videoList = result[i].info.videos;
                
                html = '<li>';
                html += '<div class="row">';
                html += '<h2>'+ categories +'</h2>';

                if(description != ''){
                    html += '<p>'+ description +'</p>';
                }

                if(articleList != 'undefined' && articleList.length != 0){
                    html += '<h3>Articles</h3>';
                    html += '<ul class="articles">';

                    for (var a = 0; a < articleList.length; a++){
                        var articleTitle = articleList[a].title;
                        var articleUrl = articleList[a].url;
                        html += '<li><a href="'+ articleUrl +'">'+ articleTitle +'</a></li>';
                    }

                    html += '</ul>';
                }

                if(videoList != 'undefined' && videoList.length != 0){
                    html += '<h3>Videos</h3>';
                    html += '<ul class="articles">';

                    for (var f = 0; f < videoList.length; f++){
                        var videoTitle = videoList[f].title;
                        var videoUrl = videoList[f].url;
                        videoUrl = videoUrl.replace('watch?v=', 'embed/');
                        if(videoUrl.indexOf('youtube.com') !== -1){
                            html += '<li><a href="'+ videoUrl +'" class="modal">'+ videoTitle +'</a></li>';
                        }else{
                            html += '<li><a href="'+ videoUrl +'">'+ videoTitle +'</a></li>';
                        }
                    }

                    html += '</ul>';
                }

                if(itemList != 'undefined' && itemList.length != 0){

                    html += '<ul class="item-list">';
                    for (var b = 0; b < itemList.length; b++){
                        var itemTitle = itemList[b].title;
                        var itemDesc = itemList[b].description;
                        var itemUrl = itemList[b].url;
                        var itemArticles = itemList[b].articles;
                        var itemVideos = itemList[b].videos;
                        html += '<li>'
                        html += '<h4><a href="'+ itemUrl +'">'+ itemTitle +'</a></h4>';
                        html += '<p>'+ itemDesc +'</p>';

                        if(itemArticles != 'undefined' && itemArticles.length != 0){
                            html += '<h5>Articles</h5>';
                            html += '<ul class="item-articles">';
                            for (var d = 0; d < itemArticles.length; d++){
                                var itemArticleTitle = itemArticles[d].title;
                                var itemArticleUrl = itemArticles[d].url;
                                html += '<li>'
                                html += '<a href="'+ itemArticleUrl +'">'+ itemArticleTitle +'</a>';
                                html += '</li>';
                            }
                            html += '</ul>';
                        }

                        if(itemVideos != 'undefined' && itemVideos.length != 0){
                            html += '<h5>Videos</h5>';
                            html += '<ul class="item-articles">';
                            for (var e = 0; e < itemVideos.length; e++){
                                var videoTitle = itemVideos[e].title;
                                var videoUrl = itemVideos[e].url;
                                videoUrl = videoUrl.replace('watch?v=', 'embed/');
                                html += '<li>';
                                console.log(videoUrl);
                                if(videoUrl.indexOf('youtube.com') !== -1){
                                    html += '<li><a href="'+ videoUrl +'" class="modal">'+ videoTitle +'</a></li>';
                                }else{
                                    html += '<li><a href="'+ videoUrl +'">'+ videoTitle +'</a></li>';
                                }
                                html += '</li>';
                            }
                            html += '</ul>';
                        }

                        html += '</li>';
                    }
                    html += '</ul>';
                }

                
                html += '</div>';
                html += '</li>';
                $('.items').append(html);
            }
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
        });

        // Change modal window size repsonsive
        function checkWindowSize(e) {
            $('.window').css('top', ( $(window).height() - $('.window').height() ) / 2+$(window).scrollTop() + 'px');
            $('.window').css('left', ( $(window).width() - $('.window').width() ) / 2+$(window).scrollLeft() + 'px');
            $('#mask').css({'width':$(window).width(),'height':$(document).height()});
        }
        $(window).bind('resize', checkWindowSize);

}(jQuery));
},{}]},{},[1,2])