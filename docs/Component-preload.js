sap.ui.require.preload({
	"ui5con/experienceapp/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent"],function(e){"use strict";return e.extend("ui5con.experienceapp.Component",{metadata:{manifest:"json"}})});
},
	"ui5con/experienceapp/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("ui5con.experienceapp.controller.App",{onInit:function(){console.log("Hello UI5con Bangalore 2018")}})});
},
	"ui5con/experienceapp/i18n/i18n.properties":'TITLE= UI5con Bangalore\r\n',
	"ui5con/experienceapp/i18n/i18n_de.properties":'TITLE= UI5con Bangalore\r\n',
	"ui5con/experienceapp/i18n/i18n_en.properties":'TITLE= UI5con Bangalore\r\n',
	"ui5con/experienceapp/manifest.json":'{"sap.app":{"id":"ui5con.experienceapp","type":"application"},"sap.ui5":{"dependencies":{"libs":{"sap.ui.core":{},"sap.m":{}}},"rootView":{"viewName":"ui5con.experienceapp.view.App","type":"XML","async":true,"id":"app"},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ui5con.experienceapp.i18n.i18n"}}},"resources":{"css":[{"uri":"css/styles.css"}]}}}',
	"ui5con/experienceapp/view/App.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" controllerName="ui5con.experienceapp.controller.App" displayBlock="true"><Shell><App><Page title="{i18n>TITLE}" backgroundDesign="Solid"><content></content></Page></App></Shell></mvc:View>\r\n'
});
