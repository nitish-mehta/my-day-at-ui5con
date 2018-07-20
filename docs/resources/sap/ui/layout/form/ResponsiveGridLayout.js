/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/layout/Grid","sap/ui/layout/GridData","./Form","./FormContainer","./FormElement","./FormLayout","sap/ui/layout/library","sap/ui/core/Control","sap/ui/core/ResizeHandler","./ResponsiveGridLayoutRenderer"],function(e,t,a,i,n,r,s,o,l,u,f){"use strict";var d=s.extend("sap.ui.layout.form.ResponsiveGridLayout",{metadata:{library:"sap.ui.layout",properties:{labelSpanXL:{type:"int",group:"Misc",defaultValue:-1},labelSpanL:{type:"int",group:"Misc",defaultValue:4},labelSpanM:{type:"int",group:"Misc",defaultValue:2},labelSpanS:{type:"int",group:"Misc",defaultValue:12},adjustLabelSpan:{type:"boolean",group:"Misc",defaultValue:true},emptySpanXL:{type:"int",group:"Misc",defaultValue:-1},emptySpanL:{type:"int",group:"Misc",defaultValue:0},emptySpanM:{type:"int",group:"Misc",defaultValue:0},emptySpanS:{type:"int",group:"Misc",defaultValue:0},columnsXL:{type:"int",group:"Misc",defaultValue:-1},columnsL:{type:"int",group:"Misc",defaultValue:2},columnsM:{type:"int",group:"Misc",defaultValue:1},singleContainerFullSize:{type:"boolean",group:"Misc",defaultValue:true},breakpointXL:{type:"int",group:"Misc",defaultValue:1440},breakpointL:{type:"int",group:"Misc",defaultValue:1024},breakpointM:{type:"int",group:"Misc",defaultValue:600}}}});var p=l.extend("sap.ui.layout.form.ResponsiveGridLayoutPanel",{metadata:{aggregations:{content:{type:"sap.ui.layout.Grid",multiple:false}},associations:{container:{type:"sap.ui.layout.form.FormContainer",multiple:false},layout:{type:"sap.ui.layout.form.ResponsiveGridLayout",multiple:false}}},getLayoutData:function(){var e=sap.ui.getCore().byId(this.getContainer());var t=sap.ui.getCore().byId(this.getLayout());var a;if(t&&e){a=t.getLayoutDataForElement(e,"sap.ui.layout.GridData")}if(a){return a}else{return this.getAggregation("layoutData")}},getCustomData:function(){var e=sap.ui.getCore().byId(this.getContainer());if(e){return e.getCustomData()}},refreshExpanded:function(){var e=sap.ui.getCore().byId(this.getContainer());if(e){if(e.getExpanded()){this.$().removeClass("sapUiRGLContainerColl")}else{this.$().addClass("sapUiRGLContainerColl")}}},renderer:function(e,t){var a=sap.ui.getCore().byId(t.getContainer());var i=sap.ui.getCore().byId(t.getLayout());var n=t.getContent();var r=a.getExpandable();var s=a.getTooltip_AsString();var o=a.getToolbar();var l=a.getTitle();e.write("<div");e.writeControlData(t);e.addClass("sapUiRGLContainer");if(r&&!a.getExpanded()){e.addClass("sapUiRGLContainerColl")}if(o){e.addClass("sapUiFormContainerToolbar")}else if(l){e.addClass("sapUiFormContainerTitle")}if(s){e.writeAttributeEscaped("title",s)}e.writeClasses();i.getRenderer().writeAccessibilityStateContainer(e,a);e.write(">");i.getRenderer().renderHeader(e,o,l,a._oExpandButton,r,false,a.getId());if(n){e.write("<div");e.addClass("sapUiRGLContainerCont");e.writeClasses();e.write(">");e.renderControl(n);e.write("</div>")}e.write("</div>")}});d.prototype.init=function(){this.mContainers={};this.oDummyLayoutData=new a(this.getId()+"--Dummy")};d.prototype.exit=function(){for(var e in this.mContainers){_.call(this,e)}if(this._mainGrid){this._mainGrid.destroy();delete this._mainGrid}this.oDummyLayoutData.destroy();this.oDummyLayoutData=undefined};d.prototype.onBeforeRendering=function(e){var t=this.getParent();if(!t||!(t instanceof i)){return}t._bNoInvalidate=true;g.call(this,t);b.call(this,t);t._bNoInvalidate=false};d.prototype.onAfterRendering=function(e){if(this._mainGrid&&this._mainGrid.__bIsUsed){for(var t in this.mContainers){if(this.mContainers[t][1]._sContainerResizeListener){u.deregister(this.mContainers[t][1]._sContainerResizeListener);this.mContainers[t][1]._sContainerResizeListener=null}}}};d.prototype.toggleContainerExpanded=function(e){var t=e.getId();if(this.mContainers[t]&&this.mContainers[t][0]){var a=this.mContainers[t][0];a.refreshExpanded()}};d.prototype.onLayoutDataChange=function(e){var t=e.srcControl;if(t instanceof n){if(this._mainGrid){this._mainGrid.onLayoutDataChange(e);this.invalidate()}}else if(!(t instanceof r)){var a=t.getParent();if(a instanceof r){var i=a.getParent();var s=i.getId();if(this.mContainers[s]&&this.mContainers[s][1]){this.mContainers[s][1].onLayoutDataChange(e)}}}};d.prototype.onsapup=function(e){this.onsapleft(e)};d.prototype.onsapdown=function(e){this.onsapright(e)};d.prototype.getContainerRenderedDomRef=function(e){if(this.getDomRef()){var t=e.getId();if(this.mContainers[t]){if(this.mContainers[t][0]){var a=this.mContainers[t][0];return a.getDomRef()}else if(this.mContainers[t][1]){var i=this.mContainers[t][1];return i.getDomRef()}}}return null};d.prototype.getElementRenderedDomRef=function(e){return null};function g(e){var t=e.getVisibleFormContainers();var a=t.length;var i=0;var n;var r;var s;var o;var l=0;for(l=0;l<a;l++){s=t[l];s._checkProperties();if(s.isVisible()){i++;o=s.getId();n=undefined;r=undefined;var u=t[l+1];if(this.mContainers[o]&&this.mContainers[o][1]){r=this.mContainers[o][1]}else{r=h.call(this,s)}var f=s.getTitle();var d=s.getToolbar();if(d||f||s.getExpandable()){if(this.mContainers[o]&&this.mContainers[o][0]){n=this.mContainers[o][0]}else{n=m.call(this,s,r);v(r,true)}C(n,s,i,u,a)}else{if(this.mContainers[o]&&this.mContainers[o][0]){y(this.mContainers[o][0])}v(r,false);C(r,s,i,u,a)}this.mContainers[o]=[n,r]}}var p=Object.keys(this.mContainers).length;if(a<p){for(o in this.mContainers){var g=false;for(l=0;l<a;l++){s=t[l];if(o==s.getId()){g=true;break}}if(!g){_.call(this,o)}}}}function m(e,t){var a=e.getId();var i=new p(a+"---Panel",{container:e,layout:this,content:t});return i}function y(e){e.setContent("");e.setLayout("");e.setContainer("");e.destroy()}function h(a){var i=a.getId()+"--Grid";var n=new t(i,{vSpacing:0,hSpacing:0,containerQuery:true});n.__myParentLayout=this;n.__myParentContainerId=a.getId();n.addStyleClass("sapUiFormResGridCont");n.getContent=function(){var e=sap.ui.getCore().byId(this.__myParentContainerId);if(e){var t=[];var a=e.getVisibleFormElements();var i;var n;for(var r=0;r<a.length;r++){var s=a[r];n=s.getLabelControl();if(n){t.push(n)}i=s.getFields();for(var o=0;o<i.length;o++){t.push(i[o])}}return t}else{return false}};n.getAriaLabelledBy=function(){var e=sap.ui.getCore().byId(this.__myParentContainerId);if(e&&!e.getToolbar()&&!e.getTitle()&&!e.getExpandable()){return e.getAriaLabelledBy()}return[]};var r={labelSpan:0,span:0,firstField:false,defaultFields:0,row:0,myRow:false,freeFields:0,finished:false};var s={id:"XL",getEffectiveSpan:function(e){var t=e._getEffectiveSpanXLarge();if(!t){t=e._getEffectiveSpanLarge()}return t},getEmptySpan:function(e){var t=e.getEmptySpanXL();if(t<0){t=e.getEmptySpanL()}return t},getLabelSpan:function(e){return e.getLabelSpanXL()},setIndent:function(e,t){e.setIndentXL(t)},setLinebreak:function(e,t){e.setLinebreakXL(t)}};e.extend(s,r);var o={id:"L",getEffectiveSpan:function(e){return e._getEffectiveSpanLarge()},getEmptySpan:function(e){return e.getEmptySpanL()},getLabelSpan:function(e){return e.getLabelSpanL()},setIndent:function(e,t){e.setIndentL(t)},setLinebreak:function(e,t){e.setLinebreakL(t)}};e.extend(o,r);var l={id:"M",getEffectiveSpan:function(e){return e._getEffectiveSpanMedium()},getEmptySpan:function(e){return e.getEmptySpanM()},getLabelSpan:function(e){return e.getLabelSpanM()},setIndent:function(e,t){e.setIndentM(t)},setLinebreak:function(e,t){e.setLinebreakM(t)}};e.extend(l,r);var u={id:"S",getEffectiveSpan:function(e){return e._getEffectiveSpanSmall()},getEmptySpan:function(e){return e.getEmptySpanS()},getLabelSpan:function(e){return e.getLabelSpanS()},setIndent:function(e,t){e.setIndentS(t)},setLinebreak:function(e,t){e.setLinebreakS(t)}};e.extend(u,r);var f=[s,o,l,u];n._getLayoutDataForControl=function(t){var a=this.__myParentLayout;var i=a.getLayoutDataForElement(t,"sap.ui.layout.GridData");var n=t.getParent();var d=n.getLabelControl();if(i){if(d==t){i._setStylesInternal("sapUiFormElementLbl")}return i}else{var p=sap.ui.getCore().byId(this.__myParentContainerId);var g=a.getLayoutDataForElement(p,"sap.ui.layout.GridData");var m=p.getParent();var y;var h=0;for(h=0;h<f.length;h++){y=f[h];e.extend(y,r);y.labelSpan=y.getLabelSpan(a)}if(a.getAdjustLabelSpan()){if(m.getVisibleFormContainers().length>=1&&a.getColumnsM()>1){l.labelSpan=a.getLabelSpanL()}if(g){if(g._getEffectiveSpanLarge()==12){o.labelSpan=a.getLabelSpanM();l.labelSpan=a.getLabelSpanM()}}if(m.getVisibleFormContainers().length==1||a.getColumnsL()==1){o.labelSpan=a.getLabelSpanM();l.labelSpan=a.getLabelSpanM()}}if(s.labelSpan<0){s.labelSpan=o.labelSpan}if(d==t){a.oDummyLayoutData.setSpan("XL"+s.labelSpan+" L"+o.labelSpan+" M"+l.labelSpan+" S"+u.labelSpan);a.oDummyLayoutData.setLinebreak(true);a.oDummyLayoutData.setIndentXL(0).setIndentL(0).setIndentM(0).setIndentS(0);a.oDummyLayoutData._setStylesInternal("sapUiFormElementLbl");return a.oDummyLayoutData}else{var L;if(d){L=a.getLayoutDataForElement(d,"sap.ui.layout.GridData")}var v=n.getFields();var C=v.length;var _;var b;var c=1;var S=false;var D;var G=0;for(h=0;h<f.length;h++){y=f[h];y.span=12-y.getEmptySpan(a);if(d){if(L){D=y.getEffectiveSpan(L);if(D){y.labelSpan=D}}if(y.labelSpan<12){y.span=y.span-y.labelSpan}}y.spanFields=y.span}for(G=0;G<C;G++){_=v[G];if(_!=t){b=a.getLayoutDataForElement(_,"sap.ui.layout.GridData");if(b){for(h=0;h<f.length;h++){y=f[h];D=y.getEffectiveSpan(b);if(D&&D<y.span){y.span=y.span-D}}}else{c++}}else{if(c==1){S=true}}}var F=[];for(h=0;h<f.length;h++){y=f[h];y.firstField=S;y.defaultFields=c;if(y.span<c){y.defaultFields=0;y.row=0;y.myRow=false;y.freeFields=y.spanFields;y.span=y.spanFields;y.finished=false;F.push(y)}}if(F.length>0){for(G=0;G<C;G++){_=v[G];b=undefined;if(_!=t){b=a.getLayoutDataForElement(_,"sap.ui.layout.GridData")}for(h=0;h<F.length;h++){y=F[h];if(y.finished){continue}if(b){D=y.getEffectiveSpan(b);y.span=y.span-D}else{D=1}if(y.freeFields>=D){y.freeFields=y.freeFields-D;if(!b){y.defaultFields++}}else{if(y.myRow){y.finished=true}else{y.freeFields=y.spanFields-D;y.row++;if(b){y.defaultFields=0;y.span=y.spanFields-D}else{y.defaultFields=1;y.span=y.spanFields}if(_==t){y.firstField=true}}}if(_==t){y.myRow=true}}}}var I=0;var R="";var M;for(h=0;h<f.length;h++){y=f[h];if(y.id!="S"||y.labelSpan<12){if(y.firstField){I=y.span-Math.floor(y.span/y.defaultFields)*y.defaultFields;M=Math.floor(y.span/y.defaultFields)+I}else{M=Math.floor(y.span/y.defaultFields)}}else{M=12}if(R){R=R+" "}R=R+y.id+M;y.setLinebreak(a.oDummyLayoutData,y.firstField&&y.row>0);y.setIndent(a.oDummyLayoutData,y.firstField&&y.row>0?y.labelSpan:0)}a.oDummyLayoutData.setSpan(R);a.oDummyLayoutData.setLinebreak(S&&!d);a.oDummyLayoutData._setStylesInternal(undefined);return a.oDummyLayoutData}return i}};n._onParentResizeOrig=n._onParentResize;n._onParentResize=function(){if(!this.getDomRef()){this._cleanup();return}if(!e(this.getDomRef()).is(":visible")){return}var t=this.__myParentLayout;if(!t._mainGrid||!t._mainGrid.__bIsUsed){var a=t.getParent().getVisibleFormContainers();var i;for(var n=0;n<a.length;n++){i=a[n];break}if(!i||!t.mContainers[i.getId()]||i.getId()!=this.__myParentContainerId){return}if(t.mContainers[this.__myParentContainerId][0]){var r=t.mContainers[this.__myParentContainerId][0].getDomRef();var s=r.clientWidth;if(s<=t.getBreakpointM()){this._toggleClass("Phone")}else if(s>t.getBreakpointM()&&s<=t.getBreakpointL()){this._toggleClass("Tablet")}else if(s>t.getBreakpointL()&&s<=t.getBreakpointXL()){this._toggleClass("Desktop")}else{this._toggleClass("LargeDesktop")}}else{this._setBreakPointTablet(t.getBreakpointM());this._setBreakPointDesktop(t.getBreakpointL());this._setBreakPointLargeDesktop(t.getBreakpointXL());this._onParentResizeOrig()}}else{var o=t._mainGrid.$();if(o.hasClass("sapUiRespGridMedia-Std-Phone")){this._toggleClass("Phone")}else if(o.hasClass("sapUiRespGridMedia-Std-Tablet")){this._toggleClass("Tablet")}else if(o.hasClass("sapUiRespGridMedia-Std-Desktop")){this._toggleClass("Desktop")}else{this._toggleClass("LargeDesktop")}}};n._getAccessibleRole=function(){var e=sap.ui.getCore().byId(this.__myParentContainerId);var t=this.__myParentLayout;if(t._mainGrid&&t._mainGrid.__bIsUsed&&!e.getToolbar()&&!e.getTitle()&&!e.getExpandable()&&e.getAriaLabelledBy().length>0){return"form"}};n.getUIArea=function(){var e=this.__myParentLayout;if(e){return e.getUIArea()}else{return null}};return n}function L(e){if(e.__myParentContainerId){e.__myParentContainerId=undefined}e.__myParentLayout=undefined;e.destroy()}function v(e,t){if(t){if(e.__originalGetLayoutData){e.getLayoutData=e.__originalGetLayoutData;delete e.__originalGetLayoutData}}else if(!e.__originalGetLayoutData){e.__originalGetLayoutData=e.getLayoutData;e.getLayoutData=function(){var e=this.__myParentLayout;var t=sap.ui.getCore().byId(this.__myParentContainerId);var a;if(t){a=e.getLayoutDataForElement(t,"sap.ui.layout.GridData")}if(a){return a}else{return this.getAggregation("layoutData")}}}}function C(e,t,i,n,r){var s;if(e instanceof p){s=sap.ui.getCore().byId(e.getLayout())}else{s=e.__myParentLayout}var o=s.getLayoutDataForElement(t,"sap.ui.layout.GridData");if(!o){var l=s.getColumnsM();var u=s.getColumnsL();var f=s.getColumnsXL();var d=i%u==1;var g=i%u==0;var m=i>u*(Math.ceil(r/u)-1);var y=i<=u;var h=i%l==1;var L=i%l==0;var v=i>l*(Math.ceil(r/l)-1);var C=i<=l;var _=false;var b=g;var c=m;var S=y;if(f>0){_=i%f==1;b=i%f==0;c=i>f*(Math.ceil(r/f)-1);S=i<=f}if(n){var D=s.getLayoutDataForElement(n,"sap.ui.layout.GridData");if(D&&(D.getLinebreak()||D.getLinebreakXL())){b=true;c=false}if(D&&(D.getLinebreak()||D.getLinebreakL())){g=true;m=false}if(D&&(D.getLinebreak()||D.getLinebreakM())){L=true;v=false}}var G="";if(b){G="sapUiFormResGridLastContXL"}if(g){if(G){G=G+" "}G=G+"sapUiFormResGridLastContL"}if(L){if(G){G=G+" "}G=G+"sapUiFormResGridLastContM"}if(c){if(G){G=G+" "}G=G+"sapUiFormResGridLastRowXL"}if(m){if(G){G=G+" "}G=G+"sapUiFormResGridLastRowL"}if(v){if(G){G=G+" "}G=G+"sapUiFormResGridLastRowM"}if(S){if(G){G=G+" "}G=G+"sapUiFormResGridFirstRowXL"}if(y){if(G){G=G+" "}G=G+"sapUiFormResGridFirstRowL"}if(C){if(G){G=G+" "}G=G+"sapUiFormResGridFirstRowM"}o=e.getLayoutData();if(!o){o=new a(e.getId()+"--LD",{linebreakL:d,linebreakM:h});e.setLayoutData(o)}else{o.setLinebreakL(d);o.setLinebreakM(h)}if(f>0){o.setLinebreakXL(_)}o._setStylesInternal(G)}}function _(e){var t=this.mContainers[e];var a=t[1];if(a){L(a)}var i=t[0];if(i){y(i)}delete this.mContainers[e]}function b(e){var a=e.getVisibleFormContainers();var i;var n=a.length;var r=0;var s=0;var o=0;if(n>1||!this.getSingleContainerFullSize()){var l=Math.floor(12/this.getColumnsM());var u=Math.floor(12/this.getColumnsL());var f;var d="";var p=this.getColumnsXL();if(p>=0){f=Math.floor(12/p);d=d+"XL"+f+" "}d=d+"L"+u+" M"+l+" S12";if(!this._mainGrid){this._mainGrid=new t(e.getId()+"--Grid",{defaultSpan:d,hSpacing:0,vSpacing:0,containerQuery:true}).setParent(this);this._mainGrid.addStyleClass("sapUiFormResGridMain");this._mainGrid._onParentResizeOrig=this._mainGrid._onParentResize;this._mainGrid._onParentResize=function(){this._onParentResizeOrig();var e=this.getParent();for(var t in e.mContainers){e.mContainers[t][1]._onParentResize()}}}else{this._mainGrid.setDefaultSpan(d);var g=this._mainGrid.getContent();r=g.length;var m=false;for(s=0;s<r;s++){var y=g[s];i=undefined;if(y.getContainer){i=sap.ui.getCore().byId(y.getContainer())}else{i=sap.ui.getCore().byId(y.__myParentContainerId)}if(i&&i.isVisible()){var h=a[o];if(i!=h){m=true;break}var L=this.mContainers[i.getId()];if(L[0]&&L[0]!=y){m=true;break}if(!L[0]&&L[1]&&L[1]!=y){m=true;break}o++}else{this._mainGrid.removeContent(y)}}if(m){this._mainGrid.removeAllContent();r=0}}this._mainGrid._setBreakPointTablet(this.getBreakpointM());this._mainGrid._setBreakPointDesktop(this.getBreakpointL());this._mainGrid._setBreakPointLargeDesktop(this.getBreakpointXL());this._mainGrid.__bIsUsed=true;if(r<n){var v=0;if(r>0){v=r--}for(s=v;s<n;s++){i=a[s];var C=i.getId();if(this.mContainers[C]){if(this.mContainers[C][0]){this._mainGrid.addContent(this.mContainers[C][0])}else if(this.mContainers[C][1]){this._mainGrid.addContent(this.mContainers[C][1])}}}}}else if(this._mainGrid){this._mainGrid.__bIsUsed=false}}return d});