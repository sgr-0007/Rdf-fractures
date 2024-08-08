const axios = require('axios');

const electrica = "http://purl.org/ELECTRICA/";
const xsd = "http://www.w3.org/2001/XMLSchema#";
const DATASET_URL = 'https://0865-31-205-135-146.ngrok-free.app/myRdfDataset';


exports.fetchFractures = async (req, res) => {

    const query = `PREFIX electrica: <http://purl.org/ELECTRICA/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?subject ?mappedPredicate ?mappedObject
WHERE {
  # Fetch mappings from the predicateMaster dataset
  SERVICE <http://localhost:3030/predicateMaster/sparql> {
    ?predicate ?intermediatePredicate ?mappedPredicate .
  }

  # Fetch data from the myRdfDataset dataset
  SERVICE <http://localhost:3030/myRdfDataset/sparql> {
    ?subject ?predicate ?object .
    FILTER(?predicate = <http://purl.org/ELECTRICA/000000413>)
  }  

  # Fetch mappings from the objectMaster dataset
  SERVICE <http://localhost:3030/objectMaster/sparql> {
    ?object ?intermediateObjectPredicate ?mappedObject .
  }
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
}

exports.insertFractures = async (req, res) => {
    const {
        recordId,
        skullFracture,
        facialFracture,
        cervicalSpineFracture,
        thoracicSpineFracture,
        lumbarSpineFracture,
        sacralSpineFracture,
        leftRibFracture,
        rightRibFracture,
        sternumFracture,
        leftPelvisFracture,
        rightPelvisFracture,
        leftShoulderFracture,
        rightShoulderFracture,
        leftArmFracture,
        rightArmFracture,
        leftLowerLimbFracture,
        rightLowerLimbFracture
    } = req.body;

    // Convert array to Turtle URIs
    const formatArrayAsURIs = (values) => {
        if (Array.isArray(values)) {
            return values.map(item => `electrica:${item.value}`).join(", ");
        }
        return "";
    };

    // Helper function to create a Turtle triple if value is not empty
    const createTriple = (subject, predicate, object) => {
        if (object != undefined && object != "") {
            return `electrica:${subject} electrica:${predicate} ${formatArrayAsURIs(object)} .\n`;
        }
        return '';
    };

    // Construct the Turtle data conditionally
    let turtleData = `
    @prefix electrica: <${electrica}> .
    @prefix xsd: <${xsd}> .    
    `;

    turtleData += createTriple(recordId, '000000413', skullFracture);
    turtleData += createTriple(recordId, '000000413', facialFracture);
    turtleData += createTriple(recordId, '000000413', cervicalSpineFracture);
    turtleData += createTriple(recordId, '000000413', thoracicSpineFracture);
    turtleData += createTriple(recordId, '000000413', lumbarSpineFracture);
    turtleData += createTriple(recordId, '000000413', sacralSpineFracture);
    turtleData += createTriple(recordId, '000000413', leftRibFracture);
    turtleData += createTriple(recordId, '000000413', rightRibFracture);
    turtleData += createTriple(recordId, '000000413', sternumFracture);
    turtleData += createTriple(recordId, '000000413', leftPelvisFracture);
    turtleData += createTriple(recordId, '000000413', rightPelvisFracture);
    turtleData += createTriple(recordId, '000000413', leftShoulderFracture);
    turtleData += createTriple(recordId, '000000413', rightShoulderFracture);
    turtleData += createTriple(recordId, '000000413', leftArmFracture);
    turtleData += createTriple(recordId, '000000413', rightArmFracture);
    turtleData += createTriple(recordId, '000000413', leftLowerLimbFracture);
    turtleData += createTriple(recordId, '000000413', rightLowerLimbFracture);

    console.log('Turtle Data:', turtleData); // Log the turtle data for debugging

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

