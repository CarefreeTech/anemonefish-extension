'use strict';

browser.devtools.panels.create(
    '小丑鱼',
    '/resources/img/icon.png',
    'panel/panel.html'
).then((panel) => {
    panel.onShown.addListener(() => {
        console.log('panel shown');
    });
    
    panel.onHidden.addListener(() => {
        console.log('panel hidden');
    });
});
