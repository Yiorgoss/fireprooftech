
/* eslint-disable */
/** 
* This file contains language specific message functions for tree-shaking. 
* 
*! WARNING: Only import messages from this file if you want to manually
*! optimize your bundle. Else, import from the `messages.js` file. 
* 
* Your bundler will (in the future) automatically replace the index function 
* with a language specific message function in the build step. 
*/


/**
 * 
 * @returns {string}
 */
export const hello_world = () => {
	return `Hello World`
}


/**
 * @param {{ name: NonNullable<unknown> }} params
 * @returns {string}
 */
export const greeting = (params) => {
	return `Hello ${params.name}`
}