const { Cc, Ci } = require("chrome");
const { newURI } = require('sdk/url/utils');

var rules = [
    { "p" : "http://ajax.googleapis.com",    "t" : "http://ajax.useso.com" }
    ,{ "p" : "http://fonts.googleapis.com",  "t" : "http://fonts.useso.com" }
    ,{ "p" : "https://ajax.googleapis.com",  "t" : "https://ajax.lug.ustc.edu.cn" }
    ,{ "p" : "https://fonts.googleapis.com", "t" : "https://fonts.lug.ustc.edu.cn" }
    ,{ "p" : "themes.googleusercontent.com", "t" : "google-themes.lug.ustc.edu.cn" }
    ,{ "p" : "fonts.gstatic.com",            "t" : "fonts-gstatic.lug.ustc.edu.cn" }
    ,{ "p" : "http://(www|\\d).gravatar.com","t" : "http://gravatar.duoshuo.com" }

];

var httpRequestObserver =
{
    observe: function (subject, topic, data) {
        if (topic == "http-on-modify-request") {
            var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
            var requestURL = subject.URI.spec;
            for(var key in rules) {
                var rule = rules[key];
                var re = new RegExp(rule.p, "i");
                if (re.test(requestURL)) {
                    var redirectUrl = requestURL.replace(re, rule.t);
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