//Packages
import React				from 'react';
import { Pagination, Row } 	from 'antd';

//Services
import api from '../../Services/api';

//Systems
import Item from '../../systems/Item';

export default function List ({selectPokemon}) {

    //-------------------------------------------------
    // Properties
    //-------------------------------------------------

    //states
    const [pokemons, setPokemons] 			= React.useState([]);
    const [length, setlength] 				= React.useState(5);
    const [page, setPage] 					= React.useState(1);
    const [total, setTotal] 				= React.useState(1);
	
    //-------------------------------------------------
    // Callbacks
    //-------------------------------------------------

    const pokemonLoad = React.useCallback(async () => {

        api.get(`pokemon?offset=${page * length}&limit=${length}`)
            .then(async (response) => {
                const { results, count } = response.data;

                setTotal(count);
                setPokemons(results);
            });

    }, [page, length]);

    const RenderPokemon = React.useCallback((value) => {

        return (
			<Item url={value.url} setActive={selectPokemon} />
        );
    }, [selectPokemon]);

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

    React.useEffect(() => {

        pokemonLoad();

    }, [page, length, total, pokemonLoad]);

    //-------------------------------------------------
    // Render
    //-------------------------------------------------

    return (
		<>
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
        </>
    )
} 