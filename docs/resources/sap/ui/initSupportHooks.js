/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return function(e,t){var o=false;document.addEventListener("keydown",function(n){try{if(n.keyCode===18){o=typeof n.location!=="number"||n.location===1;return}if(n.shiftKey&&n.altKey&&n.ctrlKey&&o){if(n.keyCode===80){sap.ui.require(["sap/ui/core/support/techinfo/TechnicalInfo"],function(o){o.open(function(){var o=e();return{modules:o.modules,prefixes:o.prefixes,config:t}})})}else if(n.keyCode===83){sap.ui.require(["sap/ui/core/support/Support"],function(e){var t=e.getStub();if(t.getType()!=e.StubType.APPLICATION){return}t.openSupportTool()})}}}catch(e){}})}});