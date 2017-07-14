// 空白处点击 收起菜单
(function() {
    var $navTrigger = $('.nav-trigger');

    $('body').on('click', function(e) {
        if ($(e.target).closest('.right_side').length) return;

        var isShow = $navTrigger[0].checked;
        if (isShow) $navTrigger[0].checked = false;
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

(function(win, $, CDSWYDA) {
    // disqus config
    win.disqus_config = function() {
        this.page.url = location.href; // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = location.pathname.substr(6); // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    win.CDSWYDA = CDSWYDA;

    CDSWYDA.browsers = {
        isIE67: '\v' == 'v',
        isIE8: !!document.all && document.querySelector && !document.addEventListener,
        isIE9: !!document.all && document.addEventListener && !window.atob,
        isIE10: !!document.all && window.atob,
        isIE11: '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style,
        // IE6~11
        isIE: ((!!document.all && document.compatMode) || ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style)),
        isWebkit: 'WebkitAppearance' in document.documentElement.style,
        isFirefox: !!navigator.userAgent.match(/firefox/i)
    };

    CDSWYDA._jsPromise = {};
    /**
     * 以promise的形式异步加载js，相同url仅加载一次。
     * 
     * @param {String} url 要加载的url
     * @param {Boolean} noCache 不要缓存 默认会缓存 再次加载时直接返回加载好的promise
     */
    CDSWYDA.loadJsPromise = function(url, noCache) {

        if (this._jsPromise[url]) return this._jsPromise[url];

        var dtd = $.Deferred(),
            me = this,
            script = document.createElement("script");
        script.type = 'text/javascript';

        // ie8- 的兼容
        if ((this.browsers.isIE67 || this.browsers.isIE8) && script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    dtd.resolve();
                    script.onreadystatechange = null;
                }
            };
        } else {
            script.onload = function() {
                dtd.resolve();
                script.onload = null;
            };
            script.onerror = function() {
                dtd.reject();
                script.onerror = null;
                me._jsPromise[url] = null;
            };
        }
        script.src = url;
        // append to head
        document.body.appendChild(script);

        return noCache ? dtd.promise() : (this._jsPromise[url] = dtd.promise());
    };
    /**
     * 异步加载js 回调函数方式
     * 
     * @param {String} url 要加载的JavaScript的url地址
     * @param {Function} callback 加载成功后的回调函数
     */
    CDSWYDA.loadJs = function(url, callback, failCallback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = 'async';
        // ie8- 的兼容 
        if ((this.browsers.isIE67 || this.browsers.isIE8) && script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback && callback();
                }
            };
        } else {
            script.onload = function() {
                script.onload = null;
                callback && callback();
            };
            script.onerror = function() {
                script.onerror = null;
                failCallback && failCallback();
            };
        }
        document.body.appendChild(script);
        script.src = url;
    };
    /**
     * 加载Disqus评论 
     * 
     * @param {HTMLElement} el 评论插入的位置 值为一个dom元素
     * @param {Object} disqusCfg disqus配置 默认使用js为 https://cdswyda.disqus.com/embed.js，dom的id为disqus_thread。如果需要配置格式为{domId:'id',jsUrl:'url'}
     */
    CDSWYDA.loadDisqus = function(el, disqusCfg) {
        if (!disqusCfg) {
            disqusCfg = {
                domId: 'disqus_thread',
                jsUrl: 'https://cdswyda.disqus.com/embed.js'
            };
        }
        var disqusContainer = document.createElement('div');
        disqusContainer.setAttribute('id', disqusCfg.domId);
        disqusContainer.style.display = 'none';
        el.appendChild(disqusContainer);

        console && console.log('测试能否使用Disqus');
        // 需要加个时间戳判断，防止缓存问题误以为可以加载Disqus
        // 加了时间戳 Disqus就不能使用了 不带时间戳则正常 所以需要加载两次吧 一次测试 一次正式
        this.loadJsPromise(disqusCfg.jsUrl + '?_t=' + +new Date(), true).done(function() {
            disqusContainer.style.display = 'none';
            console && console.log('测试成功，Disqus可用，正在加载');
            // 可以使用 再次加载并初始化
            CDSWYDA.loadJsPromise(disqusCfg.jsUrl).done(function() {
                // 加载成功则显示Disqus，隐藏bitcron的
                disqusContainer.style.display = 'block';

                var bitComment = el.querySelector('.doc_comments');
                bitComment && (bitComment.style.display = 'none');
                bitComment = null;
            });
        }).fail(function() {
            console && console.log('很抱歉您的网络不能使用Disqus!');
            var bitcronTitle = el.querySelector('.comments_block_title');
            if (!bitcronTitle) return;

            var errTips = document.createElement('small');
            errTips.className = 'net-error-tips';
            errTips.innerText = '网络不通畅，为您显示Bitcron的评论框';
            errTips.style.color = '#888';
            errTips.style.marginLeft = '10px';
            bitcronTitle.appendChild(errTips);
        });
    };

})(this, jQuery, this.CDSWYDA || {});