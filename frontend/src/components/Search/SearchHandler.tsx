// Helper component for the search page
// This item is called 3 times, one for each model so that each model can be shown
import { Row, Col } from 'react-bootstrap';
import { useTableSearch } from '../../hooks/useTableSearch';
import { useHistory} from 'react-router-dom';
import ModelADCard from '../Cards/ModelADCard';
import ModelCard from '../Cards/ModelCard';
import { ReactElement } from 'react';

import habitatProperties from '../Cards/Properties/Habitat'
import speciesProperties from '../Cards/Properties/Species'
import countryProperties from '../Cards/Properties/Country'

function SearchHandler(props:any){
	const history = useHistory()
	const maxCardsShown = 9;
	// Search hook (narrows down data)
	const { filteredData, }  = useTableSearch({
		searchVal: props.searchVal,
		data: props.data,
	});

	if(props.data[0] == null){
		return <></>
	}
	// Splits functionality based on which model is being looked at currently
	// Incredibly Ugly code. I know we should have designed with OOP in mind
	function checkInterface(arg: any){

		if(arg.scientific_name != null){
			return 'species'
		}
		else if(arg.flag != null){
			return 'country'
		}
		return 'habitat'
	}

	// Different props for different models
	let cardPropFunct
	let imageProp:string
	let typeCard:string
	let nameProp:string
	let titleAlt:string
	let imageRatio:string
	switch(checkInterface(props.data[0])){
		case 'species':
			typeCard = 'species'
			cardPropFunct = speciesProperties
			imageProp = 'image_link'
			nameProp = 'scientific_name'
			titleAlt = 'common_name'
			imageRatio = '100%'
			break;
		case 'habitat':
			typeCard = 'habitats'
			cardPropFunct = habitatProperties
			imageProp = 'image_link'
			nameProp = 'name'
			titleAlt = 'none'
			imageRatio = '100%'
			break;
		default:
			typeCard = 'countries'
			cardPropFunct = countryProperties
			imageProp = 'flag'
			nameProp = 'name'
			titleAlt = 'none'
			imageRatio = '56.25%'
			break;
	}
	// Creates the array of cards for the model
	const cards = new Array<ReactElement>();
	for (let i = 0; i < Math.min(maxCardsShown, filteredData.length); i++) {
		cards.push(<Col className='container-fluid mt-4'>
			<ModelCard
				cardProperties={cardPropFunct(filteredData[i])}
				searchVal={props.searchVal}
				onClick={()=>history.push('/'+typeCard+'/'+filteredData[i][nameProp]+'?q='+props.searchVal)}
				image={filteredData[i][imageProp]}
				image_alt={"Picture of "+imageProp}
				title={filteredData[i][titleAlt] ? filteredData[i][titleAlt] : filteredData[i][nameProp]}
				imageRatio={imageRatio}
			/></Col>);
	}
	// Creates an extra card to link to a search page for the model if the results overflow
	if(filteredData.length > 9){
		cards.push(<Col className='container-fluid mt-4'>
			<a className='unformat' style={{ cursor: 'pointer' }} href={"/"+typeCard+"/?q="+props.searchVal}>
			<ModelADCard 
				model = {typeCard} 
				number = {filteredData.length - maxCardsShown}
			></ModelADCard></a></Col>);
	}

	return (
			<Row xs={1} sm={2} md={3} lg={4} xl={5}>
				{cards}
			</Row>
	);
}

export default SearchHandler;