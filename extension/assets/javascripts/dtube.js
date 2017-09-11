/**
 * Main DTube Share Object
 *
 * @type {{open: DTubeShare.open, close: DTubeShare.close}}
 */
var DTubeShare = {

    Active: null,

    /**
     * Open share menu
     */
    open: function () {
        var self = this;

        this.App = document.createElement('div');
        this.App.classList.add('dtube-share');
        this.App.appendChild(this.create());

        var Icon = document.createElement('span');
        Icon.classList.add('dtube-share-close-icon');

        var Close       = document.createElement('div');
        Close.className = 'dtube-share-close';

        Close.addEventListener('mousedown', function (event) {
            event.preventDefault();
            self.close();
        });

        Close.appendChild(Icon);
        this.App.appendChild(Close);
        document.body.appendChild(this.App);

        this.App.classList.add('dtube-share-fadeInDown');
    },

    /**
     * Close share menu
     */
    close: function () {
        if (!this.App) {
            var App = document.querySelector('.dtube-share');

            if (!App) {
                return;
            }

            App.classList.remove('dtube-share-fadeInDown');
            App.classList.add('dtube-share-fadeOutUp');

            setTimeout(function () {
                App.parentNode.removeChild(App);
            }.bind(this), 600);

            return;
        }

        var self = this,
            Apps = document.querySelectorAll('.dtube-share');

        if (Apps.length) {
            [].forEach.call(Apps, function (App) {
                App.classList.remove('dtube-share-fadeInDown');
                App.classList.add('dtube-share-fadeOutUp');

                setTimeout(function () {
                    this.parentNode.removeChild(this);
                    self.App = null;
                }.bind(App), 600);
            });
        }
    },

    /**
     * Create the inner html
     *
     * @return {Element}
     */
    create: function () {
        var Node = document.createElement('div');

        if (!this.Active) {
            return Node;
        }

        // embed
        var Container = document.createElement('div');
        Container.classList.add('dtube-share-embed');

        var Title = document.createElement('div');
        Title.classList.add('dtube-share-embedTitle');
        Title.textContent = 'Embed Code';
        Container.appendChild(Title);

        this.Pre = document.createElement('pre');
        this.Pre.classList.add('dtube-share-embedPre');
        this.Pre.textContent = this.getHtmlFromNode(this.Active);
        Container.appendChild(this.Pre);

        Node.appendChild(Container);

        return Node;
    },

    /**
     * Return the video html
     *
     * @param {HTMLVideoElement} Video
     * @return {string}
     */
    getHtmlFromNode: function (Video) {
        var html = '';

        html = html + '<video' + "\n";
        html = html + ' src="' + Video.getAttribute('src') + '"' + "\n";
        html = html + ' poster="' + Video.getAttribute('poster') + '"' + "\n";
        html = html + ' controls' + "\n";
        html = html + ' autoplay' + "\n";
        html = html + '></video>';

        return html;
    }
};

window.addEventListener("DTUBE_SHARE", function (event) {
    var Target = document.activeElement;

    if (Target.nodeName !== 'VIDEO') {
        Target = document.querySelector('main video');
    }

    if (!Target) {
        return;
    }

    DTubeShare.Active = Target;
    DTubeShare.open();
});
