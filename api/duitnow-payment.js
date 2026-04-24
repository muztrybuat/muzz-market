// ==================== DUITNOW PAYMENT ====================
// Endpoint: /api/duitnow-payment
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
        const { orderId, amount, customerName, customerEmail, customerPhone } = req.body;
        
        if (!orderId || !amount || !customerName) {
            return res.status(400).json({ error: 'Missing required fields: orderId, amount, customerName' });
        }
        
        // Generate DuitNow QR URL
        const duitnowQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DUITNOW-MUZZ-${orderId}-${amount}`;
        
        res.status(200).json({
            success: true,
            data: {
                payment_id: 'DNTW_' + Date.now(),
                order_id: orderId,
                amount: amount,
                currency: 'MYR',
                method: 'DUITNOW',
                provider: 'HitPay',
                duitnow_qr_url: duitnowQrUrl,
                status: 'pending',
                supported_apps: ['Maybank2u', 'Touch n Go', 'GrabPay', 'Boost', 'RHB Bank'],
                expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
            }
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};