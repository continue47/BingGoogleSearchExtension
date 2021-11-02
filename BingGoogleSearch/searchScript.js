//this script executes in search.html extension page
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  let q = params.get("q"); //get the url param q
  document.title = q + " - Bing|Google"

  //get the iframes
  const bingIframe = document.getElementById("bingIframe");
  const googleIframe = document.getElementById("googleIframe");

  //search engine urls
  const bingUrl = "https://www.bing.com/search?q=";
  const googleUrl = "https://www.google.com/search?igu=1&q=";

  //update the iframes with the urls + search term q
  bingIframe.src = bingUrl + encodeURIComponent(q);
  googleIframe.src = googleUrl + encodeURIComponent(q);

  //listen from messages from the content script
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(request); //debugging
    console.log(
      //debugging
      sender.tab
        ? " from a content script:" + sender.tab.url
        : " from the extension"
    );

    if (request.q != q) {
      //if the search term q is not the same as the q we have, update the iframes
      if (request.hostname == "www.bing.com") {
        googleIframe.src = googleUrl + encodeURIComponent(request.q);
      } else {
        bingIframe.src = bingUrl + encodeURIComponent(request.q);
      }
      q = request.q; //update q so we don't keep comparing it to the param from the url
      document.title = q + " - Bing|Google"
    }
  });

  //closing bing pane opens up google
  document.getElementById("closeBing").onclick = function () {
    window.location.href = googleUrl + encodeURIComponent(q);
  };
  //closing google pane opens up bing
  document.getElementById("closeGoogle").onclick = function () {
    window.location.href = bingUrl + encodeURIComponent(q);
  };

};
