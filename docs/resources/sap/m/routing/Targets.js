/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/routing/Targets","./TargetHandler","./Target","./async/Targets","./sync/Targets","jquery.sap.global"],function(e,t,r,n,a,i){"use strict";var s=e.extend("sap.m.routing.Targets",{constructor:function(r){if(!r.config){r.config={_async:false}}function s(){if(i.sap.getUriParameters().get("sap-ui-xx-asyncRouting")==="true"){i.sap.log.warning("Activation of async view loading in routing via url parameter is only temporarily supported and may be removed soon","MobileTargets");return true}return false}if(r.config._async===undefined){r.config._async=r.config.async===undefined?s():r.config.async}if(r.targetHandler){this._oTargetHandler=r.targetHandler}else{this._oTargetHandler=new t;this._bHasOwnTargetHandler=true}e.prototype.constructor.apply(this,arguments);var o=r.config._async?n:a;this._super={};for(var g in o){this._super[g]=this[g];this[g]=o[g]}},destroy:function(){e.prototype.destroy.apply(this,arguments);if(this._bHasOwnTargetHandler){this._oTargetHandler.destroy()}this._oTargetHandler=null},getTargetHandler:function(){return this._oTargetHandler},_constructTarget:function(e,t){return new r(e,this._oViews,t,this._oTargetHandler)},_getViewLevel:function(e){var t;do{t=e._oOptions.viewLevel;if(t!==undefined){return t}e=e._oParent}while(e);return t}});return s});