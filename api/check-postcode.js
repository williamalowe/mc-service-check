const { postcodeListsMap } = require('../lib/postcodes');

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS request for CORS
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
    
    const { postcode, list } = req.query;
    
    // Validate required parameters
    if (!postcode) {
        return res.status(400).json({
            success: false,
            error: 'Missing required parameter: postcode'
        });
    }
    
    if (!list) {
        return res.status(400).json({
            success: false,
            error: 'Missing required parameter: list',
            availableLists: Object.keys(postcodeListsMap)
        });
    }
    
    // Validate list parameter
    if (!postcodeListsMap[list]) {
        return res.status(400).json({
            success: false,
            error: `Invalid list parameter. Available lists: ${Object.keys(postcodeListsMap).join(', ')}`
        });
    }
    
    // Check if postcode exists in the specified list
    const exists = postcodeListsMap[list].has(postcode.toString());
    
    res.json({
        success: true,
        postcode: postcode,
        list: list,
        exists: exists
    });
}