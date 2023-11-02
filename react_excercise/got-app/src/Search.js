import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';
import { Card, CardBody, CardGroup } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
const { searchForCharacters } = require('./Api');

const Search = () => {
    const [searchCharacter, setSearchCharacter] = useState([]);
    const [inputCharacter, setInputCharacter] = useState('');

    const handleInput = (event) => {
        setInputCharacter(event.target.value);
    };

    const findCharacter = async () => {
        try {
            const data = await searchForCharacters(inputCharacter);
            setSearchCharacter(data);
        } catch (error) {
            console.error('Error fetching data');
        }
    };

    return (
        <>
            <div className='col-sm-6 mt-4'>
                <InputGroup>
                    <Input
                        placeholder='search characters'
                        value={inputCharacter}
                        onChange={handleInput}
                    />
                    <Button color='primary' onClick={findCharacter}>
                        Search
                    </Button>
                </InputGroup>
            </div>
            <Container fluid>
                <Row>
                    <Col>
                        <CardGroup className='mt-4 px-4'>
                            {searchCharacter.map((character) => (
                                <Card
                                    style={{ minWidth: '250px' }}
                                    className='mx-2 my-2 px-2 py-2'
                                    key={character.id}
                                >
                                    <img
                                        className='mx-auto image-fluid'
                                        src={character.imageUrl}
                                        alt={character.fullName}
                                        key={`img-${character.id}`}
                                        style={{
                                            maxWidth: '250px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <CardBody
                                        className='text-center fs-5 fw-semibold'
                                        key={`text-${character.id}`}
                                    >
                                        {character.fullName}
                                    </CardBody>
                                </Card>
                            ))}
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Search;
