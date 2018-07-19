/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/HTML","sap/ui/core/ResizeHandler","sap/ui/layout/Grid","sap/ui/layout/GridData","sap/ui/layout/VerticalLayout","sap/ui/layout/HorizontalLayout","sap/ui/core/Icon","sap/ui/core/theming/Parameters","sap/ui/core/InvisibleText","sap/ui/Device","sap/ui/core/library","./ColorPickerRenderer","sap/ui/Global"],function(e,t,i,s,o,a,r,l,h,n,u,d,C,p,f){"use strict";var c=p.ValueState;var g=t.ColorPickerMode;var b=i.extend("sap.ui.unified.ColorPicker",{metadata:{library:"sap.ui.unified",properties:{colorString:{type:"string",group:"Misc",defaultValue:null},mode:{type:"sap.ui.unified.ColorPickerMode",group:"Appearance",defaultValue:g.HSV}},aggregations:{_grid:{type:"sap.ui.layout.Grid",group:"Appearance",multiple:false,visibility:"hidden"},_invisibleTexts:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"}},events:{change:{parameters:{r:{type:"int"},g:{type:"int"},b:{type:"int"},h:{type:"int"},s:{type:"int"},v:{type:"int"},l:{type:"int"},hex:{type:"string"},alpha:{type:"string"}}},liveChange:{parameters:{r:{type:"int"},g:{type:"int"},b:{type:"int"},h:{type:"int"},s:{type:"int"},v:{type:"int"},l:{type:"int"},hex:{type:"string"},alpha:{type:"string"}}}}}});var S="",_=sap.ui.resource("sap.ui.unified","img/ColorPicker/Alphaslider_BG.png"),y=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified"),R=t.ColorPickerHelper,L=R.factory,v={};Object.defineProperties(v,{RGB:{value:"RGB"},CPResponsiveClass:{value:"sapUnifiedColorPicker"},CPMatrixClass:{value:"sapUiColorPicker-ColorPickerMatrix"},HSLClass:{value:"sapUiColorPickerHSL"},LabelClass:{value:"sapUiColorPicker-ColorPickerLabels"},UnitLabelClass:{value:"sapUiCPUnitLabel"},HEXClass:{value:"sapUiColorPicker-ColorPickerHexField"},LeftColumnInputClass:{value:"sapUiColorPicker-ColorPickerInputFieldsLeft"},RightColumnInputClass:{value:"sapUiColorPicker-ColorPickerInputFieldsRight"},SliderClass:{value:"sapUiColorPicker-ColorPickerSlider"},AlphaSliderClass:{value:"sapUiColorPicker-ColorPickerAlphaSlider"},OutputSelectorClass:{value:"sapUiColorPickerHSL-RB"},OutputSelectorRowClass:{value:"sapUiColorPicker-RBRow"},CPBoxClass:{value:"sapUiColorPicker-ColorPickerBox"},CPCircleClass:{value:"sapUiColorPicker-ColorPickerCircle"},LastColumnClass:{value:"sapUiColorPicker-ColorPickerLastColumn"},HideForHSVClass:{value:"hideForHSV"},HideForHSLClass:{value:"hideForHSL"},OldColorClass:{value:"sapUiColorPicker-ColorPickerOldColor"},NewColorClass:{value:"sapUiColorPicker-ColorPickerNewColor"},SwatchesClass:{value:"sapUiColorPicker-swatches"},ArrowClass:{value:"sapUiColorPicker-Arrow"},Colors:{value:{aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgrey:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",grey:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"778899",lightslategrey:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32",transparent:"00000000"}}});b.prototype.init=function(){if(C.browser.firefox){S="-moz-linear-gradient"}else if(C.browser.msie){S="-ms-linear-gradient"}else if(C.browser.webkit){S="-webkit-linear-gradient"}else{S="linear-gradient"}this.Color={r:255,g:255,b:255,h:0,s:0,l:100,v:100,a:1,oldA:1,hex:"#ffffff",old:"#ffffff"};this.sHexString="ffffff";this.$CPBox=null;this.$CPCur=null;this.RGB={r:0,g:0,b:0};this.bRtl=sap.ui.getCore().getConfiguration().getRTL();this.data("sap-ui-fastnavgroup","true",true);this.bResponsive=R.isResponsive();this._iCPCursorSize=parseInt(u.get("_sap_ui_unified_ColorPicker_CircleSize"),10);this._processChanges=this._processHSVChanges;this._bHSLMode=false};var F=i.extend("sap.ui.unified._ColorPickerBox",{metadata:{events:{select:{parameters:{value:{type:"int"},saturation:{type:"int"}}},resize:{parameters:{size:{type:"int"}}}}},init:function(){this.bRtl=sap.ui.getCore().getConfiguration().getRTL()},exit:function(){if(this._sResizeListener){o.deregister(this._sResizeListener)}},getWidth:function(){return this.$().width()},getOffset:function(){return this.$().offset()},onBeforeRendering:function(){if(this._sResizeListener){o.deregister(this._sResizeListener)}},onAfterRendering:function(){this._handle=this.$().find("> div."+v.CPCircleClass);this._sResizeListener=o.register(this.getDomRef(),this.handleResize.bind(this))},handleResize:function(e){this.fireResize({size:e.size.width})},getHandle:function(){return this._handle},ontouchstart:function(e){this.handleTouch(e)},ontouchend:function(e){this.handleTouch(e)},ontouchmove:function(e){this.handleTouch(e)},handleTouch:function(e){var t=this.calculateValuesFromEvent(e);if(t){this.fireSelect(t)}},calculateValuesFromEvent:function(e){var t=e.offsetX,i=e.offsetY,s,o=s=this.getWidth(),a,r;e.preventDefault&&e.preventDefault();if(!t){a=e.targetTouches?e.targetTouches[0]:e;if(!a||!a.pageX){a=e;if((!a||!a.pageX)&&e.changedTouches){a=e.changedTouches[0]}}if(!a.pageX){return false}r=this.getOffset();t=a.pageX-r.left;i=a.pageY-r.top}t=Math.min(Math.max(t,0),o);i=Math.min(Math.max(i,0),s);if(this.bRtl){t=o-t}return{value:t/o*100,saturation:(1-i/s)*100}},renderer:function(e,t){e.write("<div");e.addClass(v.CPBoxClass);e.writeControlData(t);e.writeClasses();e.write(">");e.write("<div");e.writeAttribute("id",t.getId()+"-cpCur");e.addClass(v.CPCircleClass);e.writeClasses();e.write("></div>");e.write("</div>")}});b.prototype._createRowFromInput=function(e,t,i,s){var o=y.getText(t),a;a=new h({content:[L.createLabel({text:i,tooltip:o,labelFor:e}).addStyleClass(v.LabelClass),e.setTooltip(o)]});if(s){a.addContent(L.createLabel({text:s,labelFor:e}).addStyleClass(v.UnitLabelClass).addStyleClass(v.LabelClass))}return a};b.prototype._updateColorStringProperty=function(e,t){var i=this._getCSSColorString();this.setProperty("colorString",i,true);if(t){this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,l:this.Color.l,alpha:this.Color.a,hex:this.Color.hex,formatHSL:this.Color.formatHSL,colorString:i})}if(e){this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,l:this.Color.l,alpha:this.Color.a,hex:this.Color.hex,formatHSL:this.Color.formatHSL,colorString:i})}};b.prototype._handleCPBoxSelectEvent=function(e){var t=e.getParameter("value"),i=e.getParameter("saturation");this.oSatField.setValue(i);if(this._bHSLMode){this.oLitField.setValue(t)}else{this.oValField.setValue(t)}this._processChanges();this._updateColorStringProperty(false,true)};b.prototype._handleCPBoxResizeEvent=function(e){this._iCPBoxSize=e.getParameter("size");this._updateCursorPosition()};b.prototype._handleCPBoxTouchEndEvent=function(e){this._updateColorStringProperty(true,false)};b.prototype._createInteractionControls=function(){var e=this.getId(),i,s;this.oCPBox=new F(e+"-cpBox",{select:this._handleCPBoxSelectEvent.bind(this),resize:this._handleCPBoxResizeEvent.bind(this)});this.oCPBox.addDelegate({ontouchend:this._handleCPBoxTouchEndEvent.bind(this)});this.oHexField=L.createInput(e+"-hxF",{value:this.Color.hex.substr(1),change:this._handleHexValueChange.bind(this)}).addStyleClass(v.HEXClass);this.oRedField=L.createInput(e+"-rF",{value:this.Color.r,change:this._handleRedValueChange.bind(this)}).addStyleClass(v.LeftColumnInputClass);this.oGreenField=L.createInput(e+"-gF",{value:this.Color.g,change:this._handleGreenValueChange.bind(this)}).addStyleClass(v.LeftColumnInputClass);this.oBlueField=L.createInput(e+"-bF",{value:this.Color.b,change:this._handleBlueValueChange.bind(this)}).addStyleClass(v.LeftColumnInputClass);this.oHueField=L.createInput(e+"-hF",{value:this.Color.h,change:this._handleHueValueChange.bind(this)}).addStyleClass(v.RightColumnInputClass);this.oSatField=L.createInput(e+"-sF",{value:this.Color.s,change:this._handleSatValueChange.bind(this)}).addStyleClass(v.RightColumnInputClass);this.oLitField=L.createInput(e+"-lF",{value:this.Color.l,change:this._handleLitValueChange.bind(this)}).addStyleClass(v.RightColumnInputClass);this.oAlphaField=L.createInput(e+"-aF",{value:this.Color.a,change:this._handleAlphaValueChange.bind(this)}).addStyleClass(v.RightColumnInputClass);this.oValField=L.createInput(e+"-vF",{value:this.Color.v,change:this._handleValValueChange.bind(this)}).addStyleClass(v.RightColumnInputClass);this.oRGBorHSLRBGroup=L.createRadioButtonGroup({columns:2,buttons:[L.createRadioButtonItem({text:v.RGB}),L.createRadioButtonItem({text:t.ColorPickerMode.HSL})],select:this._handleRGBorHSLValueChange.bind(this),selectedIndex:this.Color.formatHSL?1:0}).addStyleClass(v.OutputSelectorClass);i=new d({text:y.getText("COLORPICKER_HUE_SLIDER")}).toStatic();this.addAggregation("_invisibleTexts",i,true);this.oSlider=L.createSlider(e+"-hSLD",{max:360,step:1,tooltip:y.getText("COLORPICKER_HUE"),value:parseInt(this.oHueField.getValue(),10)}).addStyleClass(v.SliderClass).addAriaLabelledBy(i);this.oSlider.attachEvent("liveChange","liveChange",this._handleSliderChange.bind(this));this.oSlider.attachEvent("change","change",this._handleSliderChange.bind(this));s=new d({text:y.getText("COLORPICKER_ALPHA_SLIDER")}).toStatic();this.addAggregation("_invisibleTexts",s,true);this.oAlphaSlider=L.createSlider(e+"-aSLD",{max:1,value:1,step:.01,tooltip:y.getText("COLORPICKER_ALPHA")}).addStyleClass(v.AlphaSliderClass).addAriaLabelledBy(s);this.oAlphaSlider.attachEvent("liveChange","liveChange",this._handleAlphaSliderChange.bind(this));this.oAlphaSlider.attachEvent("change","change",this._handleAlphaSliderChange.bind(this))};b.prototype._createLayout=function(){var e=this.getId(),t;if(this._bLayoutControlsCreated){return}this._createInteractionControls();this._oLayoutData={oCPBox:new r({span:"L6 M6 S12"}),icOne:new r({span:"L3 M3 S6"}),icTwo:new r({span:"L3 M3 S6"}),swatches:new r({span:"L3 M3 S12"}),rbg:new r({span:"L6 M8 S12"})};t=new a({containerQuery:true,content:[this.oCPBox.setLayoutData(this._oLayoutData.oCPBox),new l({content:[this._createRowFromInput(this.oRedField,"COLORPICKER_RED","R:"),this._createRowFromInput(this.oGreenField,"COLORPICKER_GREEN","G:"),this._createRowFromInput(this.oBlueField,"COLORPICKER_BLUE","B:"),this._createRowFromInput(this.oHexField,"COLORPICKER_HEX","#:")],layoutData:this._oLayoutData.icOne}),new l({content:[this._createRowFromInput(this.oHueField,"COLORPICKER_HUE","H:"),this._createRowFromInput(this.oSatField,"COLORPICKER_SAT","S:","%"),this._createRowFromInput(this.oLitField,"COLORPICKER_LIGHTNESS","L:","%").addStyleClass(v.HideForHSVClass),this._createRowFromInput(this.oAlphaField,"COLORPICKER_ALPHA","A:").addStyleClass(v.HideForHSVClass),this._createRowFromInput(this.oValField,"COLORPICKER_VALUE","V:").addStyleClass(v.HideForHSLClass)],layoutData:this._oLayoutData.icTwo}).addStyleClass(v.LastColumnClass),new h({content:[new s({content:["<div id='",e,"-ocBox' class='",v.OldColorClass,"'></div>"].join("")}),new n({backgroundColor:"transparent",src:"sap-icon://arrow-right",tooltip:y.getText("COLORPICKER_NEW_OLD_COLOR")}).addStyleClass(v.HideForHSVClass).addStyleClass(v.ArrowClass),new s({content:["<div id='",e,"-ncBox' class='",v.NewColorClass,"'></div>"].join("")})],layoutData:this._oLayoutData.swatches}).addStyleClass(v.SwatchesClass),new h({content:[L.createLabel({text:"Output:",labelFor:this.oRGBorHSLRBGroup}),this.oRGBorHSLRBGroup],layoutData:this._oLayoutData.rbg}).addStyleClass(v.HideForHSVClass).addStyleClass(v.OutputSelectorRowClass),this.oSlider.setLayoutData(new r({span:"L6 M6 S12",linebreak:true})),this.oAlphaSlider.setLayoutData(new r({span:"L6 M6 S12"}))]}).addStyleClass(v.CPMatrixClass);this.setAggregation("_grid",t,true);this._bLayoutControlsCreated=true;this._adaptControlToLibrary()};b.prototype._adaptControlToLibrary=function(){var t;if(!this._bLayoutControlsCreated){return}t=this.getAggregation("_grid");if(this.bResponsive){if(!C.system.phone&&!e("html").hasClass("sapUiMedia-Std-Phone")){t._setBreakPointTablet(400)}t.addStyleClass(v.CPResponsiveClass)}else{t.setProperty("hSpacing",0,true);t.setProperty("vSpacing",0,true);this._oLayoutData.oCPBox.setSpanS(5);this._oLayoutData.icOne.setSpanS(4);this._oLayoutData.icTwo.setSpanS(3);this._oLayoutData.rbg.setSpanS(8)}this._adaptControlToLibrary=e.noop};b.prototype._updateControlVisualState=function(){var e=this.getAggregation("_grid");if(!this._bLayoutControlsCreated){return}if(this.bResponsive){if(this._bHSLMode){e.addStyleClass(v.HSLClass);this._oLayoutData.swatches.setSpanM(4).setLinebreak(true)}else{e.removeStyleClass(v.HSLClass);this._oLayoutData.swatches.setSpanM(3).setLinebreak(false)}}else{if(this._bHSLMode){e.addStyleClass(v.HSLClass);this._oLayoutData.swatches.setSpanS(4).setLinebreak(true)}else{e.removeStyleClass(v.HSLClass);this._oLayoutData.swatches.setSpanS(3).setLinebreak(false)}}};b.prototype._processChanges=e.noop;b.prototype.setMode=function(i,s){switch(i){case t.ColorPickerMode.HSL:this._processChanges=this._processHSLChanges;break;case t.ColorPickerMode.HSV:this._processChanges=this._processHSVChanges;break;default:e.sap.log.error("Control must have a valid mode set to work correct");break}this._bHSLMode=i===t.ColorPickerMode.HSL;return this.setProperty("mode",i,s)};b.prototype.onBeforeRendering=function(){this._createLayout();this._updateControlVisualState();this._updateColorString()};b.prototype._updateColorString=function(){this._parseColorString(this.getColorString());this.oHexField.setValue(this.Color.hex.substr(1));this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);if(this._bHSLMode){this.oLitField.setValue(this.Color.l);this.oAlphaField.setValue(this.Color.a);this.oSlider.setValue(this.Color.h);this.oAlphaSlider.setValue(this.Color.a);this.oRGBorHSLRBGroup.setSelectedIndex(this.Color.formatHSL?1:0)}else{this.oValField.setValue(this.Color.v);this.oSlider.setValue(this.Color.h);this.oAlphaSlider.setValue(this.Color.a);this.oAlphaField.setValue(this.Color.a)}this._updateColorStringProperty(true,true)};b.prototype.isColor=function(e){return this._parseColorString(e,true)};b.prototype._handleSliderChange=function(e,t){var i=parseInt(this.oSlider.getValue(),10);this.oHueField.setValue(i);this._processChanges();this._updateColorStringProperty(t==="change",t==="liveChange")};b.prototype._handleAlphaSliderChange=function(e,t){this.Color.a=this.oAlphaSlider.getValue();if(this._bHSLMode){this.oAlphaField.setValue(this.Color.a)}if(!this.Color.formatHSL){this._processRGBChanges()}else{this._processChanges()}this._updateColorStringProperty(t==="change",t==="liveChange")};b.prototype._getValueInRange=function(e,t,i){if(isNaN(e)){e=0}return Math.min(Math.max(e,t),i)};b.prototype._handleAlphaValueChange=function(){var e=parseFloat(this.oAlphaField.getValue(),10);e=this._getValueInRange(e,0,1);this.Color.a=e;this.oAlphaField.setValue(e);this.oAlphaSlider.setValue(e);if(!this.Color.formatHSL){this._processRGBChanges()}else{this._processChanges()}this._updateColorStringProperty(true,true)};b.prototype._handleRGBorHSLValueChange=function(){this.Color.formatHSL=this.oRGBorHSLRBGroup.getSelectedIndex()===1;this._updateColorStringProperty(true,true)};b.prototype._handleHueValueChange=function(){var e=parseInt(this.oHueField.getValue(),10);e=this._getValueInRange(e,0,360);this.oHueField.setValue(e);this.oSlider.setValue(e);this._processChanges();this._updateColorStringProperty(true,true)};b.prototype._handleSatValueChange=function(){var e=parseInt(this.oSatField.getValue(),10);e=this._getValueInRange(e,0,100);this.oSatField.setValue(e);this._processChanges();this._updateColorStringProperty(true,true)};b.prototype._handleValValueChange=function(){var e=parseInt(this.oValField.getValue(),10);e=this._getValueInRange(e,0,100);this.oValField.setValue(e);this._processHSVChanges();this._updateColorStringProperty(true,true)};b.prototype._handleLitValueChange=function(){var e=parseInt(this.oLitField.getValue(),10);e=this._getValueInRange(e,0,100);this.oLitField.setValue(e);this._processHSLChanges();this._updateColorStringProperty(true,true)};b.prototype._handleRedValueChange=function(){var e=parseInt(this.oRedField.getValue(),10);e=this._getValueInRange(e,0,255);this.oRedField.setValue(e);this._processRGBChanges();this._updateColorStringProperty(true,true)};b.prototype._handleGreenValueChange=function(){var e=parseInt(this.oGreenField.getValue(),10);e=this._getValueInRange(e,0,255);this.oGreenField.setValue(e);this._processRGBChanges();this._updateColorStringProperty(true,true)};b.prototype._handleBlueValueChange=function(){var e=parseInt(this.oBlueField.getValue(),10);e=this._getValueInRange(e,0,255);this.oBlueField.setValue(e);this._processRGBChanges();this._updateColorStringProperty(true,true)};b.prototype._processHSVChanges=function(){var e=parseInt(this.oHueField.getValue(),10);var t=parseInt(this.oSatField.getValue(),10);var i=parseInt(this.oValField.getValue(),10);this._calculateRGB(e,t,i);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this._calculateHEX(this.Color.r,this.Color.g,this.Color.b);this.oHexField.setValue(this.sHexString);this.Color.hex="#"+this.oHexField.getValue();this.Color.h=e;this.Color.s=t;this.Color.v=i;this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oValField.setValue(this.Color.v);this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground()};b.prototype._processHSLChanges=function(){var e=parseInt(this.oHueField.getValue(),10),t=parseInt(this.oSatField.getValue(),10),i=parseInt(this.oLitField.getValue(),10);if(e>360){e%=360}this._calculateRGB(e,t,i);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this._calculateHEX(this.Color.r,this.Color.g,this.Color.b);this.oHexField.setValue(this.sHexString);this.Color.hex="#"+this.oHexField.getValue();this.Color.h=e;this.Color.s=t;this.Color.l=i;this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oLitField.setValue(this.Color.l);this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateAlphaBackground();this._updateSelColorBackground()};b.prototype._processRGBChanges=function(){var e=Math.round(parseInt(this.oRedField.getValue(),10)),t=Math.round(parseInt(this.oGreenField.getValue(),10)),i=Math.round(parseInt(this.oBlueField.getValue(),10)),s=e+t+i===765;this._calculateHEX(e,t,i);this.oHexField.setValue(this.sHexString);if(this._bHSLMode){this._calculateHSL(e,t,i);this.oLitField.setValue(this.Color.l)}else{if(!s){this._calculateHSV(e,t,i)}this.oValField.setValue(this.Color.v)}if(!s){this.oHueField.setValue(this.Color.h)}this.oSatField.setValue(this.Color.s);this.oSlider.setValue(parseInt(this.oHueField.getValue(),10));this.Color.r=e;this.Color.g=t;this.Color.b=i;this.Color.hex="#"+this.oHexField.getValue();this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground()};b.prototype._handleHexValueChange=function(){var e=this.oHexField.getValue().toLowerCase(),t=1,i;if(e.substr(0,1)==="#"){e=e.substr(1)}i=/^([0-9a-fA-F]{8})$/;if(i.test(e)!==false){t=Number((parseInt(e.substr(6,2),16)/255).toFixed(2));e=e.substr(0,6)}i=/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;if(i.test(e)===false){this.oHexField.setValueState(c.Error);this.oSlider.setEnabled(false);this.oAlphaSlider.setEnabled(false);this.oHueField.setEnabled(false);this.oRedField.setEnabled(false);this.oGreenField.setEnabled(false);this.oBlueField.setEnabled(false);this.oSatField.setEnabled(false);if(this._bHSLMode){this.oLitField.setEnabled(false);this.oAlphaField.setEnabled(false)}else{this.oValField.setEnabled(false)}return}else if(this.oHexField.getValueState()===c.Error){this.oHexField.setValueState(c.None);this.oSlider.setEnabled(true);this.oAlphaSlider.setEnabled(true);this.oHueField.setEnabled(true);this.oRedField.setEnabled(true);this.oGreenField.setEnabled(true);this.oBlueField.setEnabled(true);this.oSatField.setEnabled(true);if(this._bHSLMode){this.oLitField.setEnabled(true);this.oAlphaField.setEnabled(true)}else{this.oValField.setEnabled(true)}}if(e.length===3){e=e.charAt(0)+e.charAt(0)+e.charAt(1)+e.charAt(1)+e.charAt(2)+e.charAt(2)}this._processHexChanges(e);this.oHexField.setValue(e);this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);if(this._bHSLMode){this.oLitField.setValue(this.Color.l);this.oAlphaField.setValue(1)}else{this.oValField.setValue(this.Color.v)}this.oSlider.setValue(parseInt(this.oHueField.getValue(),10));this.oAlphaSlider.setValue(t);this.Color.a=t;if(this._bHSLMode){this.oAlphaField.setValue(t)}this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground();this._updateColorStringProperty(true,true)};b.prototype._processHexChanges=function(e){this._convertRGB(e);if(this._bHSLMode){this._calculateHSL(this.Color.r,this.Color.g,this.Color.b)}else{this._calculateHSV(this.Color.r,this.Color.g,this.Color.b)}this.Color.hex="#"+e.toLowerCase()};b.prototype._updateAlphaBackground=function(){var e=[this.Color.r,this.Color.g,this.Color.b].join(","),t=S+"(left,rgba("+e+",0),rgba("+e+",1)),url("+_+")";if(this.lastAlphaSliderGradient!==t){this.oAlphaSlider.$().find(this.bResponsive?".sapMSliderInner":".sapUiSliBar").css("background-image",t);this.lastAlphaSliderGradient=t}};b.prototype._updateCursorPosition=function(){var e,t;if(!this._iCPBoxSize){return}if(this._bHSLMode){e=Math.round(this.oLitField.getValue()*this._iCPBoxSize/100)}else{e=Math.round(this.oValField.getValue()*this._iCPBoxSize/100)}if(this.bRtl){e=this._iCPBoxSize-e}t=Math.round((1-this.oSatField.getValue()/100)*this._iCPBoxSize);e=Math.round(Math.max(e,0)-this._iCPCursorSize/2-1);t=Math.round(Math.max(t,0)-this._iCPCursorSize/2-1);this.$CPCur.css("left",e).css("top",t)};b.prototype._calculateRGB=function(e,t,i){var s,o,a,r,l,h,n;if(this._bHSLMode){this._calculateRGBAdvanced(e,t,i);return}e%=360;e/=60;t/=100;i/=100;h=i*t;l=h*(1-Math.abs(e%2-1));r=i-h;s=0;o=0;a=0;n=Math.floor(e);switch(n){case 0:s=h;o=l;break;case 1:s=l;o=h;break;case 2:o=h;a=l;break;case 3:o=l;a=h;break;case 4:s=l;a=h;break;case 5:s=h;a=l;break;default:s=0;a=0;o=0;break}this.RGB.r=Math.floor((s+r)*255);this.RGB.g=Math.floor((o+r)*255);this.RGB.b=Math.floor((a+r)*255)};b.prototype._calculateRGBAdvanced=function(e,t,i){var s,o,a,r,l,h,n,u,d;e=this._getValueInRange(e,0,360);if(t>100){t=1}else if(t<0){t=0}else{t=t/100}if(i>100){i=1}else if(i<0){i=0}else{i=i/100}u=t*(1-Math.abs(2*i-1));n=255*(i-.5*u);h=u*(1-Math.abs(e/60%2-1));d=Math.floor(e/60);l=n+255*h;r=n+255*u;switch(d){case 0:s=r;o=l;a=n;break;case 1:s=l;o=r;a=n;break;case 2:s=n;o=r;a=l;break;case 3:s=n;o=l;a=r;break;case 4:s=l;o=n;a=r;break;case 5:s=r;o=n;a=l;break;default:s=0;o=0;a=0;break}this.RGB.r=Math.round(s);this.RGB.g=Math.round(o);this.RGB.b=Math.round(a)};b.prototype._getCSSColorString=function(){if(this.Color.formatHSL){if(this.Color.a<1){return"hsla("+this.Color.h+","+this.Color.s+"%,"+this.Color.l+"%, "+this.Color.a+")"}else{return"hsl("+this.Color.h+","+this.Color.s+"%,"+this.Color.l+"%)"}}if(this.Color.a<1){return"rgba("+this.Color.r+","+this.Color.g+","+this.Color.b+", "+this.Color.a+")"}else{return"rgb("+this.Color.r+","+this.Color.g+","+this.Color.b+")"}};b.prototype._calculateHEX=function(e,t,i){var s=e.toString(16),o=t.toString(16),a=i.toString(16);if(s.length===1){s="0"+s}if(o.length===1){o="0"+o}if(a.length===1){a="0"+a}this.sHexString=(s+o+a).toLowerCase()};b.prototype._calculateHSV=function(e,t,i){var s=Math.max(Math.max(e,t),i),o=Math.min(Math.min(e,t),i),a=s-o,r=Math.round(s*100/255),l=s===0?0:100*a/s,h=0;if(l===0){h=0}else if(e===s){h=60*(t-i)/a}else if(t===s){h=120+60*(i-e)/a}else if(i===s){h=240+60*(e-t)/a}if(h<0){h+=359.9}h=Math.round(h);l=Math.round(l);this.Color.h=h;this.Color.s=l;this.Color.v=r};b.prototype._calculateHSL=function(e,t,i){var s=Math.max(e,t,i),o=Math.min(e,t,i),a=(s-o)/255,r=(s+o)/510,l=1-Math.abs(2*r-1),h=r===0?0:a/l,n=l!==0?h:0,u=0;r=Math.round(r*100);n=Math.round(n*100);if(r===0||n===0||e+t+i===765){u=0}else{var d=s-o;if(s===e){u=(t-i)/d%6}if(s===t){u=(i-e)/d+2}if(s===i){u=(e-t)/d+4}if(d===0){u=0}u*=60;if(u<0){u+=360}}this.Color.h=Math.round(u);this.Color.s=n;this.Color.l=r};b.prototype._convertRGB=function(e){this.Color.r=parseInt(e.substr(0,2),16);this.Color.g=parseInt(e.substr(2,2),16);this.Color.b=parseInt(e.substr(4,2),16)};b.prototype._updateGradientBoxBackground=function(e){if(this._bHSLMode){this._calculateRGBAdvanced(e,100,50)}else{this._calculateRGB(e,100,100)}this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.$CPBox.css("background-color","rgb("+[this.RGB.r,this.RGB.g,this.RGB.b].join(",")+")")};b.prototype._updateSelColorBackground=function(){this.$("ncBox").css("background-color",this._getCSSColorString())};b.prototype._parseColorString=function(e,t){var i;if(e.substr(0,1)==="#"){e=e.substr(1)}e=e.trim().toLowerCase();i=this._parseColorName(e);if(i){if(t){return true}if(i.length===8){this.Color.a=this.Color.oldA=Number((parseInt(i.substr(6,2),16)/255).toFixed(2));i=i.substring(0,6)}this._processHexChanges(i);this.Color.old=this.Color.hex;if(this._bHSLMode){this.Color.formatHSL=false}return true}if(/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e)){if(t){return true}if(e.length===3){i=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]}else{i=e}this._processHexChanges(i);this.Color.old=this.Color.hex;if(this._bHSLMode){this.Color.formatHSL=false}return true}if(e.substr(0,3)==="rgb"){return this._parseRGB(e,t)}if(this._bHSLMode){return this._parseHSL(e,t)}else if(e.substr(0,3)==="hsv"){return this._parseHSV(e,t)}return false};b.prototype._parseHSV=function(e,t){var i=/^(((\d{1,2})|([1,2]\d{2})|(3[0-5]\d)|(360)),)(((\d{1,2})|(100)),)((\d{1,2})|(100))$/,s,o,a,r;e=e.substr(3).replace("(","").replace(")","").split(" ").join("");if(i.test(e)===true){if(t){return true}s=e.split(",");o=parseInt(s[0],10);a=parseInt(s[1],10);r=parseInt(s[2],10);this._calculateRGB(o,a,r);this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.Color.h=o;this.Color.s=a;this.Color.v=r;this.Color.hex="#"+this.sHexString;this.Color.old=this.Color.hex;return true}return false};b.prototype._parseHSL=function(e,t){var i,s=e.substr(0,4),o,a,r,l,h;if(s==="hsla"){o=true}else if(s==="hsl("){o=false}else{return false}e=e.substr(o?4:3).replace("(","").replace(")","").split(" ").join("");i=e.split(",");a=parseInt(i[0],10);r=parseFloat(i[1]);l=parseFloat(i[2]);if(o){h=parseFloat(i[3])}else{if(i[3]&&parseFloat(i[3])>=0){return false}h=1}r=r<1&&r>0?r*100:r;l=l<1&&l>0?l*100:l;if(a>=0&&a<=360&&(r>=0&&r<=100)&&(l>=0&&l<=100)&&(h>=0&&h<=1)){if(t){return true}this._calculateRGB(a,r,l);this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.Color.h=a;this.Color.s=r;this.Color.l=l;this.Color.hex="#"+this.sHexString;this.Color.old=this.Color.hex;this.Color.a=this.Color.oldA=h;this.Color.formatHSL=true}else{return false}return true};b.prototype._parseRGB=function(e,t){var i,s,o,a;s=e.substring(0,4);if(s==="rgba"){a=/^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),){2}(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),)([0]|([0]\.[0-9]+)|(\.[0-9]+)|[1])$/;o=true}else if(s.substring(0,3)==="rgb"){a=/^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),){2}(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])))$/;o=false}else{return false}e=e.substr(o?4:3).replace("(","").replace(")","").split(" ").join("");if(a.test(e)){if(t){return true}i=e.split(",");this._calculateHEX(parseInt(i[0],10),parseInt(i[1],10),parseInt(i[2],10));this._processHexChanges(this.sHexString);this.Color.old=this.Color.hex;if(o){this.Color.a=this.Color.oldA=parseFloat(i[3])}return true}if(this._bHSLMode){this.Color.formatHSL=false}return false};b.prototype._parseColorName=function(e){return v.Colors[e]};b.prototype.onAfterRendering=function(){var t=this._getCSSColorString();this.$CPBox=this.oCPBox.$();this.$CPCur=this.oCPBox.getHandle();this.$("ncBox").css("background-color",t);this.$("ocBox").css("background-color",t);this._updateGradientBoxBackground(this.Color.h);this._iCPBoxSize=this.oCPBox.getWidth();this._updateCursorPosition();if(this._bHSLMode){this._updateAlphaBackground()}this.oSlider.iShiftGrip=Math.round(e(this.oSlider.oGrip).outerWidth()/2);this.oAlphaSlider.iShiftGrip=Math.round(e(this.oAlphaSlider.oGrip).outerWidth()/2)};b.prototype.getRGB=function(){return{r:this.Color.r,g:this.Color.g,b:this.Color.b}};b.prototype._getConstants=function(){return v};return b});