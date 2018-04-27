;(function($) {
    'use strict';

    // tab id
    let tabId = browser.devtools.inspectedWindow.tabId;
    // port连接
    let port = browser.runtime.connect({name: 'request_resource'});
    // 上下文环境
    let context = {
        hinting: false
    }

    // 置换hint样式
    function exchangeHint() {
        context.hinting ? $('#hint').addClass('tc-checked') : $('#hint').removeClass('tc-checked');
    }

    function refreshTarget(target) {
        let refresh = (ul, text, html, hitarea) => {
            let e = $(html);

            if (hitarea) {
                let ha = $('<span class="hitarea"></span>');

                ha.click(function () {
                    e.hasClass('li-opened') ? e.removeClass('li-opened') : e.addClass('li-opened');
                });

                e.prepend(ha);
            }
            console.log(e.html());
            
            // 目录树元素初始化
            e.find('> a').click(function () {
                let a = $(this);
        
                // 选中
                $('.sidebar-tree li > a.a-selected').removeClass('a-selected');
                a.hasClass('a-selected') ? a.removeClass('a-selected') : a.addClass('a-selected');
        
                // 展开
                a.parent().hasClass('li-opened') ? a.parent().removeClass('li-opened') : a.parent().addClass('li-opened');
                // console.log($(e).text());
            });

            // 确认插入位置
            for (let li of ul.find('> li')) {
                let t = $(li).find('> a').text().trim();
                
                if (t === text) {
                    return $(li);
                } else if (t > text) {
                    $(li).before(e);
                    return e;
                }
            }
            
            ul.append(e);

            return e;
        };

        let getIcon = (filetype) => {
            return 'image';
        };

        let parse = (tar, li) => {
            $.each(tar, (key, val) => {
                let ul = li.find('> ul');
                if (ul.length === 0) {
                    ul = $('<ul>');
                    li.append(ul);
                }
                let html;

                switch (val.category) {
                case 'dir': // 目录
                    html = `<li><a><i class="fa fa-folder-o"></i>${key}</a>`;
                    
                    // 遍历
                    parse(val.children, refresh(ul, key, html, true));
                    break;
                case 'file': // 文件
                    html = `<li><a><i class="fa fa-file-${getIcon(val.filetype)}-o"></i>${key}</a></li>`;
                    refresh(ul, key, html, false);
                    break;
                }
            });
        };
        
        $.each(target, (domain, host) => {
            // 更新domain
            let ul = $('.sidebar-tree');
            let html = `<li><a><i class="fa fa-user-secret"></i>${domain}</a></li>`;
            let li = refresh(ul, domain, html, true);
            
            $.each(host, (hostname, path) => {
                ul = li.find('> ul');
                if (ul.length === 0) {
                    ul = $('<ul>');
                    li.append(ul);
                }
                html = `<li><a><i class="fa fa-internet-explorer"></i>${hostname}</a></li>`;

                parse(path, refresh(ul, hostname, html, true));
            });
        });
    }

    // port消息监听器
    port.onMessage.addListener((message) => {
        switch (message.action) {
        case 'context_init':
        case 'context_sync':
            $.extend(true, context, message.data);
            
            exchangeHint();
            break;
        case 'target_init':
            refreshTarget(message.data);
            break;
        case 'target_sync':
            refreshTarget(message.data);
            break;
        }

        if (message.action === 'context_init') {
            port.postMessage({action: 'port_sign', data: tabId})
        }
    });

    // 提示点击监听器
    $('#hint').click(function () {
        context.hinting = !$(this).hasClass('tc-checked');
        exchangeHint();

        // context变更
        port.postMessage({
            action: 'context_change',
            data: context
        });
    });

    // 选中列表项
    $('table > tbody tr').click(function () {
        // 清除之前选中项样式
        $('table > tbody tr.tr-selected').removeClass('tr-selected');
        // 选中
        $(this).addClass('tr-selected');

        // 展开detail
        $('.detail').removeClass('dt-collapsed');

        // 显示详情数据
        $('.detail-content').html('aaa<br>aaa<br>aaa<br>aaa<br>aaa<br>aaa<br>aaa<br>aaa<br>aaa<br>aaa<br>aaa<br>aaa<br>aaa<br>aaa');
    });

    // 收缩详情
    $('#detail-collapse').click(() => {
        // 清除之前选中项样式
        $('table > tbody tr.tr-selected').removeClass('tr-selected');

        // 收缩detail
        $('.detail').addClass('dt-collapsed');
    });
})(jQuery);
