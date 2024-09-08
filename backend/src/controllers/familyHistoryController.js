const axios = require('axios');

const electrica = "http://purl.org/ELECTRICA/";
const xsd = "http://www.w3.org/2001/XMLSchema#";
const DATASET_URL = 'http://localhost:3030/myRdfDataset';
const PREDDATASET_URL = 'http://localhost:3030/predicateMaster';
const predicateURI = 'http://purl.org/ELECTRICA/000000413';


exports.fetchFamilyHistory = async (req, res) => {
    const query = `
    PREFIX electrica: <http://purl.org/ELECTRICA/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?subject ?mappedPredicate ?object
WHERE {
  SERVICE <${PREDDATASET_URL}/sparql> {
    ?predicate ?intermediatePredicate ?mappedPredicate .
  }
  SERVICE <${DATASET_URL}/sparql> {
    ?subject ?predicate ?object .
    FILTER(?predicate != <${predicateURI}>)

  }  
  FILTER (?predicate = ?predicate)
}

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
    const { recordId, dob, sex, dov, livesAtHome, broughtInBy, safeguarding,
        socialServices, hospitalVisits, complaint, history, incidentDate,
        canWalk, preExistingConditions } = req.body;


    // Convert array to Turtle URIs
    const formatArrayAsURIs = (values) => {
        if (Array.isArray(values)) {
            return values.map(item => `electrica:${item.value}`).join(", ");
        }
        return "";
    };

    const formatObject = (item) => {
        console.log('Item:', item);
            return `${item.value}`;
        
    };

    // Construct the Turtle data
    const turtleData = `
    @prefix electrica: <${electrica}> .
    @prefix xsd: <${xsd}> .
    electrica:${recordId} electrica:a electrica:000000038 .      
    electrica:${recordId} electrica:000000046 "${dob}"^^xsd:date .
    electrica:${recordId} electrica:000000068 "${formatObject(sex)}"^^xsd:string .
    electrica:${recordId} electrica:000000303 ${formatArrayAsURIs(livesAtHome)} .
    electrica:${recordId} electrica:000000025 "${dov}"^^xsd:date .
    electrica:${recordId} electrica:000000329 ${formatArrayAsURIs(broughtInBy)} .
    electrica:${recordId} electrica:000000337 "${formatObject(safeguarding)}"^^xsd:boolean .
    electrica:${recordId} electrica:000000302 "${formatObject(socialServices)}"^^xsd:boolean .
    electrica:${recordId} electrica:000000375 "${hospitalVisits}"^^xsd:number .
    electrica:${recordId} electrica:000000339 ${formatArrayAsURIs(complaint)} .
    electrica:${recordId} electrica:000000360 "${history}"^^xsd:string .
    electrica:${recordId} electrica:000000361 "${incidentDate}"^^xsd:date .
    electrica:${recordId} electrica:000000362 "${formatObject(canWalk)}"^^xsd:boolean .
    electrica:${recordId} electrica:000000372 ${formatArrayAsURIs(preExistingConditions)} .
    `;

    console.log('Turtle Data:', turtleData); 
    try {
        const response = await axios.post(`${DATASET_URL}/data`, turtleData, {
            headers: {
                'Content-Type': 'text/turtle'
            }
        });
        if (response.status === 200 || response.status === 201) {
            res.status(201).send('Data inserted successfully');
        } else {
            console.error('Error inserting data:', response.statusText);
            res.status(500).send('Error inserting data');
        }
    } catch (error) {
        console.error('Error inserting RDF:', error);
        res.status(500).send('Error inserting RDF data');
    }
};
