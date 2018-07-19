/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(e){"use strict";return{_getViewWithGlobalId:function(i){function t(){return sap.ui.view(i)}var n,s;if(!i){e.sap.log.error("the oOptions parameter of getView is mandatory",this)}else{if(i.async===undefined){i.async=true}s=i.viewName;this._checkViewName(s);n=this._oViews[s]}if(n){return n}if(this._oComponent){n=this._oComponent.runAsOwner(t)}else{n=t()}this._oViews[s]=n;n.loaded().then(function(e){this.fireCreated({view:e,viewOptions:i})}.bind(this));return n}}});