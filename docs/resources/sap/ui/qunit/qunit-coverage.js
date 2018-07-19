/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";if(typeof QUnit==="undefined"){throw new Error("qunit-coverage.js: QUnit is not loaded yet!")}window["sap-ui-qunit-coverage"]="client";var e,t;var a=document.getElementsByTagName("script"),r=null;for(var i=0;i<a.length;i++){var n=a[i];var o=n.getAttribute("src");if(o){var u=o.match(/(.*)qunit\/qunit-coverage\.js$/i);if(u&&u.length>1){r=u[1];if(n.hasAttribute("data-sap-ui-cover-only")){e=n.getAttribute("data-sap-ui-cover-only")}if(n.hasAttribute("data-sap-ui-cover-never")){t=n.getAttribute("data-sap-ui-cover-never")}break}}}if(QUnit.urlParams.coverage){var s=function(a,r){if(a.indexOf("window['sap-ui-qunit-coverage'] = 'server';")===0){return a}var i=blanket.options("sap-ui-cover-only")||e;var n=blanket.options("sap-ui-cover-never")||t;if(typeof n!=="undefined"&&blanket.utils.matchPatternAttribute(r,n)){}else if(typeof i==="undefined"||blanket.utils.matchPatternAttribute(r,i)){blanket.instrument({inputFile:a,inputFileName:r,instrumentCache:false},function(e){a=e})}else{}return a};if(typeof blanket==="undefined"){var l=document.location.href.replace(/\?.*|#.*/g,""),p=null;if(r===null){if(typeof sap==="object"&&sap.ui&&sap.ui.require&&sap.ui.require.toUrl){p=sap.ui.require.toUrl("sap/ui/thirdparty/blanket.js")}else if(jQuery&&jQuery.sap&&jQuery.sap.getResourcePath){p=jQuery.sap.getResourcePath("sap/ui/thirdparty/blanket",".js")}else{throw new Error("qunit-coverage.js: The script tag seems to be malformed!")}}else{p=r+"thirdparty/blanket.js"}var c=new XMLHttpRequest;c.open("GET",p,false);c.onreadystatechange=function(){if(c.readyState==4){var e=c.responseText;if(typeof URI!=="undefined"){e+="\n//# sourceURL="+URI(p).absoluteTo(l)}window.eval(e)}};c.send(null)}QUnit.config.autostart=true;blanket.options("existingRequireJS",true);if(typeof sap==="object"&&sap.ui&&sap.ui.loader&&sap.ui.loader._){sap.ui.loader._.translate=s}else if(jQuery&&jQuery.sap){jQuery.sap.require._hook=s}else{throw new Error("qunit-coverage.js: jQuery.sap.global is not loaded - require hook cannot be set!")}}else{QUnit.config.urlConfig.push({id:"coverage",label:"Enable coverage",tooltip:"Enable code coverage."})}})();