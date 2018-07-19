/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/ClientTreeBinding"],function(e,t){"use strict";var i=t.extend("sap.ui.model.json.JSONTreeBinding");i.prototype._saveSubContext=function(t,i,n,s){if(t&&typeof t=="object"){var o=this.oModel.getContext(n+s);if(this.aAllFilters&&!this.bIsFiltering){if(e.inArray(o,this.filterInfo.aFilteredContexts)!=-1){i.push(o)}}else{i.push(o)}}};return i});