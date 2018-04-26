'use strict';

// 请求监听器
browser.webRequest.onBeforeRequest.addListener((details) => {
    if (!tempRequests[details.requestId]) {
        tempRequests[details.requestId] = {
            url: details.url,
            type: details.type,
            from: details.originUrl || '',
            request_from_webpage: true,
            request: {
                method: details.method,
                headers: {},
                body: details.requestBody || '',
                timestamp: details.timeStamp
            },
            response: {
                status: 0,
                headers: {},
                body: '',
                timestamp: 0
            }
        };
    }

    switch (details.type) {
        case 'main_frame':
        case 'sub_frame':
        case 'websocket':
        case 'xmlhttprequest':
            // 响应体过滤器
            let filter = browser.webRequest.filterResponseData(details.requestId);
            
            filter.ondata = (event) => {
                let req = tempRequests[details.requestId];

                if (req) {
                    req.response.body += (new TextDecoder('utf-8').decode(event.data, {stream: true}) || '');
                }

                filter.write(event.data);
            };

            filter.onstop = event => {
                filter.disconnect();
            };
            break;
        case 'other':
            // console.log('other');
            break;
    }
}, {urls: ['<all_urls>']}, ['blocking', 'requestBody']);

// 请求头监听器
browser.webRequest.onBeforeSendHeaders.addListener((details) => {
    let req = tempRequests[details.requestId];

    if (req) {
        for (let header of details.requestHeaders) {
            req.request.headers[header.name] = header.value;
        }
    }
}, {urls: ['<all_urls>']}, ['blocking', 'requestHeaders']);

// 请求完成监听器
browser.webRequest.onCompleted.addListener((details) => {
    let req = tempRequests[details.requestId];
    
    if (req) {
        delete tempRequests[details.requestId];
        
        let a = $('<a>', {href: req.url});
        
        req.hostname = a.prop('hostname');
        req.domain = getDomain(req.hostname);
        req.ip = details.ip || 'unknown';
        req.port = a.prop('port')||(a.prop('protocol')==='https:'?'443':'80');
        req.protocol = a.prop('protocol').split(':')[0];
        req.path = a.prop('pathname');
        req.search = a.prop('search');
        req.hash = a.prop('hash');
        
        req.request.length = req.request.body.length;
        
        req.response.length = req.response.body.length;
        req.response.status = details.statusCode;
        req.response.timestamp = details.timeStamp;

        for (let header of details.responseHeaders) {
            req.response.headers[header.name] = header.value;
        }
        
        let paths = [];
        
        if (req.path === '/') {
            paths.push('/');
            paths.push('index.fish')
        } else {
            paths = req.path.split('/');
            paths[0] = '/';

            if (paths[paths.length-1] === '') {
                paths[paths.length-1] = 'some.fish'
            }
        }
        
        let tar = {};
        let tempTar = tar;

        tempTar = tempTar[req.domain] = {};
        tempTar = tempTar[req.hostname+':'+req.port] = {};
        tempTar = tempTar[paths[0]] = {children: {}, category: 'dir'};

        for (let i = 1; i < paths.length; i++) {
            if (i === paths.length-1) {
                tempTar = tempTar.children[paths[i]] = {url: req.url, category: 'file', type: req.type};
            } else {
                tempTar = tempTar.children[paths[i]] = {children: {}, category: 'dir'};
            }
        }

        $.extend(true, targets, tar);
        // console.log(targets);
        
        // post to devtools
        requests[req.url] = $.extend(true, {}, reqTamplate, req);
        // console.log(requests);
    }
}, {urls: ['<all_urls>']}, ['responseHeaders']);

// 请求身份认证监听器
browser.webRequest.onAuthRequired.addListener((details) => {
    // console.log(responseDetails.url+' -> auth required');
}, {urls: ['<all_urls>']});

// 请求重定向监听器
browser.webRequest.onBeforeRedirect.addListener((details) => {
    // console.log(responseDetails.url+' -> '+responseDetails.redirectUrl);
}, {urls: ['<all_urls>']});

// 请求异常监听器
browser.webRequest.onErrorOccurred.addListener((details) => {
    // console.log(responseDetails.url+' -> '+responseDetails.error);
}, {urls: ['<all_urls>']});
