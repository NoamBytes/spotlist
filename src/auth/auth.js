/**
 * @module spotlist/src/auth
 */
const auth = {
	/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
	getHashParams: () => {
			let hashParams = {};
			let e, r = /([^&;=]+)=?([^&;]*)/g,
					q = window.location.hash.substring(1);
			while ( e = r.exec(q)) {
					hashParams[e[1]] = decodeURIComponent(e[2]);
			}
			return hashParams;
	},
	/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
	generateRandomString: (length) => {
		let text = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	},

	authorize: () => {
		const client_id = process.env.REACT_APP_CLIENT_ID; // Your client id
    const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
		const stateKey = 'spotify_auth_state';
		
		const state = auth.generateRandomString(16);

		localStorage.setItem(stateKey, state);
		const scope = 'user-read-private user-read-email playlist-modify-public';

		let url = 'https://accounts.spotify.com/authorize';
		url += '?response_type=token';
		url += '&client_id=' + encodeURIComponent(client_id);
		url += '&scope=' + encodeURIComponent(scope);
		url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
		url += '&state=' + encodeURIComponent(state);

		window.location = url;

	}
}

export default auth;