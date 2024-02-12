export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","fonts/PathwayGothicOne-Regular.ttf","fonts/PlayfairDisplay-VariableFont_wght.ttf","icons/checkmark.svg","icons/clock.svg","icons/leaves.svg","logos/fpt_logo.svg","logos/fpt_logo_white.svg"]),
	mimeTypes: {".png":"image/png",".ttf":"font/ttf",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.0m0LLjgc.js","app":"_app/immutable/entry/app._WMkU_qD.js","imports":["_app/immutable/entry/start.0m0LLjgc.js","_app/immutable/chunks/entry.dQIjsFIH.js","_app/immutable/chunks/scheduler.O8Z1_OU1.js","_app/immutable/chunks/index.26f1n_mo.js","_app/immutable/entry/app._WMkU_qD.js","_app/immutable/chunks/runtime.eG2Eolhk.js","_app/immutable/chunks/scheduler.O8Z1_OU1.js","_app/immutable/chunks/index.qgbfvAJH.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":true},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js'))
		],
		routes: [
			{
				id: "/[[lang=lang]]/about-us",
				pattern: /^(?:\/([^/]+))?\/about-us\/?$/,
				params: [{"name":"lang","matcher":"lang","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/[[lang=lang]]/contact-us",
				pattern: /^(?:\/([^/]+))?\/contact-us\/?$/,
				params: [{"name":"lang","matcher":"lang","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/[[lang=lang]]",
				pattern: /^(?:\/([^/]+))?\/?$/,
				params: [{"name":"lang","matcher":"lang","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			const { match: lang } = await import ('../output/server/entries/matchers/lang.js')
			return { lang };
		},
		server_assets: {}
	}
}
})();
