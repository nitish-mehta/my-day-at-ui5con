/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";function e(e,r){var t=e&&e.getAttribute("src");var o=r.exec(t);if(o){return{tag:e,url:t,resourceRoot:o[1]||""}}}var r=/^((?:.*\/)?resources\/)/,t,o,u,c;c=e(document.querySelector("SCRIPT[src][id=sap-ui-bootstrap]"),r);if(!c){o=document.querySelectorAll("SCRIPT[src]");t=/^(.*\/)?(?:sap-ui-(core|custom|boot|merged)(?:-.*)?)\.js(?:[?#]|$)/;for(u=0;u<o.length;u++){c=e(o[u],t);if(c){break}}}return c||{}});