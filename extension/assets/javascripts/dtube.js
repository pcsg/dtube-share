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

        this.refreshCode();

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

        var Desc = document.createElement('p');
        Desc.classList.add('dtube-share-embedDesc');
        Desc.textContent = 'Post this code into your website, wordpress, drupal, quiqqer or every other content management system';
        Container.appendChild(Desc);

        this.Pre = document.createElement('pre');
        this.Pre.classList.add('dtube-share-embedPre');
        Container.appendChild(this.Pre);

        var WithControls = this.$createSetting('With controls', 'controls');
        WithControls.querySelector('input').addEventListener('change', this.refreshCode.bind(this));
        WithControls.querySelector('input').checked = true;
        Container.appendChild(WithControls);

        var Autoplay = this.$createSetting('Autoplay', 'autoplay');
        Autoplay.querySelector('input').addEventListener('change', this.refreshCode.bind(this));
        Autoplay.querySelector('input').checked = true;
        Container.appendChild(Autoplay);

        Node.appendChild(Container);

        return Node;
    },

    /**
     *
     * @param text
     * @param name
     * @param [type]
     * @return {Element}
     */
    $createSetting: function (text, name, type) {
        type = type || 'checkbox';

        var Settings = document.createElement('label');
        Settings.classList.add('dtube-share-embedPre-setting');

        var Input  = document.createElement('input');
        Input.name = name;
        Input.type = type;


        var Text         = document.createElement('div');
        Text.textContent = text;

        Settings.appendChild(Input);
        Settings.appendChild(Text);

        return Settings;
    },

    /**
     * Display the video code
     *
     * @param {HTMLVideoElement} [Video]
     * @return {string}
     */
    refreshCode: function (Video) {
        var html     = '',
            autoplay = true,
            controls = true;

        if (typeof Video === 'object' || typeof Video === 'undefined') {
            Video = this.Active;
        }

        if (this.App.querySelector('[name="controls"]').checked === false) {
            controls = false;
        }

        if (this.App.querySelector('[name="autoplay"]').checked === false) {
            autoplay = false;
        }

        html = html + '<video' + "\n";
        html = html + ' src="' + Video.getAttribute('src') + '"' + "\n";
        html = html + ' poster="' + Video.getAttribute('poster') + '"' + "\n";

        if (autoplay) {
            html = html + ' autoplay' + "\n";
        }

        if (controls) {
            html = html + ' controls' + "\n";
        }

        html = html + '></video>';

        this.Pre.textContent = html;
    }
};

window.addEventListener("DTUBE_SHARE", function () {
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
