// index.ts
import {FrameworkConfiguration} from 'aurelia-framework';
//
export function configure(fc:FrameworkConfiguration) {
	fc.globalResources(['./nav-bar', './connect-bar','./sheader-bar','./pagination-bar','./elements-bar',
	'./avatar-bar','./command-bar', './siglename-bar'
	/*
	 './person-bar',
			'./work-bar', 
			'./interval-bar','./depart-bar','./depannee-bar',
			'./depunite-bar','./import-bar'
			*/
			]);
}
