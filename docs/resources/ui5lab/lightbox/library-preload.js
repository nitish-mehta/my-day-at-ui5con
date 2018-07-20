jQuery.sap.registerPreloadedModules({
	"version": "2.0",
	"name": "ui5lab.lightbox.library-preload",
	"modules": {
		"ui5lab/lightbox/library.js": "/*!\n * ${copyright}\n */\nsap.ui.define([\"jquery.sap.global\",\"sap/ui/core/library\"],function(i,e){\"use strict\";return sap.ui.getCore().initLibrary({name:\"ui5lab.lightbox\",dependencies:[\"sap.ui.core\"],interfaces:[],controls:[\"ui5lab.lightbox.LightBox\"],elements:[],noLibraryCSS:!1,version:\"${version}\"}),ui5lab.lightbox});",
		"ui5lab/lightbox/LightBox.js": "/*!\n * ${copyright}\n */\nsap.ui.define([\"jquery.sap.global\",\"./library\",\"sap/ui/core/Control\"],function(e,t,i){\"use strict\";return i.extend(\"ui5lab.lightbox.LightBox\",{metadata:{library:\"ui5lab.lightbox\",properties:{width:{type:\"sap.ui.core.CSSSize\",defaultValue:\"200px\"},height:{type:\"sap.ui.core.CSSSize\",defaultValue:\"100px\"},images:{type:\"object[]\",defaultValue:[]}}},init:function(){this.slideIndex=1},openModal:function(){document.getElementById(\"myModal\").style.display=\"block\"},closeModal:function(){document.getElementById(\"myModal\").style.display=\"none\"},plusSlides:function(e){this.showSlides(this.slideIndex+=e)},currentSlide:function(e){this.showSlides(this.slideIndex=e)},showSlides:function(e){var t,i=this.getDomRef(),l=i.querySelectorAll(\".mySlides\"),n=i.querySelectorAll(\".demo\"),o=i.querySelector(\"#caption\");for(e>l.length&&(this.slideIndex=1),e<1&&(this.slideIndex=l.length),t=0;t<l.length;t++)l[t].style.display=\"none\";for(t=0;t<n.length;t++)n[t].className=n[t].className.replace(\" active\",\"\");l[this.slideIndex-1].style.display=\"block\",n[this.slideIndex-1].className+=\" active\",o.innerHTML=n[this.slideIndex-1].alt},_attachEvents:function(t){var i=this.getDomRef();Array.from(i.querySelectorAll(\"img.hover-shadow\")).forEach(function(i,l){e(i).on(\"click\",function(){t.openModal(),t.currentSlide(l+1)})}),e(i.querySelector(\".prev\")).on(\"click\",function(){this.plusSlides(-1)}.bind(this)),e(i.querySelector(\".next\")).on(\"click\",function(){this.plusSlides(1)}.bind(this)),e(i.querySelector(\".close\")).on(\"click\",function(){this.closeModal()}.bind(this)),Array.from(i.querySelectorAll(\".demo\")).forEach(function(t,i){e(t).on(\"click\",function(){this.currentSlide(i+1)}.bind(this))}.bind(this))},onAfterRendering:function(){this._attachEvents(this)}})});",
		"ui5lab/lightbox/LightBoxRenderer.js": "/*!\n * ${copyright}\n */\nsap.ui.define([],function(){\"use strict\";var i={};return i.render=function(i,t){i.write(\"<div\"),i.writeControlData(t),i.addClass(\"lightbox-LightBox\"),i.writeClasses(),i.addStyle(\"width\",t.getWidth()),i.addStyle(\"height\",t.getHeight()),i.writeStyles(),i.write(\">\"),this._writeImages(i,t),this._writeModalWindow(i,t),i.write(\"</div>\")},i._writeModalWindow=function(i,t){for(var e=\"\",s=\"\",a=t.getImages(),r=a.length,d=0;d<a.length;d++)e=e+' <div class=\"mySlides\"> <div class=\"numbertext\">'+d+\" / \"+r+'</div> <img src=\"'+a[d].src+'\" style=\"width:100%\"> </div>',s=s+'<div class=\"column\"> <img class=\"demo\" src=\"'+a[d].src+'\" alt=\"'+a[d].description+'\"> </div>';var c='<div id=\"myModal\" class=\"modal\"> <span class=\"close cursor\">&times;</span> <div class=\"modal-content\">'+e+' \\x3c!-- Next/previous controls --\\x3e <a class=\"prev\">&#10094;</a> <a class=\"next\"\">&#10095;</a> \\x3c!-- Caption text --\\x3e <div class=\"caption-container\"> <p id=\"caption\"></p> </div> \\x3c!-- Thumbnail image controls --\\x3e<div class=\"flex-row\">'+s+\"</div> </div></div>\";i.write(c)},i._writeImages=function(i,t){var e=t.getImages();i.write(\"<div class='grid-row thumbs'>\");for(var s=0;s<e.length;s++){var a=e[s];i.write(\"<div class='column thumb'>\"),i.write(\"<img src='\"),i.write(a.src),i.write(\"' class='hover-shadow'>\"),i.write(\"</div>\")}i.write(\"</div>\")},i},!0);"
	}
});