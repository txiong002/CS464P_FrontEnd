import { fetchData } from './Api.js';

async function searchForCharacters(input) {
    try {
        const results = await fetchData();
        if (!results || results.length === 0) {
            throw new Error('No data found');
        }
        const findCharacter = results.filter((character) => {
            return character.firstName.toLowerCase() === input.toLowerCase();
        });
        if (findCharacter.length === 0) {
            return [];
        }
        return findCharacter;
    } catch (error) {
        console.error('Error finding character');
        throw error;
    }
}

export { searchForCharacters };
