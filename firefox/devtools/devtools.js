'use strict';

browser.devtools.panels.create(
    '请求资源',
    '/resources/icon/icon.png',
    'panel/panel.html'
).then((panel) => {
    panel.onShown.addListener(() => {
        // console.log('panel shown');
    });
    
    panel.onHidden.addListener(() => {
        // console.log('panel hidden');
    });
});

// browser.devtools.panels.create(
//     '小丑鱼2',
//     '/resources/icon/icon.png',
//     'panel/panel.html'
// ).then((panel) => {
//     panel.onShown.addListener(() => {
//         console.log('panel shown');
//     });
    
//     panel.onHidden.addListener(() => {
//         console.log('panel hidden');
//     });
// });
