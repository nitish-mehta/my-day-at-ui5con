/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./LabelEnablement","sap/ui/base/Object","jquery.sap.act","jquery.sap.encoder","jquery.sap.dom","jquery.sap.trace"],function(e,t,r){"use strict";var n=["renderControl","write","writeEscaped","translate","writeAcceleratorKey","writeControlData","writeInvisiblePlaceholderData","writeElementData","writeAttribute","writeAttributeEscaped","addClass","writeClasses","addStyle","writeStyles","writeAccessibilityState","writeIcon","getConfiguration","getHTML","cleanupControlWithoutRendering"];var a=["render","flush","destroy"];function i(){var t=this,o,l,u,f,d,p;this._setFocusHandler=function(t){e.sap.assert(t&&r.isA(t,"sap.ui.core.FocusHandler"),"oFocusHandler must be an sap.ui.core.FocusHandler");o=t};function c(){l=t.aBuffer=[];u=t.aRenderedControls=[];f=t.aStyleStack=[{}]}this.write=function(t){e.sap.assert(typeof t==="string"||typeof t==="number","sText must be a string or number");l.push.apply(l,arguments);return this};this.writeEscaped=function(t,r){if(t!=null){t=e.sap.encodeHTML(String(t));if(r){t=t.replace(/&#xa;/g,"<br>")}l.push(t)}return this};this.writeAttribute=function(t,r){e.sap.assert(typeof t==="string","sName must be a string");e.sap.assert(typeof r==="string"||typeof r==="number"||typeof r==="boolean","value must be a string, number or boolean");l.push(" ",t,'="',r,'"');return this};this.writeAttributeEscaped=function(t,r){e.sap.assert(typeof t==="string","sName must be a string");l.push(" ",t,'="',e.sap.encodeHTML(String(r)),'"');return this};this.addStyle=function(t,r){e.sap.assert(typeof t==="string","sName must be a string");if(r!=null){e.sap.assert(typeof r==="string"||typeof r==="number","value must be a string or number");var n=f[f.length-1];if(!n.aStyle){n.aStyle=[]}n.aStyle.push(t+":"+r)}return this};this.writeStyles=function(){var e=f[f.length-1];if(e.aStyle){this.write(' style="'+e.aStyle.join(";")+'" ')}e.aStyle=null;return this};this.addClass=function(t){if(t){e.sap.assert(typeof t==="string","sName must be a string");var r=f[f.length-1];if(!r.aClasses){r.aClasses=[]}r.aClasses.push(t)}return this};this.writeClasses=function(t){e.sap.assert(!t||typeof t==="boolean"||r.isA(t,"sap.ui.core.Element"),"oElement must be empty, a boolean, or an sap.ui.core.Element");var n=f[f.length-1];var a;if(t){a=t.aCustomStyleClasses}else if(t===false){a=[]}else{a=n.aCustomStyleClasses}if(n.aClasses||a){var i=[].concat(n.aClasses||[],a||[]);i.sort();i=i.filter(function(e,t){return t==0||e!==i[t-1]});this.write(' class="',i.join(" "),'" ')}if(!t){n.aCustomStyleClasses=null}n.aClasses=null;return this};function g(t){p=true;try{var r=e.Event("BeforeRendering");r.srcControl=t;t._handleEvent(r)}finally{p=false}}this.cleanupControlWithoutRendering=function(t){e.sap.assert(!t||r.isA(t,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!t||!t.getDomRef()){return}g(t);t.bOutput=false};this.renderControl=function(t){e.sap.assert(!t||r.isA(t,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!t){return this}if(!d){d=[]}if(d&&d.length>0){e.sap.measure.pause(d[0]+"---renderControl")}else if(t.getParent()&&t.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){e.sap.measure.pause(t.getParent().getId()+"---rerender")}d.unshift(t.getId());e.sap.measure.start(t.getId()+"---renderControl","Rendering of "+t.getMetadata().getName(),["rendering","control"]);var n=l.length;var a={};if(t.aCustomStyleClasses&&t.aCustomStyleClasses.length>0){a.aCustomStyleClasses=t.aCustomStyleClasses}f.push(a);e.sap.measure.pause(t.getId()+"---renderControl");var i;var s=t.getMetadata();var o=t.getVisible();if(o){i=s.getRenderer()}else{var p=s.getProperty("visible");var c=p&&p._oParent&&p._oParent.getName()=="sap.ui.core.Control";i=c?v:s.getRenderer()}e.sap.measure.resume(t.getId()+"---renderControl");g(t);var h=t.aBindParameters;if(h&&h.length>0){var m=e(t.getDomRef());if(m&&m[0]){for(var b=0;b<h.length;b++){var C=h[b];m.unbind(C.sEventType,C.fnProxy)}}}if(i&&typeof i.render==="function"){i.render(y,t)}else{e.sap.log.error("The renderer for class "+s.getName()+" is not defined or does not define a render function! Rendering of "+t.getId()+" will be skipped!")}f.pop();u.push(t);if(t.getUIArea&&t.getUIArea()){t.getUIArea()._onControlRendered(t)}t.bOutput=l.length!=n;if(i===v){t.bOutput="invisible"}e.sap.measure.end(t.getId()+"---renderControl");d.shift();if(d&&d.length>0){e.sap.measure.resume(d[0]+"---renderControl")}else if(t.getParent()&&t.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){e.sap.measure.resume(t.getParent().getId()+"---rerender")}return this};this.getHTML=function(t){e.sap.assert(t&&r.isA(t,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");var n=l;var a=l=this.aBuffer=[];this.renderControl(t);l=this.aBuffer=n;return a.join("")};function h(t){var r,n=u.length;for(r=0;r<n;r++){u[r]._sapui_bInAfterRenderingPhase=true}p=true;try{for(r=0;r<n;r++){var a=u[r];if(a.bOutput&&a.bOutput!=="invisible"){var i=e.Event("AfterRendering");i.srcControl=a;e.sap.measure.start(a.getId()+"---AfterRendering","AfterRendering of "+a.getMetadata().getName(),["rendering","after"]);a._handleEvent(i);e.sap.measure.end(a.getId()+"---AfterRendering")}}}finally{for(r=0;r<n;r++){delete u[r]._sapui_bInAfterRenderingPhase}p=false}try{o.restoreFocus(t)}catch(t){e.sap.log.warning("Problems while restoring the focus after rendering: "+t,null)}for(r=0;r<n;r++){var a=u[r],s=a.aBindParameters;if(s&&s.length>0){var l=e(a.getDomRef());if(l&&l[0]){for(var f=0;f<s.length;f++){var d=s[f];l.bind(d.sEventType,d.fnProxy)}}}}}function b(t){var r=o?o.getControlFocusInfo():null;var n=l.join("");t(n);h(r);c();e.sap.act.refresh();e.sap.interaction.notifyStepEnd()}this.flush=function(t,r,n){e.sap.assert(typeof t==="object"&&t.ownerDocument==document,"oTargetDomNode must be a DOM element");if(!r&&typeof n!=="number"&&!n){i.preserveContent(t)}b(function(r){for(var a=0;a<u.length;a++){var s=u[a].getDomRef();if(s&&!i.isPreservedContent(s)){if(i.isInlineTemplate(s)){e(s).empty()}else{e(s).remove()}}}if(typeof n==="number"){if(n<=0){e(t).prepend(r)}else{var o=e(t).children().eq(n-1);if(o.length===1){o.after(r)}else{e(t).append(r)}}}else if(!n){e(t).html(r)}else{e(t).append(r)}})};this.render=function(t,n){e.sap.assert(t&&r.isA(t,"sap.ui.core.Control"),"oControl must be a control");e.sap.assert(typeof n==="object"&&n.ownerDocument==document,"oTargetDomNode must be a DOM element");if(p){e.sap.log.error("Render must not be called within Before or After Rendering Phase. Call ignored.",null,this);return}c();this.renderControl(t);b(function(r){if(t&&n){var a=t.getDomRef();if(!a||i.isPreservedContent(a)){a=e.sap.domById(s.Invisible+t.getId())||e.sap.domById(s.Dummy+t.getId())}var o=a&&a.parentNode!=n;var l=function(){var t=e(n);if(n.innerHTML==""){t.html(r)}else{t.append(r)}};if(o){if(!i.isPreservedContent(a)){if(i.isInlineTemplate(a)){e(a).empty()}else{e(a).remove()}}if(r){l()}}else{if(r){if(a){if(i.isInlineTemplate(a)){e(a).html(r)}else if(m()){e.sap.replaceDOM(a,r,true)}else{e(a).replaceWith(r)}}else{l()}}else{if(i.isInlineTemplate(a)){e(a).empty()}else{if(!t.getParent()||!t.getParent()._onChildRerenderedEmpty||!t.getParent()._onChildRerenderedEmpty(t,a)){e(a).remove()}}}}}})};this.destroy=function(){c()};var y={};var C={};n.forEach(function(e){y[e]=C[e]=t[e]});a.forEach(function(e){C[e]=t[e]});this.getRendererInterface=function(){return y};this.getInterface=function(){return C};c()}i.prototype.getConfiguration=function(){return sap.ui.getCore().getConfiguration()};i.prototype.translate=function(e){};i.prototype.writeAcceleratorKey=function(){return this};i.prototype.writeControlData=function(t){e.sap.assert(t&&r.isA(t,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");this.writeElementData(t);return this};i.prototype.writeInvisiblePlaceholderData=function(t){e.sap.assert(r.isA(t,"sap.ui.core.Element"),"oElement must be an instance of sap.ui.core.Element");var n=i.createInvisiblePlaceholderId(t),a=" "+'id="'+n+'" '+'class="sapUiHiddenPlaceholder" '+'data-sap-ui="'+n+'" '+'style="display: none;"'+'aria-hidden="true" ';this.write(a);return this};i.prototype.writeElementData=function(t){e.sap.assert(t&&r.isA(t,"sap.ui.core.Element"),"oElement must be an sap.ui.core.Element");var n=t.getId();if(n){this.writeAttribute("id",n).writeAttribute("data-sap-ui",n)}var a=t.getCustomData();var i=a.length;for(var s=0;s<i;s++){var o=a[s]._checkWriteToDom(t);if(o){this.writeAttributeEscaped(o.key,o.value)}}var l=t.getDragDropConfig().some(function(e){return e.isDraggable(t)});if(!l){var u=t.getParent();if(u&&u.getDragDropConfig){l=u.getDragDropConfig().some(function(e){return e.isDraggable(t)})}}if(l){this.writeAttribute("draggable","true");this.writeAttribute("data-sap-ui-draggable","true")}return this};i.prototype.writeAccessibilityState=function(n,a){if(!sap.ui.getCore().getConfiguration().getAccessibility()){return this}if(arguments.length==1&&!r.isA(n,"sap.ui.core.Element")){a=n;n=null}var i={};if(n!=null){var s=n.getMetadata();var o=function(e,t,r){var a=s.getProperty(e);if(a&&n[a._sGetter]()===r){i[t]="true"}};var l=function(e,r){var a=s.getAssociation(e);if(a&&a.multiple){var o=n[a._sGetter]();if(e=="ariaLabelledBy"){var l=t.getReferencingLabels(n);var u=l.length;if(u){var f=[];for(var d=0;d<u;d++){if(o.indexOf(l[d])<0){f.push(l[d])}}o=f.concat(o)}}if(o.length>0){i[r]=o.join(" ")}}};o("editable","readonly",false);o("enabled","disabled",false);o("visible","hidden",false);if(t.isRequired(n)){i["required"]="true"}o("selected","selected",true);o("checked","checked",true);l("ariaDescribedBy","describedby");l("ariaLabelledBy","labelledby")}if(a){var u=function(e){var t=typeof e;return e===null||e===""||t==="number"||t==="string"||t==="boolean"};var f={};var d,p,c;for(d in a){p=a[d];if(u(p)){f[d]=p}else if(typeof p==="object"&&u(p.value)){c="";if(p.append&&(d==="describedby"||d==="labelledby")){c=i[d]?i[d]+" ":""}f[d]=c+p.value}}e.extend(i,f)}if(r.isA(n,"sap.ui.core.Element")&&n.getParent()&&n.getParent().enhanceAccessibilityState){n.getParent().enhanceAccessibilityState(n,i)}for(var g in i){if(i[g]!=null&&i[g]!==""){this.writeAttributeEscaped(g==="role"?g:"aria-"+g,i[g])}}return this};i.prototype.writeIcon=function(t,r,n){var a=sap.ui.requireSync("sap/ui/core/IconPool"),i=a.isIconURI(t),s=i?"<span ":"<img ",o=false,l,u,f,d,p,c;if(typeof r==="string"){r=[r]}if(i){f=a.getIconInfo(t);if(!f){e.sap.log.error("An unregistered icon: "+t+" is used in sap.ui.core.RenderManager's writeIcon method.");return this}if(!r){r=[]}r.push("sapUiIcon");if(!f.suppressMirroring){r.push("sapUiIconMirrorInRTL")}}this.write(s);if(Array.isArray(r)&&r.length){l=r.join(" ");this.write('class="'+l+'" ')}if(i){d={"data-sap-ui-icon-content":f.content,role:"presentation",title:f.text||null};this.write('style="font-family: '+f.fontFamily+';" ')}else{d={role:"presentation",alt:"",src:t}}n=e.extend(d,n);if(!n.id){n.id=e.sap.uid()}if(i){p=n.alt||n.title||f.text||f.name;c=n.id+"-label";if(n["aria-labelledby"]){o=true;n["aria-labelledby"]+=" "+c}else if(!n.hasOwnProperty("aria-label")){n["aria-label"]=p}}if(typeof n==="object"){for(u in n){if(n.hasOwnProperty(u)&&n[u]!==null){this.writeAttributeEscaped(u,n[u])}}}if(i){this.write(">");if(o){this.write('<span style="display:none;" id="'+c+'">'+p+"</span>")}this.write("</span>")}else{this.write("/>")}return this};i.prototype.getRenderer=function(t){e.sap.assert(t&&r.isA(t,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return i.getRenderer(t)};var s=i.RenderPrefixes={Invisible:"sap-ui-invisible-",Dummy:"sap-ui-dummy-"};i.getRenderer=function(t){e.sap.assert(t&&r.isA(t,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return t.getMetadata().getRenderer()};i.forceRepaint=function(t){var r=typeof t=="string"?e.sap.domById(t):t;if(r){e.sap.log.debug("forcing a repaint for "+(r.id||String(r)));var n=r.style.display;var a=document.activeElement;r.style.display="none";r.offsetHeight;r.style.display=n;if(document.activeElement!==a){e.sap.focus(a)}}};i.createInvisiblePlaceholderId=function(e){return s.Invisible+e.getId()};var o="sap-ui-preserve",l="sap-ui-static",u="data-sap-ui-preserve",f="data-sap-ui-area";function d(){var t=e.sap.byId(o);if(t.length===0){t=e("<DIV/>",{"aria-hidden":"true",id:o}).addClass("sapUiHidden").addClass("sapUiForcedHidden").css("width","0").css("height","0").css("overflow","hidden").appendTo(document.body)}return t}function p(t){e("<DIV/>",{id:s.Dummy+t.id}).addClass("sapUiHidden").insertBefore(t)}var c=[];i.attachPreserveContent=function(e,t){i.detachPreserveContent(e);c.push({fn:e,context:t})};i.detachPreserveContent=function(e){c=c.filter(function(t){return t.fn!==e})};i.preserveContent=function(t,r,n){e.sap.assert(typeof t==="object"&&t.ownerDocument==document,"oRootNode must be a DOM element");c.forEach(function(e){e.fn.call(e.context||i,{domNode:t})});var a=d();function s(r){if(r.id===o||r.id===l){return}if(r.hasAttribute(u)){if(r===t){p(r)}a.append(r)}else if(n&&r.id){i.markPreservableContent(e(r),r.id);a.append(r);return}if(!r.hasAttribute(f)){var d=r.firstChild;while(d){r=d;d=d.nextSibling;if(r.nodeType===1){s(r)}}}}e.sap.measure.start(t.id+"---preserveContent","preserveContent for "+t.id,["rendering","preserve"]);if(r){s(t)}else{e(t).children().each(function(e,t){s(t)})}e.sap.measure.end(t.id+"---preserveContent")};i.findPreservedContent=function(t){e.sap.assert(typeof t==="string","sId must be a string");var r=d(),n=r.children("["+u+"='"+t.replace(/(:|\.)/g,"\\$1")+"']");return n};i.markPreservableContent=function(e,t){e.attr(u,t)};i.isPreservedContent=function(e){return e&&e.getAttribute(u)&&e.parentNode&&e.parentNode.id==o};i.getPreserveAreaRef=function(){return d()[0]};var g="data-sap-ui-template";i.markInlineTemplate=function(e){e.attr(g,"")};i.isInlineTemplate=function(e){return e&&e.hasAttribute(g)};var h;function m(){if(h===undefined){h=sap.ui.getCore().getConfiguration().getDomPatching();if(h){e.sap.log.warning("DOM Patching is enabled: This feature should be used only for testing purposes!")}}return h}var v={render:function(e,t){e.write("<span");e.writeInvisiblePlaceholderData(t);e.write("></span>")}};return i},true);