// ==================== WEBHOOK HANDLER ====================
// Endpoint: /api/webhook
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
        const event = req.body;
        
        console.log('Webhook received:', event);
        
        // Process webhook event based on type
        if (event.type === 'payment.succeeded') {
            console.log(`✅ Payment succeeded for order: ${event.data.reference_number || event.data.order_id}`);
            // Here you would update order status in database
        } else if (event.type === 'payment.failed') {
            console.log(`❌ Payment failed for order: ${event.data.reference_number || event.data.order_id}`);
        } else if (event.type === 'payment.pending') {
            console.log(`⏳ Payment pending for order: ${event.data.reference_number || event.data.order_id}`);
        } else {
            console.log(`📦 Unknown event type: ${event.type}`);
        }
        
        res.status(200).json({ 
            received: true, 
            message: 'Webhook processed successfully' 
        });
        
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: error.message });
    }
};