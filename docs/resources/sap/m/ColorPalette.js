/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/Device","sap/ui/base/DataType","sap/ui/core/CSSColor","sap/ui/core/delegate/ItemNavigation","./Button","./Dialog","./library","./ColorPaletteRenderer"],function(t,o,e,r,i,a,n,l,s){"use strict";var u;var p;var g=l.ButtonType;var h=e.getType("boolean");var f="sapMColorPaletteSquare";var _=5;var C=2;var c=15;var d=sap.ui.getCore().getLibraryResourceBundle("sap.m");var y=t.extend("sap.m.ColorPalette",{metadata:{library:"sap.m",properties:{colors:{type:"sap.ui.core.CSSColor[]",group:"Appearance",defaultValue:["gold","darkorange","indianred","darkmagenta","cornflowerblue","deepskyblue","darkcyan","olivedrab","darkslategray","azure","white","lightgray","darkgray","dimgray","black"]}},aggregations:{_defaultColorButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_moreColorsButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{colorSelect:{parameters:{value:{type:"sap.ui.core.CSSColor"},defaultAction:{type:"boolean"}}}}}});y.prototype.init=function(){this._oDefaultColor=null;this._bShowDefaultColorButton=false;this._bShowMoreColorsButton=false;this._oMoreColorsDialog=null;this._oItemNavigation=null};y.prototype.exit=function(){if(this._oMoreColorsDialog){this._oMoreColorsDialog.destroy();delete this._oMoreColorsDialog}if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}};y.prototype.setColors=function(t){t=this.validateProperty("colors",t);if(t.length<C||t.length>c){throw new Error("Cannot set property 'colors' - array must has minimum 2 and maximum 15 elements")}return this.setProperty("colors",t)};y.prototype.ontap=function(t){var o=jQuery(t.target),e,r;r=o.closest("."+f);if(!r.length){return}e=r.attr("data-sap-ui-color");this._fireColorSelect(e,false,t)};y.prototype.onsaptabnext=y.prototype.onsaptabprevious=function(t){var o=this._getShowDefaultColorButton()&&jQuery.sap.containsOrEquals(t.target,this._getDefaultColorButton().getDomRef()),e=this._getShowMoreColorsButton()&&jQuery.sap.containsOrEquals(t.target,this._getMoreColorsButton().getDomRef());if(e){this.fireEvent("_colorNotSelected",{_originalEvent:t});return}if(o){this._fireColorSelect(this._getDefaultColor(),true,t);return}y.prototype.ontap.apply(this,arguments)};y.prototype.onsapspace=y.prototype.onsapenter=y.prototype.ontap;y.prototype.onAfterRendering=function(){this._ensureItemNavigation()};y.prototype._createDefaultColorButton=function(){return new a(this.getId()+"-btnDefaultColor",{width:"100%",type:g.Transparent,text:d.getText("COLOR_PALETTE_DEFAULT_COLOR"),visible:this._getShowDefaultColorButton(),press:function(t){this._fireColorSelect(this._getDefaultColor(),true,t)}.bind(this)})};y.prototype._getDefaultColor=function(){return this._oDefaultColor};y.prototype._setDefaultColor=function(t){if(!r.isValid(t)){throw new Error("Cannot set internal property '_defaultColor' - invalid value: "+t)}this._oDefaultColor=t;return this};y.prototype._getShowDefaultColorButton=function(){return this._bShowDefaultColorButton};y.prototype._setShowDefaultColorButton=function(t){if(!h.isValid(t)){throw new Error("Cannot set internal property 'showDefaultColorButton' - invalid value: "+t)}this._bShowDefaultColorButton=t;if(t&&!this._getDefaultColorButton()){this.setAggregation("_defaultColorButton",this._createDefaultColorButton())}if(this._getDefaultColorButton()){this._getDefaultColorButton().setVisible(t)}return this};y.prototype._getDefaultColorButton=function(){return this.getAggregation("_defaultColorButton")};y.prototype._createMoreColorsButton=function(){return new a(this.getId()+"-btnMoreColors",{width:"100%",type:g.Transparent,text:d.getText("COLOR_PALETTE_MORE_COLORS"),visible:this._getShowMoreColorsButton(),press:this._openColorPicker.bind(this)})};y.prototype._getShowMoreColorsButton=function(){return this._bShowMoreColorsButton};y.prototype._setShowMoreColorsButton=function(t){if(!h.isValid(t)){throw new Error("Cannot set internal property 'showMoreColorsButton' - invalid value: "+t)}this._bShowMoreColorsButton=t;if(t&&!this._getMoreColorsButton()){this.setAggregation("_moreColorsButton",this._createMoreColorsButton())}if(this._getMoreColorsButton()){this._getMoreColorsButton().setVisible(t)}return this};y.prototype._getMoreColorsButton=function(){return this.getAggregation("_moreColorsButton")};y.prototype._openColorPicker=function(){this.fireEvent("_beforeOpenColorPicker");this._ensureMoreColorsDialog().open()};y.prototype._ensureMoreColorsDialog=function(){if(!this._oMoreColorsDialog){this._oMoreColorsDialog=this._createMoreColorsDialog()}return this._oMoreColorsDialog};y.prototype._createMoreColorsDialog=function(){var t=new n(this.getId()+"-moreColorsDialog",{contentWidth:o.system.phone?"":"29rem",stretch:!!o.system.phone,title:d.getText("COLOR_PALETTE_MORE_COLORS_TITLE")});this._ensureUnifiedLibrary();t.addContent(t._oColorPicker=new u({mode:p.HSL}));t.setBeginButton(new a({text:d.getText("COLOR_PALETTE_MORE_COLORS_CONFIRM"),press:function(o){t.close();if(t._oColorPicker.getColorString()){this._fireColorSelect(t._oColorPicker.getColorString(),false,o)}}.bind(this)}));t.setEndButton(new a({text:d.getText("COLOR_PALETTE_MORE_COLORS_CANCEL"),press:function(){t.close()}}));return t};y.prototype._ensureUnifiedLibrary=function(){var t;if(!u){sap.ui.getCore().loadLibrary("sap.ui.unified");t=sap.ui.require("sap/ui/unified/library");u=sap.ui.requireSync("sap/ui/unified/ColorPicker");p=t.ColorPickerMode}};y.prototype._focusFirstElement=function(){var t=this._getShowDefaultColorButton()?this._getDefaultColorButton().getDomRef():this._getAllSwatches()[0];t.focus()};y.prototype._fireColorSelect=function(t,o,e){this.fireColorSelect({value:t,defaultAction:o,_originalEvent:e})};y.prototype._ensureItemNavigation=function(){var t=[],o=this._getDefaultColorButton(),e=this._getMoreColorsButton();if(!this._oItemNavigation){this._oItemNavigation=new B(this);this.addDelegate(this._oItemNavigation)}if(o&&o.getVisible()){t.push(o.getDomRef())}t=t.concat(this._getAllSwatches());if(e&&e.getVisible()){t.push(e.getDomRef())}this._oItemNavigation.setRootDomRef(this.getDomRef());this._oItemNavigation.setItemDomRefs(t)};y.prototype._getAllSwatches=function(){return this.$().find("."+f).get()};var B=i.extend("sap.ui.core.delegate.ItemNavigation",{constructor:function(t){i.apply(this);this._oColorPalette=t}});B.prototype._onHomeEnd=function(t){var o,e,r,i=t.type==="saphome";if(!jQuery(t.target).hasClass(f)){return}t.preventDefault();t.stopPropagation();o=jQuery(t.target).index();r=this._oColorPalette._getAllSwatches();e=this._calcIndexOfBorderSwatch(i,o,r.length);r[e].focus()};B.prototype.onsaphome=B.prototype.onsapend=B.prototype._onHomeEnd;B.prototype._calcIndexOfBorderSwatch=function(t,o,e){var r;if(t){r=Math.floor(o/_)*_}else{r=Math.floor(o/_)*_+(_-1);if(r>e){r=e-1}}return r};y.prototype._ItemNavigation=B;y.prototype._ColorsHelper={RGB_TO_NAMED_COLORS_MAP:{"#FFB200":"gold","#FF8C00":"darkorange","#CD5C5C":"indianred","#8B008B":"darkmagenta","#6495ED":"cornflowerblue","#00BFFF":"deepskyblue","#008B8B":"darkcyan","#6B8E23":"olivedrab","#2F4F4F":"darkslategray","#F0FFFF":"azure","#FFFFFF":"white","#D3D3D3":"lightgray","#A9A9A9":"darkgray","#696969":"dimgray","#000000":"black"},NAME_COLORS_TO_RGB_MAP:{gold:"#FFB200",darkorange:"#FF8C00",indianred:"#CD5C5C",darkmagenta:"#8B008B",cornflowerblue:"#6495ED",deepskyblue:"#00BFFF",darkcyan:"#008B8B",olivedrab:"#6B8E23",darkslategray:"#2F4F4F",azure:"#F0FFFF",white:"#FFFFFF",lightgray:"#D3D3D3",darkgray:"#A9A9A9",dimgray:"#696969",black:"#000000"},getNamedColor:function(t){var o="";if(!t||t.toLowerCase().indexOf("hsl")!==-1){return undefined}if(t.indexOf("#")===-1){return this.NAME_COLORS_TO_RGB_MAP[t.toLowerCase()]?t.toLowerCase():undefined}if(t.length===4){o=["#",t[1],t[1],t[2],t[2],t[3],t[3]].join("")}else{o=t}o=o.toUpperCase();return this.RGB_TO_NAMED_COLORS_MAP[o]}};return y});