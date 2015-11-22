// index.ts
import {FrameworkConfiguration} from 'aurelia-framework';
//
export function configure(fc:FrameworkConfiguration) {
	fc.globalResources(['./nav-bar', './connect-bar','./sheader-bar'
	/*
	 './person-bar',
			'./work-bar', './pagination-bar', './avatar-bar',
			'./command-bar', './elements-bar', './siglename-bar',
			'./interval-bar','./depart-bar','./depannee-bar',
			'./depunite-bar','./import-bar'
			*/
			]);
}
