$(function ($) {
    'use strict';

    // 可见标签集
    const borderTags = ['A', 'AREA', 'APPLET', 'AUDIO', 'EMBED', 'DEL', 'INS', 'SECTION', 'BUTTON', 'COMMAND', 'MENUITEM', 'FORM', 'FRAME', 'IFRAME', 'IMG', 'INPUT', 'OBJECT', 'VIDEO'];
    
    // 可携带url属性标签集
    const tags = {
        'A': ['href'],
        'AREA': ['href'],
        'BASE': ['href'],
        'LINK': ['href'],
        'APPLET': ['code', 'archive', 'codebase'],
        'AUDIO': ['src'],
        'EMBED': ['src'],
        'SCRIPT': ['src'],
        'SOURCE': ['src'],
        'TRACK': ['src'],
        'BACKQUOTE': ['cite'],
        'DEL': ['cite'],
        'INS': ['cite'],
        'SECTION': ['cite'],
        'BODY': ['background'],
        'BUTTON': ['formaction'],
        'COMMAND': ['icon'],
        'MENUITEM': ['icon'],
        'FORM': ['action'], // TODO: 处理submit事件，以及表单参数
        'FRAME': ['src', 'longdesc'],
        'IFRAME': ['src', 'longdesc'],
        'HEAD': ['profile'],
        'HTML': ['manifest'],
        'IMG': ['src', 'longdesc', 'ismap', 'usemap'],
        'INPUT': ['src', 'formaction'],
        'OBJECT': ['data', 'archive', 'codebase', 'usemap'],
        'VIDEO': ['src', 'poster']
    };

    // 正则表达式集
    const regs = {
        url: /(https?:\/\/(\w+\.)+[a-z]{2,}(\/([\u0021-\u007e]+)?)?)|(\/([a-z0-9-_%]+\/)*[\u0021-\u002e\u0030-\u007e]+)/ig
    };

    // 上下文环境
    let context = {
        hinting: false
    };

    // 解析数据集
    let data = {
        from: window.location.href,
        urls: []
    };
    
    // 被解析可见元素集
    let elements = [];

    // 提示，更新css
    function hint(hinting) {
        for (let e of elements) {
            $(e.node).css('border', hinting?'2px solid red':e.original.border);
        }
    }

    // 重构并缓存数据
    function cacheData(url) {
        // 重构url
        let a = $('<a>', {href: url});

        url = a.prop('protocol')+'//'
            +(a.prop('username')?(a.prop('username')+':'+a.prop('password')+'@'):'')
            +a.prop('host')
            +a.prop('pathname')
            +a.prop('search')
            +a.prop('hash');

        for (let u of data.urls) {
            if (u.url === url) {
                u.hits++; // url命中次数递增
                return;
            }
        }

        // 缓存url
        data.urls.push({
            url: url,
            hostname: a.prop('hostname'),
            port: a.prop('port')||(a.prop('protocol')==='https:'?'443':'80'),
            protocol: a.prop('protocol').split(':')[0],
            path: a.prop('pathname'),
            search: a.prop('search'),
            hash: a.prop('hash'),
            hits: 1
        });
    }

    // 解析文本
    function parseText(t) {
        if (!t.trim()) {
            return;
        }

        let match = t.match(regs.url);
        
        if (match) {
            
        }
    }

    // 解析元素
    function parseElement(e) {
        let hasUrl = false; // 存在url属性标识符

        $(tags[e.nodeName]).each((_, attr) => {
            let url = $(e).attr(attr);

            if (url) {
                hasUrl = true;

                if (url.indexOf('mailto:') == 0) {
                    // TODO: 处理mailto
                } else if (url != '#' && url.indexOf('javascript:') != 0) {
                    cacheData(url);
                }
            }
        });

        // 判断是否存在url属性，且为可见标签
        if (hasUrl && $.inArray(e, borderTags) < 0) {
            elements.push({
                node: e,
                original: {
                    border: $(e).css('border')||'none'
                }
            });
        }
    }

    // 递归遍历页面各节点
    function getURL(element) {
        element.contents().each((_, e) => {
            switch (e.nodeType) {
                case 1: // element
                    parseElement(e);
                    break;
                case 3: // text
                case 8: // comment
                    parseText(e.nodeValue);
                    break;
            }

            // 递归孩子节点
            getURL($(e));
        });
    }
    
    // 初始化context
    browser.runtime.sendMessage({
        action: 'context_init',
        data: ''
    }).then((response) => {
        $.extend(true, context, response);

        // 消息监听器
        browser.runtime.onMessage.addListener((message) => {
            switch (message.action) {
                case 'context_change':
                    $.extend(true, context, message.data);
    
                    // 变更hint
                    hint(context.hinting);
                    break;
            }
        });

        // 解析页面
        getURL($('html'));

        // 回传解析数据集
        browser.runtime.sendMessage({
            action: 'parsing_complete',
            data: data
        });

        // 初始化hint
        if (context.hinting) {
            hint(context.hinting);
        }
    });
})();
