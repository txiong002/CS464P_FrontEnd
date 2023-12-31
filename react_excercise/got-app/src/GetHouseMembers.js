import { fetchData } from './Api.js';
import levenshteinDistance from './LevenshteinDistance';

async function getHouseMembers() {
    try {
        const characters = await fetchData();
        const houseMembers = {};

        // Count characters in each house
        characters.forEach((character) => {
            const houseName = character.family;
            let nameOfHouse;
            const threshold = 2; // Limit on how many letters could be misspelled, when comparing family names
            let isSimilar = false;

            // If no family name, place in Unknown family
            if (houseName === '') {
                nameOfHouse = 'Unknown';
            } else {
                // this RegExp is used to remove "House" from family names, we just want the Family name itself for comparison
                nameOfHouse = houseName.replace(/\bHouse\b/gi, '').trim();
            }

            // Loops through houseMembers object
            for (const existingHouseName in houseMembers) {
                // Compares spelling of name and returns a value, lower values = similar and/or same
                const distance = levenshteinDistance(
                    existingHouseName,
                    nameOfHouse,
                );
                // If value is less than threshold, add count to the existing family name in the object
                if (distance <= threshold) {
                    houseMembers[existingHouseName] += 1;
                    isSimilar = true;
                    break;
                }
            }
            // If family is not the same or similar, add new family name to the object
            if (!isSimilar) {
                houseMembers[nameOfHouse] = 1;
            }
        });
        return houseMembers;
    } catch (error) {
        console.error('Unable to fetch data', error);
    }
}

export { getHouseMembers };
