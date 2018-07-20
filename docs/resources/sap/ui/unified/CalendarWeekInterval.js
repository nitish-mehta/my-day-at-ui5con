/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","./library","sap/ui/unified/CalendarDateInterval","sap/ui/unified/CalendarDateIntervalRenderer"],function(e,t,a,s,i){"use strict";var o=s.extend("sap.ui.unified.CalendarWeekInterval",{renderer:i});o.prototype._getDaysLarge=function(){return 6};o.prototype._handleFocus=function(a){var i=!!a.getParameter("_outsideBorder"),o,r,n;if(i){o=a.getParameter("date");this._oFocusDateWeek=t.fromLocalJSDate(o);r=e._getFirstDateOfWeek(this._oFocusDateWeek);n=this.getAggregation("month")[0];if(n.getDomRef()){this._setStartDate(r,false,true)}}return s.prototype._handleFocus.apply(this,arguments)};o.prototype._focusDateExtend=function(e,t,a){var i,o;if(!this._oFocusDateWeek){return s.prototype._focusDateExtend.apply(this,arguments)}i=this.getAggregation("month")[0];o=this._oFocusDateWeek.toLocalJSDate();this._setFocusedDate(this._oFocusDateWeek);i.setDate(o);this._oFocusDateWeek=null;return!a};o.prototype._dateMatchesVisibleRange=function(e){var a=this.getDays(),s=t.fromLocalJSDate(e),i=t.fromLocalJSDate(this.getStartDate()),o=t.fromLocalJSDate(this.getStartDate());o.setDate(o.getDate()+a);return s.isSameOrAfter(i)&&s.isBefore(o)};o.prototype._showCalendarPicker=function(){var e=this._getFocusedDate(),a=this._getStartDate(),s=this._getCalendarPicker(),i=new sap.ui.unified.DateRange,o;o=new t(a);o.setDate(o.getDate()+this._getDays()-1);i.setStartDate(a.toLocalJSDate());i.setEndDate(o.toLocalJSDate());s.displayDate(e.toLocalJSDate(),false);s.removeAllSelectedDates();s.addSelectedDate(i);s.setMinDate(this.getMinDate());s.setMaxDate(this.getMaxDate());this._openPickerPopup(s);this._showOverlay()};o.prototype._handleCalendarPickerDateSelect=function(t){var a=this._getCalendarPicker(),s=a._getFocusedDate(),i;if(this._dateMatchesVisibleRange(s.toLocalJSDate())){this._oFocusDateWeek=a._getFocusedDate();this._focusDate(this._oFocusDateWeek,false,true)}else{i=e._getFirstDateOfWeek(s);this._setStartDate(i);this._oFocusDateWeek=a._getFocusedDate();this._focusDate(this._oFocusDateWeek,false,true)}this._closeCalendarPicker(true)};o.prototype._calculateStartDate=function(e,a,s){var e=new t(this._oMaxDate,this.getPrimaryCalendarType());e=this._getMaxDateAlignedToMinDate(e,this._oMinDate);s=this._getStartDateAlignedToMinAndMaxDate(e,this._oMinDate,s);return s};return o});