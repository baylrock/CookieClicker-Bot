var botEvents = [];
var shop = window.shop = window.shop || window.document.querySelector('#wrapper #game #sectionRight #store');
(window.prd14 = window.prd14 || shop.querySelector('#product14'));
(window.prd13 = window.prd13 || shop.querySelector('#product13'));
(window.prd12 = window.prd12 || shop.querySelector('#product12'));
(window.prd11 = window.prd11 || shop.querySelector('#product11'));
(window.prd10 = window.prd10 || shop.querySelector('#product10'));
(window.prd9 = window.prd9 || shop.querySelector('#product9'));
(window.prd8 = window.prd8 || shop.querySelector('#product8'));
(window.prd7 = window.prd7 || shop.querySelector('#product7'));
(window.prd6 = window.prd6 || shop.querySelector('#product6'));
(window.prd5 = window.prd5 || shop.querySelector('#product5'));
(window.prd4 = window.prd4 || shop.querySelector('#product4'));
(window.prd3 = window.prd3 || shop.querySelector('#product3'));
(window.prd2 = window.prd2 || shop.querySelector('#product2'));
(window.prd1 = window.prd1 || shop.querySelector('#product1'));
(window.prd0 = window.prd0 || shop.querySelector('#product0'));
window.prd = window.prd || [
    window.prd0, window.prd1, window.prd2,
    window.prd3, window.prd4, window.prd5,
    window.prd6, window.prd7, window.prd8,
    window.prd9, window.prd10, window.prd11,
    window.prd12, window.prd13, window.prd14];

function calcProfit(productId) {
    productId = '#' + productId;
    try {
        var shop = window.shop = window.shop || window.document.querySelector('#wrapper #game #sectionRight #store');
        shop.querySelector(productId).onmouseover(); // trigger tooltip
        var profitPerBuilding = strToNum(window.document.querySelector('#wrapper #game #tooltipAnchor #tooltip .data b').innerHTML);
        var currentPrice = strToNum(shop.querySelector(productId + ' .content .price').innerHTML);

        var pricePerOneProfitCookie = Number((currentPrice / profitPerBuilding).toFixed(5));

        var cps = strToNum((window.sectionLeft = window.sectionLeft || window.document.querySelector('#wrapper #game #sectionLeft')).querySelector('#cookies div').innerHTML.split(' ')[3]);
        var cuurentValue = strToNum((window.sectionLeft = window.sectionLeft || window.document.querySelector('#wrapper #game #sectionLeft')).querySelector('#cookies').innerHTML.split('<br>')[0]);

        var seccondsToBuy = (currentPrice - cuurentValue) / cps;
        if (seccondsToBuy <= 1) seccondsToBuy = 1;

        return seccondsToBuy * pricePerOneProfitCookie;
    } catch (e) {
        return Number.POSITIVE_INFINITY;
    }
}

function strToNum(str) {
    var numStr = "";
    for (var string of str.split(',')) {
        numStr = numStr + string;
    }
    return Number(numStr);
}

// auto clicker
botEvents.push(setInterval(function () {
    (window.bigCookieBtn = window.bigCookieBtn || window.document.querySelector('#wrapper #game #sectionLeft #cookieAnchor #bigCookie')).click();
}, 0));


botEvents.push(setInterval(function () {
    var goldenCookiesHolder = window.goldenCookiesHolder = window.goldenCookiesHolder || window.document.querySelector('#wrapper #game #shimmers');
    var goldenCookie = goldenCookiesHolder.querySelector('.shimmer');
    if (goldenCookie) {
        goldenCookie.click();
    }
}, 500));


// auto shop
botEvents.push(setInterval(function () {
    var min = Number.POSITIVE_INFINITY;
    var mostProfitable = null;
    for (var prdElement of window.prd) {
        var value = calcProfit(prdElement.id);
        if (value < min) {
            min = value;
            mostProfitable = prdElement;
        }
    }
    prdElement.onmouseout();
    if (mostProfitable) {
        mostProfitable.click();
    }
}, 2000));

// auto upgrade shop
botEvents.push(setInterval(function () {
    var upgradesShop = window.upgradesShop = window.upgradesShop || window.document.querySelector('#wrapper #game #sectionRight #store #upgrades');
    var upgrade = upgradesShop.querySelector('#upgrade0');
    if (upgrade) {
        upgrade.click()
    }
}, 10000));