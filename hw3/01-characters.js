// url for the Thrones API
const getApi = 'https://thronesapi.com/api/v2/Characters';

/**
 * Asynchronous function to fetch data from a specified URL
 * @param {string} url - The URL from which to fetch data.
 * @returns {Promise} - A promise that resolves with the fetched JSON data, or rejects with an error
 */
const fetchData = async (url) => {
    let promise = new Promise((resolve, reject) => {
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
        let data = await promise;
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
        const characterRow = document.createElement('div');
        characterRow.classList.add('row', 'mb-4', 'mt-4', 'character-row');

        characterData.forEach((character) => {
            // create div for each character
            const characterImgCol = document.createElement('div');
            characterImgCol.classList.add(
                'col-md-3',
                'col-6',
                'mb-5',
                'character-col',
            );

            const characterImage = document.createElement('img');
            characterImage.src = character.imageUrl;
            characterImage.alt = 'Character Image';
            characterImage.classList.add('img-fluid', 'character-image');
            characterImgCol.appendChild(characterImage);

            const characterName = document.createElement('p');
            characterName.id = 'character-name';
            const characterTitle = document.createElement('p');
            characterTitle.id = 'character-title';
            const name = character.fullName;
            const title = character.title;
            characterName.innerText = `${name}`;
            characterTitle.innerText = `${title}`;
            characterDetails.appendChild(characterRow);
            characterRow.appendChild(characterImgCol);
            characterImgCol.appendChild(characterName);
            characterImgCol.appendChild(characterTitle);
        });
    } catch (error) {
        console.error('Error displaying character data: ', error);
    }
}

displayCharacter();
