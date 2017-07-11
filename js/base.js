// 空白处点击 收起菜单
(function () {
    var $navTrigger = $('.nav-trigger');

    $('body').on('click',function (e) {
        if($(e.target).closest('.right_side').length) return ;

        var isShow = $navTrigger[0].checked;
        if(isShow) $navTrigger[0].checked = false;
    });
})();

// top fixed
// (function () {
//     var isIndex = $('.header').data('isindex');
//     if(!isIndex) return;

//     var timer;
//     $(window).on('scroll',function () {
//         clearTimeout(timer);

//         timer = setTimeout(function() {
//             var t = $(window).scrollTop();
//             if()
//         }, 20);
//     });
// })();