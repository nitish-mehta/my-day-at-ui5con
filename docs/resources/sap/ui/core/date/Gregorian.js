/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./UniversalDate"],function(e,t){"use strict";var a=t.extend("sap.ui.core.date.Gregorian",{constructor:function(){this.oDate=this.createDate(Date,arguments);this.sCalendarType=sap.ui.core.CalendarType.Gregorian}});a.UTC=function(){return Date.UTC.apply(Date,arguments)};a.now=function(){return Date.now()};return a});