/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Sorter"],function(r,t){"use strict";var e={};e.apply=function(e,a,n,o){var i=this,p=[],f=[],u,s;if(!a||a.length==0){return e}for(var l=0;l<a.length;l++){s=a[l];f[l]=s.fnCompare||t.defaultComparator;r.each(e,function(r,t){u=n(t,s.sPath);if(typeof u=="string"){u=u.toLocaleUpperCase()}if(!p[l]){p[l]=[]}if(o){t=o(t)}p[l][t]=u})}e.sort(function(r,t){if(o){r=o(r);t=o(t)}var e=p[0][r],n=p[0][t];return i._applySortCompare(a,r,t,e,n,p,f,0)});return e};e._applySortCompare=function(r,t,e,a,n,o,i,p){var f=r[p],u=i[p],s;s=u(a,n);if(f.bDescending){s=-s}if(s==0&&r[p+1]){a=o[p+1][t];n=o[p+1][e];s=this._applySortCompare(r,t,e,a,n,o,i,p+1)}return s};return e});