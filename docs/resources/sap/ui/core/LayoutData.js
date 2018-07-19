/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Element","./library"],function(t,a,e){"use strict";var r=a.extend("sap.ui.core.LayoutData",{metadata:{abstract:true,library:"sap.ui.core"}});r.prototype.invalidate=function(){var a=this.getParent();if(a&&a.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){a=a.getParent()}if(a){var e=a.getParent();if(e){var r=t.Event("LayoutDataChange");r.srcControl=a;e._handleEvent(r)}}};r.prototype.setLayoutData=function(t){return this};return r});