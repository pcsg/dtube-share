chrome.contextMenus.create({
    title   : 'DTube Share',
    contexts: ['video'],
    onclick : function (info, tab) {
        chrome.tabs.query({
            active       : true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "DTUBE_SHARE"
            }, function (response) {
            });
        });
    }
});
