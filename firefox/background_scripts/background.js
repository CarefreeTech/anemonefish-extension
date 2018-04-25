'use strict';

const topDomains = ['aaa', 'aarp', 'abarth', 'abb', 'abbott', 'abbvie', 'abc', 'able', 'abogado', 'abudhabi', 'ac', 'academy', 'accenture', 'accountant', 'accountants', 'aco', 'active', 'actor', 'ad', 'adac', 'ads', 'adult', 'ae', 'aeg', 'aero', 'aetna', 'af', 'afamilycompany', 'afl', 'africa', 'ag', 'agakhan', 'agency', 'ai', 'aig', 'aigo', 'airbus', 'airforce', 'airtel', 'akdn', 'al', 'alfaromeo', 'alibaba', 'alipay', 'allfinanz', 'allstate', 'ally', 'alsace', 'alstom', 'am', 'americanexpress', 'americanfamily', 'amex', 'amfam', 'amica', 'amsterdam', 'an', 'analytics', 'android', 'anquan', 'anz', 'ao', 'aol', 'apartments', 'app', 'apple', 'aq', 'aquarelle', 'ar', 'arab', 'aramco', 'archi', 'army', 'arpa', 'art', 'arte', 'as', 'asda', 'asia', 'associates', 'at', 'athleta', 'attorney', 'au', 'auction', 'audi', 'audible', 'audio', 'auspost', 'author', 'auto', 'autos', 'avianca', 'aw', 'aws', 'ax', 'axa', 'az', 'azure', 'ba', 'baby', 'baidu', 'banamex', 'bananarepublic', 'band', 'bank', 'bar', 'barcelona', 'barclaycard', 'barclays', 'barefoot', 'bargains', 'baseball', 'basketball', 'bauhaus', 'bayern', 'bb', 'bbc', 'bbt', 'bbva', 'bcg', 'bcn', 'bd', 'be', 'beats', 'beauty', 'beer', 'bentley', 'berlin', 'best', 'bestbuy', 'bet', 'bf', 'bg', 'bh', 'bharti', 'bi', 'bible', 'bid', 'bike', 'bing', 'bingo', 'bio', 'biz', 'bj', 'bl', 'black', 'blackfriday', 'blanco', 'blockbuster', 'blog', 'bloomberg', 'blue', 'bm', 'bms', 'bmw', 'bn', 'bnl', 'bnpparibas', 'bo', 'boats', 'boehringer', 'bofa', 'bom', 'bond', 'boo', 'book', 'booking', 'boots', 'bosch', 'bostik', 'boston', 'bot', 'boutique', 'box', 'bq', 'br', 'bradesco', 'bridgestone', 'broadway', 'broker', 'brother', 'brussels', 'bs', 'bt', 'budapest', 'bugatti', 'build', 'builders', 'business', 'buy', 'buzz', 'bv', 'bw', 'by', 'bz', 'bzh', 'ca', 'cab', 'cafe', 'cal', 'call', 'calvinklein', 'cam', 'camera', 'camp', 'cancerresearch', 'canon', 'capetown', 'capital', 'capitalone', 'car', 'caravan', 'cards', 'care', 'career', 'careers', 'cars', 'cartier', 'casa', 'case', 'caseih', 'cash', 'casino', 'cat', 'catering', 'catholic', 'cba', 'cbn', 'cbre', 'cbs', 'cc', 'cd', 'ceb', 'center', 'ceo', 'cern', 'cf', 'cfa', 'cfd', 'cg', 'ch', 'chanel', 'channel', 'chase', 'chat', 'cheap', 'chintai', 'chloe', 'christmas', 'chrome', 'chrysler', 'church', 'ci', 'cipriani', 'circle', 'cisco', 'citadel', 'citi', 'citic', 'city', 'cityeats', 'ck', 'cl', 'claims', 'cleaning', 'click', 'clinic', 'clinique', 'clothing', 'cloud', 'club', 'clubmed', 'cm', 'cn', 'co', 'coach', 'codes', 'coffee', 'college', 'cologne', 'com', 'comcast', 'commbank', 'community', 'company', 'compare', 'computer', 'comsec', 'condos', 'construction', 'consulting', 'contact', 'contractors', 'cooking', 'cookingchannel', 'cool', 'coop', 'corsica', 'country', 'coupon', 'coupons', 'courses', 'cr', 'credit', 'creditcard', 'creditunion', 'cricket', 'crown', 'crs', 'cruise', 'cruises', 'csc', 'cu', 'cuisinella', 'cv', 'cw', 'cx', 'cy', 'cymru', 'cyou', 'cz', 'dabur', 'dad', 'dance', 'data', 'date', 'dating', 'datsun', 'day', 'dclk', 'dds', 'de', 'deal', 'dealer', 'deals', 'degree', 'delivery', 'dell', 'deloitte', 'delta', 'democrat', 'dental', 'dentist', 'desi', 'design', 'dev', 'dhl', 'diamonds', 'diet', 'digital', 'direct', 'directory', 'discount', 'discover', 'dish', 'diy', 'dj', 'dk', 'dm', 'dnp', 'do', 'docs', 'doctor', 'dodge', 'dog', 'doha', 'domains', 'doosan', 'dot', 'download', 'drive', 'dtv', 'dubai', 'duck', 'dunlop', 'duns', 'dupont', 'durban', 'dvag', 'dvr', 'dz', 'earth', 'eat', 'ec', 'eco', 'edeka', 'edu', 'education', 'ee', 'eg', 'eh', 'email', 'emerck', 'energy', 'engineer', 'engineering', 'enterprises', 'epost', 'epson', 'equipment', 'er', 'ericsson', 'erni', 'es', 'esq', 'estate', 'esurance', 'et', 'etisalat', 'eu', 'eurovision', 'eus', 'events', 'everbank', 'exchange', 'expert', 'exposed', 'express', 'extraspace', 'fage', 'fail', 'fairwinds', 'faith', 'family', 'fan', 'fans', 'farm', 'farmers', 'fashion', 'fast', 'fedex', 'feedback', 'ferrari', 'ferrero', 'fi', 'fiat', 'fidelity', 'fido', 'film', 'final', 'finance', 'financial', 'fire', 'firestone', 'firmdale', 'fish', 'fishing', 'fit', 'fitness', 'fj', 'fk', 'flickr', 'flights', 'flir', 'florist', 'flowers', 'flsmidth', 'fly', 'fm', 'fo', 'foo', 'food', 'foodnetwork', 'football', 'ford', 'forex', 'forsale', 'forum', 'foundation', 'fox', 'fr', 'free', 'fresenius', 'frl', 'frogans', 'frontdoor', 'frontier', 'ftr', 'fujitsu', 'fujixerox', 'fun', 'fund', 'furniture', 'futbol', 'fyi', 'ga', 'gal', 'gallery', 'gallo', 'gallup', 'game', 'games', 'gap', 'garden', 'gb', 'gbiz', 'gd', 'gdn', 'ge', 'gea', 'gent', 'genting', 'george', 'gf', 'gg', 'ggee', 'gh', 'gi', 'gift', 'gifts', 'gives', 'giving', 'gl', 'glade', 'glass', 'gle', 'global', 'globo', 'gm', 'gmail', 'gmbh', 'gmo', 'gmx', 'gn', 'godaddy', 'gold', 'goldpoint', 'golf', 'goo', 'goodhands', 'goodyear', 'goog', 'google', 'gop', 'got', 'gov', 'gp', 'gq', 'gr', 'grainger', 'graphics', 'gratis', 'green', 'gripe', 'grocery', 'group', 'gs', 'gt', 'gu', 'guardian', 'gucci', 'guge', 'guide', 'guitars', 'guru', 'gw', 'gy', 'hair', 'hamburg', 'hangout', 'haus', 'hbo', 'hdfc', 'hdfcbank', 'health', 'healthcare', 'help', 'helsinki', 'here', 'hermes', 'hgtv', 'hiphop', 'hisamitsu', 'hitachi', 'hiv', 'hk', 'hkt', 'hm', 'hn', 'hockey', 'holdings', 'holiday', 'homedepot', 'homegoods', 'homes', 'homesense', 'honda', 'honeywell', 'horse', 'hospital', 'host', 'hosting', 'hot', 'hoteles', 'hotels', 'hotmail', 'house', 'how', 'hr', 'hsbc', 'ht', 'htc', 'hu', 'hughes', 'hyatt', 'hyundai', 'ibm', 'icbc', 'ice', 'icu', 'id', 'ie', 'ieee', 'ifm', 'iinet', 'ikano', 'il', 'im', 'imamat', 'imdb', 'immo', 'immobilien', 'in', 'industries', 'infiniti', 'info', 'ing', 'ink', 'institute', 'insurance', 'insure', 'int', 'intel', 'international', 'intuit', 'investments', 'io', 'ipiranga', 'iq', 'ir', 'irish', 'is', 'iselect', 'ismaili', 'ist', 'istanbul', 'it', 'itau', 'itv', 'iveco', 'iwc', 'jaguar', 'java', 'jcb', 'jcp', 'je', 'jeep', 'jetzt', 'jewelry', 'jio', 'jlc', 'jll', 'jm', 'jmp', 'jnj', 'jo', 'jobs', 'joburg', 'jot', 'joy', 'jp', 'jpmorgan', 'jprs', 'juegos', 'juniper', 'kaufen', 'kddi', 'ke', 'kerryhotels', 'kerrylogistics', 'kerryproperties', 'kfh', 'kg', 'kh', 'ki', 'kia', 'kim', 'kinder', 'kindle', 'kitchen', 'kiwi', 'km', 'kn', 'koeln', 'komatsu', 'kosher', 'kp', 'kpmg', 'kpn', 'kr', 'krd', 'kred', 'kuokgroup', 'kw', 'ky', 'kyoto', 'kz', 'la', 'lacaixa', 'ladbrokes', 'lamborghini', 'lamer', 'lancaster', 'lancia', 'lancome', 'land', 'landrover', 'lanxess', 'lasalle', 'lat', 'latino', 'latrobe', 'law', 'lawyer', 'lb', 'lc', 'lds', 'lease', 'leclerc', 'lefrak', 'legal', 'lego', 'lexus', 'lgbt', 'li', 'liaison', 'lidl', 'life', 'lifeinsurance', 'lifestyle', 'lighting', 'like', 'lilly', 'limited', 'limo', 'lincoln', 'linde', 'link', 'lipsy', 'live', 'living', 'lixil', 'lk', 'llc', 'loan', 'loans', 'locker', 'locus', 'loft', 'lol', 'london', 'lotte', 'lotto', 'love', 'lpl', 'lplfinancial', 'lr', 'ls', 'lt', 'ltd', 'ltda', 'lu', 'lundbeck', 'lupin', 'luxe', 'luxury', 'lv', 'ly', 'ma', 'macys', 'madrid', 'maif', 'maison', 'makeup', 'man', 'management', 'mango', 'map', 'market', 'marketing', 'markets', 'marriott', 'marshalls', 'maserati', 'mattel', 'mba', 'mc', 'mcd', 'mcdonalds', 'mckinsey', 'md', 'me', 'med', 'media', 'meet', 'melbourne', 'meme', 'memorial', 'men', 'menu', 'meo', 'merckmsd', 'metlife', 'mf', 'mg', 'mh', 'miami', 'microsoft', 'mil', 'mini', 'mint', 'mit', 'mitsubishi', 'mk', 'ml', 'mlb', 'mls', 'mm', 'mma', 'mn', 'mo', 'mobi', 'mobile', 'mobily', 'moda', 'moe', 'moi', 'mom', 'monash', 'money', 'monster', 'montblanc', 'mopar', 'mormon', 'mortgage', 'moscow', 'moto', 'motorcycles', 'mov', 'movie', 'movistar', 'mp', 'mq', 'mr', 'ms', 'msd', 'mt', 'mtn', 'mtpc', 'mtr', 'mu', 'museum', 'mutual', 'mutuelle', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nab', 'nadex', 'nagoya', 'name', 'nationwide', 'natura', 'navy', 'nba', 'nc', 'ne', 'nec', 'net', 'netbank', 'netflix', 'network', 'neustar', 'new', 'newholland', 'news', 'next', 'nextdirect', 'nexus', 'nf', 'nfl', 'ng', 'ngo', 'nhk', 'ni', 'nico', 'nike', 'nikon', 'ninja', 'nissan', 'nissay', 'nl', 'no', 'nokia', 'northwesternmutual', 'norton', 'now', 'nowruz', 'nowtv', 'np', 'nr', 'nra', 'nrw', 'ntt', 'nu', 'nyc', 'nz', 'obi', 'observer', 'off', 'office', 'okinawa', 'olayan', 'olayangroup', 'oldnavy', 'ollo', 'om', 'omega', 'one', 'ong', 'onl', 'online', 'onyourside', 'ooo', 'open', 'oracle', 'orange', 'org', 'organic', 'orientexpress', 'origins', 'osaka', 'otsuka', 'ott', 'ovh', 'pa', 'page', 'pamperedchef', 'panasonic', 'panerai', 'paris', 'pars', 'partners', 'parts', 'party', 'passagens', 'pay', 'pccw', 'pe', 'pet', 'pf', 'pfizer', 'pg', 'ph', 'pharmacy', 'phd', 'philips', 'phone', 'photo', 'photography', 'photos', 'physio', 'piaget', 'pics', 'pictet', 'pictures', 'pid', 'pin', 'ping', 'pink', 'pioneer', 'pizza', 'pk', 'pl', 'place', 'play', 'playstation', 'plumbing', 'plus', 'pm', 'pn', 'pnc', 'pohl', 'poker', 'politie', 'porn', 'post', 'pr', 'pramerica', 'praxi', 'press', 'prime', 'pro', 'prod', 'productions', 'prof', 'progressive', 'promo', 'properties', 'property', 'protection', 'pru', 'prudential', 'ps', 'pt', 'pub', 'pw', 'pwc', 'py', 'qa', 'qpon', 'quebec', 'quest', 'qvc', 'racing', 'radio', 'raid', 're', 'read', 'realestate', 'realtor', 'realty', 'recipes', 'red', 'redstone', 'redumbrella', 'rehab', 'reise', 'reisen', 'reit', 'reliance', 'ren', 'rent', 'rentals', 'repair', 'report', 'republican', 'rest', 'restaurant', 'review', 'reviews', 'rexroth', 'rich', 'richardli', 'ricoh', 'rightathome', 'ril', 'rio', 'rip', 'rmit', 'ro', 'rocher', 'rocks', 'rodeo', 'rogers', 'room', 'rs', 'rsvp', 'ru', 'rugby', 'ruhr', 'run', 'rw', 'rwe', 'ryukyu', 'sa', 'saarland', 'safe', 'safety', 'sakura', 'sale', 'salon', 'samsclub', 'samsung', 'sandvik', 'sandvikcoromant', 'sanofi', 'sap', 'sapo', 'sarl', 'sas', 'save', 'saxo', 'sb', 'sbi', 'sbs', 'sc', 'sca', 'scb', 'schaeffler', 'schmidt', 'scholarships', 'school', 'schule', 'schwarz', 'science', 'scjohnson', 'scor', 'scot', 'sd', 'se', 'search', 'seat', 'secure', 'security', 'seek', 'select', 'sener', 'services', 'ses', 'seven', 'sew', 'sex', 'sexy', 'sfr', 'sg', 'sh', 'shangrila', 'sharp', 'shaw', 'shell', 'shia', 'shiksha', 'shoes', 'shop', 'shopping', 'shouji', 'show', 'showtime', 'shriram', 'si', 'silk', 'sina', 'singles', 'site', 'sj', 'sk', 'ski', 'skin', 'sky', 'skype', 'sl', 'sling', 'sm', 'smart', 'smile', 'sn', 'sncf', 'so', 'soccer', 'social', 'softbank', 'software', 'sohu', 'solar', 'solutions', 'song', 'sony', 'soy', 'space', 'spiegel', 'sport', 'spot', 'spreadbetting', 'sr', 'srl', 'srt', 'ss', 'st', 'stada', 'staples', 'star', 'starhub', 'statebank', 'statefarm', 'statoil', 'stc', 'stcgroup', 'stockholm', 'storage', 'store', 'stream', 'studio', 'study', 'style', 'su', 'sucks', 'supplies', 'supply', 'support', 'surf', 'surgery', 'suzuki', 'sv', 'swatch', 'swiftcover', 'swiss', 'sx', 'sy', 'sydney', 'symantec', 'systems', 'sz', 'tab', 'taipei', 'talk', 'taobao', 'target', 'tatamotors', 'tatar', 'tattoo', 'tax', 'taxi', 'tc', 'tci', 'td', 'tdk', 'team', 'tech', 'technology', 'tel', 'telecity', 'telefonica', 'temasek', 'tennis', 'teva', 'tf', 'tg', 'th', 'thd', 'theater', 'theatre', 'tiaa', 'tickets', 'tienda', 'tiffany', 'tips', 'tires', 'tirol', 'tj', 'tjmaxx', 'tjx', 'tk', 'tkmaxx', 'tl', 'tm', 'tmall', 'tn', 'to', 'today', 'tokyo', 'tools', 'top', 'toray', 'toshiba', 'total', 'tours', 'town', 'toyota', 'toys', 'tp', 'tr', 'trade', 'trading', 'training', 'travel', 'travelchannel', 'travelers', 'travelersinsurance', 'trust', 'trv', 'tt', 'tube', 'tui', 'tunes', 'tushu', 'tv', 'tvs', 'tw', 'tz', 'ua', 'ubank', 'ubs', 'uconnect', 'ug', 'uk', 'um', 'unicom', 'university', 'uno', 'uol', 'ups', 'us', 'uy', 'uz', 'va', 'vacations', 'vana', 'vanguard', 'vc', 've', 'vegas', 'ventures', 'verisign', 'versicherung', 'vet', 'vg', 'vi', 'viajes', 'video', 'vig', 'viking', 'villas', 'vin', 'vip', 'virgin', 'visa', 'vision', 'vista', 'vistaprint', 'viva', 'vivo', 'vlaanderen', 'vn', 'vodka', 'volkswagen', 'volvo', 'vote', 'voting', 'voto', 'voyage', 'vu', 'vuelos', 'wales', 'walmart', 'walter', 'wang', 'wanggou', 'warman', 'watch', 'watches', 'weather', 'weatherchannel', 'webcam', 'weber', 'website', 'wed', 'wedding', 'weibo', 'weir', 'wf', 'whoswho', 'wien', 'wiki', 'williamhill', 'win', 'windows', 'wine', 'winners', 'wme', 'wolterskluwer', 'woodside', 'work', 'works', 'world', 'wow', 'ws', 'wtc', 'wtf', 'xbox', 'xerox', 'xfinity', 'xihuan', 'xin', 'xperia', 'xxx', 'xyz', 'yachts', 'yahoo', 'yamaxun', 'yandex', 'ye', 'yodobashi', 'yoga', 'yokohama', 'you', 'youtube', 'yt', 'yun', 'za', 'zappos', 'zara', 'zero', 'zip', 'zippo', 'zm', 'zone', 'zuerich', 'zw'];

let ports = {};

let targets = {};
let requests = {};
let paths = {};
let params = {};

let tempRequests = {};

let reqTamplate = {
    url: '',
    domain: '',
    hostname: '',
    ip: '',
    port: 0,
    protocol: '',
    path: '',
    search: '',
    hash: '',
    type: '',
    from: '',
    request_from_webpage: false,
    request: {
        method: '',
        headers: {}, // TODO: 是否单独存储content-type
        length: 0,
        body: '',
        timestamp: 0
    },
    response: {
        status: 0,
        headers: {}, // TODO: 是否单独存储content-type
        length: 0,
        body: '',
        format: '',
        timestamp: 0
    }
};

function getDomain(hostname) {
    if (hostname === '') {
        return '';
    }

    let domain = [];
    let hn = hostname.split('.');
    let i = -1;

    for (i = hn.length-1; i > 0; i--) {
        domain.unshift(hn[i]);
        
        if ($.inArray(hn[i], topDomains) < 0) {
            break;
        }
    }

    if (domain.length === 1) {
        return hn.slice(-2).join('.');
    }
    return domain.join('.');
}

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
        } else {
            paths = req.path.split('/');
            paths[0] = '/';
        }
        
        let tar = {};
        let tempTar = tar;

        tempTar = tempTar[req.domain] = {};
        tempTar = tempTar[req.hostname] = {};
        tempTar = tempTar[paths[0]] = (paths.length===1?{url: req.url}:{children: {}});

        for (let i = 1; i < paths.length; i++) {
            if (i === paths.length-1) {
                tempTar = tempTar.children[paths[i]] = {url: req.url};
            } else {
                tempTar = tempTar.children[paths[i]] = {children: {}};
            }
        }

        $.extend(true, targets, tar);
        console.log(targets);
        
        // post to devtools
        // console.log(requests);
        requests[req.url] = $.extend(true, {}, reqTamplate, req);
    }
}, {urls: ['<all_urls>']}, ['responseHeaders']);

browser.webRequest.onAuthRequired.addListener((details) => {
    console.log(responseDetails.url+'\nauth required');
}, {urls: ['<all_urls>']});

browser.webRequest.onBeforeRedirect.addListener((details) => {
    console.log(responseDetails.url+'\n'+responseDetails.redirectUrl);
}, {urls: ['<all_urls>']});

browser.webRequest.onErrorOccurred.addListener((details) => {
    console.log(responseDetails.url+'\n'+responseDetails.error);
}, {urls: ['<all_urls>']});

browser.runtime.onMessage.addListener((message) => {
    switch (message.cmd) {
        case 'parse_webpage':
            for (let i = 0; i < message.data.urls.length-1; i++) {
                let u = message.data.urls[i];
                
                if (!requests[u.url]) {
                    u.domain = getDomain(u.hostname);
                    u.type = ''; // TODO: getType(url)
                    u.from = message.data.from;

                    // post to devtools
                    // console.log(url);
                    requests[u.url] = $.extend({}, reqTamplate, u);
                }
            }
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
