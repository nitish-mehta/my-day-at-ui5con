/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object"],function(s,t){"use strict";var e=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;var i=t.extend("sap.ui.core.Locale",{constructor:function(s){t.apply(this);var i=e.exec(s.replace(/_/g,"-"));if(i===null){throw"The given language '"+s+"' does not adhere to BCP-47."}this.sLocaleId=s;this.sLanguage=i[1]||null;this.sScript=i[2]||null;this.sRegion=i[3]||null;this.sVariant=i[4]&&i[4].slice(1)||null;this.sExtension=i[5]&&i[5].slice(1)||null;this.sPrivateUse=i[6]||null;if(this.sLanguage){this.sLanguage=this.sLanguage.toLowerCase()}if(this.sScript){this.sScript=this.sScript.toLowerCase().replace(/^[a-z]/,function(s){return s.toUpperCase()})}if(this.sRegion){this.sRegion=this.sRegion.toUpperCase()}},getLanguage:function(){return this.sLanguage},getScript:function(){return this.sScript},getRegion:function(){return this.sRegion},getVariant:function(){return this.sVariant},getVariantSubtags:function(){return this.sVariant?this.sVariant.split("-"):[]},getExtension:function(){return this.sExtension},getExtensionSubtags:function(){return this.sExtension?this.sExtension.slice(2).split("-"):[]},getPrivateUse:function(){return this.sPrivateUse},getPrivateUseSubtags:function(){return this.sPrivateUse?this.sPrivateUse.slice(2).split("-"):[]},hasPrivateUseSubtag:function(t){s.sap.assert(t&&t.match(/^[0-9A-Z]{1,8}$/i),"subtag must be a valid BCP47 private use tag");return this.getPrivateUseSubtags().indexOf(t)>=0},toString:function(){var s=[this.sLanguage];if(this.sScript){s.push(this.sScript)}if(this.sRegion){s.push(this.sRegion)}if(this.sVariant){s.push(this.sVariant)}if(this.sExtension){s.push(this.sExtension)}if(this.sPrivateUse){s.push(this.sPrivateUse)}return s.join("-")},getSAPLogonLanguage:function(){var s=this.sLanguage||"",t;if(s.indexOf("-")>=0){s=s.slice(0,s.indexOf("-"))}s=n[s]||s;if(s==="zh"){if(this.sScript==="Hant"||!this.sScript&&this.sRegion==="TW"){s="zf"}}if(this.sPrivateUse&&(t=/-(saptrc|sappsd)(?:-|$)/i.exec(this.sPrivateUse))){s=t[1].toLowerCase()==="saptrc"?"1Q":"2Q"}return s.toUpperCase()}});var n={iw:"he",ji:"yi",in:"id",sh:"sr"};function r(s){var t=/\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(s);return t&&t[2]?t[2].split(/,/):null}var a=r("$cldr-rtl-locales:ar,fa,he$")||[];i._cldrLocales=r("$cldr-locales:ar,ar_EG,ar_SA,bg,br,ca,cs,da,de,de_AT,de_CH,el,el_CY,en,en_AU,en_GB,en_HK,en_IE,en_IN,en_NZ,en_PG,en_SG,en_ZA,es,es_AR,es_BO,es_CL,es_CO,es_MX,es_PE,es_UY,es_VE,et,fa,fi,fr,fr_BE,fr_CA,fr_CH,fr_LU,he,hi,hr,hu,id,it,it_CH,ja,kk,ko,lt,lv,ms,nb,nl,nl_BE,nn,pl,pt,pt_PT,ro,ru,ru_UA,sk,sl,sr,sv,th,tr,uk,vi,zh_CN,zh_HK,zh_SG,zh_TW$");i._coreI18nLocales=r("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");i._impliesRTL=function(s){var t=s instanceof i?s:new i(s);var e=t.getLanguage()||"";e=e&&n[e]||e;var r=t.getRegion()||"";if(r&&a.indexOf(e+"_"+r)>=0){return true}return a.indexOf(e)>=0};return i});