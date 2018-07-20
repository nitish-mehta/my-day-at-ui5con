/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e="Before",r="insertBefore",t="insertAfter",n,i="IconTabReorder";var o={_insertControl:function(e,r,n){if(e===t){r.insertAfter(n)}else{r.insertBefore(n)}},handleDrop:function(i,a,s,g,d){var f=i.indexOfItem(s),u=i.indexOfItem(g),c=s.$(),l=g.$(),p=0,D=sap.ui.getCore().getConfiguration().getRTL(),_=a===e;if(D&&!d){if(_){p=f<u?u:u+1;n=t}else{p=f<u?u-1:u;n=r}}else{if(_){p=f<u?u-1:u;n=r}else{p=f<u?u:u+1;n=t}}o._insertControl(n,c,l);o._handleConfigurationAfterDragAndDrop.call(i,s,p)},_updateAccessibilityInfo:function(){var e=this.getItems(),r=1,t;e.forEach(function(e){t=e.getDomRef();if(t&&t.getAttribute("aria-posinset")!==null){t.setAttribute("aria-posinset",r++)}})},_handleConfigurationAfterDragAndDrop:function(e,r){this.removeAggregation("items",e,true);this.insertAggregation("items",e,r,true);o._updateAccessibilityInfo.call(this)},_decreaseDropIndex:function(e){if(e===0){n=t;return e}n=r;return e-1},_increaseDropIndex:function(e,i){if(e===i-1){n=r;return e}n=t;return e+1},moveItem:function(e,i){var a=e.$(),s=this.getItems(),g=this.indexOfItem(e),d=sap.ui.getCore().getConfiguration().getRTL(),f,u,c=jQuery.sap.KeyCodes;switch(i){case c.HOME:f=0;n=r;break;case c.END:f=s.length-1;n=t;break;case c.ARROW_LEFT:if(d){f=o._increaseDropIndex(g,s.length)}else{f=o._decreaseDropIndex(g)}break;case c.ARROW_RIGHT:if(d){f=o._decreaseDropIndex(g)}else{f=o._increaseDropIndex(g,s.length)}break;case c.ARROW_DOWN:f=o._increaseDropIndex(g,s.length);break;case c.ARROW_UP:f=o._decreaseDropIndex(g);break;default:return}u=s[f].$();o._insertControl(n,a,u);o._handleConfigurationAfterDragAndDrop.call(this,e,f);return true},getDraggedDroppedItemsFromList:function(e,r,t){var n,i,o,a,s;s=r._tabFilter?r._tabFilter.getId():r.getId();a=t._tabFilter?t._tabFilter.getId():t.getId();if(!e&&!r&&!t){return}e.forEach(function(e){o=e._tabFilter.getId();if(!o){return}if(o===a){n=e}if(o===s){i=e}});return{oDraggedControlFromList:i,oDroppedControlFromList:n}},setDragDropAggregations:function(e,r,t,n){var o=e._iconTabHeader?e._iconTabHeader.getId():e.getId();e.addDragDropConfig(new r({sourceAggregation:"items",groupName:i+o}));e.addDragDropConfig(new t({targetAggregation:"items",dropPosition:"Between",dropLayout:n,drop:e._handleDragAndDrop.bind(e),groupName:i+o}))}};return o});