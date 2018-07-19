/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(i){"use strict";return function n(t,e,s){var f=[],o=0,a=0,r;this.startTask=function(i){var n=f.length;f[n]={name:i,finished:false};o++;return n};this.finishTask=function(n,e){if(!f[n]||f[n].finished){throw new Error("trying to finish non existing or already finished task")}f[n].finished=true;o--;if(e===false){a++}if(o===0){i.info("Sync point '"+t+"' finished (tasks:"+f.length+", open:"+o+", failures:"+a+")");if(r){clearTimeout(r);r=null}u()}};function u(){if(e){e(o,a)}e=null}if(!isNaN(s)){r=setTimeout(function(){i.info("Sync point '"+t+"' timed out (tasks:"+f.length+", open:"+o+", failures:"+a+")");u()},s)}i.info("Sync point '"+t+"' created"+(s?"(timeout after "+s+" ms)":""))}});