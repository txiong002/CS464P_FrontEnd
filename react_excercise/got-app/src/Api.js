import axios from 'axios';

const url = 'https://thronesapi.com/api/v2/Characters';

async function fetchData() {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API');
        throw error;
    }
}

export { fetchData };
