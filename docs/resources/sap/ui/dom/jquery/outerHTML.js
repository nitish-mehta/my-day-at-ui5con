/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(e){"use strict";var r=function r(){var t=this.get(0);if(t&&t.outerHTML){return e.trim(t.outerHTML)}else{var n=this[0]?this[0].ownerDocument:document;var i=n.createElement("div");i.appendChild(t.cloneNode(true));return i.innerHTML}};e.fn.outerHTML=r;return e});