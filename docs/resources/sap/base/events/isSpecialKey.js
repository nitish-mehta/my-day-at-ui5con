/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/events/KeyCodes"],function(e){"use strict";var r=function(r){function s(r){var s=r.which;return s===e.SHIFT||s===e.CONTROL||s===e.ALT||s===e.CAPS_LOCK||s===e.NUM_LOCK}function t(e){var r=e.which,s=r>=37&&r<=40;switch(e.type){case"keydown":case"keyup":return s;case"keypress":return r===0;default:return false}}var n=r.which,a=s(r)||t(r)||n>=33&&n<=36||n>=44&&n<=46||n>=112&&n<=123||n===e.BREAK||n===e.BACKSPACE||n===e.TAB||n===e.ENTER||n===e.ESCAPE||n===e.SCROLL_LOCK;switch(r.type){case"keydown":case"keyup":return a;case"keypress":return n===0||n===e.BACKSPACE||n===e.ESCAPE||n===e.ENTER||false;default:return false}};return r});