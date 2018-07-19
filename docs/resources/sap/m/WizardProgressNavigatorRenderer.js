/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={NAVIGATION:"sapMWizardProgressNav",LIST:"sapMWizardProgressNavList",LIST_VARYING:"sapMWizardProgressNavListVarying",LIST_NO_TITLES:"sapMWizardProgressNavListNoTitles",STEP:"sapMWizardProgressNavStep",ANCHOR:"sapMWizardProgressNavAnchor",ANCHOR_CIRCLE:"sapMWizardProgressNavAnchorCircle",ANCHOR_TITLE:"sapMWizardProgressNavAnchorTitle",ANCHOR_TITLE_OPTIONAL_TITLE:"sapMWizardProgressNavAnchorTitleOptional",ANCHOR_TITLE_OPTIONAL_LABEL:"sapMWizardProgressNavAnchorLabelOptional",ANCHOR_ICON:"sapMWizardProgressNavAnchorIcon",ANCHOR_TITLE_CONTAINER:"sapMWizardProgressNavAnchorTitleContainer"};var e={STEP:"data-sap-ui-wpn-step",STEP_COUNT:"data-sap-ui-wpn-step-count",CURRENT_STEP:"data-sap-ui-wpn-step-current",ACTIVE_STEP:"data-sap-ui-wpn-step-active",OPEN_STEP:"data-sap-ui-wpn-step-open",OPEN_STEP_PREV:"data-sap-ui-wpn-step-open-prev",OPEN_STEP_NEXT:"data-sap-ui-wpn-step-open-next",ARIA_LABEL:"aria-label",ARIA_DISABLED:"aria-disabled"};var r={CLASSES:t,ATTRIBUTES:e},i=sap.ui.getCore().getLibraryResourceBundle("sap.m");r.render=function(t,e){this.startNavigator(t,e);this.renderList(t,e);this.endNavigator(t)};r.startNavigator=function(r,a){var s=i.getText("WIZARD_LABEL");r.write("<nav");r.writeControlData(a);r.addClass(t.NAVIGATION+" sapContrastPlus");r.writeClasses();r.writeAttribute(e.STEP_COUNT,a.getStepCount());r.writeAccessibilityState({role:"navigation",label:s});r.write(">")};r.renderList=function(t,e){this.startList(t,e);this.renderSteps(t,e);this.endList(t)};r.startList=function(e,r){var i=r.getStepTitles();e.write("<ul");if(r.getVaryingStepCount()){e.addClass(t.LIST_VARYING)}else{e.addClass(t.LIST)}if(!i.length){e.addClass(t.LIST_NO_TITLES)}e.writeAccessibilityState({role:"list"});e.writeClasses();e.write(">")};r.renderSteps=function(t,e){var r=e.getStepCount(),a=e.getStepTitles(),s=e._stepOptionalIndication,n=e.getStepIcons(),T=i.getText("WIZARD_STEP_OPTIONAL_STEP_TEXT");for(var o=1;o<=r;o++){var p=s[o-1]?T:"";this.startStep(t,o);this.renderAnchor(t,e,o,a[o-1],n[o-1],p);this.endStep(t)}};r.startStep=function(r,i){r.write("<li");r.writeAttribute("class",t.STEP);r.writeAttribute(e.STEP,i);r.writeAccessibilityState({role:"listitem"});r.write(">")};r.renderAnchor=function(e,r,i,a,s,n){var T=r._cachedSteps,o=T[i];e.write("<a tabindex='-1' ");if(!o||!!parseInt(o.style.zIndex,10)){e.write("aria-disabled='true'")}e.writeAttribute("class",t.ANCHOR);this.writeAnchorTooltip(e,a,n,i);e.write(">");this.renderAnchorCircle(e,s,i);if(a){this.renderAnchorTitle(e,a,n)}e.write("</a>")};r.renderAnchorCircle=function(e,r,i){e.write("<span");e.writeAttribute("class",t.ANCHOR_CIRCLE);e.write(">");if(r){e.writeIcon(r,[t.ANCHOR_ICON],{title:null})}else{e.write(i)}e.write("</span>")};r.writeAnchorTooltip=function(t,e,r,a){var s=i.getText("WIZARD_PROG_NAV_STEP_TITLE"),n;if(e){n=a+". "+e}else{n=s+" "+a}if(r){n+=" ("+r+")"}t.writeAttributeEscaped("title",n)};r.renderAnchorTitle=function(e,r,i){e.write("<span");e.writeAttribute("class",t.ANCHOR_TITLE_CONTAINER);e.write(">");e.write("<span");e.addClass(t.ANCHOR_TITLE);if(i){e.addClass(t.ANCHOR_TITLE_OPTIONAL_TITLE)}e.writeClasses();e.write(">");e.writeEscaped(r);e.write("</span>");if(i){e.write("<span");e.writeAttribute("class",t.ANCHOR_TITLE_OPTIONAL_LABEL);e.write(">");e.writeEscaped("("+i+")");e.write("</span>")}e.write("</span>")};r.endStep=function(t){t.write("</li>")};r.endList=function(t){t.write("</ul>")};r.endNavigator=function(t){t.write("</nav>")};return r},true);