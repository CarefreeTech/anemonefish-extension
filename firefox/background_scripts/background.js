'use strict';

// let uris = {};
let requests = {};
let tempRequests = {};
let ports = {};

browser.webRequest.onBeforeRequest.addListener((details) => {
    // console.log('[tab '+details.tabId+details.type+'] before request: '+details.requestId+' '+details.url);

    if (!tempRequests[details.requestId]) {
        tempRequests[details.requestId] = {
            id: details.requestId,
            url: details.url,
            from: details.originUrl || '',
            type: details.type,
            source: 'request',
            request: {
                method: details.method,
                url: details.url,
                headers: {},
                body: details.requestBody,
                timestamp: details.timeStamp
            },
            response: {
                status: 0,
                headers: {},
                body: null,
                timestamp: 0
            }
        };
    }

    switch (details.type) {
        case 'main_frame':
        case 'sub_frame':
        case 'websocket':
        case 'xmlhttprequest':
        let filter = browser.webRequest.filterResponseData(details.requestId);
        
        filter.ondata = (event) => {
            let req = tempRequests[details.requestId];

            if (req) {
                req.response.body = new TextDecoder('utf-8').decode(event.data, {stream: true});
            }

            filter.write(event.data);
        };

        filter.onstop = event => {
            filter.disconnect();
        };
        break;
        case 'other':
        console.log('other');
        break;
    }
}, {urls: ['<all_urls>']}, ['blocking', 'requestBody']);

browser.webRequest.onBeforeSendHeaders.addListener((details) => {
    let req = tempRequests[details.requestId];
    if (req) {
        for (let header of details.requestHeaders) {
            req.request.headers[header.name] = header.value;
        }
    }
}, {urls: ['<all_urls>']}, ['blocking', 'requestHeaders']);

browser.webRequest.onAuthRequired.addListener((details) => {
    console.log(responseDetails.url+'\nauth required');
}, {urls: ['<all_urls>']});

browser.webRequest.onBeforeRedirect.addListener((details) => {
    console.log(responseDetails.url+'\n'+responseDetails.redirectUrl);
}, {urls: ['<all_urls>']});

browser.webRequest.onCompleted.addListener((details) => {
    // console.log('[tab '+details.tabId+'] request completed: '+details.requestId+' '+details.url);

    let req = tempRequests[details.requestId];
    if (req) {
        req.response.status = details.statusCode,
        req.response.timestamp = details.timeStamp
        for (let header of details.responseHeaders) {
            req.response.headers[header.name] = header.value;
        }

        delete tempRequests[details.requestId];
        delete req.id;

        requests[req.url] = req;
        
        // post to devtools
        // console.log(requests);
    }
}, {urls: ['<all_urls>']}, ['responseHeaders']);

browser.webRequest.onErrorOccurred.addListener((details) => {
    console.log(responseDetails.url+'\n'+responseDetails.error);
}, {urls: ['<all_urls>']});

browser.runtime.onMessage.addListener((message) => {
    switch (message.cmd) {
        case 'parse_webpage':
        for (let url of message.data.urls) {
            if (!requests[url]) {
                requests[url] = {
                    url: url,
                    from: message.data.target,
                    type: '', // implements getType()
                    source: 'webpage',
                    request: {},
                    response: {}
                }

                // post to devtools
                // console.log(url);
            }
        }
        // console.log(requests);
        break;
    }
});

browser.runtime.onConnect.addListener((port) => {
    if (port.name === 'devtools') {
        port.postMessage({cmd: 'init', data: requests});
    }

    port.onMessage.addListener(
        (message) => {
            console.log(message);
        }
    );

    port.onDisconnect.addListener(
        (p) => {
            console.log('disconnect');
        }
    );
});
