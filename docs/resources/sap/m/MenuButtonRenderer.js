/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.CSS_CLASS="sapMMenuBtn";t.render=function(e,r){var i=r.getWidth();e.write("<div");e.writeControlData(r);this.writeAriaAttributes(e,r);e.addClass(t.CSS_CLASS);e.addClass(t.CSS_CLASS+r.getButtonMode());e.writeClasses();if(i!=""){e.addStyle("width",i)}e.writeStyles();e.write(">");e.renderControl(r._getButtonControl());e.write("</div>")};t.writeAriaAttributes=function(t,e){t.writeAttribute("aria-haspopup","true")};return t},true);