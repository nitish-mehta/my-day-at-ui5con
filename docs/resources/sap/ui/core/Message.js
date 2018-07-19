/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Element","./library"],function(e,r,a){"use strict";var t=a.MessageType;var n=r.extend("sap.ui.core.Message",{metadata:{library:"sap.ui.core",properties:{text:{type:"string",group:"Misc",defaultValue:null},timestamp:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},level:{type:"sap.ui.core.MessageType",group:"Misc",defaultValue:t.None},readOnly:{type:"boolean",group:"Misc",defaultValue:false}}}});n.prototype.getDefaultIcon=function(r){var a=e.sap.getModulePath("sap.ui.core.themes."+sap.ui.getCore().getConfiguration().getTheme());var n=a+"/img/message/";if(r&&r=="32x32"){n+="32x32/"}else{n+="16x16/"}var s="";switch(this.getProperty("level")){case t.Error:s=n+"Message_Icon_Error.png";break;case t.Information:s=n+"Message_Icon_Information.png";break;case t.Warning:s=n+"Message_Icon_Warning.png";break;case t.Success:s=n+"Message_Icon_Success.png";break;case t.None:default:s=this.getProperty("icon");break}return s};n.prototype.compareByType=function(e){return n.compareByType(this,e)};n.compareByType=function(r,a){if(!r&&!a){return 0}if(r&&!a){return 1}if(!r&&a){return-1}var n=r.getLevel();var s=a.getLevel();if(n===s){return 0}switch(n){case t.Error:return 1;case t.Warning:return s===t.Error?-1:1;case t.Success:return s===t.Error||s===t.Warning?-1:1;case t.Information:return s===t.None?1:-1;case t.None:return-1;default:e.sap.log.error("Comparison error",this);return 0}};return n});