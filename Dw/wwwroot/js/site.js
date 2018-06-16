
$(document).ready(function () {


    modules = $('.module-hero, .module, .module-small, .module-parallax'),

    $("#mainbtn").click(function () {
       $("html,body").animate({ scrollTop: $('#intro').prop("scrollHeight") }, 1000);
    });

    $('.modalClick').on('click', function () {
        var sr = $(this).attr('src');
        $('#mimg').attr('src', sr);
        $('#myImgModal').modal('show');
    });


    /* ---------------------------------------------- /*
    * Setting background of modules
    /* ---------------------------------------------- */

    modules.each(function () {
        if ($(this).attr('data-background')) {
            $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
        }
    });


    // Gets the video src from the data-src on each button

    var $videoSrc;
    $('.video-btn').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);


    // when the modal is opened autoplay it  
    $('#myModal').on('shown.bs.modal', function (e) {

        // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
        $("#video").attr('src', $videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1");
    })


    // stop playing the youtube video when I close the modal
    $('#myModal').on('hide.bs.modal', function (e) {
        // a poor man's stop video
        $("#video").attr('src', $videoSrc);
    })


});


//var $grid = $('.grid').masonry({
//    itemSelector: 'none', // select none at first
//    columnWidth: '.grid-sizer',
//    gutter: '.grid-gutter-sizer',
//    percentPosition: true,
//    // nicer reveal transition
//    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
//    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
//});

// get Masonry instance
//var msnry = $grid.data('masonry');

// initial items reveal
//$grid.imagesLoaded(function () {
//    $grid.removeClass('are-images-unloaded');
//    $grid.masonry('option', { itemSelector: '.grid-item' });
//    var $items = $grid.find('.grid-item');
//    $grid.masonry('appended', $items);
//});



//-------------------------------------//
// hack CodePen to load pens as pages

//var nextPenSlugs = [
//    '/portpages/1',
//    '/portpages/1',
//    '/portpages/1',
//    '/portpages/1'
//];
//
//var nextPages = [
//    '/portpages/0',
//    '/portpages/1',
//    '/portpages/2',
//    '/portpages/3',
//    '/portpages/4',
//    '/portpages/5',
//];
//
//function getPortPage(id) {
//
//    var portPage = nextPages[id];
//    return portPage;
//
//}
//
//-------------------------------------//
// init Infinte Scroll

//$grid.infiniteScroll({
//    history: false,
//    prefill: false,
//    path: getPenPath,
//    append: '.grid-item',
//    outlayer: msnry,
//    status: '.page-load-status',
//});

//var $container = $(".grid");

//$container.on('append.infiniteScroll', function (event, response, path, items) {
//    $('.modalClick').on('click', function () {
//        var sr = $(this).attr('src');
//        $('#mimg').attr('src', sr);
//        $('#myImgModal').modal('show');
//    });
//
//});

//This fires on click.. clicking will open the modal. Put Grid data here? Possibly read number from Modal info or ID and use it to choose which to populate


//$('.gridModal').on('shown.bs.modal', function () {

    //$('html').disableScroll();

    //var myID = '#' + this.id;
    //
    //var $grid = $(myID).find('.grid').masonry({
    //    itemSelector: 'none', // select none at first
    //    columnWidth: '.grid-sizer',
    //    gutter: '.grid-gutter-sizer',
    //    percentPosition: true,
    //    // nicer reveal transition
    //    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    //    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
    //});
    //
    //var msnry = $grid.data('masonry');
    //
    //$grid.imagesLoaded(function () {
    //    $grid.removeClass('are-images-unloaded');
    //    $grid.masonry('option', { itemSelector: '.grid-item' });
    //    var $items = $grid.find('.grid-item');
    //    $grid.masonry('appended', $items);
    //});
    //
    //
    //var portPage = [
    //    '/portpages/1',
    //    '/portpages/2'
    //    ]
    //
    //$grid.infiniteScroll({
    //    history: false,
    //    prefill: true,
    //    path: '/portpages/1',
    //    append: '.grid-item',
    //    outlayer: msnry,
    //    status: '.page-load-status',
    //});
    //
    //$grid.on('append.infiniteScroll', function (event, response, path, items) {
    //    $('.modalClick').on('click', function () {
    //        var sr = $(this).attr('src');
    //        $('#mimg').attr('src', sr);
    //        $('#myImgModal').modal('show');
    //    });
    //
    //});
//})
//
//
//$('.gridModal').on('hidden.bs.modal', function () {
//
//    //var myID = '#' + this.id;
//    //
//    //console.log(myID);
//    //
//    //$grid = $(myID).find('.grid');
//    //
//    //$grid.infiniteScroll('destroy');
//    //$grid.masonry('destroy');
//
//    //$("html").enableScroll();
//})


$.fn.disableScroll = function () {
    window.oldScrollPos = $(window).scrollTop();

    $(window).on('scroll.scrolldisabler', function (event) {
        $(window).scrollTop(window.oldScrollPos);
        event.preventDefault();
    });
};

$.fn.enableScroll = function () {
    $(window).off('scroll.scrolldisabler');
};

