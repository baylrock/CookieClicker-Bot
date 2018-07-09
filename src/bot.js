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
window.prd_initial_profit = {};
window.prd_initial_profit[window.prd0.id] = 0.1;
window.prd_initial_profit[window.prd1.id] = 1.1;
window.prd_initial_profit[window.prd2.id] = 8;
window.prd_initial_profit[window.prd3.id] = 47;
window.prd_initial_profit[window.prd4.id] = 260;
window.prd_initial_profit[window.prd5.id] = 1400;
window.prd_initial_profit[window.prd6.id] = 7800;
window.prd_initial_profit[window.prd7.id] = 44000;
window.prd_initial_profit[window.prd8.id] = 260000;
window.prd_initial_profit[window.prd9.id] = 1600000;
window.prd_initial_profit[window.prd10.id] = 10000000;
window.prd_initial_profit[window.prd11.id] = 65000000;
window.prd_initial_profit[window.prd12.id] = 430000000;
window.prd_initial_profit[window.prd13.id] = 2900000000;
window.prd_initial_profit[window.prd14.id] = 21000000000;


function calcProfit(productId) {
    try {
        var shop = window.shop = window.shop || window.document.querySelector('#wrapper #game #sectionRight #store');
        shop.querySelector('#' + productId).onmouseover(); // trigger tooltip
        var profitPerBuilding = window.prd_initial_profit[productId];
        try {
            profitPerBuilding = strToNum(window.document.querySelector('#wrapper #game #tooltipAnchor #tooltip .data b').innerHTML);
        } catch (e) {}
        var currentPrice = strToNum(shop.querySelector('#' + productId + ' .content .price').innerHTML);

        var pricePerOneProfitCookie = Number((currentPrice / profitPerBuilding).toFixed(5));

        var cps = strToNum((window.sectionLeft = window.sectionLeft || window.document.querySelector('#wrapper #game #sectionLeft')).querySelector('#cookies div').innerHTML.split(' ')[3]);
        var valueHtml = (window.sectionLeft = window.sectionLeft || window.document.querySelector('#wrapper #game #sectionLeft')).querySelector('#cookies').innerHTML;
        var currentValue = valueHtml.split('<br>')[0];
        if (currentValue === valueHtml) {
            currentValue = valueHtml.split(' ')[0];
        }
        currentValue = strToNum(currentValue);

        var secondsToBuy = (currentPrice - currentValue) / cps;
        if (secondsToBuy <= 1) secondsToBuy = 1;

        return secondsToBuy * pricePerOneProfitCookie;
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
}, 500));

// auto upgrade shop
botEvents.push(setInterval(function () {
    var upgradesShop = window.upgradesShop = window.upgradesShop || window.document.querySelector('#wrapper #game #sectionRight #store #upgrades');
    var upgrade = upgradesShop.querySelector('#upgrade0');
    if (upgrade) {
        upgrade.click()
    }
}, 10000));