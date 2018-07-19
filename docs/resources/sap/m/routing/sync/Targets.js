/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{display:function(){var t,i;this._oLastDisplayedTarget=null;var e=this._super.display.apply(this,arguments);if(this._oLastDisplayedTarget){t=this._getViewLevel(this._oLastDisplayedTarget);i=this._oLastDisplayedTarget._oOptions.name}this._oTargetHandler.navigate({viewLevel:t,navigationIdentifier:i});return e},_displaySingleTarget:function(t){var i=this.getTarget(t);if(i){this._oLastDisplayedTarget=i}return this._super._displaySingleTarget.apply(this,arguments)}}},true);