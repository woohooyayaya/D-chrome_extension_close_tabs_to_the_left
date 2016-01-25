function getCurrentTab(callback){
	var queryInfo = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(queryInfo,function(tabs){
		//active tab
		var tab = tabs[0];
		var tabIndex = tab.index;
		var tabWindowId = tab.windowId;

		if(tabIndex != 0){
			callback(tabIndex,tabWindowId);
			renderStatus("Success!");
		}
		else{
			renderStatus("LEFTMOST TAB!");
		}

		setTimeout(function(){
			window.close()
		},3000);

	});

}

function closeTabsToTheLeft(tabIndex,tabWindowId){
	for(var i=tabIndex-1;i>=0;i--){
		var queryInfo = {
			index: i,
			windowId: tabWindowId
		};

		chrome.tabs.query(queryInfo,function(tabs){
			var tab = tabs[0];
			var tabId = tab.id;
			chrome.tabs.remove(tabId);
		});
	}

}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

getCurrentTab(closeTabsToTheLeft);