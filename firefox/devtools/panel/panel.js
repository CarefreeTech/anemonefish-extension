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
    context.hinting?$('#hint').addClass('toolbar-checkbox-checked'):$('#hint').removeClass('toolbar-checkbox-checked');
}

// port消息监听器
port.onMessage.addListener((message) => {
    switch (message.action) {
        case 'context_init':
        case 'context_sync':
            $.extend(true, context, message.data);
            
            exchangeHint();
            break;
    }

    if (message.action === 'context_init') {
        port.postMessage({action: 'port_sign', data: tabId})
    }
});

// 提示点击监听器
$('#hint').click(() => {
    context.hinting = !$('#hint').hasClass('toolbar-checkbox-checked');
    exchangeHint();

    // context变更
    port.postMessage({
        action: 'context_change',
        data: context
    });
});

// 选中列表项
$('table > tbody tr').each((i, e) => {
    $(e).click(() => {
        // 清除之前选中项样式
        $('table > tbody tr').removeClass('table-tr-active');
        // 选中
        $(e).addClass('table-tr-active');

        // 展开detail
        $('.main').removeClass('collapse');
        $('.detail-content').text(i);
    });
});

// 收缩详情
$('#detail-collapse').click(() => {
    $('.main').addClass('collapse');
});
