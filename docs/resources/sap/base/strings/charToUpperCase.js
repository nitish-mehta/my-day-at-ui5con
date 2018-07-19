/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var r=function(r,t){if(!r){return r}if(!t||isNaN(t)||t<=0||t>=r.length){t=0}var n=r.charAt(t).toUpperCase();if(t>0){return r.substring(0,t)+n+r.substring(t+1)}return n+r.substring(t+1)};return r});