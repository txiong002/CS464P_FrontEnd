import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';
const { searchForCharacters } = require('./Api');

const Search = () => {
    const [searchCharacter, setSearchCharacter] = useState([]);
    const [inputCharacter, setInputCharacter] = useState('');
    const [error, setError] = useState(null);

    const handleInput = (event) => {
        setInputCharacter(event.target.value);
    };

    const findCharacter = async () => {
        try {
            const data = await searchForCharacters(inputCharacter);
            setSearchCharacter(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching data');
            setError(error.message);
            setSearchCharacter([]);
        }
    };

    return (
        <body>
            <div className='col-sm-6 mt-4'>
                <InputGroup>
                    <Input
                        placeholder='Enter characters first name'
                        value={inputCharacter}
                        onChange={handleInput}
                    />
                    <Button color='primary' onClick={findCharacter}>
                        Search
                    </Button>
                </InputGroup>
            </div>
            <div
                className={`container ${
                    searchCharacter.length > 0
                        ? 'border border-black border-3 w-25'
                        : ''
                } mt-4 rounded-4`}
            >
                {error && (
                    <div className='text-danger fs-3 fw-bold'>{error}</div>
                )}

                <div className='mt-4 px-4'>
                    {searchCharacter.map((character) => (
                        <div className='mx-2 my-2 px-2 py-2' key={character.id}>
                            <img
                                className='mx-auto image-fluid'
                                src={character.imageUrl}
                                alt={character.fullName}
                                key={`img-${character.id}`}
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                            <div
                                className='text-center fs-5 fw-semiboldi text-white'
                                key={`text-${character.id}`}
                            >
                                {character.fullName}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </body>
    );
};

export default Search;
