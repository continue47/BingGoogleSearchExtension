window.onload = function () {
  //get the text from the bing/google search box (both have the input name "q", ez)
  const pageQ = document.getElementsByName("q")[0].value;
  console.log(window.location.hostname, pageQ);

  //send a message out to the extension with the current search param along with the hostname (bing/google)
  chrome.runtime.sendMessage(
    { q: pageQ, hostname: window.location.hostname },
    function (response) {
      //console.log(response);
    }
  );

  //add target _blank to all links on the page (most won't work in the iframes)
  //results container: bing - b_results, google - search
  const gResults = document.getElementById("search");
  var gLinks = gResults.getElementsByTagName("a");
  var gLen = gLinks.length;
  // console.log(gLinks)

  for (var i = 0; i < gLen; i++) {
    gLinks[i].target = "_blank";
  }

  const bResults = document.getElementById("b_results");
  var bLinks = bResults.getElementsByTagName("a");
  var bLen = bLinks.length;
  //console.log(bLinks)

  for (var i = 0; i < bLen; i++) {
    bLinks[i].target = "_blank";
  }
};
