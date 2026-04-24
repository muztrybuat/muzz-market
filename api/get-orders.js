// ==================== GET ORDERS BY EMAIL ====================
// Endpoint: /api/get-orders?email=user@example.com
// Method: GET

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { email } = req.query;
        
        if (!email) {
            return res.status(400).json({ error: 'Email parameter is required' });
        }
        
        // In production, this would fetch from database
        // For now, return empty array
        res.status(200).json({
            success: true,
            data: [],
            message: `Orders for ${email}`
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};