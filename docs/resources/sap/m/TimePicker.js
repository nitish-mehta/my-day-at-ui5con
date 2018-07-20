/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./InputBase","./DateTimeField","./MaskInputRule","./ResponsivePopover","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","./TimePickerSliders","./MaskEnabler","sap/ui/Device","sap/ui/core/format/DateFormat","sap/ui/core/Locale","sap/m/library","sap/ui/core/LocaleData","./TimePickerRenderer","jquery.sap.keycodes"],function(e,t,i,s,a,r,n,o,l,u,h,p,d,m,c){"use strict";var g=d.PlacementType,f=d.TimePickerMaskMode,_=1;var y=i.extend("sap.m.TimePicker",{metadata:{library:"sap.m",designtime:"sap/m/designtime/TimePicker.designtime",properties:{localeId:{type:"string",group:"Data"},title:{type:"string",group:"Misc",defaultValue:null},minutesStep:{type:"int",group:"Misc",defaultValue:_},secondsStep:{type:"int",group:"Misc",defaultValue:_},placeholderSymbol:{type:"string",group:"Misc",defaultValue:"_"},mask:{type:"string",group:"Misc",defaultValue:null},maskMode:{type:"sap.m.TimePickerMaskMode",group:"Misc",defaultValue:f.On},support2400:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{rules:{type:"sap.m.MaskInputRule",multiple:true,singularName:"rule"},_picker:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}}}});n.insertFontFaceStyle();r.call(y.prototype,true);l.call(y.prototype);var V={Short:"short",Medium:"medium",Long:"long"},P={Hour:"hour",Minute:"minute",Second:"second"},A="-";y.prototype.init=function(){l.init.apply(this,arguments);this.setDisplayFormat(x());this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._bValid=false;this._sUsedDisplayPattern=null;this._sUsedValuePattern=null;this._oDisplayFormat=null;this._sValueFormat=null;this._oPopoverKeydownEventDelegate=null;this._rPlaceholderRegEx=new RegExp(A,"g");this._sLastChangeValue=null};y.prototype.exit=function(){if(this._oTimeSemanticMaskHelper){this._oTimeSemanticMaskHelper.destroy()}l.exit.apply(this,arguments);this._removePickerEvents();this._oResourceBundle=null;this._bValid=false;this._sUsedDisplayPattern=null;this._oDisplayFormat=null;this._oPopoverKeydownEventDelegate=null;this._sUsedValuePattern=null;this._sValueFormat=null;this._sLastChangeValue=null};y.prototype.ontap=function(t){var i,s;if(!(this.getEditable()&&this.getEnabled())){return}i=e(t.target).hasClass("sapUiIcon");s=this._getPicker()&&this._getPicker().isOpen();if(!s&&i){this._openPicker()}else if(i&&!u.system.phone){this._closePicker()}};y.prototype.onfocusin=function(t){var i=this._getPicker();var s=e(t.target).hasClass("sapUiIcon");l.onfocusin.apply(this,arguments);if(i&&i.isOpen()&&!s){this._closePicker()}};y.prototype.onBeforeOpen=function(){var e=this._getSliders(),t=this.getDateValue(),i=this._$input.val(),s=this.getValueFormat(),a=s.indexOf("HH"),r=s.indexOf("H");e.setValue(i);if(this._shouldSetInitialFocusedDateValue()){t=this.getInitialFocusedDateValue()}e._setTimeValues(t,o._isHoursValue24(i,a,r));e.collapseAll();this.$().addClass("sapMTPInputActive")};y.prototype.onAfterOpen=function(){var e=this._getSliders();if(e){e.openFirstSlider();this._handleAriaOnExpandCollapse()}};y.prototype.onAfterClose=function(){this.$().removeClass("sapMTPInputActive");this._handleAriaOnExpandCollapse()};y.prototype._handleInputChange=function(e){var t,i,s,a=this.getValueFormat(),r=a.indexOf("HH"),n=a.indexOf("H");e=e||this._$input.val();i=e;s=o._isHoursValue24(i,r,n);this._bValid=true;if(e!==""){t=this._parseValue(o._isHoursValue24(e,r,n)?o._replace24HoursWithZero(e,r,n):e,true);if(!t){this._bValid=false}else{e=this._formatValue(t)}}i=this.getSupport2400()&&s?"24:"+e.replace(/[0-9]/g,"0").slice(0,-3):e;this.updateDomValue(i);if(t){i=e=this._formatValue(t,true)}this.setProperty("value",i,true);this._lastValue=e;if(this._bValid){this.setProperty("dateValue",t,true)}this.fireChangeEvent(i,{valid:this._bValid});return true};y.prototype.onChange=function(e){var t=e?e.value:null;if(this.getEditable()&&this.getEnabled()){return this._handleInputChange(t)}return false};y.prototype.setMinutesStep=function(e){var t=this._getSliders();e=Math.max(_,e||_);if(t){t.setMinutesStep(e)}return this.setProperty("minutesStep",e,true)};y.prototype.setSecondsStep=function(e){var t=this._getSliders();e=Math.max(_,e||_);if(t){t.setSecondsStep(e)}return this.setProperty("secondsStep",e,true)};y.prototype.setTitle=function(e){var t=this._getSliders();if(t){t.setLabelText(e)}this.setProperty("title",e,true);return this};y.prototype._handleDateValidation=function(t){if(!t){this._bValid=false;e.sap.log.warning("Value can not be converted to a valid date",this)}else{this._bValid=true;this.setProperty("dateValue",t,true);var i=this._formatValue(t);if(this.isActive()){this.updateDomValue(i)}else{this.setProperty("value",i,true);this._lastValue=i;this._sLastChangeValue=i}}};y.prototype.setSupport2400=function(e){var t=this._getSliders();this.setProperty("support2400",e,true);if(t){t.setSupport2400(e)}this._initMask();return this};y.prototype.setDisplayFormat=function(e){var t=this._getSliders();this.setProperty("displayFormat",e,true);this._initMask();if(t){t.setDisplayFormat(e)}var i=this.getDateValue();if(!i){return this}var s=this._formatValue(i);this.updateDomValue(s);this._lastValue=s;return this};y.prototype.setValue=function(t){var i,s,a=this.getValueFormat(),r=a.indexOf("HH"),n=a.indexOf("H"),u=this._getSliders();t=this.validateProperty("value",t);this._initMask();l.setValue.call(this,t);this._sLastChangeValue=t;this._bValid=true;if(t){i=this._parseValue(o._isHoursValue24(t,r,n)?o._replace24HoursWithZero(t,r,n):t);if(!i){this._bValid=false;e.sap.log.warning("Value can not be converted to a valid date",this)}}if(this._bValid){this.setProperty("dateValue",i,true)}if(i&&!this.getSupport2400()){s=this._formatValue(i)}else{s=t}if(u){u.setValue(t)}this.updateDomValue(s);this._lastValue=s;return this};y.prototype.setTooltip=function(e){var t=this.getDomRef(),i;this._refreshTooltipBaseDelegate(e);this.setAggregation("tooltip",e,true);if(!t){return this}i=this.getTooltip_AsString();if(i){t.setAttribute("title",i)}else{t.removeAttribute("title")}this._handleTooltipHiddenTextLifecycle();return this};y.prototype._handleTooltipHiddenTextLifecycle=function(){var e,t,i,s,a,r;if(!sap.ui.getCore().getConfiguration().getAccessibility()){return}e=this.getRenderer();t=e.getAriaDescribedBy(this);i=e.getDescribedByAnnouncement(this);s=this.getId()+"-describedby";a=t.indexOf(s)>-1;r=this.getDomRef("describedby");if(a){r=document.createElement("span");r.id=s;r.setAttribute("aria-hidden","true");r.className="sapUiInvisibleText";r.textContent=i;this.getDomRef().appendChild(r)}else{this.getDomRef().removeChild(r)}this._$input.attr("aria-describedby",t)};y.prototype.setLocaleId=function(e){var t=this.getValue(),i=this._getSliders();this.setProperty("localeId",e,true);this._initMask();this._oDisplayFormat=null;this._sValueFormat=null;if(t){this.setValue(t)}if(i){i.setLocaleId(e)}return this};y.prototype._getDefaultDisplayStyle=function(){return V.Medium};y.prototype._getDefaultValueStyle=function(){return V.Medium};y.prototype._getFormatterInstance=function(e,t,i,s,a){if(t===V.Short||t===V.Medium||t===V.Long){e=h.getTimeInstance({style:t,strictParsing:true,relative:i},new p(this.getLocaleId()))}else{e=h.getTimeInstance({pattern:t,strictParsing:true,relative:i},new p(this.getLocaleId()))}if(a){this._sUsedDisplayPattern=t;this._oDisplayFormat=e}else{this._sUsedValuePattern=t;this._sValueFormat=e}return e};y.prototype._getFormat=function(){var e=this._getDisplayFormatPattern();if(!e){e=V.Medium}if(Object.keys(V).indexOf(e)!==-1){e=x()}return e};y.prototype.onsappageup=function(e){this._increaseTime(1,P.Hour);e.preventDefault()};y.prototype.onsappageupmodifiers=function(e){if(!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){this._increaseTime(1,P.Minute)}if(!e.altKey&&e.shiftKey&&(e.ctrlKey||e.metaKey)){this._increaseTime(1,P.Second)}e.preventDefault()};y.prototype.onsappagedown=function(e){this._increaseTime(-1,P.Hour);e.preventDefault()};y.prototype.onsappagedownmodifiers=function(e){if(!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){this._increaseTime(-1,P.Minute)}if(!e.altKey&&e.shiftKey&&(e.ctrlKey||e.metaKey)){this._increaseTime(-1,P.Second)}e.preventDefault()};y.prototype.onkeydown=function(t){var i=e.sap.KeyCodes,s=t.which||t.keyCode,a=t.altKey,r;if(s===i.F4||a&&(s===i.ARROW_UP||s===i.ARROW_DOWN)){r=this._getPicker()&&this._getPicker().isOpen();if(!r){this._openPicker()}else{this._closePicker()}t.preventDefault()}else{l.onkeydown.call(this,t)}};y.prototype._getPicker=function(){return this.getAggregation("_picker")};y.prototype._removePickerEvents=function(){var e,t=this._getPicker();if(t){e=t.getAggregation("_popup");if(typeof this._oPopoverKeydownEventDelegate==="function"){e.removeEventDelegate(this._oPopoverKeydownEventDelegate)}}};y.prototype._openPicker=function(){var t=this._getPicker(),i;if(!t){t=this._createPicker(this._getDisplayFormatPattern())}t.open();i=this._getSliders();e.sap.delayedCall(0,i,i._updateSlidersValues);return t};y.prototype._closePicker=function(){var t=this._getPicker();if(t){t.close()}else{e.sap.log.warning("There is no picker to close.")}return t};y.prototype._createPicker=function(t){var i=this,s,r,n,l,h,p,d=this.getLocaleId();n=sap.ui.getCore().getLibraryResourceBundle("sap.m");l=n.getText("TIMEPICKER_SET");h=n.getText("TIMEPICKER_CANCEL");p=this.getTitle();r=new a(i.getId()+"-RP",{showCloseButton:false,showHeader:false,horizontalScrolling:false,verticalScrolling:false,placement:g.VerticalPreferedBottom,beginButton:new sap.m.Button({text:l,press:e.proxy(this._handleOkPress,this)}),endButton:new sap.m.Button({text:h,press:e.proxy(this._handleCancelPress,this)}),content:[new o(this.getId()+"-sliders",{support2400:this.getSupport2400(),displayFormat:t,valueFormat:this.getValueFormat(),labelText:p?p:"",localeId:d,minutesStep:this.getMinutesStep(),secondsStep:this.getSecondsStep()})._setShouldOpenSliderAfterRendering(true)],contentHeight:y._PICKER_CONTENT_HEIGHT});s=r.getAggregation("_popup");if(s.setShowArrow){s.setShowArrow(false)}s.oPopup.setAutoCloseAreas([this.getDomRef("icon")]);r.addStyleClass(this.getRenderer().CSS_CLASS+"DropDown").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachAfterClose(this.onAfterClose,this);r.open=function(){return this.openBy(i)};if(u.system.desktop){this._oPopoverKeydownEventDelegate={onkeydown:function(t){var i=e.sap.KeyCodes,s=t.which||t.keyCode,a=t.altKey;if(a&&(s===i.ARROW_UP||s===i.ARROW_DOWN)||s===i.F4){this._handleOkPress(t);this.focus();t.preventDefault()}}};s.addEventDelegate(this._oPopoverKeydownEventDelegate,this);s._afterAdjustPositionAndArrowHook=function(){i._getSliders()._onOrientationChanged()}}this.setAggregation("_picker",r,true);return r};y.prototype._getSliders=function(){var e=this._getPicker();if(!e){return null}return e.getContent()[0]};y.prototype._handleOkPress=function(e){var t=this._getSliders().getTimeValues(),i=this._formatValue(t);if(this.getSupport2400()){i=this._getSliders().getValue()}this.updateDomValue(i);this._handleInputChange();this._closePicker()};y.prototype._handleCancelPress=function(e){this._closePicker()};y.prototype._getLocaleBasedPattern=function(e){return m.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()).getTimePattern(e)};y.prototype._parseValue=function(e,t){if(t){e=this._oTimeSemanticMaskHelper.stripValueOfLeadingSpaces(e);e=e.replace(this._rPlaceholderRegEx,"")}return i.prototype._parseValue.call(this,e,t)};y.prototype._formatValue=function(e,t){var s=i.prototype._formatValue.apply(this,arguments),a=this.getValueFormat(),r=a.indexOf("HH"),n=a.indexOf("H");if(e){if(!t&&this._oTimeSemanticMaskHelper){s=this._oTimeSemanticMaskHelper.formatValueWithLeadingTrailingSpaces(s)}}if(this.getSupport2400()&&o._isHoursValue24(this.getValue(),r,n)&&o._replaceZeroHoursWith24(s,r,n)===this.getValue()){s=this.getValue()}return s};y.prototype._handleAriaOnExpandCollapse=function(){this.getFocusDomRef().setAttribute("aria-expanded",this._getPicker().isOpen())};y.prototype._increaseTime=function(e,t){var i=this.getDateValue(),s,a;if(i&&this.getEditable()&&this.getEnabled()){s=new Date(i.getTime());switch(t){case P.Hour:s.setHours(s.getHours()+e);a=60*60*1e3;break;case P.Minute:s.setMinutes(s.getMinutes()+e);a=60*1e3;break;case P.Second:a=1e3;s.setSeconds(s.getSeconds()+e)}if(e<0&&s.getTime()-i.getTime()!==e*a){s=new Date(i.getTime()+e*a)}this.setDateValue(s);this.fireChangeEvent(this.getValue(),{valid:true})}};y.prototype._initMask=function(){if(this._oTimeSemanticMaskHelper){this._oTimeSemanticMaskHelper.destroy()}this._oTimeSemanticMaskHelper=new v(this)};y.prototype._isMaskEnabled=function(){return this.getMaskMode()===f.On};y.prototype._shouldSetInitialFocusedDateValue=function(){if(!this._isValidValue()){return true}return!this.getValue()&&!!this.getInitialFocusedDateValue()};y.prototype._isValidValue=function(){return this._bValid};y.prototype.fireChangeEvent=function(e,i){if(e){e=e.trim()}if(e!==this._sLastChangeValue){this._sLastChangeValue=e;t.prototype.fireChangeEvent.call(this,e,i)}};var v=function(e){var t=e._getDisplayFormatPattern(),i,a,r=e.getLocaleId()||sap.ui.getCore().getConfiguration().getFormatLocale(),n=new p(r),o;if(e._checkStyle(t)){i=m.getInstance(n).getTimePattern(t)}else{i=t}e.setProperty("localeId",r,true);this._oTimePicker=e;this.aOriginalAmPmValues=m.getInstance(n).getDayPeriods("abbreviated");this.aAmPmValues=this.aOriginalAmPmValues.slice(0);this.iAmPmValueMaxLength=Math.max(this.aAmPmValues[0].length,this.aAmPmValues[1].length);for(o=0;o<this.aAmPmValues.length;o++){while(this.aAmPmValues[o].length<this.iAmPmValueMaxLength){this.aAmPmValues[o]+=" "}}this.b24H=t.indexOf("H")!==-1;this.bLeadingZero=t.indexOf("HH")!==-1||t.indexOf("hh")!==-1;this.sLeadingChar=this.bLeadingZero?"0":" ";this.sAlternativeLeadingChar=this.bLeadingZero?" ":"0";this.sLeadingRegexChar=this.bLeadingZero?"0":"\\s";e.setPlaceholderSymbol(A);i=i.replace(/hh/gi,"h").replace(/h/gi,"h9");if(this.b24H){a="["+this.sLeadingRegexChar+"012]"}else{a="["+this.sLeadingRegexChar+"1]"}this._maskRuleHours=new s({maskFormatSymbol:"h",regex:a});e.addRule(this._maskRuleHours);this.iHourNumber1Index=i.indexOf("h9");this.iHourNumber2Index=this.iHourNumber1Index!==-1?this.iHourNumber1Index+1:-1;this.iMinuteNumber1Index=i.indexOf("mm");i=i.replace(/mm/g,"59");this.iSecondNumber1Index=i.indexOf("ss");i=i.replace(/ss/g,"59");this._maskRuleMinSec=new s({maskFormatSymbol:"5",regex:"[0-5]"});e.addRule(this._maskRuleMinSec);this.aAllowedHours=f.call(this,this.b24H,this.sLeadingChar);this.aAllowedMinutesAndSeconds=_.call(this);this.iAmPmChar1Index=i.indexOf("a");this.iAfterAmPmValueIndex=-1;if(this.iAmPmChar1Index!==-1){this.iAfterAmPmValueIndex=this.iAmPmChar1Index+this.iAmPmValueMaxLength;var l=this.iAmPmValueMaxLength-"a".length;this.shiftIndexes(l);var u=65;var h="";var d="";var c="";for(o=0;o<this.iAmPmValueMaxLength;o++){d="[";if(this.aAmPmValues[0][o]){d+=this.aAmPmValues[0][o]}else{d+="\\s"}if(this.aAmPmValues[1][o]!==this.aAmPmValues[0][o]){if(this.aAmPmValues[1][o]){d+=this.aAmPmValues[1][o]}else{d+="\\s"}}d+="]";c=String.fromCharCode(u++);h+=c;this._maskRuleChars=new s({maskFormatSymbol:c,regex:d});e.addRule(this._maskRuleChars)}i=i.replace(/a/g,h)}e.setMask(i);function g(e,t,i){var s=[],a,r;for(r=e;r<=t;r++){a=r.toString();if(r<10){a=i+a}s.push(a)}return s}function f(e,t){var i=e?0:1,s=this._oTimePicker.getSupport2400()?24:23,a=e?s:12;return g(i,a,t)}function _(){return g(0,59,"0")}};v.prototype.replaceChar=function(e,t,i){var s=t-this.iAmPmChar1Index,a,r,n,o,l,u,h;if(t===this.iHourNumber1Index&&this.sAlternativeLeadingChar===e){if(this.aAllowedHours.indexOf(this.sLeadingChar+e)!==-1){return this.sLeadingChar+e}else{return this.sLeadingChar}}else if(t===this.iHourNumber1Index&&!this._oTimePicker._isCharAllowed(e,t)&&this.aAllowedHours.indexOf(this.sLeadingChar+e)!==-1){return this.sLeadingChar+e}else if(t===this.iHourNumber2Index&&this.aAllowedHours.indexOf(i[this.iHourNumber1Index]+e)===-1){return""}else if((t===this.iMinuteNumber1Index||t===this.iSecondNumber1Index)&&!this._oTimePicker._isCharAllowed(e,t)&&this.aAllowedMinutesAndSeconds.indexOf("0"+e)!==-1){return"0"+e}else if(s>=0&&t<this.iAfterAmPmValueIndex){a=i.slice(this.iAmPmChar1Index,t);r=this.aAmPmValues[0].slice(0,s);n=this.aAmPmValues[1].slice(0,s);l=this.aAmPmValues[0].slice(s,this.iAfterAmPmValueIndex);u=this.aAmPmValues[1].slice(s,this.iAfterAmPmValueIndex);o=r===n;var p="";for(h=s;h<this.iAmPmValueMaxLength;h++){if(this.aAmPmValues[0][h]===this.aAmPmValues[1][h]){p+=this.aAmPmValues[0][h]}else{break}}if(h===this.iAmPmValueMaxLength||h!==s){return p}else{if(!o){if(a===r){return l}else if(a===n){return u}else{return e}}else{if(this.aAmPmValues[0][s].toLowerCase()===e.toLowerCase()&&this.aAmPmValues[0]===a+l){return l}else if(this.aAmPmValues[1][s].toLowerCase()===e.toLowerCase()&&this.aAmPmValues[1]===a+u){return u}else{return e}}}}else{return e}};v.prototype.formatValueWithLeadingTrailingSpaces=function(e){var t=this._oTimePicker.getMask().length;if(this.aOriginalAmPmValues[0]!==this.aAmPmValues[0]){e=e.replace(this.aOriginalAmPmValues[0],this.aAmPmValues[0])}if(this.aOriginalAmPmValues[1]!==this.aAmPmValues[1]){e=e.replace(this.aOriginalAmPmValues[1],this.aAmPmValues[1])}while(t>e.length){e=[e.slice(0,this.iHourNumber1Index)," ",e.slice(this.iHourNumber1Index)].join("")}return e};v.prototype.stripValueOfLeadingSpaces=function(e){if(e[this.iHourNumber1Index]===" "){e=[e.slice(0,this.iHourNumber1Index),e.slice(this.iHourNumber1Index+1)].join("")}return e};v.prototype.shiftIndexes=function(e){if(this.iAmPmChar1Index<this.iHourNumber1Index){this.iHourNumber1Index+=e;this.iHourNumber2Index+=e}if(this.iAmPmChar1Index<this.iMinuteNumber1Index){this.iMinuteNumber1Index+=e}if(this.iAmPmChar1Index<this.iSecondNumber1Index){this.iSecondNumber1Index+=e}};v.prototype.destroy=function(){if(this._maskRuleHours){this._maskRuleHours.destroy();this._maskRuleHours=null}if(this._maskRuleMinSec){this._maskRuleMinSec.destroy();this._maskRuleMinSec=null}if(this._maskRuleChars){this._maskRuleChars.destroy();this._maskRuleChars=null}};y.prototype._feedReplaceChar=function(e,t,i){return this._oTimeSemanticMaskHelper.replaceChar(e,t,i)};y.prototype.getAccessibilityInfo=function(){var i=this.getRenderer();var s=t.prototype.getAccessibilityInfo.apply(this,arguments);var a=this.getValue()||"";if(this._bValid){var r=this.getDateValue();if(r){a=this._formatValue(r)}}e.extend(true,s,{role:i.getAriaRole(this),type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_TIMEINPUT"),description:[a,i.getLabelledByAnnouncement(this),i.getDescribedByAnnouncement(this)].join(" ").trim(),multiline:false,autocomplete:"none",expanded:false,haspopup:true,owns:this.getId()+"-sliders"});return s};function x(){var e=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale(),t=m.getInstance(e);return t.getTimePattern(V.Medium)}y._PICKER_CONTENT_HEIGHT="25rem";return y});