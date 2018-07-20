/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","../Device","../Global","../base/Object","./Locale","sap/ui/thirdparty/URI","jquery.sap.script"],function(e,t,a,n,i,r){"use strict";var o,s;var u=n.extend("sap.ui.core.Configuration",{constructor:function(n){this._oCore=n;function o(){function e(){if(t.os.android){var e=navigator.userAgent.match(/\s([a-z]{2}-[a-z]{2})[;)]/i);if(e){return e[1]}}return navigator.language}return l(navigator.languages&&navigator.languages[0]||e()||navigator.userLanguage||navigator.browserLanguage)||new i("en")}var s={theme:{type:"string",defaultValue:"base"},language:{type:"Locale",defaultValue:o()},formatLocale:{type:"Locale",defaultValue:null},calendarType:{type:"string",defaultValue:null},accessibility:{type:"boolean",defaultValue:true},autoAriaBodyRole:{type:"boolean",defaultValue:true,noUrl:true},animation:{type:"boolean",defaultValue:true},animationMode:{type:u.AnimationMode,defaultValue:undefined},rtl:{type:"boolean",defaultValue:null},debug:{type:"boolean",defaultValue:false},inspect:{type:"boolean",defaultValue:false},originInfo:{type:"boolean",defaultValue:false},noConflict:{type:"boolean",defaultValue:false,noUrl:true},noDuplicateIds:{type:"boolean",defaultValue:true},trace:{type:"boolean",defaultValue:false,noUrl:true},modules:{type:"string[]",defaultValue:[],noUrl:true},areas:{type:"string[]",defaultValue:null,noUrl:true},onInit:{type:"code",defaultValue:undefined,noUrl:true},uidPrefix:{type:"string",defaultValue:"__",noUrl:true},ignoreUrlParams:{type:"boolean",defaultValue:false,noUrl:true},preload:{type:"string",defaultValue:"auto"},rootComponent:{type:"string",defaultValue:"",noUrl:true},preloadLibCss:{type:"string[]",defaultValue:[]},application:{type:"string",defaultValue:""},appCacheBuster:{type:"string[]",defaultValue:[]},bindingSyntax:{type:"string",defaultValue:"default",noUrl:true},versionedLibCss:{type:"boolean",defaultValue:false},manifestFirst:{type:"boolean",defaultValue:false},whitelistService:{type:"string",defaultValue:null,noUrl:true},frameOptions:{type:"string",defaultValue:"default",noUrl:true},frameOptionsConfig:{type:"object",defaultValue:undefined,noUrl:true},support:{type:"string[]",defaultValue:null},"xx-rootComponentNode":{type:"string",defaultValue:"",noUrl:true},"xx-appCacheBusterMode":{type:"string",defaultValue:"sync"},"xx-appCacheBusterHooks":{type:"object",defaultValue:undefined,noUrl:true},"xx-disableCustomizing":{type:"boolean",defaultValue:false,noUrl:true},"xx-viewCache":{type:"boolean",defaultValue:true},"xx-test-mobile":{type:"boolean",defaultValue:false},"xx-depCache":{type:"boolean",defaultValue:false},"xx-domPatching":{type:"boolean",defaultValue:false},"xx-libraryPreloadFiles":{type:"string[]",defaultValue:[]},"xx-componentPreload":{type:"string",defaultValue:""},"xx-designMode":{type:"boolean",defaultValue:false},"xx-supportedLanguages":{type:"string[]",defaultValue:[]},"xx-bootTask":{type:"function",defaultValue:undefined,noUrl:true},"xx-suppressDeactivationOfControllerCode":{type:"boolean",defaultValue:false},"xx-lesssupport":{type:"boolean",defaultValue:false},"xx-handleValidation":{type:"boolean",defaultValue:false},"xx-fiori2Adaptation":{type:"string[]",defaultValue:[]},"xx-cache-use":{type:"boolean",defaultValue:true},"xx-cache-excludedKeys":{type:"string[]",defaultValue:[]},"xx-cache-serialization":{type:"boolean",defaultValue:false},"xx-nosync":{type:"string",defaultValue:""},"xx-waitForTheme":{type:"boolean",defaultValue:false},"xx-xml-processing":{type:"string",defaultValue:""},"xx-avoidAriaApplicationRole":{type:"boolean",defaultValue:false},statistics:{type:"boolean",defaultValue:false}};var g={"xx-test":"1.15",flexBoxPolyfill:"1.14",sapMeTabContainer:"1.14",sapMeProgessIndicator:"1.14",sapMGrowingList:"1.14",sapMListAsTable:"1.14",sapMDialogWithPadding:"1.14",sapCoreBindingSyntax:"1.24"};this.oFormatSettings=new u.FormatSettings(this);var c=this;function p(e,t){if(typeof t==="undefined"||t===null){return}switch(s[e].type){case"boolean":if(typeof t==="string"){if(s[e].defaultValue){c[e]=t.toLowerCase()!="false"}else{c[e]=t.toLowerCase()==="true"||t.toLowerCase()==="x"}}else{c[e]=!!t}break;case"string":c[e]=""+t;break;case"code":c[e]=typeof t==="function"?t:String(t);break;case"function":if(typeof t!=="function"){throw new Error("unsupported value")}c[e]=t;break;case"string[]":if(Array.isArray(t)){c[e]=t}else if(typeof t==="string"){c[e]=t.split(/[ ,;]/).map(function(e){return e.trim()})}else{throw new Error("unsupported value")}break;case"object":if(typeof t!=="object"){throw new Error("unsupported value")}c[e]=t;break;case"Locale":var a=l(t);if(a||s[e].defaultValue==null){c[e]=a}else{throw new Error("unsupported value")}break;default:var n=s[e].type;if(typeof n==="object"){h(n,t,e);c[e]=t}else{throw new Error("illegal state")}}}function d(e){var t,a;try{t=new r(e,window.location.href).normalize();a=t.path();return a+(a.slice(-1)==="/"?"":"/")+"UI5/"}catch(e){}}for(var m in s){c[m]=s[m].defaultValue}var y=window["sap-ui-config"]||{};y.oninit=y.oninit||y["evt-oninit"];for(var m in s){if(y.hasOwnProperty(m.toLowerCase())){p(m,y[m.toLowerCase()])}else if(!/^xx-/.test(m)&&y.hasOwnProperty("xx-"+m.toLowerCase())){p(m,y["xx-"+m.toLowerCase()])}}if(y.libs){c.modules=y.libs.split(",").map(function(e){return e.trim()+".library"}).concat(c.modules)}var C="compatversion";var x=y[C];var b=e.sap.Version("1.14");this._compatversion={};function v(t){var n=!t?x||b.toString():y[C+"-"+t.toLowerCase()]||x||g[t]||b.toString();n=e.sap.Version(n.toLowerCase()==="edge"?a.version:n);return e.sap.Version(n.getMajor(),n.getMinor())}this._compatversion._default=v();for(var m in g){this._compatversion[m]=v(m)}function L(e){var t=document.querySelector("META[name='"+e+"']"),a=t&&t.getAttribute("content");if(a){return a}}if(!c.ignoreUrlParams){var S="sap-ui-";var M=e.sap.getUriParameters();if(M.mParams["sap-language"]){var V=c.sapLogonLanguage=M.get("sap-language");var _=V&&l(f[V.toUpperCase()]||V);if(_){c.language=_}else if(V&&!M.get("sap-locale")&&!M.get("sap-ui-language")){e.sap.log.warning("sap-language '"+V+"' is not a valid BCP47 language tag and will only be used as SAP logon language")}}if(M.mParams["sap-locale"]){p("language",M.get("sap-locale"))}if(M.mParams["sap-rtl"]){var V=M.get("sap-rtl");if(V==="X"||V==="x"){p("rtl",true)}else{p("rtl",false)}}if(M.mParams["sap-theme"]){var V=M.get("sap-theme");if(V===""){c["theme"]=s["theme"].defaultValue}else{p("theme",V)}}if(M.mParams["sap-statistics"]){var V=M.get("sap-statistics");p("statistics",V)}for(var m in s){if(s[m].noUrl){continue}var V=M.get(S+m);if(V==null&&!/^xx-/.test(m)){V=M.get(S+"xx-"+m)}if(V===""){c[m]=s[m].defaultValue}else{p(m,V)}}if(M.mParams["sap-ui-legacy-date-format"]){this.oFormatSettings.setLegacyDateFormat(M.get("sap-ui-legacy-date-format"))}if(M.mParams["sap-ui-legacy-time-format"]){this.oFormatSettings.setLegacyTimeFormat(M.get("sap-ui-legacy-time-format"))}if(M.mParams["sap-ui-legacy-number-format"]){this.oFormatSettings.setLegacyNumberFormat(M.get("sap-ui-legacy-number-format"))}}c.sapparams=c.sapparams||{};c.sapparams["sap-language"]=this.getSAPLogonLanguage();["sap-client","sap-server","sap-system"].forEach(function(e){if(!c.ignoreUrlParams&&M.get(e)){c.sapparams[e]=M.get(e)}else{c.sapparams[e]=L(e)}});this.derivedRTL=i._impliesRTL(c.language);var w=c.theme;var P;var A=w.indexOf("@");if(A>=0){P=d(w.slice(A+1));if(P){c.theme=w.slice(0,A);c.themeRoot=P}else{c.theme=y.theme&&y.theme!==w?y.theme:"base";A=-1}}c.theme=this._normalizeTheme(c.theme,P);var T=c["languagesDeliveredWithCore"]=i._coreI18nLocales;var F=c["xx-supportedLanguages"];if(F.length===0||F.length===1&&F[0]==="*"){F=[]}else if(F.length===1&&F[0]==="default"){F=T||[]}c["xx-supportedLanguages"]=F;var U=c["xx-fiori2Adaptation"];if(U.length===0||U.length===1&&U[0]==="false"){U=false}else if(U.length===1&&U[0]==="true"){U=true}c["xx-fiori2Adaptation"]=U;if(c["bindingSyntax"]==="default"){c["bindingSyntax"]=c.getCompatibilityVersion("sapCoreBindingSyntax").compareTo("1.26")<0?"simple":"complex"}if(!c["whitelistService"]){var D=L("sap.whitelistService");if(D){c["whitelistService"]=D;if(c["frameOptions"]==="default"){c["frameOptions"]="trusted"}}}if(c["frameOptions"]==="default"||c["frameOptions"]!=="allow"&&c["frameOptions"]!=="deny"&&c["frameOptions"]!=="trusted"){c["frameOptions"]="allow"}var O=c["preloadLibCss"];if(O.length>0){O.appManaged=O[0].slice(0,1)==="!";if(O.appManaged){O[0]=O[0].slice(1)}if(O[0]==="*"){O.shift();c.modules.forEach(function(e){var t=e.match(/^(.*)\.library$/);if(t){O.unshift(t[1])}})}}for(var m in s){if(c[m]!==s[m].defaultValue){e.sap.log.info("  "+m+" = "+c[m])}}if(this.getAnimationMode()===undefined){if(this.animation){this.setAnimationMode(u.AnimationMode.full)}else{this.setAnimationMode(u.AnimationMode.minimal)}}else{this.setAnimationMode(this.getAnimationMode())}},getVersion:function(){if(this._version){return this._version}this._version=new e.sap.Version(a.version);return this._version},getCompatibilityVersion:function(e){if(typeof e==="string"&&this._compatversion[e]){return this._compatversion[e]}return this._compatversion._default},getTheme:function(){return this.theme},_setTheme:function(e){this.theme=e;return this},_normalizeTheme:function(e,t){if(e&&t==null&&e.match(/^sap_corbu$/i)){return"sap_goldreflection"}return e},getLanguage:function(){return this.language.sLocaleId},getLanguageTag:function(){return this.language.toString()},getSAPLogonLanguage:function(){return this.sapLogonLanguage||this.language.getSAPLogonLanguage()},setLanguage:function(e,t){var a=l(e),n=this.getRTL(),r;m(a,"Configuration.setLanguage: sLanguage must be a valid BCP47 language tag");m(t==null||typeof t==="string"&&/[A-Z0-9]{2,2}/i.test(t),"Configuration.setLanguage: sSAPLogonLanguage must be null or be a string of length 2, consisting of digits and latin characters only",true);if(a.toString()!=this.getLanguageTag()||t!==this.sapLogonLanguage){this.language=a;this.sapLogonLanguage=t||undefined;this.sapparams["sap-language"]=this.getSAPLogonLanguage();r=this._collect();r.language=this.getLanguageTag();this.derivedRTL=i._impliesRTL(a);if(n!=this.getRTL()){r.rtl=this.getRTL()}this._endCollect()}return this},getLocale:function(){return this.language},getSAPParam:function(e){return this.sapparams&&this.sapparams[e]},getXMLProcessingMode:function(){return this["xx-xml-processing"]},setXMLProcessingMode:function(e){this["xx-xml-processing"]=e;return this},isUI5CacheOn:function(){return this["xx-cache-use"]},setUI5CacheOn:function(e){this["xx-cache-use"]=e;return this},isUI5CacheSerializationSupportOn:function(){return this["xx-cache-serialization"]},setUI5CacheSerializationSupport:function(e){this["xx-cache-serialization"]=e;return this},getUI5CacheExcludedKeys:function(){return this["xx-cache-excludedKeys"]},getCalendarType:function(){var t;if(!o){a.getCore().loadLibrary("sap.ui.core");o=sap.ui.require("sap/ui/core/library").CalendarType}if(!s){s=sap.ui.requireSync("sap/ui/core/LocaleData")}if(this.calendarType){for(t in o){if(t.toLowerCase()===this.calendarType.toLowerCase()){this.calendarType=t;return this.calendarType}}e.sap.log.warning("Parameter 'calendarType' is set to "+this.calendarType+" which isn't a valid value and therefore ignored. The calendar type is determined from format setting and current locale")}var n=this.oFormatSettings.getLegacyDateFormat();switch(n){case"A":case"B":return o.Islamic;case"C":return o.Persian;case"7":case"8":case"9":return o.Japanese}return s.getInstance(this.getLocale()).getPreferredCalendarType()},setCalendarType:function(e){var t;if(this.calendarType!==e){t=this._collect();this.calendarType=t.calendarType=e;this._endCollect()}return this},getFormatLocale:function(){return(this.formatLocale||this.language).toString()},setFormatLocale:function(e){var t=l(e),a;m(e==null||typeof e==="string"&&t,"sFormatLocale must be a BCP47 language tag or Java Locale id or null");if(g(t)!==g(this.formatLocale)){this.formatLocale=t;a=this._collect();a.formatLocale=g(t);this._endCollect()}return this},getLanguagesDeliveredWithCore:function(){return this["languagesDeliveredWithCore"]},getSupportedLanguages:function(){return this["xx-supportedLanguages"]},getAccessibility:function(){return this.accessibility},getAutoAriaBodyRole:function(){return this.autoAriaBodyRole},getAvoidAriaApplicationRole:function(){return this.getAutoAriaBodyRole()&&this["xx-avoidAriaApplicationRole"]},getAnimation:function(){return this.animation},getAnimationMode:function(){return this.animationMode},setAnimationMode:function(e){h(u.AnimationMode,e,"animationMode");this.animation=e!==u.AnimationMode.minimal&&e!==u.AnimationMode.none;this.animationMode=e;if(this._oCore&&this._oCore._setupAnimation){this._oCore._setupAnimation()}},getRTL:function(){return this.rtl===null?this.derivedRTL:this.rtl},getFiori2Adaptation:function(){return this["xx-fiori2Adaptation"]},setRTL:function(e){m(e===null||typeof e==="boolean","bRTL must be null or a boolean");var t=this.getRTL(),a;this.rtl=e;if(t!=this.getRTL()){a=this._collect();a.rtl=this.getRTL();this._endCollect()}return this},getDebug:function(){return this.debug},getInspect:function(){return this.inspect},getOriginInfo:function(){return this.originInfo},getNoDuplicateIds:function(){return this.noDuplicateIds},getTrace:function(){return this.trace},getUIDPrefix:function(){return this.uidPrefix},getDesignMode:function(){return this["xx-designMode"]},getSuppressDeactivationOfControllerCode:function(){return this["xx-suppressDeactivationOfControllerCode"]},getControllerCodeDeactivated:function(){return this.getDesignMode()&&!this.getSuppressDeactivationOfControllerCode()},getApplication:function(){return this.application},getRootComponent:function(){return this.rootComponent},getAppCacheBuster:function(){return this.appCacheBuster},getAppCacheBusterMode:function(){return this["xx-appCacheBusterMode"]},getAppCacheBusterHooks:function(){return this["xx-appCacheBusterHooks"]},getDisableCustomizing:function(){return this["xx-disableCustomizing"]},getViewCache:function(){return this["xx-viewCache"]},getDomPatching:function(){return this["xx-domPatching"]},getPreload:function(){return this.preload},getDepCache:function(){return this["xx-depCache"]},getManifestFirst:function(){return this.manifestFirst},getComponentPreload:function(){return this["xx-componentPreload"]||this.preload},getFormatSettings:function(){return this.oFormatSettings},getFrameOptions:function(){return this.frameOptions},getWhitelistService:function(){return this.whitelistService},getSupportMode:function(){return this.support},_collect:function(){var e=this.mChanges||(this.mChanges={__count:0});e.__count++;return e},_endCollect:function(){var e=this.mChanges;if(e&&--e.__count===0){delete e.__count;this._oCore&&this._oCore.fireLocalizationChanged(e);delete this.mChanges}},getStatistics:function(){var e=this.statistics;try{e=e||window.localStorage.getItem("sap-ui-statistics")=="X"}catch(e){}return e},getNoNativeScroll:function(){return false},getHandleValidation:function(){return this["xx-handleValidation"]},applySettings:function(t){function a(t,n){var i,r;for(i in n){r="set"+i.slice(0,1).toUpperCase()+i.slice(1);if(i==="formatSettings"&&t.oFormatSettings){a(t.oFormatSettings,n[i])}else if(typeof t[r]==="function"){t[r](n[i])}else{e.sap.log.warning("Configuration.applySettings: unknown setting '"+i+"' ignored")}}}e.sap.assert(typeof t==="object","mSettings must be an object");this._collect();a(this,t);this._endCollect();return this}});u.AnimationMode={full:"full",basic:"basic",minimal:"minimal",none:"none"};function l(e){try{if(e&&typeof e==="string"){return new i(e)}}catch(e){}}function g(e){return e?e.toString():null}var f={ZH:"zh-Hans",ZF:"zh-Hant","1Q":"en-US-x-saptrc","2Q":"en-US-x-sappsd"};var c={"":{pattern:null},1:{pattern:"dd.MM.yyyy"},2:{pattern:"MM/dd/yyyy"},3:{pattern:"MM-dd-yyyy"},4:{pattern:"yyyy.MM.dd"},5:{pattern:"yyyy/MM/dd"},6:{pattern:"yyyy-MM-dd"},7:{pattern:"Gyy.MM.dd"},8:{pattern:"Gyy/MM/dd"},9:{pattern:"Gyy-MM-dd"},A:{pattern:"yyyy/MM/dd"},B:{pattern:"yyyy/MM/dd"},C:{pattern:"yyyy/MM/dd"}};var p={"":{short:null,medium:null,dayPeriods:null},0:{short:"HH:mm",medium:"HH:mm:ss",dayPeriods:null},1:{short:"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["AM","PM"]},2:{short:"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["am","pm"]},3:{short:"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["AM","PM"]},4:{short:"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["am","pm"]}};var d={"":{groupingSeparator:null,decimalSeparator:null}," ":{groupingSeparator:".",decimalSeparator:","},X:{groupingSeparator:",",decimalSeparator:"."},Y:{groupingSeparator:" ",decimalSeparator:","}};function m(e,t){if(!e){throw new Error(t)}}function h(e,t,a){var n=[];for(var i in e){if(e.hasOwnProperty(i)){if(e[i]===t){return}n.push(e[i])}}throw new Error("Unsupported Enumeration value for "+a+", valid values are: "+n.join(", "))}n.extend("sap.ui.core.Configuration.FormatSettings",{constructor:function(e){this.oConfiguration=e;this.mSettings={};this.sLegacyDateFormat=undefined;this.sLegacyTimeFormat=undefined;this.sLegacyNumberFormatSymbolSet=undefined},getFormatLocale:function(){function t(t){var a=t.oConfiguration.language;if(!e.isEmptyObject(t.mSettings)){var n=a.toString();if(n.indexOf("-x-")<0){n=n+"-x-sapufmt"}else if(n.indexOf("-sapufmt")<=n.indexOf("-x-")){n=n+"-sapufmt"}a=new i(n)}return a}return this.oConfiguration.formatLocale||t(this)},_set:function(t,a){var n=this.mSettings[t];if(a!=null){this.mSettings[t]=a}else{delete this.mSettings[t]}if((n!=null||a!=null)&&!e.sap.equal(n,a)){var i=this.oConfiguration._collect();i[t]=a;this.oConfiguration._endCollect()}},getCustomUnits:function(){return this.mSettings["units"]?this.mSettings["units"]["short"]:undefined},setCustomUnits:function(e){var t=null;if(e){t={short:e}}this._set("units",t);return this},addCustomUnits:function(t){var a=this.getCustomUnits();if(a){t=e.extend({},a,t)}this.setCustomUnits(t);return this},setUnitMappings:function(e){this._set("unitMappings",e);return this},addUnitMappings:function(t){var a=this.getUnitMappings();if(a){t=e.extend({},a,t)}this.setUnitMappings(t);return this},getUnitMappings:function(){return this.mSettings["unitMappings"]},getDatePattern:function(t){e.sap.assert(t=="short"||t=="medium"||t=="long"||t=="full","sStyle must be short, medium, long or full");return this.mSettings["dateFormats-"+t]},setDatePattern:function(e,t){m(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");this._set("dateFormats-"+e,t);return this},getTimePattern:function(t){e.sap.assert(t=="short"||t=="medium"||t=="long"||t=="full","sStyle must be short, medium, long or full");return this.mSettings["timeFormats-"+t]},setTimePattern:function(e,t){m(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");this._set("timeFormats-"+e,t);return this},getNumberSymbol:function(t){e.sap.assert(t=="decimal"||t=="group"||t=="plusSign"||t=="minusSign","sType must be decimal, group, plusSign or minusSign");return this.mSettings["symbols-latn-"+t]},setNumberSymbol:function(e,t){m(e=="decimal"||e=="group"||e=="plusSign"||e=="minusSign","sType must be decimal, group, plusSign or minusSign");this._set("symbols-latn-"+e,t);return this},getCustomCurrencies:function(){return this.mSettings["currency"]},setCustomCurrencies:function(e){m(typeof e==="object"||e==null,"mCurrencyDigits must be an object");Object.keys(e||{}).forEach(function(t){m(typeof t==="string");m(typeof e[t]==="object")});this._set("currency",e);return this},addCustomCurrencies:function(t){var a=this.getCustomCurrencies();if(a){t=e.extend({},a,t)}this.setCustomCurrencies(t);return this},setFirstDayOfWeek:function(e){m(typeof e=="number"&&e>=0&&e<=6,"iValue must be an integer value between 0 and 6");this._set("weekData-firstDay",e);return this},_setDayPeriods:function(t,a){e.sap.assert(t=="narrow"||t=="abbreviated"||t=="wide","sWidth must be narrow, abbreviated or wide");this._set("dayPeriods-format-"+t,a);return this},getLegacyDateFormat:function(){return this.sLegacyDateFormat||undefined},setLegacyDateFormat:function(e){e=e?String(e).toUpperCase():"";m(!e||c.hasOwnProperty(e),"sFormatId must be one of ['1','2','3','4','5','6','7','8','9','A','B','C'] or empty");var t=this.oConfiguration._collect();this.sLegacyDateFormat=t.legacyDateFormat=e;this.setDatePattern("short",c[e].pattern);this.setDatePattern("medium",c[e].pattern);this.oConfiguration._endCollect();return this},getLegacyTimeFormat:function(){return this.sLegacyTimeFormat||undefined},setLegacyTimeFormat:function(e){m(!e||p.hasOwnProperty(e),"sFormatId must be one of ['0','1','2','3','4'] or empty");var t=this.oConfiguration._collect();this.sLegacyTimeFormat=t.legacyTimeFormat=e=e||"";this.setTimePattern("short",p[e]["short"]);this.setTimePattern("medium",p[e]["medium"]);this._setDayPeriods("abbreviated",p[e].dayPeriods);this.oConfiguration._endCollect();return this},getLegacyNumberFormat:function(){return this.sLegacyNumberFormat||undefined},setLegacyNumberFormat:function(e){e=e?e.toUpperCase():"";m(!e||d.hasOwnProperty(e),"sFormatId must be one of [' ','X','Y'] or empty");var t=this.oConfiguration._collect();this.sLegacyNumberFormat=t.legacyNumberFormat=e;this.setNumberSymbol("group",d[e].groupingSeparator);this.setNumberSymbol("decimal",d[e].decimalSeparator);this.oConfiguration._endCollect();return this},setLegacyDateCalendarCustomizing:function(e){m(Array.isArray(e),"aMappings must be an Array");var t=this.oConfiguration._collect();this.aLegacyDateCalendarCustomizing=t.legacyDateCalendarCustomizing=e;this.oConfiguration._endCollect();return this},getLegacyDateCalendarCustomizing:function(){return this.aLegacyDateCalendarCustomizing},getCustomLocaleData:function(){return this.mSettings}});return u});