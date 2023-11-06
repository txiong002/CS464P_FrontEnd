import { fetchData } from './Api.js';

async function searchForCharacters(input) {
    try {
        const results = await fetchData();
        const findCharacter = results.filter((character) => {
            return character.lastName
                .toLowerCase()
                .includes(input.toLowerCase());
        });
        return findCharacter;
    } catch (error) {
        console.error('Error finding character');
        throw error;
    }
}

export default searchForCharacters;
