const { postcodeListsMap } = require('../lib/postcodes');

export default function handler(req, res) {
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
    
    const listInfo = {};
    for (const [listName, postcodeSet] of Object.entries(postcodeListsMap)) {
        listInfo[listName] = {
            name: listName,
            count: postcodeSet.size
        };
    }
    
    res.json({
        success: true,
        lists: listInfo
    });
}