// ==================== GET ALL PRODUCTS ====================
// Endpoint: /api/get-products
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
        const { category } = req.query;
        
        const products = [
            { id: 1, name: "Panel Pterodactyl", price: 150000, price_myr: 45, icon: "🖥️", desc: "Premium game hosting panel", category: "Panel", features: ["Unlimited RAM", "Unlimited CPU"], type: "ram" },
            { id: 2, name: "Murid Bug", price: 85000, price_myr: 25, icon: "🐛", desc: "Bug exploit for various services", category: "Bug", features: ["Regular Update", "7 Days Warranty"], type: "normal" },
            { id: 3, name: "Aplikasi Bug Manta", price: 0, price_myr: 0, icon: "🦈", desc: "Unlimited quota bug for Manta", category: "Bug", features: ["Pilih Paket"], type: "bugManta" },
            { id: 4, name: "Bot WhatsApp", price: 0, price_myr: 0, icon: "🤖", desc: "Bot WhatsApp with various packages", category: "Bot", features: ["Pilih Paket"], type: "bot" },
            { id: 5, name: "Script Auto Order", price: 350000, price_myr: 105, icon: "📝", desc: "Auto order script for marketplace", category: "Script", features: ["Multi Account", "Anti Detect"], type: "normal" },
            { id: 6, name: "Base APK", price: 0, price_myr: 0, icon: "📱", desc: "Base APK berbagai pilihan", category: "BaseAPK", features: ["Pilih Base APK"], type: "baseApk" },
            { id: 7, name: "Web Create Script WA", price: 5000, price_myr: 2, icon: "🌐", desc: "Web script WA dengan rank", category: "Script", features: ["20 Rank"], type: "webScript" }
        ];
        
        let filteredProducts = products;
        if (category && category !== 'all') {
            filteredProducts = products.filter(p => p.category === category);
        }
        
        res.status(200).json({
            success: true,
            data: filteredProducts,
            categories: ['all', 'Panel', 'Bug', 'Bot', 'Script', 'BaseAPK']
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};