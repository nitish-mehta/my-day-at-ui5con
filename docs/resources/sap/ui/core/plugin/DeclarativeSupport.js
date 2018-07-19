/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Core","sap/ui/core/DeclarativeSupport"],function(o,t,i){"use strict";var e=function(){};e.prototype.startPlugin=function(t,e){o.sap.log.info("Starting DeclarativeSupport plugin.");this.oCore=t;this.oWindow=window;i.compile(document.body)};e.prototype.stopPlugin=function(){o.sap.log.info("Stopping DeclarativeSupport plugin.");this.oCore=null};(function(){var o=new e;sap.ui.getCore().registerPlugin(o)})();return e},true);