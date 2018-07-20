/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/support/library"],function(e,t){"use strict";var a=t.Categories;var o=t.Severity;var r=t.Audiences;function i(e){if(e&&e.isA("sap.ui.layout.form.SimpleForm")){return true}return false}function s(e){if(e&&(e.isA("sap.ui.comp.smartform.SmartForm")||e.isA("sap.m.Panel")&&e.getParent().isA("sap.ui.comp.smartform.SmartForm"))){return true}return false}var n={id:"formResponsiveLayout",audiences:[r.Control],categories:[a.Functionality],enabled:true,minversion:"1.48",title:"Form: Use of ResponsiveLayout",description:"ResponsiveLayout should not be used any longer because of UX requirements",resolution:"Use the ResponsiveGridLayout instead",resolutionurls:[{text:"API Reference: Form",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.Form.html"},{text:"API Reference: SimpleForm",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.SimpleForm.html"},{text:"API Reference: ResponsiveGridLayout",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.ResponsiveGridLayout.html"}],check:function(e,t,a){a.getElementsByClassName("sap.ui.layout.form.Form").forEach(function(t){var a=t.getLayout();if(a&&a.isA("sap.ui.layout.form.ResponsiveLayout")){var r=t.getParent();var n;var l="Form";if(i(r)){n=r.getId();l="SimpleForm"}else if(s(r)){return}else{n=t.getId()}e.addIssue({severity:o.Medium,details:l+" "+n+" uses ResponsiveLayout.",context:{id:n}})}})}};function l(e,t,a){var r=e.getTitle();var i=e.getToolbar();if(r&&i){var s=e.getId();a.addIssue({severity:o.Medium,details:t+" "+s+" has Title and Toolbar assigned.",context:{id:s}})}}var m={id:"formTitleAndToolbar",audiences:[r.Application],categories:[a.Functionality],enabled:true,minversion:"1.48",title:"Form: Title and Toolbar at same time",description:"A Form or FormContainer can only have a Title or a Toolbar assigned, not both",resolution:"Use either Title or a Toolbar",resolutionurls:[{text:"API Reference: Form",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.Form.html"},{text:"API Reference: SimpleForm",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.SimpleForm.html"},{text:"API Reference: FormContainer",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.FormContainer.html"}],check:function(e,t,a){a.getElementsByClassName("sap.ui.layout.form.Form").forEach(function(t){var a=t.getParent();if(i(a)){return}l(t,"Form",e)});a.getElementsByClassName("sap.ui.layout.form.FormContainer").forEach(function(t){l(t,"FormContainer",e)});a.getElementsByClassName("sap.ui.layout.form.SimpleForm").forEach(function(t){l(t,"SimpleForm",e)})}};var u={id:"formTitleOrAriaLabel",audiences:[r.Application],categories:[a.Accessibility],enabled:true,minversion:"1.48",title:"Form: Container must have a Title",description:"A FormContainer must have some Title information."+"\n This can be a Title on the FormContainer or some Title assigned via AriaLabelledBy."+"\n If no Title is assigned to the FormContainer there must be at least a Title set"+" on the Form or assigned via AriaLabelledBy on the Form.",resolution:"Set a Title on Form or FormContainer or assign it via AriaLabelledBy",resolutionurls:[{text:"API Reference: Form",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.Form.html"},{text:"API Reference: SimpleForm",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.SimpleForm.html"},{text:"API Reference: FormContainer",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.FormContainer.html"}],check:function(e,t,a){a.getElementsByClassName("sap.ui.layout.form.FormContainer").forEach(function(t){var a=t.getParent();if(!a){return}var r=a.getParent();var n;var l="Form";if(i(r)){n=r.getId();l="SimpleForm"}else if(s(r)){return}else{n=a.getId()}if(!t.getTitle()&&t.getAriaLabelledBy().length==0&&!a.getTitle()&&a.getAriaLabelledBy().length==0){e.addIssue({severity:o.High,details:"In "+l+" "+n+", FormContainer"+t.getId()+" has no Title assigned.",context:{id:t.getId()}})}})}};function d(e,t,a){var r=e.getId();if(!e.isA("sap.ui.core.IFormContent")){a.addIssue({severity:o.High,details:e.getMetadata().getName()+" "+r+" is not allowed as "+t+" content.",context:{id:r}})}}var p={id:"formAllowedContent",audiences:[r.Application],categories:[a.Usability],enabled:true,minversion:"1.48",title:"Form: Content not allowed",description:"It is not allowed to use any layout as content of a Form or nest Forms"+" This leads to issues with screen reader support, keyboard support and field alignment."+"\nIt is also not supported to use other unsupported controls as content of the Form"+" as it is not sure this controls will meet the alingment and intartaction requirements of the Form.",resolution:"Use only labels and controls implementing interface sap.ui.core.IFormContent as content of a Form",resolutionurls:[{text:"API Reference: Form",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.Form.html"},{text:"API Reference: SimpleForm",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.SimpleForm.html"},{text:"API Reference: FormElement",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.FormElement.html"},{text:"API Reference: IFormContent",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.core.IFormContent.html"}],check:function(e,t,a){a.getElementsByClassName("sap.ui.layout.form.Form").forEach(function(t){var a=t.getParent();if(i(a)||s(a)){return}else{var o=t.getFormContainers();for(var r=0;r<o.length;r++){var n=o[r];var l=n.getFormElements();for(var m=0;m<l.length;m++){var u=l[m];var p=u.getFields();for(var f=0;f<p.length;f++){var c=p[f];d(c,"Form",e)}}}}});a.getElementsByClassName("sap.ui.layout.form.SimpleForm").forEach(function(t){var a=t.getContent();for(var o=0;o<a.length;o++){var r=a[o];if(!r.isA(["sap.ui.core.Title","sap.ui.core.Toolbar","sap.ui.core.Label"])){d(r,"SimpleForm",e)}}});a.getElementsByClassName("sap.ui.comp.smartform.SmartForm").forEach(function(t){var a=t.getGroups();for(var o=0;o<a.length;o++){var r=a[o];var i=r.getGroupElements();for(var s=0;s<i.length;s++){var n=i[s];var l=n.getElements();for(var m=0;m<l.length;m++){var u=l[m];d(u,"SmartForm",e)}}}})}};function f(e,t,a){var r=e.getToolbar();if(r){var i=e.getId();var s=e.getAriaLabelledBy();var n;if(r.getContent){n=r.getContent()}else if(r.getItems){n=r.getItems()}for(var l=0;l<n.length;l++){var m=n[l];if(m.isA(["sap.ui.core.Title","sap.m.Title"])){var u=false;for(var d=0;d<s.length;d++){var p=s[d];if(m.getId()==p){u=true;break}}if(!u){a.addIssue({severity:o.Medium,details:"in"+t+" "+i+" AriaLabelledBy for Title in Toolbar is missing.",context:{id:i}})}}}}}var c={id:"formTitleInToolbarAria",audiences:[r.Application],categories:[a.Accessibility],enabled:true,minversion:"1.48",title:"Form: Title in Toolbar needs to be set to AriaLabelledBy",description:"If a Toolbar is used in a Form or FormContainer and the Toolbar has a Title inside"+" it must be set to AriaLabelledBy to enable screen reader support",resolution:"Set the Title used inside the Toolbar to AriaLabelledBy of the Form or FormContainer.",resolutionurls:[{text:"API Reference: Form",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.Form.html"},{text:"API Reference: SimpleForm",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.SimpleForm.html"},{text:"API Reference: FormContainer",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.FormContainer.html"}],check:function(e,t,a){a.getElementsByClassName("sap.ui.layout.form.Form").forEach(function(t){var a=t.getParent();if(i(a)){return}f(t,"Form",e)});a.getElementsByClassName("sap.ui.layout.form.FormContainer").forEach(function(t){var a=t.getParent().getParent();if(i(a)){return}f(t,"FormContainer",e)});a.getElementsByClassName("sap.ui.layout.form.SimpleForm").forEach(function(t){f(t,"SimpleForm",e)})}};var h={id:"formPropertiesOfOtherLayout",audiences:[r.Application],categories:[a.Consistency],enabled:true,minversion:"1.48",title:"SimpleForm: Properties not valid for layout",description:"Some properties of SimpleForm are only valid for a special layout."+" If they are used with a different layout they have no effect.",resolution:"Use only properties that are valid for the layout used",resolutionurls:[{text:"API Reference: SimpleForm",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.SimpleForm.html"}],check:function(e,t,a){a.getElementsByClassName("sap.ui.layout.form.SimpleForm").forEach(function(t){var a=t.getId();var r=t.getLayout();var i=[];var s=function(e){if(!t.isPropertyInitial(e)){i.push(e)}};if(r!=sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout&&r!=sap.ui.layout.form.SimpleFormLayout.ColumnLayout){s("labelSpanL");s("emptySpanL");s("columnsXL");s("columnsL");s("columnsM")}if(r!=sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout){s("labelSpanXL");s("labelSpanM");s("labelSpanS");s("adjustLabelSpan");s("emptySpanXL");s("emptySpanM");s("emptySpanS");s("singleContainerFullSize");s("breakpointXL");s("breakpointL");s("breakpointM")}if(r!=sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout){s("minWidth");s("labelMinWidth")}if(r==sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout){s("maxContainerCols")}for(var n=0;n<i.length;n++){e.addIssue({severity:o.Low,details:"SimpleForm "+a+" with Layout "+r+" doesn't support use of property "+i[n]+".",context:{id:a}})}})}};var y={id:"formEditableContent",audiences:[r.Application],categories:[a.Usability],enabled:true,minversion:"1.48",title:"Form: Editable content must match editable property",description:"The editable property of the Form is used to align the Labels and add screen reader information. If editable controls are used in Form, the property must be set, otherwise it should not be set.",resolution:"Set the editable property according to the content of the Form.",resolutionurls:[{text:"API Reference: Form",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.Form.html"},{text:"API Reference: SimpleForm",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.SimpleForm.html"},{text:"API Reference: FormElement",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.FormElement.html"}],check:function(e,t,a){a.getElementsByClassName("sap.ui.layout.form.Form").forEach(function(t){var a=t.getEditable();var r=t.getParent();var n=r?r.getMetadata():undefined;var l;var m="Form";if(i(r)){l=r.getId();m="SimpleForm"}else if(s(r)){return}else{l=t.getId()}var u=false;var d=false;var p=t.getFormContainers();for(var f=0;f<p.length;f++){var c=p[f];var h=c.getFormElements();for(var y=0;y<h.length;y++){var g=h[y];var v=g.getFields();for(var F=0;F<v.length;F++){var b=v[F];n=b.getMetadata();if(a){if(b.isA("sap.ui.core.Icon")||n.hasProperty("displayOnly")&&b.getDisplayOnly()){u=true;break}}if(b.isA("sap.m.InputBase")||b.isA("sap.m.Select")||b.isA("sap.m.CheckBox")||b.isA("sap.m.RadioButton")||b.isA("sap.m.RadioButtonGroup")||b.isA("sap.m.Button")&&g.getLabel()||b.isA("sap.m.Slider")||n.hasProperty("displayOnly")&&!b.getDisplayOnly()){d=true;if(!a){u=true;break}}}if(u){break}}if(!u&&a&&!d){u=true}}if(u){if(a){e.addIssue({severity:o.High,details:m+" "+l+" is set to editable but has only non-editable content.",context:{id:l}})}else{e.addIssue({severity:o.High,details:m+" "+l+" is set to non-editable but has editable content.",context:{id:l}})}}})}};function g(e,t,a,r,i,s){var n=r.getMetadata().getName();var l=i.getMetadata().getName();var m=e.getMetadata().getName();var u=e.getId();var d=false;var p=false;switch(n){case"sap.ui.layout.form.ResponsiveGridLayout":if(l!="sap.ui.layout.GridData"){d=true}else if(m=="sap.ui.layout.form.FormElement"){p=true}break;case"sap.ui.layout.form.ResponsiveLayout":if(l!="sap.ui.layout.ResponsiveFlowLayoutData"){d=true}break;case"sap.ui.layout.form.GridLayout":if(l!="sap.ui.layout.form.GridElementData"){if(!(m=="sap.ui.layout.form.FormContainer"&&l=="sap.ui.layout.form.GridContainerData")){d=true}}else if(m=="sap.ui.layout.form.FormElement"){p=true}break;case"sap.ui.layout.form.ColumnLayout":if(l!="sap.ui.layout.form.ColumnElementData"){if(!(m=="sap.ui.layout.form.FormContainer"&&l=="sap.ui.layout.form.ColumnContainerData")){d=true}}else if(m=="sap.ui.layout.form.FormElement"||m=="sap.ui.layout.form.FormContainer"){p=true}break;default:break}if(d){s.addIssue({severity:o.Low,details:t+" "+a+" uses "+n+", therefore "+l+" is not supported on "+m+" "+u+".",context:{id:u}})}if(p){s.addIssue({severity:o.Low,details:t+" "+a+" uses "+n+", but "+l+" is not supported on "+m+" "+u+".",context:{id:u}})}}function v(e,t,a,o,r){var i=e.getLayoutData();if(i){if(i.isA("sap.ui.core.VariantLayoutData")){var s=i.getMultipleLayoutData();for(var n=0;n<s.length;n++){i=s[n];g(e,t,a,o,i,r)}}else{g(e,t,a,o,i,r)}}}var F={id:"formWrongLayoutData",audiences:[r.Application],categories:[a.Consistency],enabled:true,minversion:"1.48",title:"Form: LayoutData assigned to Form content not valid for layout",description:"Layout data on Form content can be used to influence the appearance of Form. Depending on the layout used, different LayoutData can be used.",resolution:"Use only valid LayoutData that are suitable for the layout used",resolutionurls:[{text:"API Reference: ResponsiveGridLayout",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.ResponsiveGridLayout.html"},{text:"API Reference: ResponsiveLayout",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.ResponsiveLayout.html"}],check:function(e,t,a){a.getElementsByClassName("sap.ui.layout.form.Form").forEach(function(t){var a=t.getLayout();var o=t.getParent();var r;var n="Form";if(i(o)){r=o.getId();n="SimpleForm"}else if(s(o)){r=o.getId();n="SmartForm"}else{r=t.getId()}var l=t.getFormContainers();for(var m=0;m<l.length;m++){var u=l[m];var d=u.getFormElements();v(u,n,r,a,e);for(var p=0;p<d.length;p++){var f=d[p];var c=f.getFields();v(f,n,r,a,e);for(var h=0;h<c.length;h++){var y=c[h];v(y,n,r,a,e)}}}})}};var b={id:"formMissingLabel",audiences:[r.Application],categories:[a.Accessibility],enabled:true,minversion:"1.48",title:"Form: Label for Form content missing",description:"For accessibility reasons, each field must have a label."+" \n If Label is assigned to FormElement, it will be automatically assigned to the corresponding fields."+" \n But if no Label is assigned to FormElement, the application must use the ariaLabelledBy property of the field to assign a label.",resolution:"Assign a label to the field",resolutionurls:[{text:"API Reference: Form",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.Form.html"},{text:"API Reference: SimpleForm",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.SimpleForm.html"},{text:"API Reference: FormElement",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.FormElement.html"}],check:function(e,t,a){a.getElementsByClassName("sap.ui.layout.form.Form").forEach(function(t){var a=t.getParent();var r=a?a.getMetadata():undefined;var n;var l="Form";if(i(a)){n=a.getId();l="SimpleForm"}else if(s(a)){return}else{n=t.getId()}var m=t.getFormContainers();for(var u=0;u<m.length;u++){var d=m[u];if(d.getVisible()&&d.getExpanded()){var p=d.getFormElements();for(var f=0;f<p.length;f++){var c=p[f];var h=c.getLabel();if(!h&&c.getVisible()){var y=c.getFields();for(var g=0;g<y.length;g++){var v=y[g];var F=v.getId();r=v.getMetadata();if(r.getAssociation("ariaLabelledBy")&&(!v.getAriaLabelledBy()||v.getAriaLabelledBy().length==0)&&!v.isA("sap.m.Button")&&!(v.isA("sap.m.CheckBox")&&v.getText())&&!(v.isA("sap.m.RadioButton")&&v.getText())){e.addIssue({severity:o.High,details:"In "+l+" "+n+", no label has been assigned to field "+r.getName()+" "+F+".",context:{id:F}})}}}}}}})}};var I={id:"formLabelAsField",audiences:[r.Application],categories:[a.Usability],enabled:true,minversion:"1.48",title:"Form: Label is used as field",description:"FormElements can have Labels and Fields."+" \n Depending on the layout used and device and screen sizes, the way labels and fields are shown might differ."+" \n If labels are used as fields, this will lead to misaligned fields and labels in the Form and might have an effect on the screen reader support.",resolution:"Use Labels only in the Label aggregation",resolutionurls:[{text:"API Reference: Form",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.Form.html"},{text:"API Reference: FormElement",href:"https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.layout.form.FormElement.html"}],check:function(e,t,a){a.getElementsByClassName("sap.ui.layout.form.Form").forEach(function(t){var a=t.getParent();var r=a?a.getMetadata():undefined;var n;var l="Form";if(i(a)){return}else if(s(a)){n=a.getId();l="SmartForm"}else{n=t.getId()}var m=t.getFormContainers();for(var u=0;u<m.length;u++){var d=m[u];var p=d.getFormElements();for(var f=0;f<p.length;f++){var c=p[f];var h=c.getFields();for(var y=0;y<h.length;y++){var g=h[y];var v=g.getId();r=g.getMetadata();if(r.isInstanceOf("sap.ui.core.Label")){e.addIssue({severity:o.High,details:l+" "+n+": "+r.getName()+" "+v+" is used as field.",context:{id:v}})}}}}})}};return[n,m,u,p,c,h,y,F,b,I]},true);