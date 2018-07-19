/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Matcher"],function(t){"use strict";return t.extend("sap.ui.test.matchers.BindingPath",{metadata:{publicMethods:["isMatching"],properties:{path:{type:"string"},modelName:{type:"string"}}},isMatching:function(t){if(!this.getPath()){this._oLogger.error("The binding path property is required but not defined");return false}var e=this.getModelName()||undefined;var i=t.getBindingContext(e);if(!i){this._oLogger.debug("The control '"+t+"' has no binding context"+(e?" for the model "+e:""));return false}var n=this.getPath()===i.getPath();if(!n){this._oLogger.debug("The control '"+t+"' has a binding context"+(e?" for the model "+e:"")+" but its binding path is "+i.getPath()+" when it should be "+this.getPath())}return n}})});