const t={colorSwitchId:null,bodyRef:document.querySelector("body"),startBtnRef:document.querySelector("button[data-start]"),stopBtnRef:document.querySelector("button[data-stop]")};t.startBtnRef.addEventListener("click",(function(){t.startBtnRef.setAttribute("disabled",""),t.colorSwitchId=setInterval((()=>t.bodyRef.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`),1e3)})),t.stopBtnRef.addEventListener("click",(function(){t.startBtnRef.removeAttribute("disabled"),clearInterval(t.colorSwitchId)}));
//# sourceMappingURL=01-color-switcher.93f02dd4.js.map
