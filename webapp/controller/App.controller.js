sap.ui.define(['sap/ui/core/mvc/Controller'], function(Controller) {
	'use strict';

	return Controller.extend('ui5con.experienceapp.controller.App', {
		onInit: function() {
			console.log('Hello UI5con Bangalore 2018');
			var oViewModel = new sap.ui.model.json.JSONModel({
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
			this.getView().setModel(oViewModel, 'viewModel');
		}
	});
});
