'use strict';

// mouse drag and drop
let x = 0, y = 0;
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	let mx = 0, my = 0;
	if (msg.from == 'mousedown') {
			x = msg.point.clientX;
			y = msg.point.clientY;
	}
	if (msg.from == 'mouseup') {
		mx = msg.point.clientX - x;
		my = msg.point.clientY - y;
		if(my > 50 && mx > 50){
			getCurrentTabId((id) => {
				chrome.tabs.update(id, {"muted": true})
			})
		}else if(my < -50 && mx < -50){
			getCurrentTabId((id) => {
				chrome.tabs.update(id, {"muted": false})
			})
		}
		
	}
	
	return true;
	
})
// get current tab id
function getCurrentTabId(callback){
 chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	 if(callback) callback(tabs.length ? tabs[0].id: null);
 });
}

// contextMenus (right-click)
chrome.runtime.onInstalled.addListener(function () {
	chrome.contextMenus.create({
		"id": "mute-page" + new Date().getTime(),
		"title" : "ergo-muter"
	});
	

});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	let flag = tab.mutedInfo.muted
	chrome.tabs.update(tab.id, {"muted": !flag})
});