/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/TreeBinding","sap/ui/model/TreeAutoExpandMode","sap/ui/model/ChangeReason","sap/ui/model/TreeBindingUtils"],function(e,t,i,o,r){"use strict";var n=function(){if(!(this instanceof t)||this._bIsAdapted){return}for(var e in n.prototype){if(n.prototype.hasOwnProperty(e)){this[e]=n.prototype[e]}}this.mParameters=this.mParameters||{};this._aRowIndexMap=[];this._iThreshold=0;this._iPageSize=0;this.setAutoExpandMode(this.mParameters.autoExpandMode||i.Sequential);if(this.mParameters.collapseRecursive===undefined){this.bCollapseRecursive=true}else{this.bCollapseRecursive=!!this.mParameters.collapseRecursive}this._createTreeState();this._bIsAdapted=true};n.prototype.getCurrentTreeState=function(){var e=";";var t={};for(var i in this._mTreeState.expanded){t[i]=true}var o={};for(var i in this._mTreeState.collapsed){o[i]=true}var r={};for(var i in this._mTreeState.selected){r[i]=true}return{_getExpandedList:function(){return Object.keys(t).join(e)},_getCollapsedList:function(){return Object.keys(o).join(e)},_getSelectedList:function(){return Object.keys(r).join(e)},_isExpanded:function(e){return!!t[e]},_isCollapsed:function(e){return!!o[e]},_remove:function(e){delete t[e];delete o[e];delete r[e]}}};n.prototype.setTreeState=function(e){this._oInitialTreeState=e};n.prototype.setAutoExpandMode=function(e){this._autoExpandMode=e};n.prototype.getLength=function(){if(!this._oRootNode){return 0}return this._oRootNode.magnitude};n.prototype.getContextByIndex=function(e){if(this.isInitial()){return}var t=this.findNode(e);return t?t.context:undefined};n.prototype.getNodeByIndex=function(e){if(this.isInitial()){return}if(e>=this.getLength()){return undefined}return this.findNode(e)};n.prototype.findNode=function(e){if(this.isInitial()){return}var t=typeof e;var i;var o=[];if(t==="number"){i=this._aRowIndexMap[e];if(!i){var r=-1;this._match(this._oRootNode,o,1,function(t){if(r===e){return true}r+=1});i=o[0]}}return i};n.prototype._createTreeState=function(e){if(!this._mTreeState||e){this._mTreeState={expanded:{},collapsed:{},selected:{},deselected:{}}}};n.prototype._updateTreeState=function(e){e=e||{};var t=e.expanded?this._mTreeState.expanded:this._mTreeState.collapsed;var i=e.expanded?this._mTreeState.collapsed:this._mTreeState.expanded;var o=this._getNodeState(e.groupID);if(!o){o=e.fallbackNodeState||this._createNodeState({groupID:e.groupID,expanded:e.expanded,sum:e.sum})}delete i[e.groupID];t[e.groupID]=o;o.expanded=e.expanded;return o};n.prototype._createNodeState=function(t){if(!t.groupID){e.sap.assert(false,"To create a node state a group ID is mandatory!");return}var i;var o;if(this._oInitialTreeState){i=this._oInitialTreeState._isExpanded(t.groupID);o=this._oInitialTreeState._isCollapsed(t.groupID);this._oInitialTreeState._remove(t.groupID)}var r=t.expanded||i||false;var n=t.selected||false;var a={groupID:t.groupID,expanded:r,sections:t.sections||[{startIndex:0,length:this._iPageSize}],sum:t.sum||false,selected:n};if(i||o){this._updateTreeState({groupID:t.groupID,fallbackNodeState:a,expanded:i,collapsed:o})}return a};n.prototype._getNodeState=function(e){var t=this._mTreeState.expanded[e];var i=this._mTreeState.collapsed[e];var o=this._mTreeState.selected[e];var r=this._mTreeState.deselected[e];return t||i||o||r};n.prototype._updateNodeSections=function(t,i){var o=this._getNodeState(t);if(!o){e.sap.assert(false,"No Node State for Group ID '"+t+"' found!");return}else if(!i){e.sap.assert(false,"No Section given!");return}else if(i.length<=0){e.sap.assert(false,"The length of the given section must be positive greater than 0.");return}else if(i.startIndex<0){e.sap.assert(false,"The sections start index must be greater/equal to 0.");return}o.sections=r.mergeSections(o.sections,i);return o.sections};n.prototype._increaseSections=function(){var e=function(e){if(!e){return}var t=this._getMaxGroupSize(e);var i=e.nodeState;if(t===undefined){var o=[];for(var n=0;n<i.sections.length;n++){var a=i.sections[n];a.length=Math.max(a.length,this._iPageSize);o=r.mergeSections(o,a)}i.sections=o}};this._map(this._oRootNode,e)};n.prototype._getMaxGroupSize=function(e){var t=0;if(e.isArtificial){var i=this.oModel.isList(this.sPath,this.getContext());if(this.bDisplayRootNode&&!i&&!this._bRootMissing){t=1}else{t=this._getGroupSize(e)||0}}else{t=this.nodeHasChildren(e)?this._getGroupSize(e):0}return t};n.prototype.getContexts=function(t,i,o,r){if(this.isInitial()){return[]}if(!i){i=this.oModel.iSizeLimit}if(!o){o=0}if(i>this._iPageSize){this._iPageSize=i;this._increaseSections()}this._iThreshold=Math.max(this._iThreshold,o);this._aRowIndexMap=[];this._buildTree(t,i);var n=[];if(this._oRootNode){n=this._retrieveNodeSection(this._oRootNode,t,i)}this._updateRowIndexMap(n,t);var a=[];var s;for(var d=0;d<n.length;d++){var l=n[d];if(!l.context){s=s||{};var u=l.parent;s[u.groupID]=u;this._updateNodeSections(u.groupID,{startIndex:l.positionInParent,length:1})}a.push(l.context)}if(s){var p=this;e.each(s,function(e,t){t.magnitude=0;t.numberOfTotals=0;p._loadChildContexts(t)});a=[];for(var h=0;h<n.length;h++){var l=n[h];a.push(l.context)}}if(r){return n}else{return a}};n.prototype.getNodes=function(e,t,i){return this.getContexts(e,t,i,true)};n.prototype._updateRowIndexMap=function(e,t){this._aRowIndexMap=[];for(var i=0;i<e.length;i++){this._aRowIndexMap[t+i]=e[i]}};n.prototype._retrieveNodeSection=function(e,t,i){var o=-1;var r=[];this._match(this._oRootNode,[],i,function(e,n,a){if(!e||!e.isArtificial){o++}if(o>=t&&o<t+i){if(!e){e=this._createNode({parent:a,positionInParent:n});a.children[n]=e}r.push(e);return true}});return r};n.prototype._buildTree=function(e,t){this._oRootNode=undefined;var i=null;var o=this._calculateGroupID({context:i,parent:null});var r=this._getNodeState(o);if(!r){var r=this._createNodeState({groupID:o,sum:true,sections:[{startIndex:e,length:t}]});this._updateTreeState({groupID:r.groupID,fallbackNodeState:r,expanded:true})}this._oRootNode=this._createNode({context:i,parent:null,level:this.bDisplayRootNode&&!(i===null)?0:-1,nodeState:r,isLeaf:false,autoExpand:this.getNumberOfExpandedLevels()+1});this._oRootNode.isArtificial=true;if(this._mTreeState.expanded[this._oRootNode.groupID]){this._loadChildContexts(this._oRootNode)}};n.prototype._calculateRequestLength=function(e,t){var i;if(!e){i=t.length}else{i=Math.max(Math.min(t.length,e-t.startIndex),0)}return i};n.prototype._loadChildContexts=function(e){var t=e.nodeState;var o=this._getMaxGroupSize(e);if(o>0){if(!e.children[o-1]){e.children[o-1]=undefined}t.leafCount=o}if(this.bClientOperation){t.sections=[{startIndex:0,length:o}]}for(var r=0;r<t.sections.length;r++){var n=t.sections[r];var a=this._calculateRequestLength(o,n);if(e.autoExpand>=0&&this._autoExpandMode===i.Bundled){a=Math.max(0,o)}var s;if(e.isArtificial){s=this.getRootContexts(n.startIndex,a,this._iThreshold)}else{s=this.nodeHasChildren(e)?this.getNodeContexts(e.context,n.startIndex,a,this._iThreshold):[]}for(var d=0;d<s.length;d++){var l=s[d];if(!l){continue}var u=d+n.startIndex;var p=e.children[u];var h={context:s[d],parent:e,level:e.level+1,positionInParent:u,autoExpand:Math.max(e.autoExpand-1,-1)};if(p){p.context=h.context;p.parent=h.parent;p.level=h.level;p.positionInParent=h.positionInParent;p.magnitude=0;p.numberOfTotals=0;p.autoExpand=h.autoExpand;var c;if(l){c=this._calculateGroupID(p)}p.groupID=c}else{p=this._createNode(h)}p.nodeState=this._getNodeState(p.groupID);if(!p.nodeState){p.nodeState=this._createNodeState({groupID:p.groupID,expanded:false})}p.nodeState.parentGroupID=e.groupID;p.isLeaf=!this.nodeHasChildren(p);e.children[u]=p;if(p.isLeaf){e.numberOfLeafs+=1}if(p.parent.nodeState.selectAllMode&&!this._mTreeState.deselected[p.groupID]){this.setNodeSelection(p.nodeState,true)}if((p.autoExpand>0||p.nodeState.expanded)&&this.isGrouped()){if(!this._mTreeState.collapsed[p.groupID]&&!p.isLeaf){this._updateTreeState({groupID:p.nodeState.groupID,fallbackNodeState:p.nodeState,expanded:true});this._loadChildContexts(p)}e.magnitude+=Math.max(p.magnitude||0,0);e.numberOfLeafs+=p.numberOfLeafs}}}e.magnitude+=Math.max(o||0,0)};n.prototype.isGrouped=function(){return true};n.prototype._calculateGroupID=function(t){e.sap.log.error("TreeBindingAdapter#_calculateGroupID: Not implemented. Needs to be implemented in respective sub-classes.")};n.prototype._createNode=function(e){e=e||{};var t=e.context;var i=e.level||0;var o={context:t,level:i,children:e.children||[],parent:e.parent,nodeState:e.nodeState,isLeaf:e.isLeaf||false,positionInParent:e.positionInParent,magnitude:e.magnitude||0,numberOfTotals:e.numberOfTotals||0,numberOfLeafs:e.numberOfLeafs||0,autoExpand:e.autoExpand||0,absoluteNodeIndex:e.absoluteNodeIndex||0,totalNumberOfLeafs:0};if(t!==undefined){o.groupID=this._calculateGroupID(o)}return o};n.prototype.expand=function(t,i){var r=this.findNode(t);if(!r){e.sap.assert(false,"No node found for index "+t);return}this._updateTreeState({groupID:r.nodeState.groupID,fallbackNodeState:r.nodeState,expanded:true});if(!i){this._fireChange({reason:o.Expand})}};n.prototype.expandToLevel=function(e){this._mTreeState.collapsed={};this.setNumberOfExpandedLevels(e);this._fireChange({reason:o.Expand})};n.prototype.isExpanded=function(e){var t=this.findNode(e);return t&&t.nodeState?t.nodeState.expanded:false};n.prototype.collapse=function(t,i){var r;var n=this;if(typeof t==="object"){r=t}else if(typeof t==="number"){var a=this.findNode(t);if(!a){e.sap.assert(false,"No node found for index "+t);return}r=a.nodeState}this._updateTreeState({groupID:r.groupID,fallbackNodeState:r,expanded:false});r.selectAllMode=false;if(this.bCollapseRecursive){var s=r.groupID;e.each(this._mTreeState.expanded,function(t,i){if(e.sap.startsWith(t,s)){n._updateTreeState({groupID:t,expanded:false})}});var d=[];e.each(this._mTreeState.selected,function(t,i){if(e.sap.startsWith(t,s)&&t!==s){i.selectAllMode=false;n.setNodeSelection(i,false);d.push(t)}});if(d.length){var l={rowIndices:[]};var u=-1;this._map(this._oRootNode,function(e){if(!e||!e.isArtificial){u++}if(e&&d.indexOf(e.groupID)!==-1){if(e.groupID===this._sLeadSelectionGroupID){l.oldIndex=u;l.leadIndex=-1}l.rowIndices.push(u)}});this._publishSelectionChanges(l)}}if(!i){this._fireChange({reason:o.Collapse})}};n.prototype.collapseToLevel=function(t){if(!t||t<0){t=0}var i=this;e.each(this._mTreeState.expanded,function(e,o){var r=i._getGroupIdLevel(e)-1;if(r===t){i.collapse(o,true)}});this._fireChange({reason:o.Collapse})};n.prototype._map=function(e,t){t.call(this,e);if(!e){return}for(var i=0;i<e.children.length;i++){var o=e.children[i];this._map(o,t)}if(this._afterMapHook){this._afterMapHook(e,t)}};n.prototype._match=function(e,t,i,o,r,n){if(t.length===i){return true}var a=o.call(this,e,r,n);if(a){t.push(e)}if(!e){return false}for(var s=0;s<e.children.length;s++){var d=e.children[s];var l=this._match(d,t,i,o,s,e);if(l){return true}}return this._afterMatchHook?this._afterMatchHook(e,t,i,o,r,n):false};n.prototype.toggleIndex=function(t){var i=this.findNode(t);if(!i){e.sap.assert(false,"There is no node at index "+t+".");return}if(i.nodeState.expanded){this.collapse(t)}else{this.expand(t)}};n.prototype._getGroupIdLevel=function(t){if(t==null){e.sap.log.warning("assertion failed: no need to determine level of group ID = null");return-1}return t.split("/").length-2};n.prototype._getGroupSize=function(e){return this.getChildCount(e.context)};n.prototype.setNodeSelection=function(t,i){if(!t.groupID){e.sap.assert(false,"NodeState must have a group ID!");return}t.selected=i;if(i){this._mTreeState.selected[t.groupID]=t;delete this._mTreeState.deselected[t.groupID]}else{delete this._mTreeState.selected[t.groupID];this._mTreeState.deselected[t.groupID]=t}};n.prototype.isIndexSelected=function(e){var t=this.getNodeByIndex(e);return t&&t.nodeState?t.nodeState.selected:false};n.prototype.isIndexSelectable=function(e){var t=this.getNodeByIndex(e);return this._isNodeSelectable(t)};n.prototype._isNodeSelectable=function(e){return!!e&&!e.isArtificial};n.prototype.setSelectedIndex=function(t){var i=this.findNode(t);if(i&&this._isNodeSelectable(i)){var o=this._clearSelection();var r=o.rowIndices.indexOf(t);if(r>=0){o.rowIndices.splice(r,1)}else{o.rowIndices.push(t)}o.leadGroupID=i.groupID;o.leadIndex=t;this.setNodeSelection(i.nodeState,true);this._publishSelectionChanges(o)}else{e.sap.log.warning("TreeBindingAdapter: The selection was ignored. Please make sure to only select rows, for which data has been fetched to the client. For AnalyticalTables, some rows might not be selectable at all.")}};n.prototype.getSelectedIndex=function(){if(!this._sLeadSelectionGroupID||e.isEmptyObject(this._mTreeState.selected)){return-1}var t=-1;var i=function(e){if(!e||!e.isArtificial){t++}if(e){if(e.groupID===this._sLeadSelectionGroupID){return true}}};this._match(this._oRootNode,[],1,i);return t};n.prototype.getSelectedIndices=function(){var t=[];var i=this;if(e.isEmptyObject(this._mTreeState.selected)){return t}var o=Object.keys(this._mTreeState.selected).length;var r=-1;var n=function(e){if(!e||!e.isArtificial){r++}if(e){if(e.nodeState&&e.nodeState.selected&&!e.isArtificial){t.push(r);i._aRowIndexMap[r]=e;return true}}};this._match(this._oRootNode,[],o,n);return t};n.prototype.getSelectedNodesCount=function(){var e;if(this._oRootNode&&this._oRootNode.nodeState.selectAllMode){var t,i,o,r;var n,a=[];if(this.filterInfo&&this.aAllFilters){for(var s=this.filterInfo.aFilteredContexts.length-1;s>=0;s--){n=this.filterInfo.aFilteredContexts[s];a.push(this._calculateGroupID({context:n}))}}i=0;for(t in this._mTreeState.expanded){if(!this.aAllFilters||a.indexOf(t)!==-1){r=this._mTreeState.expanded[t];if(!r.selectAllMode&&r.leafCount!==undefined){i+=r.leafCount}}}for(t in this._mTreeState.selected){if(!this.aAllFilters||a.indexOf(t)!==-1){r=this._mTreeState.selected[t];o=this._mTreeState.expanded[r.parentGroupID];if(o&&!o.selectAllMode){i--}}}for(t in this._mTreeState.deselected){if(!this.aAllFilters||a.indexOf(t)!==-1){r=this._mTreeState.deselected[t];o=this._mTreeState.expanded[r.parentGroupID];if(o&&o.selectAllMode){i++}}}e=this._getSelectableNodesCount(this._oRootNode)-i}else{e=Object.keys(this._mTreeState.selected).length}return e};n.prototype._getSelectableNodesCount=function(e){if(e){return e.magnitude}else{return 0}};n.prototype.getSelectedContexts=function(){var t=[];var i=this;if(e.isEmptyObject(this._mTreeState.selected)){return t}var o=Object.keys(this._mTreeState.selected).length;var r=-1;var n=function(e){if(!e||!e.isArtificial){r++}if(e){if(e.nodeState&&e.nodeState.selected&&!e.isArtificial){t.push(e.context);i._aRowIndexMap[r]=e;return true}}};this._match(this._oRootNode,[],o,n);return t};n.prototype.setSelectionInterval=function(e,t){var i=this._clearSelection();var o=this._setSelectionInterval(e,t,true);var r={};var n=[];for(var a=0;a<i.rowIndices.length;a++){var s=i.rowIndices[a];r[s]=true}for(a=0;a<o.rowIndices.length;a++){s=o.rowIndices[a];if(r[s]){delete r[s]}else{r[s]=true}}for(s in r){if(r[s]){n.push(parseInt(s,10))}}this._publishSelectionChanges({rowIndices:n,oldIndex:i.oldIndex,leadIndex:o.leadIndex,leadGroupID:o.leadGroupID})};n.prototype._setSelectionInterval=function(e,t,i){var o=Math.min(e,t);var r=Math.max(e,t);var n=[];var a=[];var s=Math.abs(r-o)+1;var d;var l=-1;var u=function(e){if(!e||!e.isArtificial){l++}if(e){if(l>=o&&l<=r){if(this._isNodeSelectable(e)){if(e.nodeState.selected!==!!i){a.push(l)}if(e.groupID===this._sLeadSelectionGroupID){d=l}this.setNodeSelection(e.nodeState,!!i)}return true}}};this._match(this._oRootNode,n,s,u);var p={rowIndices:a,oldIndex:d,leadIndex:d&&!i?-1:undefined};if(n.length>0&&i){var h=n[n.length-1];p.leadGroupID=h.groupID;p.leadIndex=r}return p};n.prototype.addSelectionInterval=function(e,t){var i=this._setSelectionInterval(e,t,true);this._publishSelectionChanges(i)};n.prototype.removeSelectionInterval=function(e,t){var i=this._setSelectionInterval(e,t,false);this._publishSelectionChanges(i)};n.prototype.selectAll=function(){this._mTreeState.deselected={};var e={rowIndices:[],oldIndex:-1,selectAll:true};var t=-1;this._map(this._oRootNode,function(i){if(!i||!i.isArtificial){t++}if(i){if(i.groupID===this._sLeadSelectionGroupID){e.oldIndex=t}if(this._isNodeSelectable(i)){if(i.nodeState.selected!==true){e.rowIndices.push(t)}this.setNodeSelection(i.nodeState,true);e.leadGroupID=i.groupID;e.leadIndex=t}if(i.nodeState.expanded){i.nodeState.selectAllMode=true}}});this._publishSelectionChanges(e)};n.prototype._clearSelection=function(){var e=-1;var t=-1;var i=0;var o=[];for(var r in this._mTreeState.selected){if(r){i++}}var n=function(i){if(!i||!i.isArtificial){e++}if(i){i.nodeState.selectAllMode=false;if(this._mTreeState.selected[i.groupID]){if(!i.isArtificial){o.push(e)}this.setNodeSelection(i.nodeState,false);if(i.groupID===this._sLeadSelectionGroupID){t=e}return true}}};this._match(this._oRootNode,[],i,n);if(this._oRootNode&&this._oRootNode.nodeState&&this._oRootNode.isArtificial){this._oRootNode.nodeState.selectAllMode=false}return{rowIndices:o,oldIndex:t,leadIndex:-1}};n.prototype.clearSelection=function(e){var t=this._clearSelection();if(!e){this._publishSelectionChanges(t)}};n.prototype._publishSelectionChanges=function(e){e.oldIndex=e.oldIndex||this.getSelectedIndex();e.rowIndices.sort(function(e,t){return e-t});if(e.leadIndex>=0&&e.leadGroupID){this._sLeadSelectionGroupID=e.leadGroupID}else if(e.leadIndex===-1){this._sLeadSelectionGroupID=undefined}else{e.leadIndex=e.oldIndex}if(e.rowIndices.length>0||e.leadIndex!=undefined&&e.leadIndex!==-1){this.fireSelectionChanged(e)}};n.prototype.setCollapseRecursive=function(e){this.bCollapseRecursive=!!e};n.prototype.getCollapseRecursive=function(){return this.bCollapseRecursive};n.prototype.attachSelectionChanged=function(e,t,i){this.attachEvent("selectionChanged",e,t,i);return this};n.prototype.detachSelectionChanged=function(e,t){this.detachEvent("selectionChanged",e,t);return this};n.prototype.fireSelectionChanged=function(e){this.fireEvent("selectionChanged",e);return this};return n},true);