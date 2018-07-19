/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","./PipelineFactory"],function(e,n,t){"use strict";var a=new t({name:"Action",functionName:"executeOn"});return n.extend("sap.ui.test.matcherPipeline",{process:function(n){var t,c=n.control;var i=a.create(n.actions);if(!e.isArray(c)){t=[c]}else{t=c}t.forEach(function(e){i.forEach(function(n){n.executeOn(e)})})}})});