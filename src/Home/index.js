import React, { useState, useEffect, useMemo } from 'react';
import { Skeleton, Avatar, Card, Pagination, Row, Col, Button, Modal } from 'antd';

import api from '../Services/api';

import './style.css';
const { Meta } = Card;

export default function Home() {

    //-------------------------------------------------
    // Properties
    //-------------------------------------------------

    //states
    const [pokemons, setPokemons] = useState([]);
    const [length, setlength] = useState(5);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1)
    const [loading, setLoading] = useState(true)
    const [activePokemon, setActivePokemon] = useState({})
    const [modal, setModal] = useState(false)
    //-------------------------------------------------
    // Callbacks
    //-------------------------------------------------

    const pokemonLoad = React.useCallback(async () => {
        let _pokemons = [];

        setLoading(true)

        api.get(`pokemon?offset=${page * length}&limit=${length}`)
            .then(async (response) => {
                const { results, count } = response.data;

                for (let i = 0; i < results.length; i++) {
                    let pokemon = results[i];
                    const response = await api.get(pokemon.url);
                    pokemon = Object.assign(pokemon, response.data);
                    _pokemons.push(pokemon);
                }
                setLoading(false);
                setTotal(count)
                setPokemons(_pokemons);
            });

    }, [page, length, loading]);

    const RenderPokemon = React.useCallback((value) => {
        return (
            <Col span={4}>
                <Card style={{ marginTop: 16, marginBottom: 16 }}>
                    <Skeleton loading={loading} avatar active>
                        <Meta
                            avatar={
                                <Avatar src={value.sprites.front_default}></Avatar>
                            }
                            title={value.forms[0].name}
                        />
                        <Button onClick={() => { setModal(true); setActivePokemon(value) }}>Acessar Pokedex</Button>
                    </Skeleton>
                </Card>
            </Col>
        );
    }, [loading]);

    const RenderPokemons = React.useMemo(() => {
        let response = [];

        for (let i = 0; i < pokemons.length; i++) {
            const value = pokemons[i];

            response.push(<RenderPokemon key={i} {...value} />);
        }

        return response;
    }, [pokemons]);

    //-------------------------------------------------
    // Effects
    //-------------------------------------------------

    useEffect(() => {

        pokemonLoad()

    }, [page, length, total]);

    //-------------------------------------------------
    // Render
    //-------------------------------------------------

    return (
        <div style={{ width: '100%' }}>
            <Row gutter={16}>
                {RenderPokemons}
            </Row>
            <Pagination
                defaultCurrent={page}
                total={total}
                onChange={setPage}
                defaultPageSize="5"
                pageSizeOptions={['5', '20']}
                onShowSizeChange={(page, size) => setlength(size)}
            />
            <Modal
                title="PodekeDex"
                visible={modal}
                width={800}
                onCancel={() => setModal(false)}
                footer={false}
                
            >
                <div id="pokedex">
                    <div id="left">
                        <div id="logo"></div>
                        <div id="bg_curve1_left"></div>
                        <div id="bg_curve2_left"></div>
                        <div id="curve1_left">
                            <div id="buttonGlass">
                                <div id="reflect"> </div>
                            </div>
                            <div id="miniButtonGlass1"></div>
                            <div id="miniButtonGlass2"></div>
                            <div id="miniButtonGlass3"></div>
                        </div>
                        <div id="curve2_left">
                            <div id="junction">
                                <div id="junction1"></div>
                                <div id="junction2"></div>
                            </div>
                        </div>
                        <div id="screen">
                            <div id="topPicture">
                                <div id="buttontopPicture1"></div>
                                <div id="buttontopPicture2"></div>
                            </div>
                            <div id="picture">
                                <img src={activePokemon.sprites?.front_default} alt={activePokemon.name} height="170" />
                            </div>
                            <div id="buttonbottomPicture"></div>
                            <div id="speakers">
                                <div className="sp"></div>
                                <div className="sp"></div>
                                <div className="sp"></div>
                                <div className="sp"></div>
                            </div>
                        </div>
                        <div id="bigbluebutton"></div>
                        <div id="barbutton1"></div>
                        <div id="barbutton2"></div>
                        <div id="cross">
                            <div id="leftcross">
                                <div id="leftT"></div>
                            </div>
                            <div id="topcross">
                                <div id="upT"></div>
                            </div>
                            <div id="rightcross">
                                <div id="rightT"></div>
                            </div>
                            <div id="midcross">
                                <div id="midCircle"></div>
                            </div>
                            <div id="botcross">
                                <div id="downT"></div>
                            </div>
                        </div>
                    </div>
                    <div id="right">
                        <div id="stats">
                            <strong>Name:</strong> {activePokemon.name}<br />
                            <strong>Type:</strong> {activePokemon.types?.map(item => item.type.name).join(', ', ' e ')}<br />
                            <strong>Height:</strong> {activePokemon.height}<br />
                            <strong>Weight:</strong> {activePokemon.weight} lbs<br /><br />
                        </div>
                        <div id="blueButtons1">
                            <div className="blueButton"></div>
                            <div className="blueButton"></div>
                            <div className="blueButton"></div>
                            <div className="blueButton"></div>
                            <div className="blueButton"></div>
                        </div>
                        <div id="blueButtons2">
                            <div className="blueButton"></div>
                            <div className="blueButton"></div>
                            <div className="blueButton"></div>
                            <div className="blueButton"></div>
                            <div className="blueButton"></div>
                        </div>
                        <div id="miniButtonGlass4"></div>
                        <div id="miniButtonGlass5"></div>
                        <div id="barbutton3"></div>
                        <div id="barbutton4"></div>
                        <div id="yellowBox1"></div>
                        <div id="yellowBox2"></div>
                        <div id="bg_curve1_right"></div>
                        <div id="bg_curve2_right"></div>
                        <div id="curve1_right"></div>
                        <div id="curve2_right"></div>
                    </div>
                </div>
            </Modal>
        </div>
    )
} 