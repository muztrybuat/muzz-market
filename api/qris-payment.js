// ==================== QRIS PAYMENT ====================
// Endpoint: /api/qris-payment
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
        const { orderId, amount, customerName } = req.body;
        
        if (!orderId || !amount || !customerName) {
            return res.status(400).json({ error: 'Missing required fields: orderId, amount, customerName' });
        }
        
        // Generate QRIS image URL
        const qrisImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=QRIS-MUZZ-${orderId}-${amount}`;
        
        res.status(200).json({
            success: true,
            data: {
                payment_id: 'QRIS_' + Date.now(),
                order_id: orderId,
                amount: amount,
                currency: 'IDR',
                method: 'QRIS',
                qris_image_url: qrisImageUrl,
                status: 'pending',
                supported_apps: ['Dana', 'OVO', 'GoPay', 'LinkAja', 'ShopeePay'],
                expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
            }
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};