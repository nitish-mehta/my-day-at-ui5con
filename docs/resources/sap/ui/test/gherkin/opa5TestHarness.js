/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
if(!window.QUnit){jQuery.sap.require("sap.ui.thirdparty.qunit")}sap.ui.define(["jquery.sap.global","sap/ui/test/opaQunit","sap/ui/test/Opa5","sap/ui/test/gherkin/GherkinTestGenerator","sap/ui/test/gherkin/dataTableUtils","sap/ui/test/gherkin/StepDefinitions","sap/ui/test/launchers/componentLauncher","sap/ui/test/launchers/iFrameLauncher","sap/ui/qunit/qunit-css","sap/ui/qunit/qunit-junit","sap/ui/qunit/qunit-coverage"],function($,opaTest,Opa5,GherkinTestGenerator,dataTableUtils,StepDefinitions,componentLauncher,iFrameLauncher){"use strict";var opa5TestHarness={_oOpa5:new Opa5,_opaTest:opaTest,_fnAlternateTestStepGenerator:function(oStep){var sToEval=oStep.keyword+".";var sFinalFunction=oStep.text;var aMatch=oStep.text.match(/(.*?)\s*:\s*(.*)/);if(aMatch){sToEval+=dataTableUtils.normalization.camelCase(aMatch[1])+".";sFinalFunction=aMatch[2]}sToEval+=dataTableUtils.normalization.camelCase(sFinalFunction)+"();";return{isMatch:true,text:oStep.text,regex:/Generated Step/,parameters:[],func:function(Given,When,Then){$.sap.log.info("[GHERKIN] Generated Step: "+sToEval);eval(sToEval)},_sToEval:sToEval}},test:function(e){if($.type(e)!=="object"){throw new Error("opa5TestHarness.test: input all arguments via a single object")}if($.type(e.featurePath)!=="string"){throw new Error("opa5TestHarness.test: parameter 'featurePath' must be a valid string")}if(e.steps&&($.type(e.steps)!=="function"||!(new e.steps)._generateTestStep)){throw new Error("opa5TestHarness.test: if specified, parameter 'steps' must be a valid StepDefinitions constructor")}if(!e.steps&&e.generateMissingSteps!==true){throw new Error("opa5TestHarness.test: if parameter 'generateMissingSteps' is not true then parameter 'steps' must be a valid StepDefinitions constructor")}if(e.generateMissingSteps&&$.type(e.generateMissingSteps)!=="boolean"){throw new Error("opa5TestHarness.test: if specified, parameter 'generateMissingSteps' must be a valid boolean")}if(!e.steps){e.steps=StepDefinitions}var t=e.generateMissingSteps?this._fnAlternateTestStepGenerator:null;var a=new GherkinTestGenerator(e.featurePath,e.steps,t);var s=a.generate();QUnit.module(s.name,{beforeEach:function(){a.setUp()},afterEach:function(){if(this._oOpa5.hasAppStarted()){this._oOpa5.iTeardownMyApp()}if($("#frame-close-link").length===0){$("#qunit-header").append('<input id="frame-close-link" type="button"'+'onclick="sap.ui.test.Opa5.emptyQueue(); $(\'#frame-close-link\').remove();" style="float: right; '+'margin-right: 0.5em; margin-top: -0.4em;" value="Close &#13;&#10;Frame"></input>')}a.tearDown()}.bind(this)});$.sap.log.info("[GHERKIN] Running feature: '"+s.name+"'");s.testScenarios.forEach(function(e){var t=!s.skip&&!e.skip?this._opaTest:QUnit.skip;t(e.name,function(t,s,n){$.sap.log.info("[GHERKIN] Running scenario: '"+e.name+"'");e.testSteps.forEach(function(e){this._oOpa5.waitFor({viewName:"",success:function(){$.sap.log.info("[GHERKIN] Running step: text='"+e.text+"' regex='"+e.regex+"'");Opa5.assert.ok(e.isMatch,e.text);if(e.isMatch){QUnit.config.current.assertions.pop()}e.parameters=(e.parameters||[]).concat([t,s,n]);a.execute(e,Opa5.assert)}})}.bind(this))}.bind(this))}.bind(this))}};return opa5TestHarness},true);