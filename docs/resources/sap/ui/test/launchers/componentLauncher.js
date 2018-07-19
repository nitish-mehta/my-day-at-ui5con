/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/ComponentContainer","sap/ui/core/Component"],function(e,n){"use strict";var t=false,a=null,o=null;return{start:function(r){if(t){throw new Error("sap.ui.test.launchers.componentLauncher: Start was called twice without teardown. Only one component can be started at a time.")}r.async=true;var s=sap.ui.component(r);t=true;return s.then(function(t){var r=e.sap.uid();o=e('<div id="'+r+'" class="sapUiOpaComponent"></div>');e("body").append(o).addClass("sapUiOpaBodyComponent");a=new n({component:t});a.placeAt(r)})},hasLaunched:function(){return t},teardown:function(){if(!t){throw new Error("sap.ui.test.launchers.componentLauncher: Teardown was called before start. No component was started.")}a.destroy();o.remove();t=false;e("body").removeClass("sapUiOpaBodyComponent")}}},true);