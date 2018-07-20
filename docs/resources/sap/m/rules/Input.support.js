/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/support/library"],function(e,i){"use strict";var t=i.Categories,n=i.Severity,s=i.Audiences;var a={id:"inputNeedsLabel",audiences:[s.Control],categories:[t.Usability],enabled:true,minversion:"1.28",title:"Input field: Missing label",description:"An input field needs a label",resolution:"Define a sap.m.Label for the input field in the xml view and set the labelFor property to this input field Id.",resolutionurls:[{text:"SAP Fiori Design Guidelines: Input field",href:"https://experience.sap.com/fiori-design-web/input-field/#guidelines"}],check:function(e,i,t){var s=t.getElementsByClassName("sap.m.Input").map(function(e){return e.getId()});t.getElementsByClassName("sap.m.Label").forEach(function(e){var i=e.getLabelFor();if(s.indexOf(i)>-1){var t=s.indexOf(i);s.splice(t,1)}});if(s.length>0){s.forEach(function(i){e.addIssue({severity:n.Medium,details:"Input field"+" ("+i+") is missing a label.",context:{id:i}})})}}};return[a]},true);