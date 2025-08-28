const { postcodeListsMap } = require('../lib/postcodes');

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }
    
    const { postcode } = req.query;
    
    if (!postcode) {
        return res.status(400).json({
            success: false,
            error: 'Missing required parameter: postcode'
        });
    }
    
    const results = {};
    for (const [listName, postcodeSet] of Object.entries(postcodeListsMap)) {
        results[listName] = postcodeSet.has(postcode.toString());
    }
    
    res.json({
        success: true,
        postcode: postcode,
        results: results
    });
}