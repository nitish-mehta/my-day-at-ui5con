sap.ui.define(['sap/ui/core/mvc/Controller'], function(Controller) {
	'use strict';

	return Controller.extend('ui5con.experienceapp.controller.App', {
		onInit: function() {
			console.log('Hello UI5con Bangalore 2018');
			var oViewModel = new sap.ui.model.json.JSONModel({
				images: [
					{
						src:
							'https://github.com/nitish-mehta/my-day-at-ui5con/blob/master/docs/img/pic1.JPG?raw=true',
						description: 'UI5Con'
					},
					{
						src:
							'https://github.com/nitish-mehta/my-day-at-ui5con/blob/master/docs/img/pic2.JPG?raw=true',
						description: 'UI5Con'
					},
					{
						src:
							'https://github.com/nitish-mehta/my-day-at-ui5con/blob/master/docs/img/pic3.JPG?raw=true',
						description: 'UI5Con'
					},
					{
						src:
							'https://github.com/nitish-mehta/my-day-at-ui5con/blob/master/docs/img/pic1.JPG?raw=true',
						description: 'UI5Con'
					},
					{
						src:
							'https://github.com/nitish-mehta/my-day-at-ui5con/blob/master/docs/img/pic2.JPG?raw=true',
						description: 'UI5Con'
					},
					{
						src:
							'https://github.com/nitish-mehta/my-day-at-ui5con/blob/master/docs/img/pic3.JPG?raw=true',
						description: 'UI5Con'
					},
					{
						src:
							'https://github.com/nitish-mehta/my-day-at-ui5con/blob/master/docs/img/pic1.JPG?raw=true',
						description: 'UI5Con'
					},
					{
						src:
							'https://github.com/nitish-mehta/my-day-at-ui5con/blob/master/docs/img/pic2.JPG?raw=true',
						description: 'UI5Con'
					},
					{
						src:
							'https://github.com/nitish-mehta/my-day-at-ui5con/blob/master/docs/img/pic3.JPG?raw=true',
						description: 'UI5Con'
					}
				]
			});
			this.getView().setModel(oViewModel, 'viewModel');
		}
	});
});
