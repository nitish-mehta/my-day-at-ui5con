/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/support/library"],function(e,t){"use strict";var i=t.Categories,o=t.Severity,a=t.Audiences;var n={id:"tokenizerParentRule",audiences:[a.Application],categories:[i.Usage],enabled:true,minversion:"1.28",title:"Tokenizer: Tokenizer parent control",description:"The tokenizer can only be used as part of MultiComboBox, MultiInput or ValueHelpDialog.",resolution:"Do not use the Tokenizer control standalone.",check:function(e,t,i){var a=i.getElementsByClassName("sap.m.Tokenizer"),n,r,s;a.forEach(function(t){s=t.getParent();r=s&&s.getMetadata().getName();n=s&&r==="sap.m.MultiInput"||r==="sap.m.MultiComboBox"||r==="sap.ui.layout.VerticalLayout"&&s.hasStyleClass("compVHTokenizerHLayout");if(!n){e.addIssue({severity:o.High,details:"Tokenizer with id: "+t.getId()+" is not inside a MultiComboBox, MultiInput or ValueHelpDialog",context:{id:t.getId()}})}})}};return[n]},true);