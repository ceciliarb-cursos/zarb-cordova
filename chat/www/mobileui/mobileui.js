/*component-base*/var userAgent=navigator.userAgent||navigator.vendor||window.opera,SO={name:"unknown",code:0};/android/i.test(userAgent)&&(SO.name="Android",SO.class="platform-android",SO.code=1);/iPad|iPhone|iPod/.test(userAgent)&&!window.MSStream&&(SO.name="iOS",SO.class="platform-ios",SO.code=2);/windows phone/i.test(userAgent)&&(SO.name="Windows Phone",SO.class="platform-wp",SO.code=3);SO.class&&document.getElementsByTagName("body").length&&(document.getElementsByTagName("body")[0].className+=" "+SO.class);
/*component-button*/document.addEventListener("click",function(e){if(1!==SO.code)return!1;var t=e.target;if("button"!==t.tagName.toLowerCase())return!1;var o=t.getBoundingClientRect(),s=t.querySelector(".ripple");s||((s=document.createElement("span")).className="ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",t.appendChild(s)),s.classList.remove("show");var a=e.pageY-o.top-s.offsetHeight/2-document.body.scrollTop,l=e.pageX-o.left-s.offsetWidth/2-document.body.scrollLeft;return s.style.top=a+"px",s.style.left=l+"px",s.classList.add("show"),!1},!1);
/*component-input*/!function e(){setTimeout(function(){var t=document.getElementsByTagName("input");for(i in t){var a=t[i].parentNode;a&&(a.className.indexOf("left")>=0||a.className.indexOf("right")>=0)&&a.parentNode.className.indexOf("item")>=0&&(a=a.parentNode),a&&a.className.indexOf("item")>=0&&a.className.indexOf("bind-input-event-click")<0&&(a.className+=" bind-input-event-click",a.addEventListener("click",function(){this.getElementsByTagName("input").length&&(this.getElementsByTagName("input")[0].focus(),"radio"!==this.getElementsByTagName("input")[0].type||this.getElementsByTagName("input")[0].disabled||(this.getElementsByTagName("input")[0].checked=!0))},!1))}var l=document.getElementsByClassName("label-float");for(i in l)l[i].className&&l[i].className.indexOf("bind-input-event-focus")<0&&l[i].querySelectorAll("input,textarea").length&&(l[i].className+=" bind-input-event-focus",l[i].querySelectorAll("input,textarea")[0].addEventListener("focus",function(){this.parentNode.getElementsByTagName("label").length&&this.parentNode.getElementsByTagName("label")[0].className.indexOf("focus")<0&&(this.parentNode.getElementsByTagName("label")[0].className+=" focus")},!1),l[i].querySelectorAll("input,textarea")[0].addEventListener("blur",function(){this.parentNode.getElementsByTagName("label").length&&this.parentNode.getElementsByTagName("label")[0].className&&!this.value.length&&(this.parentNode.getElementsByTagName("label")[0].className=this.parentNode.getElementsByTagName("label")[0].className.replace("focus",""))},!1),l[i].querySelectorAll("input,textarea")[0].value&&l[i].querySelectorAll("input,textarea")[0].value.length&&(l[i].querySelectorAll("input,textarea")[0].parentNode.getElementsByTagName("label")[0].className+=" focus"));e()},500)}();
