/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,t){var r=t.getId();e.write("<div");e.writeControlData(t);e.addClass("sapMFeedIn");if(!t.getShowIcon()){e.addClass("sapMFeedInNoIcon")}if(!t.getEnabled()){e.addClass("sapMFeedInDisabled")}e.writeClasses();e.write(">");if(!!t.getShowIcon()){this._addImage(e,t,r)}e.write('<div id="'+r+'-container"');e.addClass("sapMFeedInContainer");e.writeClasses();e.write(">");var i=t._getTextArea();e.renderControl(i);e.renderControl(t._getPostButton());e.write("</div>");e.write("</div>")};e._addImage=function(e,t,r){e.write('<figure id="'+r+'-figure" class ="sapMFeedInFigure');if(!!t.getIcon()){e.write('">')}else{e.write(' sapMFeedListItemIsDefaultIcon">')}e.renderControl(t._getImageControl());e.write("</figure>")};return e},true);