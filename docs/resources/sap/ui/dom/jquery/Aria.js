/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(e){"use strict";var r=Object.create(null);function i(e,r,i){var t=this.attr(e);if(!t){return this.attr(e,r)}var a=t.split(" ");if(a.indexOf(r)==-1){i?a.unshift(r):a.push(r);this.attr(e,a.join(" "))}return this}function t(e,r){var i=this.attr(e)||"",t=i.split(" "),a=t.indexOf(r);if(a==-1){return this}t.splice(a,1);if(t.length){this.attr(e,t.join(" "))}else{this.removeAttr(e)}return this}r.addLabelledBy=function(e,r){return i.call(this,"aria-labelledby",e,r)};r.removeLabelledBy=function(e){return t.call(this,"aria-labelledby",e)};r.addDescribedBy=function(e,r){return i.call(this,"aria-describedby",e,r)};r.removeDescribedBy=function(e){return t.call(this,"aria-describedby",e)};e.fn.addAriaLabelledBy=r.addLabelledBy;e.fn.removeAriaLabelledBy=r.removeLabelledBy;e.fn.addAriaDescribedBy=r.addDescribedBy;e.fn.removeAriaDescribedBy=r.removeDescribedBy;return e});