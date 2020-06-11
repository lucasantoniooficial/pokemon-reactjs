//Packages
import React		from 'react';
import { Modal } 	from 'antd';

//Components
import Pokedex from "../../components/Pokedex";

//Systems
import List from '../../systems/List';

export default function Home() {

    //-------------------------------------------------
    // Properties
    //-------------------------------------------------

    //states
    const [activePokemon, setActivePokemon] = React.useState({});
	const [modal, setModal] 				= React.useState(false);
	
    //-------------------------------------------------
    // Callbacks
    //-------------------------------------------------

	const selectPokemon = React.useCallback((data) => {
		setModal(true);
		setActivePokemon(data);
	}, []);

    //-------------------------------------------------
    // Render
    //-------------------------------------------------

    return (
        <div style={{ width: '100%' }}>
            <List selectPokemon={selectPokemon} />
			
			<Modal
				title="PodekeDex"
				visible={modal}
				width={800}
				onCancel={() => setModal(false)}
				footer={false}
				
			>
				<Pokedex pokemon={activePokemon} />
            </Modal>
        </div>
    )
} 