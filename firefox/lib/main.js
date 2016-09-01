const { Cc, Ci } = require("chrome");
const { newURI } = require('sdk/url/utils');

var rules = [
    { "p" : "//ajax.googleapis.com",   "t" : "//ajax.useso.com" },
    { "p" : "//fonts.googleapis.com",  "t" : "//fonts.useso.com" }
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