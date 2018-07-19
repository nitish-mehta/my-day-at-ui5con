/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Renderer","./InputBaseRenderer","sap/ui/Device","sap/ui/core/library"],function(e,t,r,a,n){"use strict";var i=n.Wrapping;var s={};var s=t.extend(r);s.addOuterClasses=function(e,t){e.addClass("sapMTextArea");if(t.getShowExceededText()){e.addClass("sapMTextAreaWithCounter")}if(t.getHeight()){e.addClass("sapMTextAreaWithHeight")}};s.addOuterStyles=function(e,t){t.getHeight()&&e.addStyle("height",t.getHeight())};s.writeDecorations=function(e,t){var r=t.getAggregation("_counter");e.renderControl(r)};s.openInputTag=function(e,t){e.write("<textarea")};s.closeInputTag=function(e,t){e.write("</textarea>")};s.writeInnerValue=function(){};s.writeInnerContent=function(t,r){var n=r.getValue();n=e.sap.encodeHTML(n);if(a.browser.msie&&a.browser.version<11){n=n.replace(/&#xd;&#xa;|&#xd;|&#xa;/g,"&#13;")}t.write(n)};s.addInnerClasses=function(e,t){e.addClass("sapMTextAreaInner");if(t.getGrowing()){e.addClass("sapMTextAreaGrow")}};s.getAriaRole=function(e){return""};s.writeInnerAttributes=function(e,t){if(t.getWrapping()!=i.None){e.writeAttribute("wrap",t.getWrapping())}e.writeAttribute("rows",t.getRows());e.writeAttribute("cols",t.getCols())};return s},true);