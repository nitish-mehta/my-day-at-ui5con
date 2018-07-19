/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/ChangeReason","sap/ui/model/ClientPropertyBinding"],function(e,t,a){"use strict";var s=a.extend("sap.ui.model.message.MessagePropertyBinding");s.prototype.setValue=function(t){if(!e.sap.equal(this.oValue,t)){this.oModel.setProperty(this.sPath,t,this.oContext)}};s.prototype.checkUpdate=function(a){var s=this._getValue();if(!e.sap.equal(s,this.oValue)||a){this.oValue=s;this._fireChange({reason:t.Change})}};return s});