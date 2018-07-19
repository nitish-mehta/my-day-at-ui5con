/*!
* UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","./library","./SliderTooltipBaseRenderer"],function(e,t,a,i){"use strict";var r=t.extend("sap.m.SliderTooltipBase",{metadata:{library:"sap.m"}});r.prototype.init=function(){this.fValue=0};r.prototype.setValue=function(e){this.fValue=e;this.sliderValueChanged(e)};r.prototype.getValue=function(){return this.fValue};r.prototype.sliderValueChanged=function(e){};return r});