/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/ChangeReason","sap/ui/model/ClientPropertyBinding","sap/ui/model/ChangeReason"],function(e,t,a){"use strict";var i=a.extend("sap.ui.model.json.JSONPropertyBinding");i.prototype.setValue=function(a){if(this.bSuspended){return}if(!e.sap.equal(this.oValue,a)){if(this.oModel.setProperty(this.sPath,a,this.oContext,true)){this.oValue=a;this.getDataState().setValue(this.oValue);this.oModel.firePropertyChange({reason:t.Binding,path:this.sPath,context:this.oContext,value:a})}}};i.prototype.checkUpdate=function(a){if(this.bSuspended&&!a){return}var i=this._getValue();if(!e.sap.equal(i,this.oValue)||a){this.oValue=i;this.getDataState().setValue(this.oValue);this.checkDataState();this._fireChange({reason:t.Change})}};return i});