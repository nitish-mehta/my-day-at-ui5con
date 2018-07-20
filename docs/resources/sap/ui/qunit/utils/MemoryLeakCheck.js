/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Core","sap/ui/base/Object","sap/ui/core/Control"],function(e,t,o,n){"use strict";e.sap.require("sap.ui.qunit.qunit-css");e.sap.require("sap.ui.thirdparty.qunit");e.sap.require("sap.ui.qunit.qunit-junit");e.sap.require("sap.ui.qunit.qunit-coverage");QUnit.config.reorder=false;var r={};sap.ui.getCore().registerPlugin({startPlugin:function(e){r.oCore=e},stopPlugin:function(){r.oCore=undefined}});function a(){return e.extend({},r.oCore.mElements)}var i=function(e){var t=e.getMetadata().getAllProperties();for(var o in t){var n=t[o];try{if(e[n._sGetter]()===n.getDefaultValue()){e[n._sMutator]("dummyValueForMemLeakTest")}}catch(e){}}if(!e.getTooltip()){e.setTooltip("test")}};var s=function(e,t,o,r){QUnit.test("Control "+e+" should not have any memory leaks",function(e){var s=t();e.ok(s,"calling fnControlFactory() should return something (a control)");e.ok(s instanceof n,"calling fnControlFactory() should return something that is really instanceof sap.ui.core.Control");if(s.placeAt&&!r){try{s.getMetadata().getRenderer()}catch(t){e.ok(false,"Error: control does not have a renderer. If this is known, please set the 'bControlCannotRender' flag when calling MemoryLeakCheck.checkControl")}}i(s);if(s.placeAt&&!r){try{s.placeAt("qunit-fixture");sap.ui.getCore().applyChanges()}catch(t){e.ok(false,"Error: control has a renderer, but could not be rendered. If this is known, please set the 'bControlCannotRender' flag when calling MemoryLeakCheck.checkControl");throw t}}if(o){o(s);sap.ui.getCore().applyChanges()}s.destroy();sap.ui.getCore().applyChanges();var u=a(),c=t();i(c);if(c.placeAt&&!r){c.placeAt("qunit-fixture");sap.ui.getCore().applyChanges();c.rerender();sap.ui.getCore().applyChanges()}if(o){o(c);sap.ui.getCore().applyChanges()}c.destroy();sap.ui.getCore().applyChanges();var f=a();l(e,f,u,"Memory leak check should not find any leftover controls after creating two instances and rendering twice"+(o?"\n(and calling fnSomeAdditionalFunction)":""))})};var l=function(e,t,o,n){var r=[];for(var a in t){if(!o[a]){r.push(t[a])}}for(var i=0;i<r.length;i++){if(typeof r[i].getText==="function"){r[i]+=" (text: '"+r[i].getText()+"')"}}n=n+(r.length>0?". LEFTOVERS: "+r.join(", "):"");e.equal(r.length,0,n)};r.checkControl=function(e,t,o,n){if(typeof e!=="string"){n=o;o=t;t=e;e="[some control, id: "+Math.random()+" - please update your test to also pass the control name]"}if(o===true||o===false){n=o;o=undefined}var i;QUnit.module("MemoryLeakCheck.checkControl: "+e,{beforeEach:function(){i=a()},afterEach:function(){for(var e in r.oCore.mElements){if(!i[e]){var t=sap.ui.getCore().byId(e);t.destroy()}}}});QUnit.test("MemoryLeakCheck.checkControl(fnControlFactory) should receive a control factory",function(e){e.equal(typeof t,"function","MemoryLeakCheck should have received a control factory");e.ok(document.getElementById("qunit-fixture"),"the test page HTML should contain an element with ID 'qunit-fixture'")});s(e,t,o,n)};return r},true);