var rules = [
    { "p" : "//ajax.googleapis.com",   "t" : "//ajax.useso.com" },
    { "p" : "//fonts.googleapis.com",  "t" : "//fonts.useso.com" },
];

chrome.webRequest.onBeforeRequest.addListener(
    function(request) {
        var requestURL = request.url;
        for(var key in rules) {
            var rule = rules[key];
            var re = new RegExp(rule.p, "i");
            if(re.test(requestURL)) {
                var redirectUrl = requestURL.replace(re, rule.t);
                return {redirectUrl: redirectUrl};
            }
        }
    },
    {
        urls: ["<all_urls>"]
    },
    ["blocking"]
);
