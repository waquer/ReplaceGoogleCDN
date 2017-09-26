var rules = [
    { "s": "ajax.googleapis.com", "t": "ajax.cat.net" },
    { "s": "fonts.googleapis.com", "t": "fonts.cat.net" },
];

chrome.webRequest.onBeforeRequest.addListener(
    function (request) {
        var redirectUrl, requestURL = request.url;
        for (var i in rules) {
            if (requestURL.indexOf(rules[i].s)) {
                redirectUrl = requestURL.replace(rules[i].s, rules[i].t);
                return { redirectUrl: redirectUrl };
            }
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);
