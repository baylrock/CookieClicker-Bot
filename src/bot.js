CCBot = {
    botEvents: [],
    shop: null,
    upgradesShop : null,
    products: null,
    prd_initial_profit: {},
    initialized : false,


    init: function () {
        if (this.initialized) {
            console.log("CCBot Already initialized");
            return;
        }
        try {
            this.bigCookieBtn = this.bigCookieBtn || window.document.querySelector('#wrapper #game #sectionLeft #cookieAnchor #bigCookie');
            this.shop = this.shop || window.document.querySelector('#wrapper #game #sectionRight #store');
            this.upgradesShop = this.upgradesShop || window.document.querySelector('#wrapper #game #sectionRight #store #upgrades');
            this.goldenCookiesHolder = this.goldenCookiesHolder || window.document.querySelector('#wrapper #game #shimmers');
            this.products = this.products || [
                this.shop.querySelector('#product0'),
                this.shop.querySelector('#product1'),
                this.shop.querySelector('#product2'),
                this.shop.querySelector('#product3'),
                this.shop.querySelector('#product4'),
                this.shop.querySelector('#product5'),
                this.shop.querySelector('#product6'),
                this.shop.querySelector('#product7'),
                this.shop.querySelector('#product8'),
                this.shop.querySelector('#product9'),
                this.shop.querySelector('#product10'),
                this.shop.querySelector('#product11'),
                this.shop.querySelector('#product12'),
                this.shop.querySelector('#product13'),
                this.shop.querySelector('#product14'),
            ];

            this.prd_initial_profit[this.products[0].id] = 0.1;
            this.prd_initial_profit[this.products[1].id] = 1.1;
            this.prd_initial_profit[this.products[2].id] = 8;
            this.prd_initial_profit[this.products[3].id] = 47;
            this.prd_initial_profit[this.products[4].id] = 260;
            this.prd_initial_profit[this.products[5].id] = 1400;
            this.prd_initial_profit[this.products[6].id] = 7800;
            this.prd_initial_profit[this.products[7].id] = 44000;
            this.prd_initial_profit[this.products[8].id] = 260000;
            this.prd_initial_profit[this.products[9].id] = 1600000;
            this.prd_initial_profit[this.products[10].id] = 10000000;
            this.prd_initial_profit[this.products[11].id] = 65000000;
            this.prd_initial_profit[this.products[12].id] = 430000000;
            this.prd_initial_profit[this.products[13].id] = 2900000000;
            this.prd_initial_profit[this.products[14].id] = 21000000000;

            this.initialized = true;

            this.fireBotEvents();
        } catch (e) {
            console.log("Initialization failed.", e);
            this.shutdown();
        }
    },


    fireBotEvents: function () {
        if (!this.initialized) {
            throw "Can't start bot while it is not initialized!"
        }
        this.pushEvent(function () {
            this.bigCookieBtn.click();
        });

        this.pushEvent(function () {
            var goldenCookie = this.goldenCookiesHolder.querySelector('.shimmer');
            if (goldenCookie) {
                goldenCookie.click();
            }
        }, 500);

        this.pushEvent(function () {
            var min = Number.POSITIVE_INFINITY;
            var mostProfitable = null;
            for (var prdElement of this.products) {
                var value = this.calcProfit(prdElement.id);
                if (value < min) {
                    min = value;
                    mostProfitable = prdElement;
                }
            }
            prdElement.onmouseout();
            if (mostProfitable) {
                mostProfitable.click();
            }
        }, 500);

        this.pushEvent(function () {
            var upgrade = this.upgradesShop.querySelector('#upgrade0');
            if (upgrade) {
                upgrade.click()
            }
        }, 10000);
    },

    pushEvent: function (event, interval) {
        this.botEvents.push(setInterval(event, interval || 0));
    },


    calcProfit: function (productId) {
        try {
            this.shop.querySelector('#' + productId).onmouseover(); // trigger tooltip
            var profitPerBuilding = this.prd_initial_profit[productId];
            try {
                profitPerBuilding = this.strToNum(window.document.querySelector('#wrapper #game #tooltipAnchor #tooltip .data b').innerHTML);
            } catch (e) {
            }
            var currentPrice = this.strToNum(this.shop.querySelector('#' + productId + ' .content .price').innerHTML);

            var pricePerOneProfitCookie = Number((currentPrice / profitPerBuilding).toFixed(5));

            var cps = this.strToNum((window.sectionLeft = window.sectionLeft || window.document.querySelector('#wrapper #game #sectionLeft')).querySelector('#cookies div').innerHTML.split(' ')[3]);
            var valueHtml = (window.sectionLeft = window.sectionLeft || window.document.querySelector('#wrapper #game #sectionLeft')).querySelector('#cookies').innerHTML;
            var currentValue = valueHtml.split('<br>')[0];
            if (currentValue === valueHtml) {
                currentValue = valueHtml.split(' ')[0];
            }
            currentValue = this.strToNum(currentValue);

            var secondsToBuy = (currentPrice - currentValue) / cps;
            if (secondsToBuy <= 1) secondsToBuy = 1;

            return secondsToBuy * pricePerOneProfitCookie;
        } catch (e) {
            return Number.POSITIVE_INFINITY;
        }
    },


    strToNum: function (str) {
        var numStr = "";
        for (var string of str.split(',')) {
            numStr = numStr + string;
        }
        return Number(numStr);
    },


    shutdown : function () {
        for (var botEvent of this.botEvents) {
            clearInterval(botEvent)
        }
        this.shop = null;
        this.upgradesShop = null;
        this.products = null;
        this.prd_initial_profit = {};
        this.initialized = false;
    }
};


CCBot.init();
// CCBot.shutdown();

