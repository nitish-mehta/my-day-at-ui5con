/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","sap/ui/base/EventProvider","sap/ui/core/mvc/View","sap/ui/core/routing/async/Target","sap/ui/core/routing/sync/Target"],function(t,i,e,r,n,s){"use strict";var o=e.extend("sap.ui.core.routing.Target",{constructor:function(i,r){function o(){if(t.sap.getUriParameters().get("sap-ui-xx-asyncRouting")==="true"){t.sap.log.warning("Activation of async view loading in routing via url parameter is only temporarily supported and may be removed soon","Target");return true}return false}if(i._async===undefined){i._async=o()}this._oOptions=i;this._oViews=r;e.apply(this,arguments);if(this._oOptions.title){this._oTitleProvider=new a({target:this})}var l=this._oOptions._async?n:s;for(var h in l){this[h]=l[h]}this._bIsDisplayed=false},destroy:function(){this._oParent=null;this._oOptions=null;this._oViews=null;if(this._oTitleProvider){this._oTitleProvider.destroy()}this._oTitleProvider=null;e.prototype.destroy.apply(this,arguments);this.bIsDestroyed=true;return this},attachDisplay:function(t,i,e){return this.attachEvent(this.M_EVENTS.DISPLAY,t,i,e)},detachDisplay:function(t,i){return this.detachEvent(this.M_EVENTS.DISPLAY,t,i)},fireDisplay:function(t){var i=this._oTitleProvider&&this._oTitleProvider.getTitle();if(i){this.fireTitleChanged({name:this._oOptions.name,title:i})}this._bIsDisplayed=true;return this.fireEvent(this.M_EVENTS.DISPLAY,t)},attachTitleChanged:function(t,i,e){var r=this.hasListeners("titleChanged"),n=this._oTitleProvider&&this._oTitleProvider.getTitle();this.attachEvent(this.M_EVENTS.TITLE_CHANGED,t,i,e);if(!r&&n&&this._bIsDisplayed){this.fireTitleChanged({name:this._oOptions.name,title:n})}return this},detachTitleChanged:function(t,i){return this.detachEvent(this.M_EVENTS.TITLE_CHANGED,t,i)},fireTitleChanged:function(t){return this.fireEvent(this.M_EVENTS.TITLE_CHANGED,t)},_getEffectiveViewName:function(t){var i=this._oOptions.viewPath;if(i){t=i+"."+t}return t},_bindTitleInTitleProvider:function(t){if(this._oTitleProvider&&t instanceof r){this._oTitleProvider.applySettings({title:this._oOptions.title},t.getController())}},_addTitleProviderAsDependent:function(t){if(!this._oTitleProvider){return}var i=this._oTitleProvider.getParent();if(i){i.removeDependent(this._oTitleProvider)}t.addDependent(this._oTitleProvider)},_beforePlacingViewIntoContainer:function(t){},M_EVENTS:{DISPLAY:"display",TITLE_CHANGED:"titleChanged"}});var a=i.extend("sap.ui.core.routing.Target.TitleProvider",{metadata:{library:"sap.ui.core",properties:{title:{type:"string",group:"Data",defaultValue:null}}},constructor:function(t){this._oTarget=t.target;delete t.target;i.prototype.constructor.call(this,t)},setTitle:function(t){this.setProperty("title",t,true);if(this._oTarget._bIsDisplayed){this._oTarget.fireTitleChanged({name:this._oTarget._oOptions.name,title:t})}}});return o});