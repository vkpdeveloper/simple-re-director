var urlParams;
let mainDiv = document.getElementById('main');
(window.onpopstate = function () {
    var match,
        pl = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();
if (!Object.keys(urlParams).length == 0) {
    if (urlParams['redirectTo'].includes('http://') || urlParams['redirectTo'].includes('https://')) {
        document.getElementsByTagName('title')[0].text = "redirecting...";
        let data;
        let timeOut = 10;
        setInterval(() => {
            mainDiv.innerText = `Redirecting to ${urlParams['redirectTo']} in ${timeOut} seconds.`;
            if(timeOut == 0){
                window.location.replace(urlParams['redirectTo']);
            }else{
                timeOut -= 1;
            }
        }, 1000);
    } else {
        document.getElementsByTagName('title')[0].text = "Invalid URL !";
        let data = document.createTextNode(`Given URL is not a valid URL. URL must be look like : https://example.com or http://www.example.com `)
        mainDiv.appendChild(data);
    }
} else {
    let data = document.createTextNode(`Welcome to re-director built by Vaibhav Pathak`)
    mainDiv.appendChild(data);
}