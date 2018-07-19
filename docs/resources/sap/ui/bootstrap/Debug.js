/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/bootstrap/Info"],function(e){"use strict";function o(e){if(e&&e.parentNode){e.parentNode.removeChild(e)}}if(/sap-bootstrap-debug=(true|x|X)/.test(location.search)){debugger}var t;try{t=window.localStorage.getItem("sap-ui-reboot-URL");window.localStorage.removeItem("sap-ui-reboot-URL")}catch(e){}if(t&&t!=="undefined"){var r=confirm("WARNING!\n\nUI5 will be booted from the URL below.\nPress 'Cancel' unless you have configured this.\n\n"+t);if(r){var a=e.tag,i='<script id="sap-ui-bootstrap" src="'+t+'"';for(var n=0;n<a.attributes.length;n++){var s=a.attributes[n];if(s.nodeName==="data-sap-ui-resourceroots"){var u=JSON.parse(s.nodeValue+"");if(u){u[""]=undefined;i+=' data-sap-ui-resourceroots="'+JSON.stringify(u).replace(/"/g,"&quot;")+'"'}}else if(s.nodeName.indexOf("data-sap-ui-")===0){i+=" "+s.nodeName+'="'+s.nodeValue.replace(/"/g,"&quot;")+'"'}}i+="><\/script>";o(a);o(document.getElementById("sap-ui-bootstrap-cachebusted"));var d=window["sap-ui-config"];if(d&&d.resourceRoots){d.resourceRoots[""]=undefined}document.write(i);var c=new Error("This is not a real error. Aborting UI5 bootstrap and rebooting from: "+t);c.name="Restart";throw c}}});