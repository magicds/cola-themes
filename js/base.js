// 搜索
(function () {
    var $searchInput = $('#search-input');
    $searchInput.on('keyup',function (e) {
        e.which === 13 && search();
    });
    
    $('#search-icon').on('click',search);

    var search = function () {
        var key = $.trim($searchInput[0].value);
        if (key.length === 0) return;

        var loc = document.location;
        document.location = loc.protocol + '//' + loc.host + '?s=' + key;
    };
})();
