'use strict';
var app = app || {};

(function (module) {

  var articleView = {};

  articleView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', function(e) {
      e.preventDefault();
      $('.tab-content').hide();
      $(`#${$(this).data('content')}`).fadeIn(1000);
    });

    $('.main-nav .tab:first').click();
  };

  articleView.setTeasers = () => {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a.read-on', function(e) {
      e.preventDefault();
      if ($(this).text() === 'Read on →') {
        $(this).parent().find('*').fadeIn();
        $(this).html('Show Less &larr;');
      } else {
        $('body').animate({
          scrollTop: ($(this).parent().offset().top)
        },200);
        $(this).html('Read on &rarr;');
        $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
      }
    });
  };

  articleView.initNewArticlePage = () => {
    $('.tab-content').fadeIn(1000);
    $('#export-field').hide();
    $('#article-json').on('focus', function(){
      this.select();
    });

    $('#new-form').on('change', 'input, textarea', articleView.create);
    $('#new-form').on('submit', articleView.submit);
  };

  articleView.create = () => {
    var article;
    $('#articles').empty();

    article = new app.Article({
      title: $('#article-title').val(),
      author: $('#article-author').val(),
      authorUrl: $('#article-author-url').val(),
      category: $('#article-category').val(),
      body: $('#article-body').val(),
      publishedOn: new Date().toISOString()
    });

    $('.blog-posts').append(article.toHtml());
    $('pre code').each((i, block) => hljs.highlightBlock(block));
  };

  articleView.submit = event => {
    event.preventDefault();
    let article = new app.Article({
      title: $('#article-title').val(),
      author: $('#article-author').val(),
      authorUrl: $('#article-author-url').val(),
      category: $('#article-category').val(),
      body: $('#article-body').val(),
      publishedOn: new Date().toISOString()
    })
    $('#article-title').val(''),
    $('#article-author').val(''),
    $('#article-category').val(''),
    $('#article-body').val(''),
    article.insertRecord();

    window.location = './index.html';
  }


  articleView.initIndexPage = () => {
    app.Article.all.forEach(a => $('.blog-posts').append(a.toHtml()));
    articleView.handleMainNav();
    articleView.setTeasers();
    $('pre code').each((i, block) => hljs.highlightBlock(block));
  };

  module.articleView = articleView;
})(app);