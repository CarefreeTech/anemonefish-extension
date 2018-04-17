'use strict';

let port = browser.runtime.connect({name: 'devtools'});

port.onMessage.addListener((message) => {
    if (message.cmd === 'init') {
        console.log(message.data);
    }
});
