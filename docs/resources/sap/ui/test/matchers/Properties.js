/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/test/_LogCollector"],function(e,r){"use strict";var t=e.sap.log.getLogger("sap.ui.test.matchers.Properties",r.DEFAULT_LEVEL_FOR_OPA_LOGGERS);return function(r){return function(a){var o=true;e.each(r,function(r,s){var u=a["get"+e.sap.charToUpperCase(r,0)];if(!u){o=false;t.error("Control '"+a+"' does not have a property '"+r+"'");return false}var n=u.call(a);if(s instanceof RegExp){o=s.test(n)}else{o=n===s}if(!o){t.debug("Control '"+a+"' property '"+r+"' has value '"+n+"' but should have value '"+s+"'");return false}});return o}}},true);