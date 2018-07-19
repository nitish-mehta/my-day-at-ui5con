/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(e){"use strict";return{_getViewWithGlobalId:function(i){function t(){return sap.ui.view(i)}if(!i){e.sap.log.error("the oOptions parameter of getView is mandatory",this)}var r,n=i.viewName;this._checkViewName(n);r=this._oViews[n];if(r){return r}if(this._oComponent){r=this._oComponent.runAsOwner(t)}else{r=t()}this._oViews[n]=r;this.fireCreated({view:r,viewOptions:i});return r}}});