/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","sap/ui/core/library","sap/m/library","sap/ui/Device"],function(e,t,i,r,s){"use strict";var a=i.TextDirection;var n=r.BackgroundDesign;var d=i.TitleLevel;var o={};o._isEmptyObject=function(e){if(!e){return true}if((!e._isEmpty||!e._isEmpty())&&(!e.getVisible||e.getVisible())){return false}return true};o._isEmptyArray=function(e){if(e){for(var t=0;t<e.length;t++){if(!o._isEmptyObject(e[t])){return false}}}return true};o._isEmptyRow=function(e,t){return o._isEmptyObject(e)&&o._isEmptyArray(t)};o._renderObjects=function(e,i,r){for(var s=0;s<i.length;s++){if(i[s]instanceof t){this._renderChildControl(e,r,i[s])}}};o._computeChildControlsToBeRendered=function(e){e.__controlsToBeRendered={};var t=e.getAttributes();for(var i=0;i<t.length;i++){e.__controlsToBeRendered[t[i].getId()]=t[i]}t=e.getStatuses();for(var i=0;i<t.length;i++){e.__controlsToBeRendered[t[i].getId()]=t[i]}var r=e.getFirstStatus();if(r){e.__controlsToBeRendered[r.getId()]=r}r=e.getSecondStatus();if(r){e.__controlsToBeRendered[r.getId()]=r}r=e.getAggregation("_objectNumber");if(r){e.__controlsToBeRendered[r.getId()]=r}};o._cleanupNotRenderedChildControls=function(e,t){for(var i in t.__controlsToBeRendered){e.cleanupControlWithoutRendering(t.__controlsToBeRendered[i])}delete t.__controlsToBeRendered};o._getMarkers=function(e){return e._getVisibleMarkers()};o._renderIntro=function(e,t,i,r){if(t.getIntroActive()){t._introText=new sap.m.Link(t.getId()+"-intro");t._introText.setText(t.getIntro());t._introText.setHref(t.getIntroHref());t._introText.setTarget(t.getIntroTarget());t._introText.press=t.introPress}else{t._introText=new sap.m.Text(t.getId()+"-intro");t._introText.setText(t.getIntro());t._introText.setMaxLines(3)}t._introText.setTextDirection(t.getIntroTextDirection());e.write("<div");e.addClass(i);if(t.getIntroActive()){e.addClass(r)}e.writeClasses();e.write(">");this._renderChildControl(e,t,t._introText);e.write("</div>")};o._renderAttribute=function(e,t,i,r){e.write("<div");e.addClass("sapMOHAttr");e.writeClasses();if(r){e.addStyle("width","100%");e.writeStyles()}e.write(">");this._renderChildControl(e,t,i);e.write("</div>")};o._getVisibleStatuses=function(t){var i=[];if(t.getFirstStatus()&&t.getFirstStatus().getVisible()){i.push([t.getFirstStatus()])}if(t.getSecondStatus()&&t.getSecondStatus().getVisible()){i.push([t.getSecondStatus()])}if(t.getStatuses()){var r=t.getStatuses();for(var s=0;s<r.length;s++){if(!r[s].getVisible||r[s].getVisible()){if(r[s]instanceof sap.m.ObjectStatus||r[s]instanceof sap.m.ProgressIndicator){i.push([r[s]])}else{e.sap.log.warning('Only sap.m.ObjectStatus or sap.m.ProgressIndicator are allowed in "sap.m.ObjectHeader.statuses" aggregation.'+" Current object is "+r[s].constructor.getMetadata().getName()+' with id "'+r[s].getId()+'"')}}}}return i};o._getVisibleAttribsAndStatuses=function(e){var t=[],i=e.getAttributes(),r=[];for(var s=0;s<i.length;s++){if(i[s].getVisible()){r.push(i[s])}}var a=this._getVisibleStatuses(e);t[0]=r;t[1]=a;return t};o._renderRow=function(e,t,i,r){if(o._isEmptyRow(i,r)){return}e.write("<div");e.addClass("sapMOHAttrRow");e.writeClasses();e.write(">");if(!o._isEmptyObject(i)){this._renderAttribute(e,t,i,o._isEmptyArray(r))}else if(o._isEmptyObject(i)&&!o._isEmptyArray(r)){if(r[0]instanceof sap.m.ProgressIndicator){e.write("<div");e.addClass("sapMOHAttr");e.writeClasses();e.write(">");e.write("</div>")}}if(!o._isEmptyArray(r)){e.write("<div");if(r[0]instanceof sap.m.ProgressIndicator){e.addClass("sapMOHStatusFixedWidth")}else if(r[0]instanceof sap.m.ObjectMarker){e.addClass("sapMOHStatusFixedWidth");e.addClass("sapMObjStatusMarker")}else{e.addClass("sapMOHStatus")}e.writeClasses();e.write(">");o._renderObjects(e,r,t);e.write("</div>")}e.write("</div>")};o._renderAttributesAndStatuses=function(e,t){var i=t.getAttributes();var r=[];for(var s=0;s<i.length;s++){if(i[s].getVisible()){r.push(i[s])}}var a=r.length;var n=[];var d=o._getMarkers(t);if(!t.getResponsive()&&!o._isEmptyArray(d)){n.push(d)}var l=this._getVisibleStatuses(t);n=n.concat(l);var g=n.length;var p=a>g?a:g;if(!t.getResponsive()){for(var u=0;u<p;u++){this._renderRow(e,t,r[u],n[u])}}};o._renderNumber=function(e,t){var i=t.getAdditionalNumbers();if(!t.getNumber()&&(i&&!i.length)){return}e.write("<div");e.writeAttribute("id",t.getId()+"-numberdiv");e.addClass("sapMOHNumberDiv");e.writeClasses();e.write(">");var r=t.getAggregation("_objectNumber");if(r&&r.getNumber()){r.setTextDirection(t.getNumberTextDirection());this._renderChildControl(e,t,r)}e.write("</div>");if(!t.getCondensed()){this._renderAdditionalNumbers(e,t)}};o._renderAdditionalNumbers=function(e,t){var i=t.getAdditionalNumbers();if(i&&!i.length){return}if(i.length===1){e.write("<div");e.addClass("additionalOHNumberSeparatorDiv");e.writeClasses();e.write("></div>")}for(var r=0;r<i.length;r++){e.write("<div");e.writeAttribute("id",t.getId()+"-additionalNumber"+r);e.addClass("sapMOHNumberDiv additionalOHNumberDiv");if(i.length===1){e.addClass("sapMOHOnlyANumber")}e.writeClasses();e.write(">");i[r].setTextDirection(t.getNumberTextDirection());this._renderChildControl(e,t,i[r]);e.write("</div>")}};o._renderTitle=function(e,t){t._oTitleArrowIcon.setVisible(t.getShowTitleSelector());if(t.getShowTitleSelector()&&t._oTitleArrowIcon.getVisible()){e.write("<div");e.addClass("sapMOHTitleAndArrow");e.writeClasses();e.write(">")}if(t.getTitle()){var i=t.getTitleLevel()===d.Auto?d.H1:t.getTitleLevel();t._titleText.setText(t.getTitle());t._titleText.setTextDirection(t.getTitleTextDirection());if(t.getTitleActive()){e.write("<a");if(t.getTitleHref()){e.writeAttributeEscaped("href",t.getTitleHref());if(t.getTitleTarget()){e.writeAttributeEscaped("target",t.getTitleTarget())}}e.writeAccessibilityState({role:"link",haspopup:!t.getTitleHref()})}else{e.write("<div")}e.writeAttribute("id",t.getId()+"-title");e.addClass("sapMOHTitle");if(t.getTitleActive()){e.writeAttribute("tabindex","0");e.addClass("sapMOHTitleActive")}if(t.getShowTitleSelector()){e.addClass("sapMOHTitleFollowArrow")}e.writeClasses();e.write(">");e.write("<"+i+">");this._renderChildControl(e,t,t._titleText);e.write("</"+i+">");if(t.getTitleActive()){e.write("</a>")}else{e.write("</div>")}}if(t.getShowTitleSelector()){e.write("<span");e.addClass("sapMOHTitleArrow");e.writeClasses();e.write(">");this._renderChildControl(e,t,t._oTitleArrowIcon);e.write("</span>")}if(t.getShowTitleSelector()&&t._oTitleArrowIcon.getVisible()){e.write("</div>")}};o._renderFullTitle=function(e,t){var i=t.getAdditionalNumbers();if(!t.getNumber()&&(i&&!i.length)){e.addClass("sapMOHTitleDivFull")}};o._renderFullOH=function(e,t){var i=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(t.getIntro()){this._renderIntro(e,t,"sapMOHIntro","sapMOHIntroActive")}e.write("<div");e.addClass("sapMOHTopRow");e.writeClasses();e.write(">");e.write("<div");e.writeAttribute("id",t.getId()+"-titlediv");e.addClass("sapMOHTitleDiv");if(t._hasIcon()){e.addClass("sapMOHTitleIcon")}this._renderFullTitle(e,t);e.writeClasses();e.write(">");if(t._hasIcon()){e.write("<div");e.addClass("sapMOHIcon");if(t.getIconActive()){e.writeAttribute("tabindex","0");e.addClass("sapMPointer");e.writeAccessibilityState({role:"link",haspopup:true,label:i.getText("OH_ARIA_ICON")})}e.writeClasses();e.write(">");this._renderChildControl(e,t,t._getImageControl());e.write("</div>")}this._renderTitle(e,t);e.write("</div>");this._renderNumber(e,t);e.write('<div class="sapMOHDivider"></div>');e.write("</div>");if(t._hasBottomContent()){e.write("<div");e.addClass("sapMOHBottomRow");e.writeClasses();e.write(">");this._renderAttributesAndStatuses(e,t);e.write('<div class="sapMOHDivider"></div>');e.write("</div>")}};o._renderCondensedOH=function(e,t){e.write("<div");e.writeAttribute("id",t.getId()+"-titlediv");e.addClass("sapMOHTitleDiv");this._renderFullTitle(e,t);e.writeClasses();e.write(">");this._renderTitle(e,t);e.write("</div>");this._renderNumber(e,t);var i=t.getAttributes()[0];if(i&&!i._isEmpty()){this._renderAttribute(e,t,i)}};o.render=function(e,t){if(t.getResponsive()){this._renderResponsive(e,t);return}this._computeChildControlsToBeRendered(t);var i=t.getCondensed();e.write("<div");e.writeControlData(t);e.addClass("sapMOH");if(t._getBackground()!==n.Transparent){e.addClass("sapContrastPlus")}if(i){e.addClass("sapMOHC")}e.addClass("sapMOHBg"+t._getBackground());e.writeClasses();var r=t.getTooltip_AsString();if(r){e.writeAttributeEscaped("title",r)}e.writeAccessibilityState({role:"region",labelledby:{value:t.getId()+"-titleText-inner",append:true}});e.write(">");if(i){this._renderCondensedOH(e,t)}else{this._renderFullOH(e,t)}e.write('<div class="sapMOHLastDivider"></div>');e.write("</div>");this._cleanupNotRenderedChildControls(e,t)};o._renderChildControl=function(e,t,i){e.renderControl(i);if(!t.getResponsive()&&t.__controlsToBeRendered){t.__controlsToBeRendered[i.getId()]=undefined}};o._renderResponsive=function(t,i){var r=this._hasResponsiveStates(i),a=this._hasResponsiveTabs(i),d=i.getHeaderContainer();t.write("<div");t.addClass("sapMOHROuter");t.writeClasses();var o=i.getTooltip_AsString();if(o){t.writeAttributeEscaped("title",o)}t.writeAccessibilityState({role:"region",labelledby:{value:i.getId()+"-txt",append:true}});t.writeControlData(i);t.write(">");t.write("<div");t.addClass("sapMOHR");if(i._getBackground()!==n.Transparent){t.addClass("sapContrastPlus")}if(a){t.addClass("sapMOHRNoBorder")}t.addClass("sapMOHRBg"+i._getBackground());t.writeClasses();t.write(">");t.write("<div");if(s.system.desktop&&i._isMediaSize("Desktop")&&i.getFullScreenOptimized()&&i._iCountVisAttrStat>=1&&i._iCountVisAttrStat<=3){t.addClass("sapMOHRStatesOneOrThree")}t.writeClasses();t.write(">");this._renderResponsiveTitleBlock(t,i);if(r){this._renderResponsiveStates(t,i)}t.write("</div>");if(a){this._renderResponsiveTabs(t,i)}t.write("</div>");if(d&&d instanceof sap.m.IconTabBar){this._renderChildControl(t,i,d)}t.write("</div>");if(!i.getTitle()){if(!i.getBinding("title")){e.sap.log.warning("The title shouldn't be empty!")}}};o._renderResponsiveTitleBlock=function(e,t){var i=sap.ui.getCore().getLibraryResourceBundle("sap.m");e.write("<div");e.writeAttribute("id",t.getId()+"-titlenumdiv");e.addClass("sapMOHRTitleNumberDiv");e.writeClasses();e.write(">");e.write("<div");e.writeAttribute("id",t.getId()+"-titlediv");e.addClass("sapMOHRTitleDiv");if(t._hasIcon()){if(s.system.phone||t._isMediaSize("Phone")){if(s.orientation.landscape||t._isMediaSize("Phone")&&!s.system.phone){e.addClass("sapMOHRTitleIcon")}}else{e.addClass("sapMOHRTitleIcon")}}if(!t.getNumber()){e.addClass("sapMOHRTitleDivFull")}e.writeClasses();e.write(">");this._renderResponsiveTitle(e,t);if(t._hasIcon()){e.write("<div");e.writeAttribute("id",t.getId()+"-titleIcon");e.addClass("sapMOHRIcon");if(s.system.phone&&s.orientation.portrait){e.addClass("sapMOHRHideIcon")}if(t.getIconActive()){e.addClass("sapMPointer");e.writeAttribute("tabindex","0");e.writeAccessibilityState({role:"link",haspopup:true,label:i.getText("OH_ARIA_ICON")})}e.writeClasses();e.write(">");this._renderChildControl(e,t,t._getImageControl());e.write("</div>")}e.write("</div>");this._renderResponsiveNumber(e,t);e.write("</div>")};o._renderResponsiveStates=function(e,t){e.write("<div");e.writeAttribute("id",t.getId()+"-states");e.addClass("sapMOHRStates");e.writeClasses();e.write(">");this._renderResponsiveRow(e,t);e.write("</div>")};o._renderResponsiveRow=function(e,t){var i=[];i=this._getVisibleAttribsAndStatuses(t);var r=i[0].concat(i[1]),a=i[0].length,n=r.length,d=1,o="";if(n===0){return}if(s.system.desktop){if(!t.getFullScreenOptimized()){if(n>=1&&n<=4){d=2;o="sapMOHRTwoCols"}if(n>=5){d=3;o="sapMOHRThreeCols"}}else{if(n>=1&&n<=3){d=1;o="sapMOHROneCols"}if(n>=4){d=4;o="sapMOHRFourCols"}}}if(s.system.tablet&&!s.system.desktop||s.system.desktop&&t._isMediaSize("Tablet")){if(!t.getFullScreenOptimized()||s.orientation.portrait&&t.getFullScreenOptimized()){d=2;o="sapMOHRTwoCols"}else{if(t.getFullScreenOptimized()&&(s.orientation.landscape||s.system.desktop&&t._isMediaSize("Tablet"))){if(n>=1&&n<=2){d=2;o="sapMOHRTwoCols"}if(n>=3){d=3;o="sapMOHRThreeCols"}}}}if(s.system.phone||s.system.desktop&&t._isMediaSize("Phone")){d=1;o="sapMOHROneCols"}this._renderResponsiveStatesColumn(e,t,d,r,a,o)};o._renderResponsiveStatesColumn=function(e,t,i,r,s,a){var n=Math.floor(r.length/i);var d=r.length%i;var o=0;var l=1;for(var g=0;g<r.length;g++){if(o==0){e.write("<div");e.addClass("sapMOHRStatesCont"+l);e.addClass(a);e.writeClasses();e.write(">")}if(g<s){this._renderResponsiveAttribute(e,t,r[g])}else{this._renderResponsiveStatus(e,t,r[g])}o++;if(o==n&&l>d||o==n+1&&l<=d||g==r.length-1){e.write("</div>");o=0;l++}}};o._renderResponsiveAttribute=function(e,t,i){e.write("<div");e.addClass("sapMOHRAttr");e.writeClasses();e.write(">");this._renderChildControl(e,t,i);e.write("</div>")};o._renderResponsiveStatus=function(e,t,i){e.write("<div");e.addClass("sapMOHRStatus");e.writeClasses();e.write(">");this._renderChildControl(e,t,i[0]);e.write("</div>")};o._renderResponsiveMarkers=function(e,t){var i=[],r=t.getTitleTextDirection(),s=sap.ui.getCore().getConfiguration().getRTL();i=t._getVisibleMarkers();e.write("<span");e.addClass("sapMObjStatusMarker");if(r===a.LTR&&s||r===a.RTL&&!s){e.addClass("sapMObjStatusMarkerOpposite")}e.writeClasses();e.writeAttribute("id",t.getId()+"-markers");e.write(">");for(var n=0;n<i.length;n++){this._renderChildControl(e,t,i[n])}e.write("</span>")};o._renderResponsiveNumber=function(e,t){var i=t.getAggregation("_objectNumber");if(i&&i.getNumber()){i.setTextDirection(t.getNumberTextDirection());this._renderChildControl(e,t,i)}};o._hasResponsiveStates=function(e){var t=e.getAttributes(),i=[];if(!(e._hasAttributes()||e._hasStatus())){e._iCountVisAttrStat=0;return false}for(var r=0;r<t.length;r++){if(t[r].getVisible()){i.push(t[r])}}var s=this._getVisibleStatuses(e);e._iCountVisAttrStat=i.length+s.length;return!!(i.length+s.length)};o._hasResponsiveTabs=function(e){var t=e.getHeaderContainer(),i;if(t){if(t instanceof sap.m.IconTabBar){i=t._getIconTabHeader();if(i.getVisible()){e._iCountVisTabs=i.getItems().length;return!!i.getItems().length}}else if(t.getMetadata().getName()==="sap.m.HeaderContainer"){return!!t.getContent().length}else if(t.getMetadata().getName()==="sap.suite.ui.commons.HeaderContainer"){return!!t.getItems().length}}return false};o._renderResponsiveTabs=function(t,i){var r=i.getHeaderContainer(),s;t.write('<div class="sapMOHRTabs'+(r instanceof sap.m.IconTabBar?" sapMOHRTabsITB":"")+'">');if(r){if(r instanceof sap.m.IconTabBar){s=r._getIconTabHeader();this._renderChildControl(t,i,s);r._bHideHeader=true}else if(r.getMetadata().getName()==="sap.m.HeaderContainer"||r.getMetadata().getName()==="sap.suite.ui.commons.HeaderContainer"){this._renderChildControl(t,i,r)}else{e.sap.log.warning("The control "+r+' is not supported for aggregation "headerContainer"')}}t.write("</div>")};o._renderResponsiveTitle=function(e,t){var i;t._oTitleArrowIcon.setVisible(t.getShowTitleSelector());e.write("<div");e.writeAttribute("id",t.getId()+"-title");e.addClass("sapMOHRTitle");if(t.getTitle().length&&t.getTitleActive()){e.addClass("sapMOHRTitleActive")}if(t.getShowTitleSelector()){e.addClass("sapMOHRTitleFollowArrow")}e.writeClasses();e.write(">");if(s.system.phone&&s.orientation.portrait){i=50}else{i=80}e.write("<div");e.writeAttribute("id",t.getId()+"-title-arrow");e.addStyle("display","inline-block");e.writeStyles();e.write(">");this._renderResponsiveTitleAndArrow(e,t,i);e.write("</div>");if(t.getIntro()){this._renderIntro(e,t,"sapMOHRIntro","sapMOHRIntroActive")}e.write("</div>")};o._rerenderTitle=function(t,i,r){var s=i.getId();this._renderResponsiveTitleAndArrow(t,i,r);t.flush(e.sap.byId(s+"-title-arrow"))};o._renderResponsiveTitleAndArrow=function(e,t,i){var r,s="",n=t.getTitleTextDirection();var o=!!t._getVisibleMarkers().length;var l=t.getTitleLevel()===d.Auto?d.H1:t.getTitleLevel();e.write("<"+l+">");e.write("<span");e.addClass("sapMOHRTitleTextContainer");e.writeClasses();if(n!=a.Inherit){e.writeAttribute("dir",n.toLowerCase())}e.write(">");if(t.getTitle().length&&t.getTitleActive()){e.write("<a");if(t.getTitleHref()){e.writeAttributeEscaped("href",t.getTitleHref());if(t.getTitleTarget()){e.writeAttributeEscaped("target",t.getTitleTarget())}}e.writeAttribute("tabindex","0");e.writeAccessibilityState({role:"link",haspopup:!t.getTitleHref()})}else{e.write("<span")}e.writeAttribute("id",t.getId()+"-txt");e.addClass("sapMOHRTitleText");e.writeClasses();e.write(">");e.write("<span");e.writeAttribute("id",t.getId()+"-titletxtwrap");e.addClass("sapMOHRTitleTextWrappable");e.writeClasses();e.write(">");if(t.getTitle().length>i){r=t.getTitle().substr(0,i).trim();s="..."}else{r=t.getTitle()}if(o){var g=r.substr(r.lastIndexOf(" ")+1);var p=r.substr(0,r.lastIndexOf(" ")+1);if(g.length===1){g=r;p=""}e.writeEscaped(p);e.write("</span>");e.writeEscaped(g);e.write(s);if(t.getTitleActive()){e.write("</a>")}else{e.write("</span>")}this._renderResponsiveMarkers(e,t);e.write("</span>")}else{if(!s){e.writeEscaped(r)}else{e.writeEscaped(r+s)}if(t.getTitleActive()){e.write("</span></a></span>")}else{e.write("</span></span></span>")}}if(t.getShowTitleSelector()){e.write("<span");e.addClass("sapMOHRTitleArrow");e.writeClasses();e.write(">");this._renderChildControl(e,t,t._oTitleArrowIcon);e.write("</span>")}e.write("</"+l+">")};o._rerenderResponsiveStates=function(t,i){var r=i.getId(),a=this._getVisibleAttribsAndStatuses(i),n=a[0].concat(a[1]),d=a[0].length,o=n.length,l=1,g="";if(o===0){return}if(s.orientation.portrait){l=2;g="sapMOHRTwoCols"}else{if(o>=1&&o<=2){l=2;g="sapMOHRTwoCols"}if(o>=3){l=3;g="sapMOHRThreeCols"}}this._renderResponsiveStatesColumn(t,i,l,n,d,g);t.flush(e.sap.byId(r+"-states")[0])};return o},true);