/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,t){var i;if(!t.getVisible()){return}e.write("<div");e.writeControlData(t);e.writeAccessibilityState(t);e.addClass("sapMObjectIdentifier");e.writeClasses();i=t.getTooltip_AsString();if(i){e.writeAttributeEscaped("title",i)}e.write(">");e.write("<div");e.addClass("sapMObjectIdentifierTopRow");e.writeClasses();e.write(">");e.write("<div");e.addClass("sapMObjectIdentifierIcons");e.writeClasses();e.write(">");if(t.getBadgeAttachments()){e.write("<span");e.addClass("sapMObjectIdentifierIconSpan");e.writeClasses();e.write(">");e.renderControl(t._getAttachmentsIcon());e.write("</span>")}if(t.getBadgeNotes()){e.write("<span");e.addClass("sapMObjectIdentifierIconSpan");e.writeClasses();e.write(">");e.renderControl(t._getNotesIcon());e.write("</span>")}if(t.getBadgePeople()){e.write("<span");e.addClass("sapMObjectIdentifierIconSpan");e.writeClasses();e.write(">");e.renderControl(t._getPeopleIcon());e.write("</span>")}e.write("</div>");e.write("<div id='"+t.getId()+"-title'");e.addClass("sapMObjectIdentifierTitle");e.writeClasses();e.write(">");e.renderControl(t._getTitleControl());e.renderControl(t._oAriaCustomRole);e.write("</div>");e.write("</div>");e.write("<div id='"+t.getId()+"-text'");e.addClass("sapMObjectIdentifierText");if(!!t.getProperty("text")&&!!t.getProperty("title")){e.addClass("sapMObjectIdentifierTextBellow")}e.writeClasses();e.write(">");e.renderControl(t._getTextControl());e.write("</div>");e.write("</div>")};return e},true);