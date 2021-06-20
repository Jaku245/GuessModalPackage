import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalBody, ModalHeader, FormInput } from 'shards-react';

import '../App.css'
import LottieAnimation from './lottie';
import loader from '../animations/loader.json'
import correct from '../animations/correct.json'
import oops from '../animations/oops.json'

export default class GuessModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: this.props.showModal,
            pokemonData: null,
            pokemonFetched: false,
            enteredName: '',
            invalidInput: false,
            answer: null
        }
    }

    fetchPokemon = async () => {

        let pokemonUrl = 0
        await fetch("https://pokeapi.co/api/v2/pokemon/?limit=2000", {
            method: "GET",
            headers: {
                "Accepts": 'application/json '
            }
        })
            .then(response => response.json())
            .then(async data => {
                const total = data.count;
                const randomNumber = Math.floor(Math.random() * total);
                pokemonUrl = data.results[randomNumber].url;
            });

        await fetch(pokemonUrl, {
            method: "GET",
            headers: {
                "Accepts": 'application/json '
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    pokemonData: data,
                    pokemonFetched: true
                })
            });
    }

    fetchPokemonOfSameType = async () => {
        const typeUrl = this.state.pokemonData.types[0].type.url
        await this.setState({
            pokemonData: null,
            answer: null,
            enteredName: ''
        });
        let pokemonUrl = 0
        await fetch(typeUrl, {
            method: "GET",
            headers: {
                "Accepts": 'application/json '
            }
        })
            .then(response => response.json())
            .then(async data => {
                const total = data.pokemon.length;
                const randomNumber = Math.floor(Math.random() * total);
                pokemonUrl = data.pokemon[randomNumber].pokemon.url;
            });
        await fetch(pokemonUrl, {
            method: "GET",
            headers: {
                "Accepts": 'application/json '
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    pokemonData: data,
                    pokemonFetched: true
                })
            });
    }

    checkAnswer = async () => {
        if (this.state.enteredName.length === 0) {
            await this.setState({
                invalidInput: true
            });
        } else {
            if (this.state.enteredName.toLowerCase() === this.state.pokemonData.name) {
                await this.setState({
                    enteredName: '',
                    pokemonFetched: false,
                    answer: true
                });
            } else {
                await this.setState({
                    answer: false
                });
            }
        }
    }

    async componentDidMount() {
        if (!this.state.pokemonFetched) {
            await this.fetchPokemon();
        }
    }

    render() {
        const pokemon = this.state.pokemonData;
        return (
            <>
                <Modal open={this.props.showModal} toggle={this.props.toggleModal} >
                    <ModalHeader>
                        <Container>
                            <Row style={{ justifyContent: 'space-around' }}>
                                <Col>
                                    Who am I ???
                                </Col>
                            </Row>
                        </Container>
                    </ModalHeader>
                    <ModalBody>
                        {
                            pokemon != null
                                ?
                                <Container>
                                    <Row style={{ justifyContent: 'space-around', marginBottom: '2rem' }}>
                                        <img width={150} height={150} src={pokemon.sprites.front_default} alt="pokemon" className='logo' />
                                    </Row>
                                </Container>
                                :
                                <LottieAnimation lottie={loader} width={50} height={100} />
                        }
                        <FormInput invalid={this.state.invalidInput} value={this.state.enteredName} onChange={(e) => {
                            if (e.target.value.length > 0) {
                                this.setState({
                                    enteredName: e.target.value,
                                    invalidInput: false
                                })
                            } else {
                                this.setState({
                                    enteredName: e.target.value,
                                    invalidInput: true
                                })
                            }
                        }} placeholder="start writing ..." />
                        <Container>
                            <Row style={{ justifyContent: 'space-around' }}>
                                <Col></Col>
                                <Col sm="6">
                                    <Button theme="dark" onClick={this.checkAnswer} style={{ marginTop: 20 }} >Check my guess</Button>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row style={{ justifyContent: 'space-around' }}>
                                <Col>
                                    <Button theme="dark" onClick={async () => {
                                        await this.setState({
                                            pokemonData: null,
                                            answer: null,
                                            enteredName: ''
                                        });
                                        await this.fetchPokemon();
                                    }} style={{ marginTop: 20 }} >Guess random pokemon</Button>
                                </Col>
                                <Col>
                                    <Button theme="dark" onClick={this.fetchPokemonOfSameType} style={{ marginTop: 20 }} >Guess related pokemon</Button>
                                </Col>
                            </Row>
                        </Container>
                        {
                            this.state.answer != null
                                ?
                                this.state.answer
                                    ?
                                    <Container>
                                        <Row style={{ justifyContent: 'space-around', marginTop: '2rem' }}>
                                            <LottieAnimation lottie={correct} width={150} height={150} />
                                        </Row>
                                    </Container>
                                    :
                                    <Container>
                                        <Row style={{ justifyContent: 'space-around', marginTop: '2rem' }}>
                                            <LottieAnimation lottie={oops} width={250} height={150} />
                                        </Row>
                                    </Container>
                                :
                                null
                        }
                    </ModalBody>
                </Modal>
            </>
        )
    }
}