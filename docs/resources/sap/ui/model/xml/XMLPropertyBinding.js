/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/ChangeReason","sap/ui/model/ClientPropertyBinding","sap/ui/model/ChangeReason"],function(e,t,i){"use strict";var o=i.extend("sap.ui.model.xml.XMLPropertyBinding");o.prototype.setValue=function(e){if(this.bSuspended){return}if(this.oValue!=e){if(this.oModel.setProperty(this.sPath,e,this.oContext,true)){this.oValue=e;this.oModel.firePropertyChange({reason:t.Binding,path:this.sPath,context:this.oContext,value:e})}}};o.prototype.checkUpdate=function(i){if(this.bSuspended&&!i){return}var o=this._getValue();if(!e.sap.equal(o,this.oValue)||i){this.oValue=o;this._fireChange({reason:t.Change})}};return o});