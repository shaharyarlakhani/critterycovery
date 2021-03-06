import PersonDeck from '../components/CardDecks/PersonDeck'
import ToolDeck from '../components/CardDecks/ToolDeck'

import Tools from '../data/Tools'
import Apis from '../data/Apis'
import AboutLinks from '../data/AboutLinks'

import { Container, Row } from 'react-bootstrap';

/* Rendering for critterycovery.me/about page. 
 * We placed our info and member information in PersonDeck
 * We then place our Tools used in ToolDeck
 * We place the APIs we used beneath that
 * We then place the information about our GitLab and Postman below that
 */

function About() { 

	const description: string = "This site is meant to educate people about different endangered species and address the problem" +
	" of reducing populations. Unless we do something about this issue, we won't be able to save these species until it's too late." +
	" This would be a great shame because of the diversity that these animals bring to the earth.";

	const compilation: string = "The compilation of our data allows us to focus on species that are critically endangered" +
	" and identify their country, ecosystem, and other characteristics so that we can help reduct this endangerment. The data" +
	" used here can come of real help to different organizations that aim to protect animals."; 

	return (
		<Container fluid style={{ width: '70%' }}>
			<Row>
				<Container className='spacing' style={{ borderTop: '.25rem dotted grey', borderBottom: '.25rem dotted grey' }}>
					<h1 style={{ fontWeight: 'bolder' }}>About Us</h1>
					<p style={{ fontSize: '18pt' }}>{description}</p>
				</Container>
			</Row>
			<Row xs={1} sm={2} md={2} lg={3}>
				{<PersonDeck />}
			</Row>
			<Row >
				<Container className='spacing' style={{ borderTop: '.25rem dotted grey' }}>
					<h1 style={{ fontWeight: 'bolder' }}>Tools</h1>
				</Container>
			</Row>
			<Row xs={1} sm={1} md={2} lg={3} xl={4}>
				{<ToolDeck tools={Tools()} />}
			</Row>
			<Row>
				<Container className='spacing' style={{borderTop:'.25rem dotted grey', borderBottom:'.25rem dotted grey'}}>
					<h1 style={{ fontWeight: 'bolder' }}>Data</h1>
					<p style={{ fontSize: '18pt' }}>{compilation}</p>
				</Container>
			</Row>
			<Row>
				<Container style={{ textAlign: 'center', paddingTop: '2%' }}>
					<h1 style={{ fontWeight: 'bolder' }}>APIs</h1>
				</Container>
			</Row>
			<Row xs={1} sm={1} md={2} lg={3} xl={4}>
				{<ToolDeck tools={Apis()} />}
			</Row>
			<Row >
				<Container className='spacing' style={{ borderTop: '.25rem dotted grey' }}>
					<h1 style={{ fontWeight: 'bolder' }}>Links</h1>
				</Container>
			</Row>
			<Row className="justify-content-md-center" style={{ paddingBottom: '2%', marginBottom: '3%', borderBottom: '.25rem dotted grey' }} xs={1} sm={1} md={2} lg={3} xl={4}>
        {<ToolDeck tools={AboutLinks()} />}
			</Row>
		</Container>
	);
}; 

export default About;
