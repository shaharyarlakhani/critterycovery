import { Card, Nav } from 'react-bootstrap';

function SpeciesCard(props: any) {
    return(
        <Card bg="white" style={{width: '30rem'}}>
            <Card.Img variant="top" src={props.photo}/>
            <Card.Body>
                <Card.Title>{props.animal.common_name}</Card.Title>
                <Card.Text>
                    Body Mass: {props.animal.bodyMass} <br />
                    Length: {props.animal.length} <br />
                    Height: {props.animal.height} <br />
                    Number Left: {props.animal.num} <br />
                    Scientific Name: {props.animal.taxa} <br />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SpeciesCard;