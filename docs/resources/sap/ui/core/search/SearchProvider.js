/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Element","sap/ui/core/library"],function(e,r,a){"use strict";var s=r.extend("sap.ui.core.search.SearchProvider",{metadata:{library:"sap.ui.core",properties:{icon:{type:"string",group:"Misc",defaultValue:null}}}});s.prototype.suggest=function(r,a){e.sap.log.warning("sap.ui.core.search.SearchProvider is the abstract base class for all SearchProviders. Do not create instances of this class, but use a concrete sub class instead.")};return s});