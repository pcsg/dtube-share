if (window.location.toString().match('dtube.video')) {
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', chrome.extension.getURL('/assets/javascripts/dtube.js'));
    s.setAttribute('data-icon', chrome.extension.getURL('/assets/images/dtube.png'));
    s.setAttribute('id', 'dtube-share');
    document.body.appendChild(s);

    s = document.createElement('link');
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('href', chrome.extension.getURL('/assets/css/dtube.css'));
    document.body.appendChild(s);

    // listen on context menu
    var messageListener = function (msg, sender, sendResponse) {
        var event = document.createEvent("CustomEvent");

        if (msg.action === 'DTUBE_SHARE') {
            event.initCustomEvent("DTUBE_SHARE", true, true, {
                icon: chrome.extension.getURL('/assets/images/dtube.png')
            });

            window.dispatchEvent(event);
        }
    };

    if (typeof chrome !== 'undefined'
        && typeof chrome.extension !== 'undefined'
        && typeof chrome.extension.onMessage !== 'undefined'
    ) {
        chrome.extension.onMessage.addListener(messageListener);
    } else if (typeof browser !== 'undefined' && typeof browser.runtime !== 'undefined') {
        browser.runtime.onMessage.addListener(messageListener);
    }
}
