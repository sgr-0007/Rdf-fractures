const axios = require('axios');

const electrica = "http://purl.org/ELECTRICA/";
const xsd = "http://www.w3.org/2001/XMLSchema#";
const DATASET_URL = 'http://localhost:3030/myRdfDataset';


exports.fetchFractures = async (req, res) => {

    const query = `
    PREFIX electrica: <http://purl.org/ELECTRICA/>
   SELECT ?subject ?predicate ?object
   WHERE {
       ?subject ?predicate ?object .
       FILTER(?predicate = <http://purl.org/ELECTRICA/000000413>)
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

    // Manually construct the Turtle data
    const turtleData = `
    @prefix electrica: <${electrica}> .
    @prefix xsd: <${xsd}> .    
    electrica:${recordId} electrica:000000413 electrica:${skullFracture} .
    electrica:${recordId} electrica:000000413 electrica:${facialFracture} .
    electrica:${recordId} electrica:000000413 electrica:${cervicalSpineFracture} .
    electrica:${recordId} electrica:000000413 electrica:${thoracicSpineFracture} .
    electrica:${recordId} electrica:000000413 electrica:${lumbarSpineFracture} .
    electrica:${recordId} electrica:000000413 electrica:${sacralSpineFracture} .
    electrica:${recordId} electrica:000000413 electrica:${leftRibFracture} .
    electrica:${recordId} electrica:000000413 electrica:${rightRibFracture} .
    electrica:${recordId} electrica:000000413 electrica:${sternumFracture} .
    electrica:${recordId} electrica:000000413 electrica:${leftPelvisFracture} .
    electrica:${recordId} electrica:000000413 electrica:${rightPelvisFracture} .
    electrica:${recordId} electrica:000000413 electrica:${leftShoulderFracture} .
    electrica:${recordId} electrica:000000413 electrica:${rightShoulderFracture} .
    electrica:${recordId} electrica:000000413 electrica:${leftArmFracture} .
    electrica:${recordId} electrica:000000413 electrica:${rightArmFracture} .
    electrica:${recordId} electrica:000000413 electrica:${leftLowerLimbFracture} .
    electrica:${recordId} electrica:000000413 electrica:${rightLowerLimbFracture} .
    `;

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

