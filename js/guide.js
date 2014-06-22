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
                var categories = result[i].cat;
                var description = result[i].info.description;
                var articleList = result[i].info.articles;
                var itemList = result[i].items;
                
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

                if(itemList != 'undefined' && itemList.length != 0){

                    html += '<ul class="item-list">';
                    for (var b = 0; b < itemList.length; b++){
                        var itemTitle = itemList[b].title;
                        var itemDesc = itemList[b].description;
                        var itemUrl = itemList[b].url;
                        var itemArticles = itemList[b].articles
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