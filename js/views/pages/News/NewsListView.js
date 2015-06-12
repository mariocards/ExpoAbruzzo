define(function (require) {

    var Backbone = require("backbone");
    var NewsC = require("collections/NewsC");
    var Utils = require("utils");
    var NewsListView = Utils.Page.extend({
        constructorName: "NewsListView",
        model: NewsC,
        initialize: function () {
            this.template = Utils.templates.newslistview;
            this.model.on('sync', this.render, this);
            $('#back-button').css('display', 'block');
            $('#settingsModal').css('display', 'none');
            $('#toggle-button').css('display', 'none');
        },
        id: "newslistview",
        className: "i-g page",
        events: {
            "tap #eventListItem": "newsDetail",
            "scroll": "fetchSheets"
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        newsDetail: function (ev) {
            newsItem = this.model.get($(ev.currentTarget).data('id'));
            var item = {news: newsItem.attributes};
            Backbone.history.navigate("newsview/" + $(ev.currentTarget).data('id'),
                    {trigger: true});
        },
        fetchSheets: function (e) {
            var delta = this.checkScroll();
            if (delta > -60) {
                this.model.iniziale += 5;
                this.model.fetch({remove: false});
            }

        },
        checkScroll: function () {
            var scrollHeight = this.el.offsetHeight;
            console.log("scrollHeight " + scrollHeight);
            var scrollTop = this.el.scrollHeight;// Altezza del contenuto di Page
            console.log("scrollTop " + scrollTop);
            var offsetHeight = this.el.scrollTop;  // Delta spostamento dello spostamento
            console.log("offsetHeight" + offsetHeight);
            return (scrollHeight - (scrollTop - offsetHeight));
        }

    });

    return NewsListView;

});