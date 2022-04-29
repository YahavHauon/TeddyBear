import axios from "axios";

const API_DOMAIN = 'http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/champion.json';

export async function fetchData() {
    const response = await axios.get(API_DOMAIN);
    return response.data;
}


