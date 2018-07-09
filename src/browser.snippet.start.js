var rawFile = new XMLHttpRequest();
rawFile.open("GET", 'https://raw.githubusercontent.com/baylrock/CookieClicker-Bot/master/src/bot.js', false);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
            var imported = document.createElement('script');
            imported.innerHTML = rawFile.responseText;
            document.head.appendChild(imported);
            return
        }
    }
    console.log("Bot initialization failed");
};
rawFile.send(null);