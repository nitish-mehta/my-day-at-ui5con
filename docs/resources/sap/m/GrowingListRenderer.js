/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./ListRenderer","sap/ui/core/Renderer"],function(e,r,i){"use strict";var n=i.extend(r);n.render=function(i,n){if(n._isIncompatible()){e.sap.log.warning("Does not render sap.m.GrowingList#"+n.getId()+" when compatibility version is 1.16 or higher. Instead use sap.m.List/Table control with growing feature!")}else{r.render.call(this,i,n)}};return n},true);