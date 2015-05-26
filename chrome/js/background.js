var rules = {
    'http://ajax.googleapis.com':'http://ajax.useso.com',
    'http://fonts.googleapis.com':'http://fonts.useso.com',
    'https://ajax.googleapis.com':'https://ajax.lug.ustc.edu.cn',
    'https://fonts.googleapis.com':'https://fonts.lug.ustc.edu.cn',
    'themes.googleusercontent.com':'google-themes.lug.ustc.edu.cn',
    'fonts.gstatic.com':'fonts-gstatic.lug.ustc.edu.cn'
};

chrome.webRequest.onBeforeRequest.addListener(
    function(request) {
        var url = request.url;
        for(var key in rules) {
            if (url.indexOf(key) > -1) {
                url = url.replace(key,rules[key]);
                return {redirectUrl: url};
            }
        }
        return {redirectUrl: url};
    },
    {
        urls: ["<all_urls>"]
    },
    ["blocking"]
);
