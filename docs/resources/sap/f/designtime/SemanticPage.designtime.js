/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e=function(e,t){return!(e&&e[t]&&e[t]()&&e[t]().getDomRef())};var t=function(e,t){var n;if(!e){return true}n=e.$().find("sapFDynamicPageTitleActionsBar");return!!(n.length>0&&e[t]().length>0)};return{aggregations:{titleHeading:{domRef:function(e){return e.getTitleHeading().getDomRef()},ignore:function(t){return e(t,"getTitleHeading")}},titleBreadcrumbs:{domRef:function(e){return e.getTitleBreadcrumbs().getDomRef()},ignore:function(t){return e(t,"getTitleBreadcrumbs")}},titleSnappedContent:{domRef:":sap-domref .sapFDynamicPageTitleMainSnapContentVisible",actions:{move:{changeType:"moveControls"}},ignore:function(e){return!!(!e||e.getTitleSnappedContent().length===0||e.getHeaderExpanded())}},titleExpandedContent:{domRef:":sap-domref .sapFDynamicPageTitleMainExpandContentVisible",actions:{move:{changeType:"moveControls"}},ignore:function(e){return!!(!e||e.getTitleExpandedContent().length===0||!e.getHeaderExpanded())}},titleContent:{domRef:":sap-domref .sapFDynamicPageTitleMain > .sapFDynamicPageTitleMainInner > .sapFDynamicPageTitleMainContent",actions:{move:{changeType:"moveControls"}},ignore:function(e){return!!(!e||e.getTitleContent().length===0)}},titleMainAction:{domRef:function(e){return e.getTitleMainAction().getDomRef()},ignore:function(t){return e(t,"getTitleMainAction")}},editAction:{domRef:function(e){return e.getEditAction().getDomRef()},ignore:function(t){return e(t,"getEditAction")}},addAction:{domRef:function(e){return e.getAddAction().getDomRef()},ignore:function(t){return e(t,"getAddAction")}},deleteAction:{domRef:function(e){return e.getDeleteAction().getDomRef()},ignore:function(t){return e(t,"getDeleteAction")}},copyAction:{domRef:function(e){return e.getCopyAction().getDomRef()},ignore:function(t){return e(t,"getCopyAction")}},flagAction:{domRef:function(e){return e.getFlagAction().getDomRef()},ignore:function(t){return e(t,"getFlagAction")}},favoriteAction:{domRef:function(e){return e.getFavoriteAction().getDomRef()},ignore:function(t){return e(t,"getFavoriteAction")}},fullScreenAction:{domRef:function(e){return e.getFullScreenAction().getDomRef()},ignore:function(t){return e(t,"getFullScreenAction")}},exitFullScreenAction:{domRef:function(e){return e.getExitFullScreenAction().getDomRef()},ignore:function(t){return e(t,"getExitFullScreenAction")}},closeAction:{domRef:function(e){return e.getCloseAction().getDomRef()},ignore:function(t){return e(t,"getCloseAction")}},titleCustomTextActions:{domRef:":sap-domref .sapFDynamicPageTitleActionsBar",ignore:function(e){return t(e,"getTitleCustomTextActions")}},titleCustomIconActions:{domRef:":sap-domref .sapFDynamicPageTitleActionsBar",ignore:function(e){return t(e,"getTitleCustomIconActions")}},headerContent:{domRef:":sap-domref .sapFDynamicPageHeaderContent",actions:{move:{changeType:"moveControls"}},ignore:function(e){return!(e&&e.getHeaderContent().length>0)}},content:{domRef:":sap-domref .sapFDynamicPageContent",ignore:function(t){return e(t,"getContent")}},footerMainAction:{domRef:function(e){return e.getFooterMainAction().getDomRef()},ignore:function(t){return e(t,"getFooterMainAction")}},messagesIndicator:{domRef:function(e){return e.getMessagesIndicator().getDomRef()},ignore:function(t){return e(t,"getMessagesIndicator")}},draftIndicator:{domRef:function(e){return e.getDraftIndicator().getDomRef()},ignore:function(t){return e(t,"getDraftIndicator")}},positiveAction:{domRef:function(e){return e.getPositiveAction().getDomRef()},ignore:function(t){return e(t,"getPositiveAction")}},negativeAction:{domRef:function(e){return e.getNegativeAction().getDomRef()},ignore:function(t){return e(t,"getNegativeAction")}},footerCustomActions:{domRef:":sap-domref .sapFDynamicPageActualFooterControl",ignore:function(e){return!(e&&e.getFooterCustomActions()&&e.getFooterCustomActions().length>0)}},discussInJamAction:{domRef:function(e){return e.getDiscussInJamAction().getDomRef()},ignore:function(t){return e(t,"getDiscussInJamAction")}},saveAsTileAction:{domRef:function(e){return e.getSaveAsTileAction().getDomRef()},ignore:function(t){return e(t,"getSaveAsTileAction")}},shareInJamAction:{domRef:function(e){return e.getShareInJamAction().getDomRef()},ignore:function(t){return e(t,"getShareInJamAction")}},sendMessageAction:{domRef:function(e){return e.getSendMessageAction().getDomRef()},ignore:function(t){return e(t,"getSendMessageAction")}},sendEmailAction:{domRef:function(e){return e.getSendEmailAction().getDomRef()},ignore:function(t){return e(t,"getSendEmailAction")}},printAction:{domRef:function(e){return e.getPrintAction().getDomRef()},ignore:function(t){return e(t,"getPrintAction")}},customShareActions:{domRef:function(e){return e._getActionSheet().getDomRef()},ignore:function(t){return e(t,"_getActionSheet")}}},scrollContainers:[{domRef:":sap-domref .sapFDynamicPageContentWrapper",aggregations:["headerContent","content"]},{domRef:function(e){return e.$("vertSB-sb").get(0)}}],templates:{create:"sap/f/designtime/SemanticPage.create.fragment.xml"}}},false);