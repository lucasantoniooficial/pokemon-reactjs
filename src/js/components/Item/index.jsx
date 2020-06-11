//Packages
import React 									from 'react';
import { Skeleton, Avatar, Card, Col, Button } 	from 'antd';

export default function Item ({pokemon, onClick}) {

    //-------------------------------------------------
    // Render
    //-------------------------------------------------

    return (
		<Col span={4}>
			<Card style={{ marginTop: 16, marginBottom: 16 }}>
				<Skeleton loading={pokemon === false} avatar active>
					{
						pokemon &&

						<Card.Meta
							avatar={
								<Avatar src={pokemon.sprites.front_default}></Avatar>
							}
							title={pokemon.forms[0].name}
						/>
					}
					<Button onClick={onClick}>Acessar Pokedex</Button>
				</Skeleton>
			</Card>
		</Col>
    );
} 