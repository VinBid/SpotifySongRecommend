const fetch = require('node-fetch');


const APIControl = (function () {
    const clientId = 'YOUR_CLIENT_ID';
    const clientSecret = 'YOUR_CLIENT_SECRET';
    const redirectUri = 'http://localhost:3000';

    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        const data = await result.json();
        return data.access_token

    }

    const _getGenres = async (token) => {
        const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json()
        return data.categories.items;
    }

    const _getRecommendationsByGenre = async (token, genreId) => {
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=10`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        return data.playlists.items[0].tracks.items;
    }
    return {
        getGenres: async () => {
            const token = await _getToken();
            const genres = await _getGenres(token);
            return genres;
        },
        getRecommendedSongs: async (genreId) => {
            const token = await _getToken();
            const songs = await _getRecommendationsByGenre(token, genreId);
            return songs;
        }
    };
})();