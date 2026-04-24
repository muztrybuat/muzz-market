// ==================== CREATE NEW ORDER ====================
// Endpoint: /api/create-order
// Method: POST

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { productName, price, customerName, customerEmail, customerPhone } = req.body;
        
        if (!productName || !price || !customerName || !customerEmail) {
            return res.status(400).json({ error: 'Missing required fields: productName, price, customerName, customerEmail' });
        }
        
        const generateOrderId = () => {
            const prefix = 'MZZ';
            const timestamp = Date.now().toString().slice(-8);
            const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            return `${prefix}${timestamp}${random}`;
        };
        
        const newOrder = {
            orderId: generateOrderId(),
            productName,
            price: parseInt(price),
            customerName,
            customerEmail,
            customerPhone: customerPhone || '-',
            status: 'pending',
            date: new Date().toLocaleString('id-ID'),
            timestamp: Date.now()
        };
        
        res.status(200).json({
            success: true,
            data: newOrder,
            message: 'Order created successfully'
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
