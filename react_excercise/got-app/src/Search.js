import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';
const { searchForCharacters } = require('./SearchCharacters');

const Search = () => {
    const [searchCharacter, setSearchCharacter] = useState([]);
    const [inputCharacter, setInputCharacter] = useState('');
    const [error, setError] = useState(null);

    const handleInput = (event) => {
        setError(null);
        setInputCharacter(event.target.value);
    };

    const findCharacter = async (event) => {
        event.preventDefault();
        try {
            const data = await searchForCharacters(inputCharacter);
            if (data.length === 0 || data.length === null) {
                console.error('No characters found');
                setError('No characters found');
                setSearchCharacter([]);
                setInputCharacter('');
            } else {
                setSearchCharacter(data);
                setError(null);
                setInputCharacter('');
            }
        } catch (error) {
            console.error('Error fetching data');
            setError(error.message);
            setSearchCharacter([]);
        }
    };

    return (
        <div>
            <h1>Search for you favorite GOT character</h1>
            <form onSubmit={findCharacter}>
                <div className='col-sm-6 mt-4'>
                    <label
                        htmlFor='characterName'
                        className='fs-4 fw-bold text-white'
                    >
                        Enter characters first name
                    </label>
                    <InputGroup>
                        <Input
                            id='characterName'
                            placeholder='name'
                            value={inputCharacter}
                            onChange={handleInput}
                        />
                        <Button color='primary' type='submit'>
                            Search
                        </Button>
                    </InputGroup>
                </div>
            </form>
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
                                alt={`Displaying the character: ${character.fullName}`}
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
        </div>
    );
};

export default Search;
