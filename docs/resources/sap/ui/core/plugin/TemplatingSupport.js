/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Core","sap/ui/core/tmpl/Template"],function(t,i,o){"use strict";var p=function(){};p.prototype.startPlugin=function(i,o){t.sap.log.info("Starting TemplatingSupport plugin.");this.oCore=i;sap.ui.template()};p.prototype.stopPlugin=function(){t.sap.log.info("Stopping TemplatingSupport plugin.");this.oCore=null};(function(){var t=new p;sap.ui.getCore().registerPlugin(t)})();return p},true);