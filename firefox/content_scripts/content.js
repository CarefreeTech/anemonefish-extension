$(function($) {
    'use strict';

    const tags = [
        {name: 'a', attrs: ['href']},
        {name: 'area', attrs: ['href']},
        {name: 'base', attrs: ['href']},
        {name: 'link', attrs: ['href']},
        {name: 'applet', attrs: ['code', 'archive', 'codebase']},
        {name: 'audio', attrs: ['src']},
        {name: 'embed', attrs: ['src']},
        {name: 'script', attrs: ['src']},
        {name: 'source', attrs: ['src']},
        {name: 'track', attrs: ['src']},
        {name: 'backquote', attrs: ['cite']},
        {name: 'del', attrs: ['cite']},
        {name: 'ins', attrs: ['cite']},
        {name: 'section', attrs: ['cite']},
        {name: 'body', attrs: ['background']},
        {name: 'button', attrs: ['formaction']},
        {name: 'command', attrs: ['icon']},
        {name: 'menuitem', attrs: ['icon']},
        {name: 'form', attrs: ['action']},
        {name: 'frame', attrs: ['src', 'longdesc']},
        {name: 'iframe', attrs: ['src', 'longdesc']},
        {name: 'head', attrs: ['profile']},
        {name: 'html', attrs: ['manifest']},
        {name: 'img', attrs: ['src', 'longdesc', 'ismap', 'usemap']},
        {name: 'input', attrs: ['src', 'formaction']},
        {name: 'object', attrs: ['data', 'archive', 'codebase', 'usemap']},
        {name: 'video', attrs: ['src', 'poster']},
    ];

    let data = {
        target: window.location.href,
        urls: []
    };

    $(tags).each((_, tag) => {
        $(tag.name).each((_, e) => {
            $(tag.attrs).each((_, attr) => {
                let url = $(e).attr(attr);

                if (url && url != '#' && url.indexOf('javascript:') != 0) {
                    let a = $('<a>', {href: url});

                    url = a.prop('protocol')+'//'
                        +(a.prop('username')?(a.prop('username')+':'+a.prop('password')+'@'):'')
                        +a.prop('hostname')
                        +(a.prop('port')?(':'+a.prop('port')):'')
                        +a.prop('pathname')
                        +a.prop('search')
                        +a.prop('hash');

                    let exist = false;

                    for (let u of data.urls) {
                        if (u === url) {
                            exist = true;
                            break;
                        }
                    }

                    if (!exist) {
                        data.urls.push(url);
                    }
                }
            });
        });
    });

    browser.runtime.sendMessage({cmd: 'parse_webpage', data: data});
})();
