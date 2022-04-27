import axios from "axios";

const API_DOMAIN = 'http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/champion.json';
const API_DOMAIN_PICTURE = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/`;

export async function fetchData() {
    const response = await axios.get(API_DOMAIN);
    return response.data;
}

export function fetchPicture(championName: string, pictureNum: number) {
    const response = axios.get(`${API_DOMAIN_PICTURE}${championName}_${pictureNum}.jpg`);
    return response;
}

