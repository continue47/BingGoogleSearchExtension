function openSearchTab(info, tab) { //open a new tab with search.html extension page and the selected text as url param
  chrome.tabs.create(
    { url: "search.html?q=" + encodeURIComponent(info.selectionText) }
  );
}

chrome.contextMenus.create({ //make the context menu on right click
  id: "binggoogle_search",
  title: "Search with Bing|Google",
  contexts: ["selection"],
  onclick: openSearchTab,
});
