const { Cc, Ci } = require("chrome");
const { newURI } = require('sdk/url/utils');

var rules = [
    { "s": "ajax.googleapis.com", "t": "ajax.cat.net" },
    { "s": "fonts.googleapis.com", "t": "fonts.cat.net" },
];

var httpRequestObserver =
    {
        observe: function (subject, topic, data) {
            if (topic == "http-on-modify-request") {
                var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
                var redirectUrl, requestURL = subject.URI.spec;
                for (var i in rules) {
                    if (requestURL.indexOf(rules[i].s)) {
                        redirectUrl = requestURL.replace(rules[i].s, rules[i].t);
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