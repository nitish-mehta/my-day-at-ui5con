/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","../base/EventProvider","./Popup","./Core","./BusyIndicatorUtils","sap/ui/core/library"],function(e,t,s,i,o,a){"use strict";var n=a.BusyIndicatorSize;var r=e.extend(new t,{oPopup:null,oDomRef:null,bOpenRequested:false,iDEFAULT_DELAY_MS:1e3,sDOM_ID:"sapUiBusyIndicator"});r.M_EVENTS={Open:"Open",Close:"Close"};r._bShowIsDelayed=undefined;r._init=function(){var e=document.createElement("div");e.id=this.sDOM_ID;var t=document.createElement("div");this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");var i=this._oResBundle.getText("BUSY_TEXT");delete this._oResBundle;t.className="sapUiBusy";t.setAttribute("tabindex","0");t.setAttribute("role","progressbar");t.setAttribute("alt","");t.setAttribute("title",i);e.appendChild(t);var a=o.getElement(n.Large);a.setAttribute("title",i);e.appendChild(a);var r=sap.ui.getCore().getStaticAreaRef();r.appendChild(e);this.oDomRef=e;this.oPopup=new s(e);this.oPopup.setModal(true,"sapUiBlyBusy");this.oPopup.setShadow(false);this.oPopup.attachOpened(function(e){this._onOpen(e)},this)};r._onOpen=function(t){var s=e.sap.domById(r.sDOM_ID);s.style.height="100%";s.style.width="100%";var i=s.querySelector(".sapUiLocalBusyIndicator");i.className+=" sapUiLocalBusyIndicatorFade";e.sap.focus(s);e("body").attr("aria-busy",true);this.fireOpen({$Busy:this.oPopup._$()})};r.show=function(t){e.sap.log.debug("sap.ui.core.BusyIndicator.show (delay: "+t+") at "+(new Date).getTime());e.sap.assert(t===undefined||typeof t=="number"&&t%1==0,"iDelay must be empty or an integer");if(!document.body||!sap.ui.getCore().isInitialized()){if(r._bShowIsDelayed===undefined){sap.ui.getCore().attachInit(function(){if(r._bShowIsDelayed){r.show(t)}})}r._bShowIsDelayed=true;return}if(t===undefined||t!=0&&parseInt(t,10)==0||parseInt(t,10)<0){t=this.iDEFAULT_DELAY_MS}if(e.sap.fesr.getActive()){this._fDelayedStartTime=e.sap.now()+t}if(!this.oDomRef){this._init()}this.bOpenRequested=true;if(t===0){this._showNowIfRequested()}else{e.sap.delayedCall(t,this,"_showNowIfRequested")}};r._showNowIfRequested=function(){e.sap.log.debug("sap.ui.core.BusyIndicator._showNowIfRequested (bOpenRequested: "+this.bOpenRequested+") at "+(new Date).getTime());if(!this.bOpenRequested){return}var t=window.scrollX===undefined?window.pageXOffset:window.scrollX;var i=window.scrollY===undefined?window.pageYOffset:window.scrollY;var o=t+" "+i;this.bOpenRequested=false;this.oPopup.open(0,s.Dock.LeftTop,s.Dock.LeftTop,document,o)};r.hide=function(){e.sap.log.debug("sap.ui.core.BusyIndicator.hide at "+(new Date).getTime());if(this._fDelayedStartTime){var t=e.sap.now()-this._fDelayedStartTime;e.sap.fesr.addBusyDuration(t>0?t:0);delete this._fDelayedStartTime}var s=r;if(r._bShowIsDelayed===true){r._bShowIsDelayed=false}s.bOpenRequested=false;if(s.oDomRef){e("body").removeAttr("aria-busy");var i=s.oDomRef.querySelector(".sapUiLocalBusyIndicator");e(i).removeClass("sapUiLocalBusyIndicatorFade");this.fireClose({$Busy:this.oPopup._$()});s.oPopup.close(0)}};r.attachOpen=function(e,t){this.attachEvent(r.M_EVENTS.Open,e,t);return this};r.detachOpen=function(e,t){this.detachEvent(r.M_EVENTS.Open,e,t);return this};r.attachClose=function(e,t){this.attachEvent(r.M_EVENTS.Close,e,t);return this};r.detachClose=function(e,t){this.detachEvent(r.M_EVENTS.Close,e,t);return this};r.fireOpen=function(e){this.fireEvent(r.M_EVENTS.Open,e)};r.fireClose=function(e){this.fireEvent(r.M_EVENTS.Close,e)};return r},true);