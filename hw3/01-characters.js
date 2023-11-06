// url for the Thrones API
const getApi = 'https://thronesapi.com/api/v2/Characters';

/**
 * Asynchronous function to fetch data from a specified URL
 * @param {string} url - The URL from which to fetch data.
 * @returns {Promise} - A promise that resolves with the fetched JSON data, or rejects with an error
 */
const fetchData = async (url) => {
    let getCharacters = new Promise((resolve, reject) => {
        fetch(url)
            // Parse the response as JSON
            .then((response) => response.json())
            // Resolve the promise with the JSON data
            .then((data) => {
                resolve(data);
            })
            .catch((err) => reject(err));
    });
    // Wait for the promise to resolve and store the result in the 'data' variable, then returns the data from the function
    // or returns an error if the promise is rejected
    try {
        let data = await getCharacters;
        return data;
    } catch (err) {
        console.log(err);
    }
};

// Display characters from API
async function displayCharacter() {
    try {
        const characterData = await fetchData(getApi);

        const characterDetails = document.getElementById('character');
        const characterContainer = document.createElement('div');
        characterContainer.classList.add(
            'row',
            'mb-4',
            'mt-4',
            'character-container',
        );

        characterData.forEach((character) => {
            // create div for each character
            const characterCard = document.createElement('div');
            characterCard.classList.add(
                'col-md-3',
                'col-6',
                'mb-5',
                'character-card',
            );

            const characterImage = document.createElement('img');
            characterImage.src = character.imageUrl;
            characterImage.alt = `Picture of ${character.fullName}`;
            characterImage.classList.add('img-fluid', 'character-image');
            characterCard.appendChild(characterImage);

            const characterName = document.createElement('p');
            characterName.id = 'character-name';
            const characterTitle = document.createElement('p');
            characterTitle.id = 'character-title';
            const name = character.fullName;
            const title = character.title;
            characterName.innerText = `${name}`;
            characterTitle.innerText = `${title}`;
            characterDetails.appendChild(characterContainer);
            characterContainer.appendChild(characterCard);
            characterCard.appendChild(characterName);
            characterCard.appendChild(characterTitle);
        });
    } catch (error) {
        console.error('Error displaying character data: ', error);
    }
}

displayCharacter();
