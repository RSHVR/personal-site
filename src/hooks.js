/** @type {import('@sveltejs/kit').Reroute} */
export function reroute({ url }) {
	// Rewrite ruh.* subdomain requests to /ruh path
	if (url.hostname.startsWith('ruh.')) {
		const path = url.pathname === '/' ? '' : url.pathname;
		return '/ruh' + path;
	}
}
