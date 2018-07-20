/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/library"],function(e,t){"use strict";var a=t.ValueState;var s=function(){this.refreshDataState=i};function i(t,s){if(s.getChanges().messages){var i=s.getMessages();var r=sap.ui.core.LabelEnablement.getReferencingLabels(this);var g=r[0];var n=false;i.forEach(function(t){if(r&&r.length>0){var a=sap.ui.getCore().byId(g);if(a.getMetadata().isInstanceOf("sap.ui.core.Label")&&a.getText&&t.getAdditionalText()!==a.getText()){t.setAdditionalText(a.getText());n=true}else{e.sap.log.warning("sap.ui.core.message.Message: Can't create labelText."+"Label with id "+g+" is no valid sap.ui.core.Label.",this)}}if(t.getControlId()!==this.getId()){t.setControlId(this.getId());n=true}}.bind(this));var l=sap.ui.getCore().getMessageManager().getMessageModel();l.checkUpdate(n,true);if(i&&i.length>0){var u=i[0];if(a[u.type]){this.setValueState(u.type);this.setValueStateText(u.message)}}else{this.setValueState(a.None);this.setValueStateText("")}}}return s},true);