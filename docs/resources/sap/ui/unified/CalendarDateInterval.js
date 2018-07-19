/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/unified/calendar/CalendarUtils","./Calendar","./calendar/DatesRow","./calendar/MonthPicker","./calendar/YearPicker","sap/ui/unified/calendar/CalendarDate","./library","sap/ui/Device","./CalendarDateIntervalRenderer"],function(t,e,a,i,r,s,o,n,h,g){"use strict";var p=a.extend("sap.ui.unified.CalendarDateInterval",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},days:{type:"int",group:"Appearance",defaultValue:7},showDayNamesLine:{type:"boolean",group:"Appearance",defaultValue:true},pickerPopup:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{calendarPicker:{type:"sap.ui.unified.Calendar",multiple:false,visibility:"hidden"}},designtime:"sap/ui/unified/designtime/CalendarDateInterval.designtime"}});p.prototype.init=function(){a.prototype.init.apply(this,arguments);this._iDaysMonthHead=35};p.prototype._initilizeMonthPicker=function(){this.setAggregation("monthPicker",this._createMonthPicker())};p.prototype._initilizeYearPicker=function(){this.setAggregation("yearPicker",this._createYearPicker())};p.prototype.setPickerPopup=function(t){this.setProperty("pickerPopup",t,true);var e=this.getAggregation("header"),a,i;if(t){if(this.getAggregation("monthPicker")){this.getAggregation("monthPicker").destroy()}if(this.getAggregation("yearPicker")){this.getAggregation("yearPicker").destroy()}e.setVisibleButton2(false);e.detachEvent("pressButton2",this._handleButton2,this);this._setHeaderText(this._getFocusedDate(true))}else{if(!this.getAggregation("monthPicker")){this.setAggregation("monthPicker",this._createMonthPicker())}if(!this.getAggregation("yearPicker")){this.setAggregation("yearPicker",this._createYearPicker())}a=this.getAggregation("monthPicker");i=this.getAggregation("yearPicker");a.setColumns(0);a.setMonths(6);i.setColumns(0);i.setYears(6);i._oMinDate.setYear(this._oMinDate.getYear());i._oMaxDate.setYear(this._oMaxDate.getYear());e.setVisibleButton2(true);e.detachEvent("pressButton2",this._handleButton2,this);e.attachEvent("pressButton2",this._handleButton2,this)}return this};p.prototype._createMonthPicker=function(){var t=new r(this.getId()+"--MP");t.attachEvent("select",this._selectMonth,this);t._bNoThemeChange=true;t.setColumns(0);t.setMonths(3);t.attachEvent("pageChange",u,this);return t};p.prototype._createYearPicker=function(){var t=new s(this.getId()+"--YP");t.attachEvent("select",this._selectYear,this);t.setColumns(0);t.setYears(3);t.attachEvent("pageChange",c,this);return t};p.prototype._getCalendarPicker=function(){var e=this.getAggregation("calendarPicker");if(!e){e=new a(this.getId()+"--Cal");e.setPopupMode(true);e.attachEvent("select",this._handleCalendarPickerDateSelect,this);e.attachEvent("cancel",function(e){this._closeCalendarPicker();t.sap.focus(this.getAggregation("header").getDomRef("B1"))},this);this.setAggregation("calendarPicker",e)}return e};p.prototype._handleButton1=function(t){if(this.getPickerPopup()){this._showCalendarPicker()}else{if(this._iMode!=1){this._showMonthPicker()}else{this._hideMonthPicker()}}};p.prototype._setHeaderText=function(t){var e=a.prototype._setHeaderText.apply(this,arguments);var i,r,s=this.getAggregation("header");var o=this._getLocaleData();if(this.getPickerPopup()){if(o.oLocale.sLanguage.toLowerCase()==="ja"||o.oLocale.sLanguage.toLowerCase()==="zh"){i=e.sYear+" "+e.sMonth;r=e.sYear+e.sAriaLabel}else{i=e.sMonth+" "+e.sYear;r=e.sAriaLabel+e.sYear}s.setTextButton1(i,true);if(e.bShort){s.setAriaLabelButton1(r)}}};p.prototype._showCalendarPicker=function(){var t=this.getStartDate(),e=this._getCalendarPicker(),a=new sap.ui.unified.DateRange,i=new Date(t.getTime());i.setDate(i.getDate()+this._getDays()-1);a.setStartDate(t);a.setEndDate(i);e.displayDate(this._getFocusedDate().toLocalJSDate());e.removeAllSelectedDates();e.addSelectedDate(a);e.setMinDate(this.getMinDate());e.setMaxDate(this.getMaxDate());this._openPickerPopup(e);this._showOverlay()};p.prototype._handleCalendarPickerDateSelect=function(t){var e=this._getCalendarPicker(),a=new o(e._getFocusedDate());this._setStartDate(a);this._setFocusedDate(a);this._closeCalendarPicker()};p.prototype._closeCalendarPicker=function(e){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close()}this._hideOverlay();if(!e){this._renderMonth();var a=this.getAggregation("month");for(var i=0;i<a.length;i++){var r=a[i];t(r._oItemNavigation.getItemDomRefs()[r._oItemNavigation.getFocusedIndex()]).attr("tabindex","0")}}};p.prototype._getDaysLarge=function(){return 10};p.prototype._createMonth=function(t){var e=new i(t);return e};p.prototype.setStartDate=function(a){e._checkJSDateObject(a);if(t.sap.equal(this.getStartDate(),a)){return this}var i=a.getFullYear();e._checkYearInValidRange(i);var r=o.fromLocalJSDate(a,this.getPrimaryCalendarType());if(e._isOutside(r,this._oMinDate,this._oMaxDate)){throw new Error("Date must be in valid range (minDate and maxDate); "+this)}var s=this.getMinDate();if(s&&a.getTime()<s.getTime()){t.sap.log.warning("startDate < minDate -> minDate as startDate set",this);a=new Date(s.getTime())}var n=this.getMaxDate();if(n&&a.getTime()>n.getTime()){t.sap.log.warning("startDate > maxDate -> maxDate as startDate set",this);a=new Date(n.getTime())}this.setProperty("startDate",a,true);r=o.fromLocalJSDate(a,this.getPrimaryCalendarType());this._oStartDate=r;var h=this.getAggregation("month")[0];h.setStartDate(a);this._updateHeader(r);var g=this._getFocusedDate(true).toLocalJSDate();if(!h.checkDateFocusable(g)){this._setFocusedDate(r);h.displayDate(a)}return this};p.prototype.getStartDate=function(){return this.getProperty("startDate")};p.prototype.setDays=function(t){this.setProperty("days",t,true);t=this._getDays();var e=this.getAggregation("month")[0];e.setDays(t);if(!this.getPickerPopup()){var a=this.getAggregation("monthPicker");var i=Math.ceil(t/3);if(i>12){i=12}a.setMonths(i);var r=this.getAggregation("yearPicker");var s=Math.floor(t/2);if(s>20){s=20}r.setYears(s)}var o=this._getStartDate();this._updateHeader(o);if(this.getDomRef()){if(t>this._getDaysLarge()){this.$().addClass("sapUiCalIntLarge")}else{this.$().removeClass("sapUiCalIntLarge")}if(t>this._iDaysMonthHead){this.$().addClass("sapUiCalIntHead")}else{this.$().removeClass("sapUiCalIntHead")}}return this};p.prototype._getDays=function(){var t=this.getDays();if(h.system.phone&&t>8){return 8}else{return t}};p.prototype.setShowDayNamesLine=function(t){this.setProperty("showDayNamesLine",t,true);var e=this.getAggregation("month")[0];e.setShowDayNamesLine(t);return this};p.prototype._getShowMonthHeader=function(){var t=this._getDays();if(t>this._iDaysMonthHead){return true}else{return false}};p.prototype._getFocusedDate=function(t){if(!this._oFocusedDate||t){this._oFocusedDate=null;a.prototype._getFocusedDate.apply(this,arguments);var e=this.getStartDate();var i=this.getAggregation("month")[0];if(!e){this._setStartDate(this._oFocusedDate,false,true)}else if(!i.checkDateFocusable(this._oFocusedDate.toLocalJSDate())){this._oFocusedDate=o.fromLocalJSDate(e,this.getPrimaryCalendarType())}}return this._oFocusedDate};p.prototype.setMonths=function(t){if(t==1){return this.setProperty("months",t,false)}else{throw new Error("Property months not supported "+this)}};p.prototype.setFirstDayOfWeek=function(t){if(t==-1){return this.setProperty("firstDayOfWeek",t,false)}else{throw new Error("Property firstDayOfWeek not supported "+this)}};p.prototype.focusDate=function(t){var e=this.getAggregation("month")[0];if(!e.checkDateFocusable(t)){this._focusDateExtend(o.fromLocalJSDate(t,this.getPrimaryCalendarType()),true,true)}a.prototype.focusDate.apply(this,arguments);return this};p.prototype._shouldFocusB2OnTabNext=function(t){var e=this.getAggregation("header");return!this.getPickerPopup()&&t.target.id==e.getId()+"-B1"};p.prototype._focusOnShiftTab=function(){var e=this.getAggregation("header");if(this.getPickerPopup()){t.sap.focus(e.getDomRef("B1"))}else{t.sap.focus(e.getDomRef("B2"))}};p.prototype.onsapescape=function(t){if(this.getPickerPopup()){this._closeCalendarPicker();this.fireCancel()}else{if(this._iMode===0){this.fireCancel()}this._closedPickers()}};p.prototype._focusDateExtend=function(t,a,i){if(a){var r=this._getFocusedDate();var s=this._getStartDate();var n=e._daysBetween(r,s);var h=new o(t,this.getPrimaryCalendarType());h.setDate(h.getDate()-n);this._setStartDate(h,false,true);if(!i){return true}}return false};p.prototype._setMinMaxDateExtend=function(e){if(this._oStartDate){if(this._oStartDate.isBefore(this._oMinDate)){t.sap.log.warning("start date < minDate -> minDate will be start date",this);this._setStartDate(new o(this._oMinDate,this.getPrimaryCalendarType()),true,true)}else{var a=new o(this._oStartDate);a.setDate(a.getDate()+this._getDays()-1);if(a.isAfter(this._oMaxDate)){t.sap.log.warning("end date > maxDate -> start date will be changed",this);var i=new o(this._oMaxDate);i.setDate(i.getDate()-this._getDays()+1);this._setStartDate(i,true,true)}}}};p.prototype._togglePrevNext=function(t,i){if(this._iMode>1||this._iMode==1&&this.getPickerPopup()){return a.prototype._togglePrevNext.apply(this,arguments)}var r=this._oMaxDate.getYear();var s=this._oMinDate.getYear();var n=this._oMaxDate.getMonth();var h=this._oMinDate.getMonth();var g=this._oMinDate.getDate();var p=this._oMaxDate.getDate();var u=this.getAggregation("header");var c=this._getDays();var l;var D;var d;var _;var f;if(this._iMode==1&&!i){var y=this.getAggregation("monthPicker");var P=y.getMonths();var v=y.getStartMonth();var m=v+P-1;l=t.getYear();if(v==0||l==s&&v<=h){u.setEnabledPrevious(false)}else{u.setEnabledPrevious(true)}if(m>10||l==r&&m>=n){u.setEnabledNext(false)}else{u.setEnabledNext(true)}return}D=this._getStartDate();d=new o(D,this.getPrimaryCalendarType());d.setDate(d.getDate()+c-1);if(e._isOutside(t,D,d)){D=new o(t,this.getPrimaryCalendarType());d=new o(D,this.getPrimaryCalendarType());d.setDate(d.getDate()+c-1)}l=D.getYear();_=D.getMonth();f=D.getDate();if(l<s||l==s&&(!i||_<h||_==h&&f<=g)){u.setEnabledPrevious(false)}else{u.setEnabledPrevious(true)}l=d.getYear();_=d.getMonth();f=d.getDate();if(l>r||l==r&&(!i||_>n||_==n&&f>=p)){u.setEnabledNext(false)}else{u.setEnabledNext(true)}};p.prototype._shiftStartFocusDates=function(t,e,a){t.setDate(t.getDate()+a);e.setDate(e.getDate()+a);this._setFocusedDate(e);this._setStartDate(t,true)};p.prototype._handlePrevious=function(t){var e=new o(this._getFocusedDate(),this.getPrimaryCalendarType()),a,i,r,s;switch(this._iMode){case 0:r=new o(this._getStartDate(),this.getPrimaryCalendarType());s=this._getDays();this._shiftStartFocusDates(r,e,s*-1);break;case 1:if(!this.getPickerPopup()){a=this.getAggregation("monthPicker");if(a.getMonths()<12){a.previousPage();this._togglePrevNext(e)}else{e.setYear(e.getYear()-1);var n=this._focusDateExtend(e,true,false);this._setFocusedDate(e);this._updateHeader(e);this._setDisabledMonths(e.getYear());if(n){this.fireStartDateChange()}}}break;case 2:if(!this.getPickerPopup()){i=this.getAggregation("yearPicker");i.previousPage();this._togglePrevNexYearPicker()}break}};p.prototype._handleNext=function(t){var e=new o(this._getFocusedDate(),this.getPrimaryCalendarType()),a,i,r,s;switch(this._iMode){case 0:r=new o(this._getStartDate(),this.getPrimaryCalendarType());s=this._getDays();this._shiftStartFocusDates(r,e,s);break;case 1:if(!this.getPickerPopup()){a=this.getAggregation("monthPicker");if(a.getMonths()<12){a.nextPage();this._togglePrevNext(e)}else{e.setYear(e.getYear()+1);var n=this._focusDateExtend(e,true,false);this._setFocusedDate(e);this._updateHeader(e);this._setDisabledMonths(e.getYear());if(n){this.fireStartDateChange()}}}break;case 2:if(!this.getPickerPopup()){i=this.getAggregation("yearPicker");i.nextPage();this._togglePrevNexYearPicker()}break}};p.prototype._getDisplayedMonths=function(t){var e=[];var a=t.getMonth();var i=this._getDays();e.push(a);if(i>this._getDaysLarge()){var r=new o(t,this.getPrimaryCalendarType());r.setDate(r.getDate()+i-1);var s=r.getMonth();while(a!=s){a=(a+1)%12;e.push(a)}}return e};p.prototype._getDisplayedSecondaryMonths=function(t,e){var a=this._getDays();var i=new o(this._getStartDate(),e);var r=i.getMonth();var s=new o(i,this.getPrimaryCalendarType());s.setDate(s.getDate()+a-1);s=new o(s,e);var n=s.getMonth();return{start:r,end:n}};p.prototype._openPickerPopup=function(e){if(!this._oPopup){t.sap.require("sap.ui.core.Popup");this._oPopup=new sap.ui.core.Popup;this._oPopup.setAutoClose(true);this._oPopup.setAutoCloseAreas([this.getDomRef()]);this._oPopup.setDurations(0,0);this._oPopup._oCalendar=this;this._oPopup.attachClosed(function(){this._closeCalendarPicker(true)},this);this._oPopup.onsapescape=function(t){this._oCalendar.onsapescape(t)}}this._oPopup.setContent(e);var a=this.getAggregation("header");var i=sap.ui.core.Popup.Dock;this._oPopup.open(0,i.CenterTop,i.CenterTop,a,null,"flipfit",true)};p.prototype._getMaxDateAlignedToMinDate=function(t,e){var a=new o(t,this.getPrimaryCalendarType());if(a.isBefore(e)){a=new o(e);a.setDate(a.getDate()+this._getDays()-1)}return a};p.prototype._getStartDateAlignedToMinAndMaxDate=function(t,e,a){var i=new o(a,this.getPrimaryCalendarType());if(i.isBefore(e)){i=new o(e,this.getPrimaryCalendarType())}else if(i.isAfter(t)){i=t}return i};p.prototype._calculateStartDate=function(t,e,a){var i=new o(t,this.getPrimaryCalendarType());i.setDate(i.getDate()-this._getDays()+1);i=this._getMaxDateAlignedToMinDate(i,e);a=this._getStartDateAlignedToMinAndMaxDate(i,e,a);return a};p.prototype._setStartDate=function(t,e,a){t=this._calculateStartDate(this._oMaxDate,this._oMinDate,t);var i=t.toLocalJSDate();this.setProperty("startDate",i,true);this._oStartDate=t;var r=this.getAggregation("month")[0];r.setStartDate(i);this._updateHeader(t);if(e){var s=this._getFocusedDate().toLocalJSDate();if(!r.checkDateFocusable(s)){this._setFocusedDate(t);r.setDate(i)}else{r.setDate(s)}}if(!a){this.fireStartDateChange()}};p.prototype._getStartDate=function(){if(!this._oStartDate){this._oStartDate=this._getFocusedDate()}return this._oStartDate};function u(t){var e=new o(this._getFocusedDate(),this.getPrimaryCalendarType());this._togglePrevNext(e)}function c(t){this._togglePrevNexYearPicker()}return p});