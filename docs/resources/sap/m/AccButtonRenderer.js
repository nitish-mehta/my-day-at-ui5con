/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ButtonRenderer","sap/ui/core/Renderer"],function(e,t){"use strict";var i=t.extend(e);i.renderAccessibilityAttributes=function(e,t){if(t.getTabIndex()){e.writeAttribute("tabindex",t.getTabIndex())}if(t.getAriaHidden()){e.writeAttribute("aria-hidden",t.getAriaHidden())}};return i},true);