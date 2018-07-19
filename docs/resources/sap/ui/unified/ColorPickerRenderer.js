/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var r={};r.render=function(r,e){r.write("<div");r.writeControlData(e);r.writeClasses();r.write(">");r.renderControl(e.getAggregation("_grid"));r.write("</div>")};return r},true);