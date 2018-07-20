/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/InvisibleText"],function(e,t){"use strict";var i={};i.render=function(r,a){if(a.getParent()&&(a.getParent()instanceof sap.m.MultiInput||a.getParent()instanceof sap.m.MultiComboBox)){r.write("<div ")}else{r.write('<div tabindex="0"')}r.writeControlData(a);r.addClass("sapMTokenizer");if(!a.getEditable()){r.addClass("sapMTokenizerReadonly")}var n=a.getTokens();if(!n.length){r.addClass("sapMTokenizerEmpty")}var o=a.getWidth();if(o){r.addStyle("width",o);r.writeStyles()}r.writeClasses();r.writeAttribute("role","list");var s={};s.labelledby={value:t.getStaticId("sap.m","TOKENIZER_ARIA_LABEL"),append:true};r.writeAccessibilityState(a,s);r.write(">");r.renderControl(a.getAggregation("_tokensInfo"));a._bCopyToClipboardSupport=false;if((e.system.desktop||e.system.combi)&&n.length){r.write("<div id='"+a.getId()+"-clip' class='sapMTokenizerClip'");if(window.clipboardData){r.writeAttribute("contenteditable","true");r.writeAttribute("tabindex","-1")}r.write(">&nbsp;</div>");a._bCopyToClipboardSupport=true}var d='class="sapMTokenizerScrollContainer">';var l=" ";var p="id="+a.getId()+"-scrollContainer";r.write("<div"+l+p+l+d);i._renderTokens(r,a);r.write("</div>");r.write("</div>")};i._renderTokens=function(e,t){var i=0,r=t.getTokens(),a=r.length;if(t.getReverseTokens()){for(i=a-1;i>-1;i--){e.renderControl(r[i])}}else{for(i=0;i<a;i++){e.renderControl(r[i])}}};return i},true);