function CCBot() {
    var self = this;

    var botEvents = [];
    var bigCookieBtn = null;
    var goldenCookiesHolder = null;
    var productsListId = null;
    var initialized = false;



    var bigCookieClickRate = 100;
    var goldenCookieClickRate = 500;
    var buyBuildingRate = 500;
    var buyUpgradeRateRate = 10000;


    this.init = function () {
        if (initialized) {
            console.log("CCBot Already initialized");
            return;
        }
        try {
            bigCookieBtn = window.document.querySelector('#wrapper #game #sectionLeft #cookieAnchor #bigCookie');
            goldenCookiesHolder = window.document.querySelector('#wrapper #game #shimmers');
            productsListId = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
            ];
            initialized = true;

            this.fireBotEvents();
        } catch (e) {
            console.log("Initialization failed.", e);
            this.shutdown();
        }
    };


    this.shutdown = function () {
        for (var botEvent of botEvents) {
            clearInterval(botEvent)
        }
        initialized = false;
    };

    this.calcProfit = function (productId) {
        try {
            var building = Game.ObjectsById[productId];
            var profitPerBuilding = building.cps(building);
            if (!profitPerBuilding || profitPerBuilding === 0) {
                profitPerBuilding = building.baseCps;
            }

            var currentPrice = building.price;

            var pricePerOneProfitCookie = Number((currentPrice / profitPerBuilding).toFixed(5));

            var cps = Game.cookiesPs;
            var currentValue = Game.cookies;

            let secondsToBuy = (currentPrice - currentValue) / cps;
            var secondsToBuy_Normalized = secondsToBuy * 0.002;
            if (secondsToBuy_Normalized <= 1) secondsToBuy_Normalized = 1;

            return secondsToBuy_Normalized * pricePerOneProfitCookie;
        } catch (e) {
            return Number.POSITIVE_INFINITY;
        }
    };
    this.bigCookieClick = function () {
        bigCookieBtn.click();
    };
    this.goldenCookieClick = function () {
        var goldenCookie = goldenCookiesHolder.querySelector('.shimmer');
        if (goldenCookie) {
            goldenCookie.click();
        }
    };
    this.buyBuilding = function (self) {
        var min = Number.POSITIVE_INFINITY;
        var mostProfitable = null;
        for (var id of productsListId) {
            var value = self.calcProfit(id);
            if (value < min) {
                min = value;
                mostProfitable = id;
            }
        }
        if (mostProfitable || mostProfitable === 0) {
            Game.ObjectsById[mostProfitable].buy();
        }
    };

    var ignoreUpgrades = [182, 183, 184, 185, 209, 331, 333, 414, 361]
    this.buyUpgrade = function () {
        var upgrade = Game.UpgradesInStore[0];

        Game.UpgradesInStore.forEach(u => {
            if (u.canBuy() && ignoreUpgrades.indexOf(u.id) === -1) {
                u.buy()
            }
        })
    };

    this.fireBotEvents = function () {
        if (!initialized) {
            throw "Can't start bot while it is not initialized!"
        }
        this.pushEvent(this.bigCookieClick, bigCookieClickRate);

        this.pushEvent(this.goldenCookieClick, goldenCookieClickRate);

        this.pushEvent(function () {
            self.buyBuilding(self)
        }, buyBuildingRate);

        this.pushEvent(this.buyUpgrade, buyUpgradeRateRate);
    };
    this.pushEvent = function (event, interval) {
        botEvents.push(setInterval(event, interval || 0));
    };

    this.setBigCookieClickRate = function(rate) {
        bigCookieClickRate = rate || bigCookieClickRate === 0 || bigCookieClickRate;
        this.shutdown();
        this.init()
    };

    this.setGoldenCookieClickRate = function(rate) {
        goldenCookieClickRate = rate || goldenCookieClickRate === 0 ||  goldenCookieClickRate;
        this.shutdown();
        this.init()
    };

    this.setBuyBuildingRate = function(rate) {
        buyBuildingRate = rate || buyBuildingRate === 0 ||  buyBuildingRate;
        this.shutdown();
        this.init()
    };
    this.setBuyUpgradeRate = function(rate) {
        buyUpgradeRateRate = rate || buyUpgradeRateRate === 0 ||  buyUpgradeRateRate;
        this.shutdown();
        this.init()
    };

}

(botInst = new CCBot()).init();
// botInst.shutdown();

