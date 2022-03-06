'use strict';

//when mouse up, send position to background.js
document.addEventListener('mousedown', function (mousePos) {
  if (mousePos.button == 0) {
      var point = {clientX: mousePos.clientX, clientY: mousePos.clientY};
      var msg = {point, from: 'mousedown'};
      if(typeof chrome.app.isInstalled!=='undefined'){
        chrome.runtime.sendMessage(msg, (response) => {});
     }
    }
})

document.addEventListener('mouseup', function (mousePos) {
  if (mousePos.button == 0) {
      var point = {clientX: mousePos.clientX, clientY: mousePos.clientY};
      var msg = {point, from: 'mouseup'};
      if(typeof chrome.app.isInstalled!=='undefined'){
        chrome.runtime.sendMessage(msg, (response) => {});
     }
  }
})