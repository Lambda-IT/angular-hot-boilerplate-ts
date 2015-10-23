/// <reference path="../typings/tsd.d.ts" />

import 'angular';
//import * as angular from 'angular';
// import { $ } from 'jquery';


//var angular = require('angular');

// console.log(angular.module);

var app = angular.module('app', []);
export default app;

var singleValue = Rx.Observable.return<string>("Hello");
console.log(singleValue);

declare module paper {
	export class Path {
        strokeColor: string;
        moveTo: (destination: Point) => void;
        lineTo: (destination: Point) => void;
    }
	export class Point {
        constructor(x: number, y: number);
        x: number;
        y: number;
        add: (something: number[]) => Point;
    }
};
console.log(paper.Path);

$(document).ready(function () {
	
	console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
	console.log(_.isArray([])); // just to test if the loadsh is available without require
	console.log('My app is live!');
});