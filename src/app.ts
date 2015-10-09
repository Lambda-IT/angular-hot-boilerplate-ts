/// <reference path="../typings/tsd.d.ts" />

import * as angular from 'angular';

angular.module('app', []);

$(document).ready(function () {
	
	console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
	console.log(_.isArray([])); // just to test if the loadsh is available without require
	console.log('My app is live!');
});