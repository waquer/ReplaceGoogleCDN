const { Cc, Ci } = require("chrome");
const { newURI } = require('sdk/url/utils');

var rules = {
    'http://ajax.googleapis.com':'http://ajax.useso.com',
    'http://fonts.googleapis.com':'http://fonts.useso.com',
    'https://ajax.googleapis.com':'https://ajax.lug.ustc.edu.cn',
    'https://fonts.googleapis.com':'https://fonts.lug.ustc.edu.cn',
    'themes.googleusercontent.com':'google-themes.lug.ustc.edu.cn',
    'fonts.gstatic.com':'fonts-gstatic.lug.ustc.edu.cn'
};

var httpRequestObserver =
{
    observe: function (subject, topic, data) {
        if (topic == "http-on-modify-request") {
            var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
            var requestURL = subject.URI.spec;
            for(var key in rules) {
                if (requestURL.indexOf(key) > -1) {
                    var redirectUrl = requestURL.replace(key,rules[key]);
                    httpChannel.redirectTo(newURI(redirectUrl));
                }
            }
        }
    },
    get observerService() {
        return Cc["@mozilla.org/observer-service;1"]
            .getService(Ci.nsIObserverService);
    },
    register: function () {
        this.observerService.addObserver(this, "http-on-modify-request", false);
    },
    unregister: function () {
        this.observerService.removeObserver(this, "http-on-modify-request");
    }
};

httpRequestObserver.register();