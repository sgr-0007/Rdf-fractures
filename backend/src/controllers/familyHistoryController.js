const axios = require('axios');

const electrica = "http://purl.org/ELECTRICA/";
const xsd = "http://www.w3.org/2001/XMLSchema#";
const DATASET_URL = 'http://localhost:3030/myRdfDataset';

exports.fetchFamilyHistory = async (req, res) => {
    const query = `
    PREFIX electrica: <http://purl.org/ELECTRICA/>
    SELECT ?subject ?predicate ?object
    WHERE {
        ?subject ?predicate ?object .
    }
    LIMIT 10
    `;

    try {
        const response = await axios.post(`${DATASET_URL}/sparql`, query, {
            headers: {
                'Content-Type': 'application/sparql-query'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error querying RDF:', error);
        res.status(500).send('Error querying RDF data');
    }
};

exports.insertFamilyHistory = async (req, res) => {
    const { recordId, livesAtHome,dob,sex,
        dateOfVisit, broughtInBy,
        safeguarding,socialServices,
        hospitalVisits,complaint,history,incidentDate,
        canWalk,preExistingConditions
     } = req.body;

    // Manually construct the Turtle data
    const turtleData = `
    @prefix electrica: <${electrica}> .
    @prefix xsd: <${xsd}> .
    electrica:${recordId} electrica:a electrica:000000038 .      
    electrica:${recordId} electrica:000000046 "${dob}"^^xsd:date .
    electrica:${recordId} electrica:000000068 "${sex}"^^xsd:string .
    electrica:${recordId} electrica:000000303 electrica:${livesAtHome} .
    electrica:${recordId} electrica:000000329 electrica:${broughtInBy} .
    electrica:${recordId} electrica:000000337 "${safeguarding}"^^xsd:boolean .
    electrica:${recordId} electrica:000000302 "${socialServices}"^^xsd:boolean .
    electrica:${recordId} electrica:000000375 "${hospitalVisits}"^^xsd:number .
    electrica:${recordId} electrica:000000339 electrica:${complaint} .
    electrica:${recordId} electrica:000000360 "${history}"^^xsd:string .
    electrica:${recordId} electrica:000000361 "${incidentDate}"^^xsd:date .
    electrica:${recordId} electrica:000000362 "${canWalk}"^^xsd:boolean .
    electrica:${recordId} electrica:000000372 electrica:${preExistingConditions} .




    `;

    console.log('Turtle Data:', turtleData); // Log the turtle data for debugging

    axios.post(`${DATASET_URL}/data`, turtleData, {
        headers: {
            'Content-Type': 'text/turtle'
        }
    })
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            res.status(201).send('Data inserted successfully');
        } else {
            console.error('Error inserting data:', response.statusText);
            res.status(500).send('Error inserting data');
        }
    })
    .catch(error => {
        console.error('Error inserting RDF:', error);
        res.status(500).send('Error inserting RDF data');
    });
};
