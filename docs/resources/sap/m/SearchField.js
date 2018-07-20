/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","./Suggest","sap/ui/Device","./SearchFieldRenderer","jquery.sap.keycodes"],function(e,t,s,o,i,r,n,u){"use strict";var a=sap.ui.getCore().getLibraryResourceBundle("sap.m");u.oSearchFieldToolTips={SEARCH_BUTTON_TOOLTIP:a.getText("SEARCHFIELD_SEARCH_BUTTON_TOOLTIP"),RESET_BUTTON_TOOLTIP:a.getText("SEARCHFIELD_RESET_BUTTON_TOOLTIP"),REFRESH_BUTTON_TOOLTIP:a.getText("SEARCHFIELD_REFRESH_BUTTON_TOOLTIP")};var l=s.extend("sap.m.SearchField",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},visible:{type:"boolean",group:"Appearance",defaultValue:true},maxLength:{type:"int",group:"Behavior",defaultValue:0},placeholder:{type:"string",group:"Misc",defaultValue:null},showMagnifier:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},showRefreshButton:{type:"boolean",group:"Behavior",defaultValue:false},refreshButtonTooltip:{type:"string",group:"Misc",defaultValue:null},showSearchButton:{type:"boolean",group:"Behavior",defaultValue:true},enableSuggestions:{type:"boolean",group:"Behavior",defaultValue:false},selectOnFocus:{type:"boolean",group:"Behavior",defaultValue:true,deprecated:true}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},defaultAggregation:"suggestionItems",designtime:"sap/m/designtime/SearchField.designtime",aggregations:{suggestionItems:{type:"sap.m.SuggestionItem",multiple:true,singularName:"suggestionItem"}},events:{search:{parameters:{query:{type:"string"},suggestionItem:{type:"sap.m.SuggestionItem"},refreshButtonPressed:{type:"boolean"},clearButtonPressed:{type:"boolean"}}},liveChange:{parameters:{newValue:{type:"string"}}},suggest:{parameters:{suggestValue:{type:"string"}}}}}});o.call(l.prototype);i.insertFontFaceStyle();l.prototype.init=function(){this._inputEvent=n.browser.internet_explorer&&n.browser.version<10?"keyup":"input";this.setProperty("placeholder",a.getText("FACETFILTER_SEARCH"),true)};l.prototype.getFocusDomRef=function(){return this.getInputElement()};l.prototype.getFocusInfo=function(){var t=s.prototype.getFocusInfo.call(this),o=this.getDomRef("I");if(o){e.extend(t,{cursorPos:e(o).cursorPos()})}return t};l.prototype.applyFocusInfo=function(e){s.prototype.applyFocusInfo.call(this,e);if("cursorPos"in e){this.$("I").cursorPos(e.cursorPos)}return this};l.prototype.getWidth=function(){return this.getProperty("width")||"100%"};l.prototype._hasPlaceholder=function(){return"placeholder"in document.createElement("input")}();l.prototype.getInputElement=function(){return this.getDomRef("I")};l.prototype.onBeforeRendering=function(){var t=this.getInputElement();if(t){this.$().find(".sapMSFB").off();this.$().off();e(t).off()}};l.prototype.onAfterRendering=function(){var t=this.getInputElement();this._resetElement=this.getDomRef("reset");e(t).on(this._inputEvent,this.onInput.bind(this)).on("search",this.onSearch.bind(this)).on("focus",this.onFocus.bind(this)).on("blur",this.onBlur.bind(this));if(n.system.desktop||n.system.combi){this.$().on("touchstart mousedown",this.onButtonPress.bind(this));if(n.browser.firefox){this.$().find(".sapMSFB").on("mouseup mouseout",function(t){e(t.target).removeClass("sapMSFBA")})}}else if(window.PointerEvent){e(this._resetElement).on("touchstart",function(){this._active=document.activeElement}.bind(this))}var s=sap.ui.getCore();if(!s.isThemeApplied()){s.attachThemeChanged(this._handleThemeLoad,this)}};l.prototype._handleThemeLoad=function(){if(this._oSuggest){this._oSuggest.setPopoverMinWidth()}var e=sap.ui.getCore();e.detachThemeChanged(this._handleThemeLoad,this)};l.prototype.clear=function(e){var t=e&&e.value||"";if(!this.getInputElement()||this.getValue()===t){return}this.setValue(t);c(this);this.fireLiveChange({newValue:t});this.fireSearch({query:t,refreshButtonPressed:false,clearButtonPressed:!!(e&&e.clearButton)})};l.prototype.exit=function(){if(this._oSuggest){this._oSuggest.destroy(true);this._oSuggest=null}};l.prototype.onButtonPress=function(t){if(t.originalEvent.button===2){return}var s=this.getInputElement();if(document.activeElement===s&&t.target!==s){t.preventDefault()}if(n.browser.firefox){var o=e(t.target);if(o.hasClass("sapMSFB")){o.addClass("sapMSFBA")}}};l.prototype.ontouchend=function(e){if(e.originalEvent.button===2){return}var t=e.target,s=this.getInputElement();if(t.id==this.getId()+"-reset"){g(this);this._bSuggestionSuppressed=true;var o=!this.getValue();this.clear({clearButton:true});var i=document.activeElement;if((n.system.desktop||o||/(INPUT|TEXTAREA)/i.test(i.tagName)||i===this._resetElement&&this._active===s)&&i!==s){s.focus()}}else if(t.id==this.getId()+"-search"){g(this);if(n.system.desktop&&!this.getShowRefreshButton()&&document.activeElement!==s){s.focus()}this.fireSearch({query:this.getValue(),refreshButtonPressed:!!(this.getShowRefreshButton()&&!this.$().hasClass("sapMFocus")),clearButtonPressed:false})}else{this.onmouseup(e)}};l.prototype.onmouseup=function(e){if(this.getEnabled()&&e.target.tagName=="FORM"){this.getInputElement().focus()}if(n.system.phone&&this.getEnabled()&&e.target.tagName=="INPUT"&&document.activeElement===e.target&&!f(this)){this.onFocus(e)}};l.prototype.onSearch=function(e){var t=this.getInputElement().value;this.setValue(t);this.fireSearch({query:t,refreshButtonPressed:false,clearButtonPressed:false});if(!n.system.desktop){this._blur()}};l.prototype._blur=function(){var e=this;window.setTimeout(function(){var t=e.getInputElement();if(t){t.blur()}},13)};l.prototype.onChange=function(e){this.setValue(this.getInputElement().value)};l.prototype.onInput=function(e){var t=this.getInputElement().value;if(t!=this.getValue()){this.setValue(t);this.fireLiveChange({newValue:t});if(this.getEnableSuggestions()){this.fireSuggest({suggestValue:t});c(this)}}};l.prototype.onkeydown=function(t){var s;if(t.which===e.sap.KeyCodes.F5||t.which===e.sap.KeyCodes.ENTER){this.$("search").toggleClass("sapMSFBA",true);t.stopPropagation();t.preventDefault()}if(t.which===e.sap.KeyCodes.ESCAPE){if(f(this)){g(this);t.setMarked()}else{s=this.getValue();if(s===this._sOriginalValue){this._sOriginalValue=""}this.clear({value:this._sOriginalValue});if(s!==this.getValue()){t.setMarked()}}t.preventDefault()}};l.prototype.onkeyup=function(t){var s;var o;if(t.which===e.sap.KeyCodes.F5||t.which===e.sap.KeyCodes.ENTER){this.$("search").toggleClass("sapMSFBA",false);if(f(this)){g(this);if((s=this._oSuggest.getSelected())>=0){o=this.getSuggestionItems()[s];this.setValue(o.getSuggestionText())}}this.fireSearch({query:this.getValue(),suggestionItem:o,refreshButtonPressed:this.getShowRefreshButton()&&t.which===e.sap.KeyCodes.F5,clearButtonPressed:false})}};l.prototype.onFocus=function(e){if(n.browser.internet_explorer&&!document.hasFocus()){return}this.$().toggleClass("sapMFocus",true);this._sOriginalValue=this.getValue();if(this.getEnableSuggestions()){if(!this._bSuggestionSuppressed){this.fireSuggest({suggestValue:this.getValue()})}else{this._bSuggestionSuppressed=false}}this._setToolTips(e.type)};l.prototype.onBlur=function(e){this.$().toggleClass("sapMFocus",false);if(this._bSuggestionSuppressed){this._bSuggestionSuppressed=false}this._setToolTips(e.type)};l.prototype._setToolTips=function(e){var t=this.$("search"),s=this.$("reset");if(this.getShowRefreshButton()){if(e==="focus"){t.attr("title",u.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP)}else if(e==="blur"){var o=this.getRefreshButtonTooltip(),i=o===""?u.oSearchFieldToolTips.REFRESH_BUTTON_TOOLTIP:o;if(i){t.attr("title",i)}}}if(this.getValue()===""){s.attr("title",u.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP)}else{s.attr("title",u.oSearchFieldToolTips.RESET_BUTTON_TOOLTIP)}};l.prototype.setValue=function(e){e=e||"";var t=this.getInputElement();if(t){if(t.value!==e){t.value=e}var s=this.$();if(s.hasClass("sapMSFVal")==!e){s.toggleClass("sapMSFVal",!!e)}}this.setProperty("value",e,true);this._setToolTips();return this};l.prototype.onsapshow=function(e){if(this.getEnableSuggestions()){if(f(this)){g(this)}else{this.fireSuggest({suggestValue:this.getValue()})}}};l.prototype.onsaphide=function(e){this.suggest(false)};function p(e,t,s,o){var i;if(f(e)){i=e._oSuggest.setSelected(s,o);if(i>=0){e.setValue(e.getSuggestionItems()[i].getSuggestionText())}t.preventDefault()}}l.prototype.onsapdown=function(e){p(this,e,1,true)};l.prototype.onsapup=function(e){p(this,e,-1,true)};l.prototype.onsaphome=function(e){p(this,e,0,false)};l.prototype.onsapend=function(e){p(this,e,-1,false)};l.prototype.onsappagedown=function(e){p(this,e,10,true)};l.prototype.onsappageup=function(e){p(this,e,-10,true)};l.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("F")};function g(e){e._oSuggest&&e._oSuggest.close()}function h(e){if(e.getEnableSuggestions()){if(!e._oSuggest){e._oSuggest=new r(e)}e._oSuggest.open()}}function f(e){return e._oSuggest&&e._oSuggest.isOpen()}l.prototype.suggest=function(e){if(this.getEnableSuggestions()){e=e===undefined||!!e;if(e&&(this.getSuggestionItems().length||n.system.phone)){h(this)}else{g(this)}}return this};function c(e){e._oSuggest&&e._oSuggest.update()}var d="suggestionItems";l.prototype.insertSuggestionItem=function(e,t,o){c(this);return s.prototype.insertAggregation.call(this,d,e,t,true)};l.prototype.addSuggestionItem=function(e,t){c(this);return s.prototype.addAggregation.call(this,d,e,true)};l.prototype.removeSuggestionItem=function(e,t){c(this);return s.prototype.removeAggregation.call(this,d,e,true)};l.prototype.removeAllSuggestionItems=function(e){c(this);return s.prototype.removeAllAggregation.call(this,d,true)};return l});