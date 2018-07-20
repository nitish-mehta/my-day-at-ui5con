sap.ui.require.preload({
	'ui5con/experienceapp/Component.js': function() {
		sap.ui.define(['sap/ui/core/UIComponent'], function(e) {
			'use strict';
			return e.extend('ui5con.experienceapp.Component', { metadata: { manifest: 'json' } });
		});
	},
	'ui5con/experienceapp/controller/App.controller.js': function() {
		sap.ui.define(['sap/ui/core/mvc/Controller'], function(o) {
			'use strict';
			return o.extend('ui5con.experienceapp.controller.App', {
				onInit: function() {
					console.log('Hello UI5con Bangalore 2018');
					var o = new sap.ui.model.json.JSONModel({
						images: [
							{
								src: 'https://www.w3schools.com/howto/img_nature_wide.jpg',
								description: 'Nature'
							},
							{
								src: 'https://www.w3schools.com/howto/img_snow_wide.jpg',
								description: 'Snow'
							},
							{
								src: 'https://www.w3schools.com/howto/img_mountains_wide.jpg',
								description: 'Mountains'
							},
							{
								src: 'https://www.w3schools.com/howto/img_lights_wide.jpg',
								description: 'Lights'
							},
							{
								src: 'https://www.w3schools.com/howto/img_mountains_wide.jpg',
								description: 'Mountains'
							},
							{
								src: 'https://www.w3schools.com/howto/img_lights_wide.jpg',
								description: 'Lights'
							},
							{
								src: 'https://www.w3schools.com/howto/img_mountains_wide.jpg',
								description: 'Mountains'
							},
							{
								src: 'https://www.w3schools.com/howto/img_lights_wide.jpg',
								description: 'Lights'
							}
						]
					});
					this.getView().setModel(o, 'viewModel');
				}
			});
		});
	},
	'ui5con/experienceapp/i18n/i18n.properties': 'TITLE= UI5con Bangalore\r\n',
	'ui5con/experienceapp/i18n/i18n_de.properties': 'TITLE= UI5con Bangalore\r\n',
	'ui5con/experienceapp/i18n/i18n_en.properties': 'TITLE= UI5con Bangalore\r\n',
	'ui5con/experienceapp/manifest.json':
		'{"sap.app":{"id":"ui5con.experienceapp","type":"application"},"sap.ui5":{"dependencies":{"libs":{"sap.ui.core":{},"sap.m":{},"ui5lab.wl.space":{},"ui5lab.lightbox":{}}},"rootView":{"viewName":"ui5con.experienceapp.view.App","type":"XML","async":true,"id":"app"},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ui5con.experienceapp.i18n.i18n"}}},"resources":{"css":[{"uri":"css/styles.css"}]}}}',
	'ui5con/experienceapp/view/App.view.xml':
		'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" controllerName="ui5con.experienceapp.controller.App" displayBlock="true"\r\n\txmlns:html="http://www.w3.org/1999/xhtml" xmlns:space="ui5lab.wl.space" xmlns:lightbox="ui5lab.lightbox"><Shell><App><Page title="{i18n>TITLE}" backgroundDesign="Solid"><content><IconTabBar\r\n\t\t\t\t\t\tclass="sapUiResponsiveContentPadding"><items><IconTabFilter\r\n\t\t\t\t\t\t\t\ticon="sap-icon://picture"><lightbox:LightBox images="{viewModel>/images}" width="100%" height="200px"></lightbox:LightBox></IconTabFilter><IconTabFilter\r\n\t\t\t\t\t\t\t\ticon="sap-icon://jam"><html:iframe allowfullscreen="" id="wallsio-iframe" src="https://walls.io/k62ey?nobackground=1&amp;show_header=0" style="border:0;height:800px;width:100%"></html:iframe></IconTabFilter></items></IconTabBar></content></Page></App></Shell></mvc:View>\r\n'
});
