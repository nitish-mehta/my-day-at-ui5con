/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","./ExportColumn","./ExportRow","./ExportType","./File"],function(e,t,r,n,i,o){"use strict";function s(e,t){if(e){return function(){return e.apply(t,arguments)}}else{return e}}function a(t){e.sap.log.warning("Usage of deprecated jQuery Promise method: '"+t+"'. "+"Please use the standard Promise methods 'then' / 'catch' instead!","","sap.ui.core.util.Export")}function l(e,t){var r=new Promise(e);t=t||r;var n=false,i=false;r.then(function(e){n=true;return e},function(e){i=true;throw e});var o={then:r.then,catch:r["catch"]};function l(e){e.then=function(r,n){var i=[s(r,t),s(n,t)];return l(o.then.apply(e,i),t)};e["catch"]=function(r){var n=[s(r,t)];return l(o["catch"].apply(e,n),t)};[{jq:"done",es6:"then"},{jq:"fail",es6:"catch"},{jq:"always",es6:"then"}].forEach(function(r){e[r.jq]=function(){a(r.jq);var n=null;Array.prototype.concat.apply([],arguments).forEach(function(i){var a=s(i,t);var l=function(e){a.apply(this,arguments);return e};var p=[l];if(r.jq==="always"){p.push(l)}if(!n){n=o[r.es6].apply(e,p)}else{n=n[r.es6].apply(n,p)}});return l(n,t)}});e.pipe=function(t,r){a("pipe");return e.then(t,r)};e.state=function(){a("state");if(n){return"resolved"}else if(i){return"rejected"}else{return"pending"}};return e}return l(r)}var p=t.extend("sap.ui.core.util.Export",{metadata:{publicMethods:["generate","saveFile"],library:"sap.ui.core",aggregations:{exportType:{type:"sap.ui.core.util.ExportType",multiple:false},columns:{type:"sap.ui.core.util.ExportColumn",multiple:true,bindable:"bindable"},rows:{type:"sap.ui.core.util.ExportRow",multiple:true,bindable:"bindable"},_template:{type:"sap.ui.core.util.ExportRow",multiple:false,visibility:"hidden"}}}});p.getMetadata().getAggregation("rows")._doesNotRequireFactory=true;p.prototype.init=function(){this._oPromise=null;this._fnResolvePromise=null;this._oRowBindingArgs=null};p.prototype.exit=function(){delete this._oPromise;delete this._fnResolvePromise;delete this._oRowBindingArgs};p.prototype._createRowTemplate=function(){var e=new n(this.getId()+"-row"),t=this.getColumns();for(var r=0,i=t.length;r<i;r++){var o=t[r].getTemplate();if(o){e.addCell(o.clone("col"+r))}}return e};p.prototype.bindAggregation=function(e,r){if(e==="rows"){this._oRowBindingArgs=arguments;return this}return t.prototype.bindAggregation.apply(this,arguments)};p.prototype.updateRows=function(e){if(e==="change"&&this._fnResolvePromise){var t=this.getExportType()._generate(this);this.destroyAggregation("_template");this.unbindAggregation("rows");this._fnResolvePromise(t);this._oPromise=null;this._fnResolvePromise=null}};p.prototype.generate=function(){var e=this;if(!this._oPromise){this._oPromise=l(function(r,n){e._fnResolvePromise=r;if(!e.hasModel()){n("Generate is not possible beause no model was set.")}else{var i=e._createRowTemplate();e.setAggregation("_template",i,true);t.prototype.bindAggregation.apply(e,e._oRowBindingArgs);if(e.getBinding("rows")){e.getBinding("rows").getContexts(0,e.getBinding("rows").getLength())}}},this)}return this._oPromise};p.prototype.saveFile=function(e){return this.generate().then(function(t){var r=this.getExportType();o.save(t,e||"data",r.getFileExtension(),r.getMimeType(),r.getCharset(),r.getByteOrderMark())})};return p});