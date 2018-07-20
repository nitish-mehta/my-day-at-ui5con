/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/layout/library","./FormRenderer"],function(e,t,o){"use strict";var a=e.extend("sap.ui.layout.form.Form",{metadata:{library:"sap.ui.layout",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},editable:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"formContainers",aggregations:{formContainers:{type:"sap.ui.layout.form.FormContainer",multiple:true,singularName:"formContainer"},title:{type:"sap.ui.core.Title",altTypes:["string"],multiple:false},toolbar:{type:"sap.ui.core.Toolbar",multiple:false},layout:{type:"sap.ui.layout.form.FormLayout",multiple:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designtime:"sap/ui/layout/designtime/form/Form.designtime"}});a.prototype.toggleContainerExpanded=function(e){var t=this.getLayout();if(t){t.toggleContainerExpanded(e)}};a.prototype.contentOnAfterRendering=function(e,t){var o=this.getLayout();if(o&&o.contentOnAfterRendering){o.contentOnAfterRendering(e,t)}};a.prototype.onLayoutDataChange=function(e){var t=this.getLayout();if(t&&t.onLayoutDataChange){t.onLayoutDataChange(e)}};a.prototype.onBeforeFastNavigationFocus=function(e){var t=this.getLayout();if(t&&t.onBeforeFastNavigationFocus){t.onBeforeFastNavigationFocus(e)}};a.prototype.setEditable=function(e){var t=this.getEditable();this.setProperty("editable",e,true);if(e!=t&&this.getDomRef()){if(e){this.$().addClass("sapUiFormEdit").addClass("sapUiFormEdit-CTX");this.$().removeAttr("aria-readonly")}else{this.$().removeClass("sapUiFormEdit").removeClass("sapUiFormEdit-CTX");this.$().attr("aria-readonly","true")}var o=this.getFormContainers();for(var a=0;a<o.length;a++){var r=o[a];r.invalidateLabels()}}return this};a.prototype.setToolbar=function(e){e=t.form.FormHelper.setToolbar.call(this,e);this.setAggregation("toolbar",e);return this};a.prototype.invalidate=function(t){if(!this._bNoInvalidate){e.prototype.invalidate.apply(this,arguments)}};a.prototype.getContainerRenderedDomRef=function(e){var t=this.getLayout();if(t&&t.getContainerRenderedDomRef){return t.getContainerRenderedDomRef(e)}else{return null}};a.prototype.getElementRenderedDomRef=function(e){var t=this.getLayout();if(t&&t.getElementRenderedDomRef){return t.getElementRenderedDomRef(e)}else{return null}};a.prototype.getVisibleFormContainers=function(){var e=this.getFormContainers();var t=[];for(var o=0;o<e.length;o++){var a=e[o];if(a.isVisible()){t.push(a)}}return t};return a});