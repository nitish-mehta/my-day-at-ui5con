/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Button","./Dialog","./Text","./FormattedText","./Link","./VBox","sap/ui/core/IconPool","sap/ui/core/ElementMetadata","sap/ui/core/library","sap/ui/core/Control","sap/m/library"],function(e,t,i,n,o,s,a,r,l,c,u,d){"use strict";var f=d.DialogType;var g=c.TextDirection;var O={};O.Action={OK:"OK",CANCEL:"CANCEL",YES:"YES",NO:"NO",ABORT:"ABORT",RETRY:"RETRY",IGNORE:"IGNORE",CLOSE:"CLOSE",DELETE:"DELETE"};O.Icon={NONE:undefined,INFORMATION:"INFORMATION",WARNING:"WARNING",ERROR:"ERROR",SUCCESS:"SUCCESS",QUESTION:"QUESTION"};(function(){var c=O.Action,d=O.Icon,S={INFORMATION:"sapMMessageBoxInfo",WARNING:"sapMMessageBoxWarning",ERROR:"sapMMessageBoxError",SUCCESS:"sapMMessageBoxSuccess",QUESTION:"sapMMessageBoxQuestion",STANDARD:"sapMMessageBoxStandard"},I={INFORMATION:r.getIconURI("message-information"),WARNING:r.getIconURI("message-warning"),ERROR:r.getIconURI("message-error"),SUCCESS:r.getIconURI("message-success"),QUESTION:r.getIconURI("question-mark")};var T=function(){if(O._rb!==sap.ui.getCore().getLibraryResourceBundle("sap.m")){O._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m")}};O.show=function(r,C){var R,E,N,x=null,p=[],M,y,A,b,L,_,B,h={id:l.uid("mbox"),initialFocus:null,textDirection:g.Inherit,verticalScrolling:true,horizontalScrolling:true,details:"",contentWidth:null};T();if(typeof C==="string"||arguments.length>2){y=arguments[1];A=arguments[2];b=arguments[3];L=arguments[4];_=arguments[5];B=arguments[6];C={icon:y,title:A,actions:b,onClose:L,id:_,styleClass:B}}if(C&&C.hasOwnProperty("details")){h.icon=d.INFORMATION;h.actions=[c.OK,c.CANCEL];C=e.extend({},h,C)}C=e.extend({},h,C);if(typeof C.actions!=="undefined"&&!e.isArray(C.actions)){C.actions=[C.actions]}if(!C.actions||C.actions.length===0){C.actions=[c.OK]}function F(e){var i;if(O.Action.hasOwnProperty(e)){i=O._rb.getText("MSGBOX_"+e)}var n=new t({id:l.uid("mbox-btn-"),text:i||e,press:function(){x=e;R.close()}});return n}for(M=0;M<C.actions.length;M++){p.push(F(C.actions[M]))}function w(e,t){if(typeof e.details=="object"){e.details="<pre>"+JSON.stringify(e.details,null,"\t").replace(/{/gi,"\\{")+"</pre>"}var i=(new o).setVisible(false).setHtmlText(e.details);var n=new s({text:O._rb.getText("MSGBOX_LINK_TITLE"),press:function(){var e=R.getInitialFocus();R.addAriaLabelledBy(i);i.setVisible(true);n.setVisible(false);if(e&&e!==n.getId()){R._setInitialFocus()}else{p[0].focus()}}});n.addStyleClass("sapMMessageBoxLinkText");i.addStyleClass("sapMMessageBoxDetails");return new a({items:[t,n,i]})}function v(){if(typeof C.onClose==="function"){C.onClose(x)}R.detachAfterClose(v);R.destroy()}function m(){var e=0;var t=null;if(C.initialFocus){if(C.initialFocus instanceof u){t=C.initialFocus}if(typeof C.initialFocus==="string"){for(e=0;e<p.length;e++){if(O.Action.hasOwnProperty(C.initialFocus)){if(O._rb.getText("MSGBOX_"+C.initialFocus).toLowerCase()===p[e].getText().toLowerCase()){t=p[e];break}}else{if(C.initialFocus.toLowerCase()===p[e].getText().toLowerCase()){t=p[e];break}}}}}return t}if(typeof r==="string"){N=new n({textDirection:C.textDirection}).setText(r).addStyleClass("sapMMsgBoxText");E=N}else if(r instanceof u){N=r.addStyleClass("sapMMsgBoxText")}if(C&&C.hasOwnProperty("details")&&C.details!==""){N=w(C,N)}function G(){if(sap.ui.getCore().getConfiguration().getAccessibility()){R.$().attr("role","alertdialog")}}R=new i({id:C.id,type:f.Message,title:C.title,content:N,icon:I[C.icon],initialFocus:m(),verticalScrolling:C.verticalScrolling,horizontalScrolling:C.horizontalScrolling,afterOpen:G,afterClose:v,buttons:p,ariaLabelledBy:E?E.getId():undefined,contentWidth:C.contentWidth});if(S[C.icon]){R.addStyleClass(S[C.icon])}else{R.addStyleClass(S.STANDARD)}if(C.styleClass){R.addStyleClass(C.styleClass)}R.open()};O.alert=function(t,i){T();var n={icon:d.NONE,title:O._rb.getText("MSGBOX_TITLE_ALERT"),actions:c.OK,id:l.uid("alert"),initialFocus:null},o,s,a,r;if(typeof i==="function"||arguments.length>2){o=arguments[1];s=arguments[2];a=arguments[3];r=arguments[4];i={onClose:o,title:s,id:a,styleClass:r}}i=e.extend({},n,i);return O.show(t,i)};O.confirm=function(t,i){T();var n={icon:d.QUESTION,title:O._rb.getText("MSGBOX_TITLE_CONFIRM"),actions:[c.OK,c.CANCEL],id:l.uid("confirm"),initialFocus:null},o,s,a,r;if(typeof i==="function"||arguments.length>2){o=arguments[1];s=arguments[2];a=arguments[3];r=arguments[4];i={onClose:o,title:s,id:a,styleClass:r}}i=e.extend({},n,i);return O.show(t,i)};O.error=function(t,i){T();var n={icon:d.ERROR,title:O._rb.getText("MSGBOX_TITLE_ERROR"),actions:[c.CLOSE],id:l.uid("error"),initialFocus:null};i=e.extend({},n,i);return O.show(t,i)};O.information=function(t,i){T();var n={icon:d.INFORMATION,title:O._rb.getText("MSGBOX_TITLE_INFO"),actions:[c.OK],id:l.uid("info"),initialFocus:null};i=e.extend({},n,i);return O.show(t,i)};O.warning=function(t,i){T();var n={icon:d.WARNING,title:O._rb.getText("MSGBOX_TITLE_WARNING"),actions:[c.OK],id:l.uid("warning"),initialFocus:null};i=e.extend({},n,i);return O.show(t,i)};O.success=function(t,i){T();var n={icon:d.SUCCESS,title:O._rb.getText("MSGBOX_TITLE_SUCCESS"),actions:[c.OK],id:l.uid("success"),initialFocus:null};i=e.extend({},n,i);return O.show(t,i)}})();return O},true);