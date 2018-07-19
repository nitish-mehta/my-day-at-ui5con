/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/ui/test/matchers/Interactable","sap/ui/test/matchers/Visible"],function(t,e,r,a){"use strict";var n={getInteractabilityMatchers:function(t){return[t?new r:new a]},getFilteringMatchers:function(e){var r=i(e);if(e.matchers){if(t.isPlainObject(e.matchers)){r=r.concat(i(e.matchers))}else if(t.isArray(e.matchers)){e.matchers.forEach(function(e){if(t.isPlainObject(e)){r=r.concat(i(e))}else{r.push(e)}})}else{r=r.concat(e.matchers)}}return r}};function i(e){if(e["isMatching"]){return[e]}var r=["aggregationContainsPropertyEqual","aggregationEmpty","aggregationFilled","aggregationLengthEquals","ancestor","bindingPath","I18NText","labelFor","properties","propertyStrictEquals"];return Object.keys(e).filter(function(t){return r.indexOf(t)>-1}).map(function(r){var a=t.sap.charToUpperCase(r);sap.ui.require(["sap/ui/test/matchers/"+a]);var n=sap.ui.test.matchers[a];var i=t.isArray(e[r])?e[r]:[e[r]];return i.map(function(e){if(t.isArray(e)){return new function(){return n.apply(this,e)}}else{return new n(e)}})}).reduce(function(t,e){return t.concat(e)},[])}return e.extend("sap.ui.test.matchers.MatcherFactory",n)});