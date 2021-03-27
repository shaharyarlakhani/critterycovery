import React from 'react';
import { Pagination, Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { useParams, useLocation, useHistory, Link } from 'react-router-dom';
import SpeciesCard from '../components/Cards/SpeciesCard';
import SpeciesModal from '../components/Modal/SpeciesModal';
import Pagination_main from '../components/Pagination/Pagination'
import jaguar from './speciesPhotos/jaguar.jpg';
import axios from 'axios'

interface species{
    common_name: string;
    scientific_name: string;
    kingdom: string;
    phylum: string;
    _class: string;
    _order: string;
    family: string;
    genus: string;
    subspecies: string;
    subpopulations: string;
    population_trend: string;
    marine: boolean;
    freshwater: boolean;
    terrestrial: boolean;
}

function Species() {
    const offset = 3;
    const {id} = useParams<{ id: string }>();
    const [animals, setAnimals] = React.useState(new Array<species>());
    const [isLoading, setLoading] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(id != null);
    const [species, setSpecies] = React.useState(animals[0])
    const [startingCard, setStart] = React.useState(0)
    const [maxCardsShown, setCardsShown] = React.useState(10)
    let location = useLocation();
    let history = useHistory();

    React.useEffect(() => {
            axios.get("/api/species").then((response) => {
                setAnimals(response.data.species);
                if(id != null){
                    axios.get("/api/species/name=" + id).then((response) => {
                        if(response.data != null){
                            update(response.data.species);
                        } 
                    })
                }
                setLoading(false);    
        })}, []);
    
    
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    function update(animal : species) {
        setSpecies(animal)
        setModalShow(true)
    }

    function closeModal(){
        history.goBack()
        setModalShow(false)
    }

    const speciesCards = [];
    for (let i = startingCard; i < Math.min(startingCard + maxCardsShown, animals.length); i++) {
        speciesCards.push(<Col><a style={{ cursor: 'pointer' }} onClick={() => update(animals[i])}><Link
        to={{
          pathname: `/species/${animals[i].scientific_name}`,
          state: { background: location }
        }}
      ><SpeciesCard animal={animals[i]} photo={jaguar}></SpeciesCard></Link></a></Col>);
    }

    

    return(
        <div>
            <SpeciesModal
                species={species}
                show={modalShow}
                onHide={() => closeModal()}
            />

            <Container fluid className="justify-content-md-center">
                <Row>
                    <h1>{animals.length} Species. {maxCardsShown} per page</h1>
                </Row>
                <Row xs={1} sm={2} md={3} lg={4} xl={5}>
                    {speciesCards}
                </Row>
                <Pagination_main 
                    instancesPerPage= {maxCardsShown}
                    totalInstances= {animals.length}
                    startingInstance= {startingCard}
                    offsetPagesShownFromCurrent= {offset}
                    setStartingInstance= {setStart}
                    setInstancesPerPage= {setCardsShown}
                ></Pagination_main>
            </Container>
        </div>
        
    );
}

export default Species;
