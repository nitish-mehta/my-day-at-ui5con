/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/support/library"],function(e,t){"use strict";var a=t.Categories,i=t.Severity,r=t.Audiences;var n={id:"panelWithheaderTextOrWithHeaderToolbarWithTitle",audiences:[r.Control],categories:[a.Usability],enabled:true,minversion:"1.28",title:"Panel: Header text is missing",description:"According to the SAP Fiori Guidelines, a panel needs a header text or a header toolbar.",resolution:"Add a title directly to the panel or use a headerToolbar with title element",resolutionurls:[{text:"SAP Fiori Design Guidelines: Panel",href:"https://experience.sap.com/fiori-design-web/panel/#components",text2:"Explored Sample",href2:"https://openui5beta.hana.ondemand.com/#/sample/sap.m.sample.Panel/preview"}],check:function(t,a,r){r.getElementsByClassName("sap.m.Panel").forEach(function(a){if(!e.isEmptyObject(a.getAggregation("Title text"))||!e.isEmptyObject(a.getAggregation("Toolbar"))){var r=a.getId(),n=a.getMetadata().getElementName();t.addIssue({severity:i.Medium,details:"Panel '"+n+"' ("+r+") does not have a title or a toolbar aggregation",context:{id:r}})}})}};return[n]},true);