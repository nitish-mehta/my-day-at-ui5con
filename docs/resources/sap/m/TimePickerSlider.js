/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","./TimePickerSliderRenderer","sap/ui/core/IconPool","sap/ui/Device","jquery.sap.keycodes"],function(e,t,i,s,n){"use strict";var o=t.extend("sap.m.TimePickerSlider",{metadata:{library:"sap.m",properties:{selectedValue:{type:"string",defaultValue:null},isCyclic:{type:"boolean",defaultValue:true},label:{type:"string",defaultValue:null},isExpanded:{type:"boolean",defaultValue:false}},aggregations:{items:{type:"sap.m.VisibleItem",multiple:true,singularName:"item"},_arrowUp:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_arrowDown:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{expanded:{},collapsed:{}}},renderer:i.render});var a=sap.ui.getCore().getConfiguration().getAnimation()?200:0;var r=50;o.prototype.init=function(){this._bIsDrag=null;this._selectionOffset=0;this._mousedown=false;this._dragSession=null;this._iSelectedItemIndex=-1;this._animatingSnap=false;this._iSelectedIndex=-1;this._animating=false;this._intervalId=null;this._maxScrollTop=null;this._minScrollTop=null;this._marginTop=null;this._marginBottom=null;this._bOneTimeValueSelectionAnimation=false;this._bEnabled=true;if(n.system.desktop){this._fnHandleTypeValues=u.call(this)}this._initArrows()};o.prototype.onAfterRendering=function(){if(n.system.phone){e.sap.delayedCall(0,this,this._afterExpandCollapse)}else{this._afterExpandCollapse()}this._attachEvents()};o.prototype.onThemeChanged=function(e){this.invalidate()};o.prototype.fireTap=function(t){var i,s,o;if(!this.getIsExpanded()){if(n.system.desktop){this.focus()}else{this.setIsExpanded(true)}}else{i=t.srcElement||t.originalTarget;if(i&&i.tagName.toLowerCase()==="li"){s=e(i).text();o=c.call(this,s);this._bOneTimeValueSelectionAnimation=true;this.setSelectedValue(o);this._fireSelectedValueChange(o)}else{this._addSelectionStyle();this.focus()}}};o.prototype.setSelectedValue=function(e){var t=h(this._getVisibleItems(),function(t){return t.getKey()===e}),i=this,s,n,o,r;if(t===-1){return this}if(this.getDomRef()){n=this._getSliderContainerDomRef();o=this._getItemHeightInPx();r=this._getContentRepeat();if(t*o>=this._selectionOffset){s=this._getVisibleItems().length*Math.floor(r/2)+t}else{s=this._getVisibleItems().length*Math.ceil(r/2)+t}if(this._bOneTimeValueSelectionAnimation){this._animatingSnap=true;n.animate({scrollTop:s*o-this._selectionOffset},a,"linear",function(){n.clearQueue();i._animatingSnap=false;i._bOneTimeValueSelectionAnimation=false})}else{n.scrollTop(s*o-this._selectionOffset)}this._removeSelectionStyle();this._iSelectedItemIndex=s;this._addSelectionStyle()}return this.setProperty("selectedValue",e,true)};o.prototype.setIsExpanded=function(t,i){this.setProperty("isExpanded",t,true);if(!this.getDomRef()){return this}var s=this.$();if(t){s.addClass("sapMTPSliderExpanded");if(n.system.phone){e.sap.delayedCall(0,this,function(){this._updateDynamicLayout(t);if(!i){this.fireExpanded({ctrl:this})}})}else{this._updateDynamicLayout(t);if(!i){this.fireExpanded({ctrl:this})}}}else{this._stopAnimation();if(this._animatingSnap===true){this._animatingSnap=false;this._getSliderContainerDomRef().stop(true);this._scrollerSnapped(this._iSelectedIndex)}s.removeClass("sapMTPSliderExpanded");this._updateMargins(t);if(n.system.phone){e.sap.delayedCall(0,this,this._afterExpandCollapse)}else{this._afterExpandCollapse()}if(!i){this.fireCollapsed({ctrl:this})}}return this};o.prototype.setIsCyclic=function(e){if(this.getDomRef()){if(e){this.$().removeClass("sapMTimePickerSliderShort")}else{this.$().addClass("sapMTimePickerSliderShort")}}return this.setProperty("isCyclic",e,false)};o.prototype.onfocusin=function(e){if(n.system.desktop&&!this.getIsExpanded()){this.setIsExpanded(true)}};o.prototype.onfocusout=function(e){var t=e.relatedTarget?e.relatedTarget.id:null,i=[this.getAggregation("_arrowUp").getId(),this.getAggregation("_arrowDown").getId()];if(t&&i.indexOf(t)!==-1){return}if(n.system.desktop&&this.getIsExpanded()){this.setIsExpanded(false)}};o.prototype._onmousewheel=function(e){e.preventDefault();e.stopPropagation();if(!this.getIsExpanded()){return false}var t=e.originalEvent,i=t.detail?-t.detail>0:t.wheelDelta>0,s=i?Math.ceil:Math.floor,n=t.detail?-t.detail/3:t.wheelDelta/120,o=this,a;if(!n){return false}if(!this._aWheelDeltas){this._aWheelDeltas=[]}o._aWheelDeltas.push(n);if(!this._bWheelScrolling){this._bWheelScrolling=true;this._intervalId=setInterval(function(){if(!o._aWheelDeltas.length){clearInterval(o._intervalId);o._bWheelScrolling=false}else{a=o._aWheelDeltas[0];o._aWheelDeltas=[];a=s(a);if(a){o._offsetSlider(a)}}},150)}return false};o.prototype.onsappageup=function(e){if(this.getIsExpanded()){var t=this._getVisibleItems()[0],i=t.getKey();this.setSelectedValue(i);this._fireSelectedValueChange(i)}};o.prototype.onsappagedown=function(e){if(this.getIsExpanded()){var t=this._getVisibleItems()[this._getVisibleItems().length-1],i=t.getKey();this.setSelectedValue(i);this._fireSelectedValueChange(i)}};o.prototype.onsapup=function(e){if(this.getIsExpanded()){this._offsetValue(-1)}};o.prototype.onsapdown=function(e){if(this.getIsExpanded()){this._offsetValue(1)}};o.prototype.onkeydown=function(t){var i=t.which||t.keyCode,s=e.sap.KeyCodes;if(i>=s.A&&i<=s.Z||i>=s.DIGIT_0&&i<=s.DIGIT_9){this._fnHandleTypeValues(t.timeStamp,i)}};o.prototype._getSliderContainerDomRef=function(){return this.$().find(".sapMTimePickerSlider")};o.prototype._getContentRepeat=function(){var e;if(this.getIsCyclic()){e=Math.ceil(r/this._getVisibleItems().length);e=Math.max(e,3)}else{e=1}return e};o.prototype._getItemHeightInPx=function(){return this.$("content").find("li:not(.TPSliderItemHidden)")[0].getBoundingClientRect().height};o.prototype._updateSelectionFrameLayout=function(){var t,i,s,o,a=this.$().offset(),r=a?a.top:0,l=this.$().parents(".sapMTimePickerContainer").offset(),h=l?l.top:0;if(this.getDomRef()){o=this._getItemHeightInPx();t=this.$().find(".sapMTPPickerSelectionFrame");s=r-h;i=(this.$().height()-o)/2+s;t.css("top",i);if(n.system.phone){e.sap.delayedCall(0,this,this._afterExpandCollapse)}else{this._afterExpandCollapse()}}};o.prototype._updateStepAndValue=function(t,i){var s=0,n,o;for(o=0;o<this.getItems().length;o++){if(o%i!==0&&o!==t){this.getItems()[o].setVisible(false)}else{this.getItems()[o].setVisible(true);s++}}if(s>2&&s<13&&this.getDomRef()){n=this.$().find(".sapMTimePickerSlider");n.className="";e(n).addClass("sapMTimePickerSlider SliderValues"+s.toString())}this.setIsCyclic(s>2);this.setSelectedValue(t.toString())};o.prototype._updateMargins=function(t){var i,s,n,o,a;if(this.getDomRef()){i=this._getItemHeightInPx();a=this.$().find(".SliderValues3,.SliderValues4,.SliderValues5,.SliderValues6,.SliderValues7,.SliderValues8,.SliderValues9,.SliderValues10,.SliderValues11,.SliderValues12");if(!a.length){return}if(t){s=(this.$().height()-this._getVisibleItems().length*i)/2;n=s;e.each(a.prevAll().filter(l),function(t,i){n-=e(i).height()});n=Math.max(n,0);o=s;e.each(a.nextAll().filter(l),function(t,i){o-=e(i).height()});o=Math.max(o,0);if(o===0&&n===0){return}}else{n=0;o=0}a.css("margin-top",n);a.css("margin-bottom",o)}};o.prototype._updateDynamicLayout=function(e){this._updateMargins(e);this._updateSelectionFrameLayout()};function l(){return e(this).css("display")!=="none"}o.prototype._getSelectionFrameTopOffset=function(){var e=this._getSliderContainerDomRef().find(".sapMTPPickerSelectionFrame"),t=e.offset();return t.top};o.prototype._animateScroll=function(e){var t=this._getSliderContainerDomRef(),i=t.scrollTop(),s=25,n=t.height(),o=this.$("content").height(),r=200,l=n+r,h=this._getContentRepeat(),d=this.getIsCyclic(),p=.9,f=.05,c=this;this._intervalId=setInterval(function(){c._animating=true;i=i-e*s;if(d){i=c._getUpdatedCycleScrollTop(n,o,i,l,h)}else{if(i>c._maxScrollTop){i=c._maxScrollTop;e=0}if(i<c._minScrollTop){i=c._minScrollTop;e=0}}t.scrollTop(i);e*=p;if(Math.abs(e)<f){var r=c._getItemHeightInPx();var u=c._selectionOffset?c._selectionOffset%r:0;var g=Math.round((i+u)/r)*r-u;clearInterval(c._intervalId);c._animating=null;c._iSelectedIndex=Math.round((i+c._selectionOffset)/r);c._animatingSnap=true;t.animate({scrollTop:g},a,"linear",function(){t.clearQueue();c._animatingSnap=false;if(t.css("visibility")==="visible"){c._scrollerSnapped(c._iSelectedIndex)}})}},s)};o.prototype._stopAnimation=function(){if(this._animating){clearInterval(this._intervalId);this._animating=null}};o.prototype._startDrag=function(e){if(!this._dragSession){this._dragSession={};this._dragSession.positions=[]}this._dragSession.pageY=e;this._dragSession.startTop=this._getSliderContainerDomRef().scrollTop()};o.prototype._doDrag=function(e,t){if(this._dragSession){this._dragSession.offsetY=e-this._dragSession.pageY;this._dragSession.positions.push({pageY:e,timeStamp:t});if(this._dragSession.positions.length>20){this._dragSession.positions.splice(0,10)}if(this._bIsDrag){this._getSliderContainerDomRef().scrollTop(this._dragSession.startTop-this._dragSession.offsetY)}}};o.prototype._endDrag=function(e,t){if(this._dragSession){var i,s;for(var n=this._dragSession.positions.length-1;n>=0;n--){i=t-this._dragSession.positions[n].timeStamp;s=e-this._dragSession.positions[n].pageY;if(i>100){break}}var o=s/i;if(this._animating){clearInterval(this._intervalId);this._intervalId=null;this._animating=null}this._dragSession=null;this._animateScroll(o)}};o.prototype._afterExpandCollapse=function(){var e=this.getSelectedValue(),t=this._getSelectionFrameTopOffset(),i=this._getSliderContainerDomRef(),s=i.offset(),n,o,a,r;this._selectionOffset=t-s.top;if(!this.getIsCyclic()){o=this.$("content");r=this._getItemHeightInPx();a=this.$().height();if(this.getIsExpanded()){this._minScrollTop=0;this._marginTop=t-s.top;this._maxScrollTop=r*(this._getVisibleItems().length-1);n=i.height();this._marginBottom=n-this._marginTop-r;if(this._marginBottom<0){this._marginBottom=a-this._marginTop-r}o.css("margin-top",this._marginTop);o.css("margin-bottom",this._marginBottom)}else{this._marginBottom=a-r;o.css("margin-top",0);o.css("margin-bottom",this._marginBottom)}this._selectionOffset=0}if(!this.getIsExpanded()){this._selectionOffset=0}this.$().attr("aria-expanded",this.getIsExpanded());this.setSelectedValue(e)};o.prototype._getUpdatedCycleScrollTop=function(e,t,i,s,n){var o=t-i-e;while(o<s){i=i-t/n;o=t-i-e}while(i<s){i=i+t/n}return i};o.prototype._scrollerSnapped=function(e){var t=e,i=this._getVisibleItems().length,s;while(t>=i){t=t-i}if(!this.getIsCyclic()){t=e}s=this._getVisibleItems()[t].getKey();this.setSelectedValue(s);this._fireSelectedValueChange(s)};o.prototype._updateScroll=function(){var e=this.getSelectedValue();if(e!==this._getVisibleItems()[0].getKey()&&this._getSliderContainerDomRef().scrollTop()+(this._selectionOffset?this._selectionOffset:0)===0){this.setSelectedValue(e);this._fireSelectedValueChange(e)}};o.prototype._addSelectionStyle=function(){var e=this.$("content").find("li:not(.TPSliderItemHidden)"),t=e.eq(this._iSelectedItemIndex).text(),i;if(!t){return}i=t;if(i&&i.length>1&&i.indexOf("0")===0){i=i.substring(1)}e.eq(this._iSelectedItemIndex).addClass("sapMTimePickerItemSelected");document.getElementById(this.getId()+"-valDescription").innerHTML=i};o.prototype._removeSelectionStyle=function(){var e=this.$("content").find("li:not(.TPSliderItemHidden)");e.eq(this._iSelectedItemIndex).removeClass("sapMTimePickerItemSelected").attr("aria-selected","false")};o.prototype._attachEvents=function(){var t=this._getSliderContainerDomRef()[0];if(n.system.combi){t.addEventListener("touchstart",e.proxy(d,this),false);t.addEventListener("touchmove",e.proxy(p,this),false);document.addEventListener("touchend",e.proxy(f,this),false);t.addEventListener("mousedown",e.proxy(d,this),false);document.addEventListener("mousemove",e.proxy(p,this),false);document.addEventListener("mouseup",e.proxy(f,this),false)}else{if(n.system.phone||n.system.tablet){t.addEventListener("touchstart",e.proxy(d,this),false);t.addEventListener("touchmove",e.proxy(p,this),false);document.addEventListener("touchend",e.proxy(f,this),false)}else{t.addEventListener("mousedown",e.proxy(d,this),false);document.addEventListener("mousemove",e.proxy(p,this),false);document.addEventListener("mouseup",e.proxy(f,this),false)}}};o.prototype._detachEvents=function(){var t=this.getDomRef();if(n.system.combi){t.removeEventListener("touchstart",e.proxy(d,this),false);t.removeEventListener("touchmove",e.proxy(p,this),false);document.removeEventListener("touchend",e.proxy(f,this),false);t.removeEventListener("mousedown",e.proxy(d,this),false);document.removeEventListener("mousemove",e.proxy(p,this),false);document.removeEventListener("mouseup",e.proxy(f,this),false)}else{if(n.system.phone||n.system.tablet){t.removeEventListener("touchstart",e.proxy(d,this),false);t.removeEventListener("touchmove",e.proxy(p,this),false);document.removeEventListener("touchend",e.proxy(f,this),false)}else{t.removeEventListener("mousedown",e.proxy(d,this),false);document.removeEventListener("mousemove",e.proxy(p,this),false);document.removeEventListener("mouseup",e.proxy(f,this),false)}}};o.prototype._offsetValue=function(e){var t=this._getSliderContainerDomRef(),i=t.scrollTop(),s=this._getItemHeightInPx(),n=i+e*s,o=this.getIsCyclic(),r=this,l=this._iSelectedItemIndex+e;if(!o){if(l<0||l>=this._getVisibleItems().length){return}if(n>this._maxScrollTop){n=this._maxScrollTop}if(n<this._minScrollTop){n=this._minScrollTop}}this._animatingSnap=true;t.animate({scrollTop:n},a,"linear",function(){t.clearQueue();r._animatingSnap=false;if(t.css("visibility")==="visible"){r._scrollerSnapped(l)}})};o.prototype._offsetSlider=function(e){var t=this._getSliderContainerDomRef().scrollTop(),i=this,s=i._getSliderContainerDomRef().height(),n=i.$("content").height(),o=200,a=s+o,r=i._getContentRepeat(),l=i.getIsCyclic(),h=i._getItemHeightInPx();t=t-e*h;if(l){t=i._getUpdatedCycleScrollTop(s,n,t,a,r)}else{if(t>i._maxScrollTop){t=i._maxScrollTop}if(t<i._minScrollTop){t=i._minScrollTop}}i._getSliderContainerDomRef().scrollTop(t);i._iSelectedIndex=Math.round((t+i._selectionOffset)/h);i._scrollerSnapped(i._iSelectedIndex)};o.prototype._initArrows=function(){var e=this,t,i;t=new sap.m.Button({icon:s.getIconURI("slim-arrow-up"),press:function(t){e._offsetValue(-1)},type:"Transparent"});t.addEventDelegate({onAfterRendering:function(){t.$().attr("tabindex",-1)}});this.setAggregation("_arrowUp",t);i=new sap.m.Button({icon:s.getIconURI("slim-arrow-down"),press:function(t){e._offsetValue(1)},type:"Transparent"});i.addStyleClass("sapMTimePickerItemArrowDown");i.addEventDelegate({onAfterRendering:function(){i.$().attr("tabindex",-1)}});this.setAggregation("_arrowDown",i)};function h(e,t){if(e==null){throw new TypeError("findIndex called with null or undefined array")}if(typeof t!=="function"){throw new TypeError("predicate must be a function")}var i=e.length;var s=arguments[1];var n;for(var o=0;o<i;o++){n=e[o];if(t.call(s,n,o,e)){return o}}return-1}var d=function(e){var t=e.touches&&e.touches.length?e.touches[0].pageY:e.pageY;this._bIsDrag=false;if(!this.getIsExpanded()){return}this._stopAnimation();this._startDrag(t);e.preventDefault();this._mousedown=true};var p=function(e){var t=e.touches&&e.touches.length?e.touches[0].pageY:e.pageY;if(!this._mousedown||!this.getIsExpanded()){return}if(!this._bIsDrag&&this._dragSession&&this._dragSession.positions.length){var i=this._dragSession.positions.some(function(e){return Math.abs(e.pageY-t)>5});if(i){this._bIsDrag=true}}this._doDrag(t,e.timeStamp);this._mousedown=true};var f=function(e){var t=e.changedTouches&&e.changedTouches.length?e.changedTouches[0].pageY:e.pageY;if(this._bIsDrag===false){this.fireTap(e);this._dragSession=null}this._bIsDrag=true;if(!this.getIsExpanded()){this._dragSession=null;return}this._endDrag(t,e.timeStamp);this._mousedown=false};var c=function(e){var t=this._getVisibleItems();var i=h(t,function(t){return t.getText()===e});return t[i].getKey()};var u=function(){var t=-1,i=-1,s=1e3,n="",o=function(o,a){var r;if(t+s<o){n=""}else{if(i!==-1){e.sap.clearDelayedCall(i);i=-1}}n+=String.fromCharCode(a).toLowerCase();r=this._getVisibleItems().filter(function(e){return e.getKey().indexOf(n)===0});if(r.length>1){i=e.sap.delayedCall(s,this,function(){this.setSelectedValue(n);n="";i=-1})}else if(r.length===1){this.setSelectedValue(r[0].getKey());n=""}t=o};return o};o.prototype._getVisibleItems=function(){return this.getItems().filter(function(e){return e.getVisible()})};o.prototype._setEnabled=function(e){this._bEnabled=e;if(e){this.$().removeClass("sapMTPDisabled");this.$().attr("tabindex",0)}else{this.$().addClass("sapMTPDisabled");this.$().attr("tabindex",-1)}return this};o.prototype._getEnabled=function(e){return this._bEnabled};o.prototype._fireSelectedValueChange=function(e){this.fireEvent("_selectedValueChange",{value:e})};return o});