
var Helloworld = cc.Layer.extend({
    init:function () {
        this._super();
		
		// close fps display
        cc.Director.getInstance().setDisplayStats(false);
		
        // get window size
        var winSize = cc.Director.getInstance().getWinSize();

		// create title
        var demoTitle = cc.LabelTTF.create("CCCalendar Demo", "Arial Black", 26);
        demoTitle.setPosition(cc.p(winSize.width / 2, winSize.height *12 / 13));
        this.addChild(demoTitle, 1);

        // create calendar layer
        this.calendarLayer = CalendarLayer.createCalendar(this, 2010, 2013, nowStringDate());
        this.calendarLayer.setScale(0.7);
        this.calendarLayer.setPosition(winSize.width / 2 * 0.7, winSize.height / 2 * 0.7);
        this.addChild(this.calendarLayer);

        // create info label receiving && updating delegate message
        this.infoLabel = cc.LabelTTF.create("Current Date: " + nowStringDate(), "Arial", 26);
		this.infoLabel.setPosition(cc.p(winSize.width / 3, 25));
        this.addChild(this.infoLabel);

        // create menu for testing add tag
		cc.MenuItemFont.setFontSize(26);
        var addTagMenuItem = cc.MenuItemFont.create("+TAG", this.addTag, this);
        var removeTagMenuItem = cc.MenuItemFont.create("-TAG", this.removeTag, this);
        var menu = cc.Menu.create(addTagMenuItem, removeTagMenuItem);
        menu.setPosition(cc.p(winSize.width * 4 / 5, 25));
        menu.alignItemsHorizontallyWithPadding(20);
        this.addChild(menu);

        return true;
    },
    // CCCalendar delegate
    calendarDateChanged:function(year, month, day) {
        this.infoLabel.setString("Current Date: " + year + "-" + month + "-" + day);
    },
    // menu
    addTag:function(sender) {
        var caDaysObjectArray = this.calendarLayer.getAllCaDayObjects();
        for (var i = 0; i < caDaysObjectArray.length; i++) {
            // add tag
            var caDayObject = caDaysObjectArray[i];
            var dayTag = cc.Sprite.create(s_DayTag);
            dayTag.setPosition(cc.p(dayTag.getContentSize().width / 2,
                                    caDayObject.getContentSize().height - dayTag.getContentSize().height / 2));
            caDayObject.addChild(dayTag, 1, 999);
        }
    },
    removeTag:function(sender) {
        var caDaysObjectArray = this.calendarLayer.getAllCaDayObjects();
        for (var i = 0; i < caDaysObjectArray.length; i++) {
            // remove tag
            var caDayObject = caDaysObjectArray[i];
            if (caDayObject.getChildByTag(999)) {
                caDayObject.removeChildByTag(999);
            }
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Helloworld();
        layer.init();
        this.addChild(layer);
    }
});

