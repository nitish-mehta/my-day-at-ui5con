/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxBaseRenderer","sap/ui/core/Renderer"],function(e,t){"use strict";var s=t.extend(e);s.CSS_CLASS_MULTICOMBOBOX="sapMMultiComboBox";s.DOT_CSS_CLASS_MULTICOMBOBOX=".sapMMultiComboBox";s.addOuterClasses=function(t,i){e.addOuterClasses.apply(this,arguments);t.addClass(s.CSS_CLASS_MULTICOMBOBOX);if(i._hasTokens()){t.addClass("sapMMultiComboBoxHasToken")}};s.writeInnerAttributes=function(t,s){if(sap.ui.getCore().getConfiguration().getAccessibility()){var i=s._oTokenizer&&s._oTokenizer.getTokensInfoId();t.writeAttribute("aria-describedby",i)}e.writeInnerAttributes.apply(this,arguments)};s.addInnerClasses=function(t,i){e.addInnerClasses.apply(this,arguments);t.addClass(s.CSS_CLASS_MULTICOMBOBOX+"InputInner")};s.addButtonClasses=function(t,i){e.addButtonClasses.apply(this,arguments);t.addClass(s.CSS_CLASS_MULTICOMBOBOX+"Arrow")};s.openInputTag=function(t,s){t.write('<div class="sapMMultiComboBoxBorder"');t.writeAttribute("id",s.getId()+"-border");t.write(">");t.renderControl(s._oTokenizer);t.write('<div class="sapMMultiComboBoxInputContainer">');e.openInputTag.call(this,t,s)};s.closeInputTag=function(t,s){e.closeInputTag.call(this,t,s);t.write("</div>");t.write("</div>")};return s},true);