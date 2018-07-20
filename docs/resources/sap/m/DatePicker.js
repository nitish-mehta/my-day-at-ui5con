/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/Device","./InputBase","./DateTimeField","sap/ui/core/date/UniversalDate","./library","sap/ui/core/Control","sap/ui/core/library","./DatePickerRenderer"],function(t,e,a,i,s,o,n,r,p){"use strict";var l=r.TextAlign;var h=r.CalendarType;var u;var d=i.extend("sap.m.DatePicker",{metadata:{library:"sap.m",properties:{displayFormatType:{type:"string",group:"Appearance",defaultValue:""},secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance",defaultValue:null},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null}},aggregations:{specialDates:{type:"sap.ui.core.Element",multiple:true,singularName:"specialDate"}},associations:{legend:{type:"sap.ui.core.Control",multiple:false}},events:{navigate:{parameters:{dateRange:{type:"sap.ui.unified.DateRange"}}}},designtime:"sap/m/designtime/DatePicker.designtime"}});d.prototype.init=function(){a.prototype.init.apply(this,arguments);this._bIntervalSelection=false;this._bOnlyCalendar=true;this._bValid=true;this._oMinDate=new Date(1,0,1);this._oMinDate.setFullYear(1);this._oMaxDate=new Date(9999,11,31,23,59,59,999)};d.prototype.exit=function(){a.prototype.exit.apply(this,arguments);if(this._oPopup){if(this._oPopup.isOpen()){this._oPopup.close()}delete this._oPopup}if(this._oCalendar){this._oCalendar.destroy();delete this._oCalendar}if(this._iInvalidateCalendar){t.sap.clearDelayedCall(this._iInvalidateCalendar)}this._sUsedDisplayPattern=undefined;this._sUsedDisplayCalendarType=undefined;this._oDisplayFormat=undefined;this._sUsedValuePattern=undefined;this._sUsedValueCalendarType=undefined;this._oValueFormat=undefined};d.prototype.invalidate=function(e){if(!e||e!=this._oCalendar){n.prototype.invalidate.apply(this,arguments);this._iInvalidateCalendar=t.sap.delayedCall(0,this,T)}};d.prototype.onBeforeRendering=function(){a.prototype.onBeforeRendering.apply(this,arguments);this._checkMinMaxDate()};d.prototype.setWidth=function(t){return a.prototype.setWidth.call(this,t||"100%")};d.prototype.getWidth=function(t){return this.getProperty("width")||"100%"};d.prototype.applyFocusInfo=function(t){this._bFocusNoPopup=true;a.prototype.applyFocusInfo.apply(this,arguments)};d.prototype.onfocusin=function(e){if(!t(e.target).hasClass("sapUiIcon")){a.prototype.onfocusin.apply(this,arguments)}this._bFocusNoPopup=undefined};d.prototype.onsapshow=function(t){c.call(this);t.preventDefault()};d.prototype.onsaphide=d.prototype.onsapshow;d.prototype.onsappageup=function(t){_.call(this,1,"day");t.preventDefault()};d.prototype.onsappageupmodifiers=function(t){if(!t.ctrlKey&&t.shiftKey){_.call(this,1,"month")}else{_.call(this,1,"year")}t.preventDefault()};d.prototype.onsappagedown=function(t){_.call(this,-1,"day");t.preventDefault()};d.prototype.onsappagedownmodifiers=function(t){if(!t.ctrlKey&&t.shiftKey){_.call(this,-1,"month")}else{_.call(this,-1,"year")}t.preventDefault()};d.prototype.onkeypress=function(t){if(!t.charCode||t.metaKey||t.ctrlKey){return}var e=this._getFormatter(true);var a=String.fromCharCode(t.charCode);if(a&&e.sAllowedCharacters&&e.sAllowedCharacters.indexOf(a)<0){t.preventDefault()}};d.prototype.onclick=function(e){if(t(e.target).hasClass("sapUiIcon")){c.call(this)}};d.prototype._dateValidation=function(e){this._bValid=true;if(e&&(e.getTime()<this._oMinDate.getTime()||e.getTime()>this._oMaxDate.getTime())){this._bValid=false;t.sap.assert(this._bValid,"Date must be in valid range")}this.setProperty("dateValue",e);return e};d.prototype.setMinDate=function(e){if(this._isValidDate(e)){throw new Error("Date must be a JavaScript date object; "+this)}if(t.sap.equal(this.getMinDate(),e)){return this}if(e){var a=e.getFullYear();if(a<1||a>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this)}this._oMinDate=new Date(e.getTime());var i=this.getDateValue();if(i&&i.getTime()<e.getTime()){t.sap.log.warning("DateValue not in valid date range",this)}}else{this._oMinDate=new Date(1,0,1);this._oMinDate.setFullYear(1)}this.setProperty("minDate",e);if(this._oCalendar){this._oCalendar.setMinDate(e)}this._oMinDate.setHours(0,0,0,0);return this};d.prototype.setMaxDate=function(e){if(this._isValidDate(e)){throw new Error("Date must be a JavaScript date object; "+this)}if(t.sap.equal(this.getMaxDate(),e)){return this}if(e){var a=e.getFullYear();if(a<1||a>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this)}this._oMaxDate=new Date(e.getTime());var i=this.getDateValue();if(i&&i.getTime()>e.getTime()){t.sap.log.warning("DateValue not in valid date",this)}}else{this._oMaxDate=new Date(9999,11,31,23,59,59,999)}this.setProperty("maxDate",e);if(this._oCalendar){this._oCalendar.setMaxDate(e)}this._oMaxDate.setHours(23,59,59,999);return this};d.prototype._checkMinMaxDate=function(){if(this._oMinDate.getTime()>this._oMaxDate.getTime()){t.sap.log.warning("minDate > MaxDate -> dates switched",this);var e=new Date(this._oMinDate.getTime());var a=new Date(this._oMaxDate.getTime());this._oMinDate=new Date(a.getTime());this._oMaxDate=new Date(e.getTime());this.setProperty("minDate",a,true);this.setProperty("maxDate",e,true);if(this._oCalendar){this._oCalendar.setMinDate(a);this._oCalendar.setMaxDate(e)}}var i=this.getDateValue();if(i&&(i.getTime()<this._oMinDate.getTime()||i.getTime()>this._oMaxDate.getTime())){t.sap.log.error("dateValue "+i.toString()+"(value="+this.getValue()+") does not match "+"min/max date range("+this._oMinDate.toString()+" - "+this._oMaxDate.toString()+"). App. "+"developers should take care to maintain dateValue/value accordingly.",this)}};d.prototype.getDisplayFormatType=function(){return this.getProperty("displayFormatType")};d.prototype._handleDateValidation=function(e){this._bValid=true;if(!e||e.getTime()<this._oMinDate.getTime()||e.getTime()>this._oMaxDate.getTime()){this._bValid=false;t.sap.log.warning("Value can not be converted to a valid date",this)}this.setProperty("dateValue",e)};d.prototype.setDisplayFormatType=function(t){if(t){var e=false;for(var a in h){if(a==t){e=true;break}}if(!e){throw new Error(t+" is not a valid calendar type"+this)}}this.setProperty("displayFormatType",t,true);this.setDisplayFormat(this.getDisplayFormat());return this};d.prototype.setSecondaryCalendarType=function(t){this._bSecondaryCalendarTypeSet=true;this.setProperty("secondaryCalendarType",t,true);if(this._oCalendar){this._oCalendar.setSecondaryCalendarType(t)}return this};d.prototype.addSpecialDate=function(t){v.call(this,t);this.addAggregation("specialDates",t,true);T.call(this);return this};d.prototype.insertSpecialDate=function(t,e){v.call(this,t);this.insertAggregation("specialDates",t,e,true);T.call(this);return this};d.prototype.removeSpecialDate=function(t){var e=this.removeAggregation("specialDates",t,true);T.call(this);return e};d.prototype.removeAllSpecialDates=function(){var t=this.removeAllAggregation("specialDates",true);T.call(this);return t};d.prototype.destroySpecialDates=function(){this.destroyAggregation("specialDates",true);T.call(this);return this};d.prototype.setLegend=function(t){this.setAssociation("legend",t,true);var e=this.getLegend();if(e){var a=sap.ui.require("sap/ui/unified/CalendarLegend");t=sap.ui.getCore().byId(e);if(t&&!(typeof a=="function"&&t instanceof a)){throw new Error(t+" is not an sap.ui.unified.CalendarLegend. "+this)}}if(this._oCalendar){this._oCalendar.setLegend(e)}return this};d.prototype.onChange=function(t){if(!this.getEditable()||!this.getEnabled()){return}var e=this._$input.val();var a=this._formatValue(this.getDateValue());if(e==a&&this._bValid){return}var i;this._bValid=true;if(e!=""){i=this._parseValue(e,true);if(!i||i.getTime()<this._oMinDate.getTime()||i.getTime()>this._oMaxDate.getTime()){this._bValid=false;i=undefined}else{e=this._formatValue(i)}}if(this.getDomRef()&&this._$input.val()!==e){this._$input.val(e);this._curpos=this._$input.cursorPos()}if(i){e=this._formatValue(i,true)}if(this._lastValue!==e||i&&this.getDateValue()&&i.getFullYear()!==this.getDateValue().getFullYear()){this._lastValue=e;this.setProperty("value",e,true);var s=this.getValue();if(this._bValid&&e==s){this.setProperty("dateValue",i,true)}e=s;if(this._oPopup&&this._oPopup.isOpen()){if(this._bValid){i=this.getDateValue()}this._oCalendar.focusDate(i);var o=this._oDateRange.getStartDate();if(!o&&i||o&&i&&o.getTime()!=i.getTime()){this._oDateRange.setStartDate(new Date(i.getTime()))}else if(o&&!i){this._oDateRange.setStartDate(undefined)}}this.fireChangeEvent(e,{valid:this._bValid})}};d.prototype._getInputValue=function(t){t=typeof t=="undefined"?this._$input.val():t.toString();var e=this._parseValue(t,true);t=this._formatValue(e,true);return t};d.prototype.updateDomValue=function(t){if(this.isActive()&&this._$input.val()!==t){this._bCheckDomValue=true;t=typeof t=="undefined"?this._$input.val():t.toString();this._curpos=this._$input.cursorPos();var e=this._parseValue(t,true);t=this._formatValue(e);this._$input.val(t);this._$input.cursorPos(this._curpos)}return this};d.prototype._storeInputSelection=function(t){if((e.browser.msie||e.browser.edge)&&!e.support.touch){this._oInputSelBeforePopupOpen={iStart:t.selectionStart,iEnd:t.selectionEnd};t.selectionStart=0;t.selectionEnd=0}};d.prototype._restoreInputSelection=function(t){if((e.browser.msie||e.browser.edge)&&!e.support.touch){t.selectionStart=this._oInputSelBeforePopupOpen.iStart;t.selectionEnd=this._oInputSelBeforePopupOpen.iEnd}};function g(){this._createPopup();this._createPopupContent();var t;var e=this.getBinding("value");if(e&&e.oType&&e.oType.oOutputFormat){t=e.oType.oOutputFormat.oFormatOptions.calendarType}else if(e&&e.oType&&e.oType.oFormat){t=e.oType.oFormat.oFormatOptions.calendarType}if(!t){t=this.getDisplayFormatType()}if(t){this._oCalendar.setPrimaryCalendarType(t)}var a=this._bValid?this._formatValue(this.getDateValue()):this.getValue();if(a!=this._$input.val()){this.onChange()}this._fillDateRange();this._openPopup();this.fireNavigate({dateRange:this._getVisibleDatesRange(this._oCalendar)})}d.prototype._createPopup=function(){if(!this._oPopup){t.sap.require("sap.ui.core.Popup");this._oPopup=new sap.ui.core.Popup;this._oPopup.setAutoClose(true);this._oPopup.setDurations(0,0);this._oPopup.attachOpened(D,this);this._oPopup.attachClosed(y,this)}};d.prototype._openPopup=function(){if(!this._oPopup){return}this._storeInputSelection(this._$input.get(0));this._oPopup.setAutoCloseAreas([this.getDomRef()]);var t=sap.ui.core.Popup.Dock;var e;if(this.getTextAlign()==l.End){e=t.EndBottom+"-4";this._oPopup.open(0,t.EndTop,e,this,null,"fit",true)}else{e=t.BeginBottom+"-4";this._oPopup.open(0,t.BeginTop,e,this,null,"fit",true)}};d.prototype._getVisibleDatesRange=function(t){var e=t._getVisibleDays();return new sap.ui.unified.DateRange({startDate:e[0].toLocalJSDate(),endDate:e[e.length-1].toLocalJSDate()})};d.prototype._createPopupContent=function(){if(!this._oCalendar){if(!u){sap.ui.getCore().loadLibrary("sap.ui.unified");u=sap.ui.requireSync("sap/ui/unified/Calendar")}this._oCalendar=new u(this.getId()+"-cal",{intervalSelection:this._bIntervalSelection,minDate:this.getMinDate(),maxDate:this.getMaxDate(),legend:this.getLegend(),startDateChange:function(){this.fireNavigate({dateRange:this._getVisibleDatesRange(this._oCalendar)})}.bind(this)});this._oDateRange=new sap.ui.unified.DateRange;this._oCalendar.addSelectedDate(this._oDateRange);if(this.$().closest(".sapUiSizeCompact").length>0){this._oCalendar.addStyleClass("sapUiSizeCompact")}if(this._bSecondaryCalendarTypeSet){this._oCalendar.setSecondaryCalendarType(this.getSecondaryCalendarType())}if(this._bOnlyCalendar){this._oCalendar.attachSelect(this._selectDate,this);this._oCalendar.attachCancel(f,this);this._oCalendar.attachEvent("_renderMonth",m,this);this._oCalendar.setPopupMode(true);this._oCalendar.setParent(this,undefined,true);this._oPopup.setContent(this._oCalendar)}}};d.prototype._fillDateRange=function(){var t=this.getDateValue();if(t&&t.getTime()>=this._oMinDate.getTime()&&t.getTime()<=this._oMaxDate.getTime()){this._oCalendar.focusDate(new Date(t.getTime()));if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=t.getTime()){this._oDateRange.setStartDate(new Date(t.getTime()))}}else{var e=this.getInitialFocusedDateValue();var a=e?e:new Date;var i=this._oMaxDate.getTime()+864e5;if(a.getTime()<this._oMinDate.getTime()||a.getTime()>i){a=this._oMinDate}this._oCalendar.focusDate(a);if(this._oDateRange.getStartDate()){this._oDateRange.setStartDate(undefined)}}};d.prototype.getAccessibilityInfo=function(){var t=this.getRenderer();var e=a.prototype.getAccessibilityInfo.apply(this,arguments);var i=this.getValue()||"";if(this._bValid){var s=this.getDateValue();if(s){i=this._formatValue(s)}}e.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_DATEINPUT");e.description=[i,t.getLabelledByAnnouncement(this),t.getDescribedByAnnouncement(this)].join(" ").trim();return e};function c(){if(this.getEditable()&&this.getEnabled()){if(!this._oPopup||!this._oPopup.isOpen()){g.call(this)}else{f.call(this)}}}d.prototype._selectDate=function(a){var i=this.getDateValue();var s=this._getSelectedDate();var o="";if(!t.sap.equal(s,i)){this.setDateValue(new Date(s.getTime()));o=this.getValue();this.fireChangeEvent(o,{valid:true});if(this.getDomRef()&&(e.system.desktop||!e.support.touch)&&!t.sap.simulateMobileOnDesktop){this._curpos=this._$input.val().length;this._$input.cursorPos(this._curpos)}}else if(!this._bValid){o=this._formatValue(s);if(o!=this._$input.val()){this._bValid=true;if(this.getDomRef()){this._$input.val(o);this._lastValue=o}this.setProperty("value",o,true);this.fireChangeEvent(o,{valid:true})}}else if((e.system.desktop||!e.support.touch)&&!t.sap.simulateMobileOnDesktop){this.focus()}this._oPopup.close()};d.prototype._getSelectedDate=function(){var t=this._oCalendar.getSelectedDates();var e;if(t.length>0){e=t[0].getStartDate()}return e};function f(a){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close();if((e.system.desktop||!e.support.touch)&&!t.sap.simulateMobileOnDesktop){this.focus()}}}function _(e,a){var i=this.getDateValue();var o=this._$input.cursorPos();if(i&&this.getEditable()&&this.getEnabled()){var n;var r=this.getBinding("value");if(r&&r.oType&&r.oType.oOutputFormat){n=r.oType.oOutputFormat.oFormatOptions.calendarType}else if(r&&r.oType&&r.oType.oFormat){n=r.oType.oFormat.oFormatOptions.calendarType}if(!n){n=this.getDisplayFormatType()}var p=s.getInstance(new Date(i.getTime()),n);i=s.getInstance(new Date(i.getTime()),n);switch(a){case"day":p.setDate(p.getDate()+e);break;case"month":p.setMonth(p.getMonth()+e);var l=(i.getMonth()+e)%12;if(l<0){l=12+l}while(p.getMonth()!=l){p.setDate(p.getDate()-1)}break;case"year":p.setFullYear(p.getFullYear()+e);while(p.getMonth()!=i.getMonth()){p.setDate(p.getDate()-1)}break;default:break}if(p.getTime()<this._oMinDate.getTime()){p=new s(this._oMinDate.getTime())}else if(p.getTime()>this._oMaxDate.getTime()){p=new s(this._oMaxDate.getTime())}if(!t.sap.equal(this.getDateValue(),p.getJSDate())){this.setDateValue(new Date(p.getTime()));this._curpos=o;this._$input.cursorPos(this._curpos);var h=this.getValue();this.fireChangeEvent(h,{valid:true})}}}function D(t){this._renderedDays=this._oCalendar.$("-Month0-days").find(".sapUiCalItem").length;this.$("inner").attr("aria-owns",this.getId()+"-cal");this.$("inner").attr("aria-expanded",true)}function y(t){this.$("inner").attr("aria-expanded",false);this._restoreInputSelection(this._$input.get(0))}function m(t){var e=t.getParameter("days");if(e>this._renderedDays){this._renderedDays=e;this._oPopup._applyPosition(this._oPopup._oLastPosition)}}function v(t){var e=sap.ui.require("sap/ui/unified/DateTypeRange");if(t&&!(e&&t instanceof e)){throw new Error(t+'is not valid for aggregation "specialDates" of '+this)}}function T(){if(this._oPopup&&this._oPopup.isOpen()){this._oCalendar._bDateRangeChanged=true;this._oCalendar.invalidate()}}return d});