var rules = [
    { "p" : "http://ajax.googleapis.com",    "t" : "http://ajax.useso.com" }
    ,{ "p" : "http://fonts.googleapis.com",  "t" : "http://fonts.useso.com" }
    ,{ "p" : "https://ajax.googleapis.com",  "t" : "https://ajax.lug.ustc.edu.cn" }
    ,{ "p" : "https://fonts.googleapis.com", "t" : "https://fonts.lug.ustc.edu.cn" }
    ,{ "p" : "themes.googleusercontent.com", "t" : "google-themes.lug.ustc.edu.cn" }
    ,{ "p" : "fonts.gstatic.com",            "t" : "fonts-gstatic.lug.ustc.edu.cn" }
    ,{ "p" : "http://(www|\\d).gravatar.com","t" : "http://gravatar.duoshuo.com" }

];

chrome.webRequest.onBeforeRequest.addListener(
    function(request) {
        var url = request.url;
        for(var key in rules) {
            var rule = rules[key];
            var re = new RegExp(rule.p, "i");
            if(re.test(url)) {
                url = url.replace(re, rule.t);
                return {redirectUrl: url};
            }
        }
    },
    {
        urls: ["<all_urls>"]
    },
    ["blocking"]
);
