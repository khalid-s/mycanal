/*
 *
 *  MAG js
 *
 */

function Mag() {

  var that              = this,
      $win              = $(window),
      $doc              = $(document),
      $body             = $('body'),
      $mag              = $('.mag'),
      isHome            = ($('.mag--home').length) ? 1 : 0,
      isArticle         = ($('.mag--article').length) ? 1 : 0,
      isDiaporama       = ($('.mag--diaporama').length) ? 1 : 0,
      articleFixedLeft    = 0,
      articleFixedStart   = 0,
      articleFixedEnd     = 1000,
      articleFixedLeftEnd = 1000;

  /*
   *  Init
   */
  this.init = function() {

    // masonry
    if(isHome) {
      setTimeout( function() {
        $('.mag-list').masonry({
          itemSelector: '.mag-list-item',
          columnWidth: 330
        });
      }, 200);

      // swiper
      var mySwiper = new Swiper('.swiper-container',{
          freeMode: true,
          freeModeFluid: true,
          slidesPerView: 'auto'
      });
    }

    if(isArticle) {
      // init vars
      $magArticle         = $('.mag-article');
      $magArticleAside    = $('.mag-article-aside');
      $magArticleAsideNav = $('.mag-article-aside-nav');
      $switcher           = $('.mag-article-switcher');
      $switcherItems      = $('.mag-article-switcher-item');
      isMobile            = ($switcher.css('display') == 'block') ? 1 : 0;

      // init events
      if(!isMobile) {
        $win.bind('resize', function(e) { that.onResizeArticle(); return false; });
        $win.bind('scroll', function(e) { that.onScrollArticle(); return false; });

        that.onResizeArticle();
        setTimeout(function(){ that.onResizeArticle(); }, 1000);
        setTimeout(function(){ that.onResizeArticle(); }, 2000);
        setTimeout(function(){ that.onResizeArticle(); }, 3000);
      }

      $slider = $('.flexslider');
      if($slider.length) {
        $slider.flexslider({
          selector: '.flex-slides > li',
          slideshow: false,
          controlNav: false,
          animation: 'slide',
          prevText: '',
          nextText: ''
        });
      }

      $switcherItems.bind('click', function(){
        $this = $(this);
        pos   = $this.prevAll().length + 1;
        $switcherItems.removeClass('mag-article-switcher-item--current');
        $this.addClass('mag-article-switcher-item--current');
        $magArticle.removeClass('mag-article--1 mag-article--2').addClass('mag-article--'+ pos);
        return false;
      });

      $('.mag-article-trigger--share').click(function(){
        $shareTrigger = $(this);
        $share        = $('.mag-article-share');
        if($share.css('display') == 'block') {
          $share.hide();
        } else {
          $share.show();
        }
        if(isMobile) {
          $('html, body').animate({
              'scrollTop': $share.offset().top 
          }, 100);
        } else {
          that.onResizeArticle();
        }
        return false;
      });
    }

    if(isDiaporama) {
      $slider   = $('.flexslider--slider');
      $carousel = $('.flexslider--carousel');

      if($slider.length && $carousel.length) {
        $carousel.flexslider({
          selector: '.flex-slides > li',
          animation: "slide",
          controlNav: false,
          animationLoop: true,
          slideshow: false,
          itemWidth: 151,
          itemMargin: 4,
          prevText: '',
          nextText: '',
          asNavFor: '.flexslider--slider'
        });
        $slider.flexslider({
          selector: '.flex-slides > li',
          animation: "slide",
          controlNav: false,
          directionNav: false,
          animationLoop: false,
          slideshow: false,
          prevText: '',
          nextText: '',
          sync: ".flexslider--carousel"
        });
      }
    }
  };

  /*
   *  Methods
   */
  this.onScrollArticle = function(e) {
    var scroll = $win.scrollTop();      
    if(scroll > articleFixedStart) {
      if(scroll < articleFixedEnd) {
        $mag.addClass('mag--article--fixed').removeClass('mag--article--fixedStop');
        $magArticleAsideNav.css({
          left: articleFixedLeft,
          top: 20,
          bottom: 'inherit'
        });
      } else {
        $mag.addClass('mag--article--fixedStop').removeClass('mag--article--fixed');
        $magArticleAsideNav.css({
          left: articleFixedLeftEnd,
          bottom: 0,
          top: 'inherit'
        });
      }
    } else {
      $mag.removeClass('mag--article--fixed mag--article--fixedStop');
    }
  };

  this.onResizeArticle = function(e) {
    articleFixedStart   = $magArticleAside.offset().top - 20;
    articleFixedEnd     = $magArticle.offset().top + $magArticle.outerHeight() - $magArticleAsideNav.outerHeight() - 40;
    articleFixedLeft    = $magArticleAside.offset().left;
    articleFixedLeftEnd = $magArticleAside.position().left;
    $magArticleAsideNav.css('left', articleFixedLeft);
  };
}

/* let's party */
$(function(){
  var mag = new Mag();
  mag.init();
})
