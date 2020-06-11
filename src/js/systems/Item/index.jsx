//Packages
import React	from 'react';

//Services
import api from '../../Services/api';

//Components
import RenderItem from "../../components/Item";

export default function Item ({url, setActive}) {

    //-------------------------------------------------
    // Properties
    //-------------------------------------------------

	const [ pokemon, setpokemon ] = React.useState(false);

    //-------------------------------------------------
    // Callbacks
	//-------------------------------------------------

	const onClick = React.useCallback(() => {
		setActive(pokemon);
	}, [pokemon, setActive]);

    //-------------------------------------------------
    // Effects
	//-------------------------------------------------
	
	React.useEffect(() => {
		api.get(url)
		.then(response => {
			setpokemon(response.data);
		});
	}, [url]);

    //-------------------------------------------------
    // Render
    //-------------------------------------------------

    return (
		<RenderItem pokemon={pokemon} onClick={onClick} />
    );
} 