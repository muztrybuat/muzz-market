// ==================== KONFIGURASI MUZZ SHOP ====================

const CONFIG = {
    // Informasi Toko
    APP_NAME: 'Muzz Shop',
    APP_VERSION: '3.0.0',
    APP_DESCRIPTION: 'Auto Order System with QRIS & DuitNow',
    
    // Informasi Owner
    OWNER: {
        name: 'Muhammad Muzakir',
        email: 'muhammadmuzakir808@gmail.com',
        phone: '60175632450',
        country: 'Malaysia',
        instagram: '@muzzshop_official',
        whatsapp_link: 'https://wa.me/60175632450'
    },
    
    // Customer Service
    CS: {
        phone: '60175632450',
        whatsapp_link: 'https://wa.me/60175632450',
        response_time: '24 Jam'
    },
    
    // ==================== PAYMENT CONFIGURATION ====================
    PAYMENT: {
        QRIS: {
            name: 'QRIS Indonesia',
            enabled: true,
            description: 'Scan QRIS menggunakan aplikasi pembayaran Indonesia',
            qris_image_url: '/assets/qris-muzzshop.jpg',
            supported_apps: ['Dana', 'OVO', 'GoPay', 'LinkAja', 'ShopeePay'],
            currency: 'IDR',
            currency_symbol: 'Rp'
        },
        DUITNOW: {
            name: 'DuitNow Malaysia',
            enabled: true,
            provider: 'HitPay',
            description: 'Scan DuitNow menggunakan aplikasi bank Malaysia',
            supported_apps: ['Maybank2u', 'Touch n Go', 'GrabPay', 'Boost', 'RHB Bank', 'Public Bank'],
            currency: 'MYR',
            currency_symbol: 'RM'
        }
    },
    
    // ==================== WHATSAPP TEMPLATE ====================
    WA_TEMPLATE: {
        owner_message: (order) => {
            return `Hai owner, saya habis membeli ${order.productName} saya ingin mengambil benda ini, ini biodata saya

ID Pesanan : ${order.orderId}
Nama Pembeli : ${order.customerName}
Barang Dibeli : ${order.productName}
Harga : ${order.currency === 'MYR' ? 'RM ' + order.price : 'Rp ' + order.price.toLocaleString()}
Metode Bayar : ${order.paymentMethod || 'Belum dipilih'}
Tanggal Beli : ${order.date}

Mohon segera kirimkan ini

Note : 
!! JANGAN HAPUS , LANGSUNG KIRIM SAJA !!`
        },
        customer_message: (order) => {
            return `✅ *Pembayaran Berhasil!*

Terima kasih telah berbelanja di *Muzz Shop*

Berikut detail pesanan Anda:
━━━━━━━━━━━━━━━━━━━
🆔 Order ID: ${order.orderId}
📦 Produk: ${order.productName}
💰 Total: Rp ${order.price.toLocaleString()}
💳 Metode: ${order.paymentMethod}
📅 Tanggal: ${order.date}
━━━━━━━━━━━━━━━━━━━

⏳ Pesanan akan diproses dalam 5-15 menit

📞 Ada pertanyaan? Hubungi CS:
wa.me/60175632450

Terima kasih! 🙏`
        }
    },
    
    // ==================== PRODUK LIST ====================
    PRODUCTS: [
        { id: 1, name: "Panel Pterodactyl", price_idr: 150000, price_myr: 45, icon: "🖥️", category: "Panel", type: "ram" },
        { id: 2, name: "Murid Bug", price_idr: 85000, price_myr: 25, icon: "🐛", category: "Bug", type: "normal" },
        { id: 3, name: "Aplikasi Bug Manta", price_idr: 0, price_myr: 0, icon: "🦈", category: "Bug", type: "bugManta" },
        { id: 4, name: "Bot WhatsApp", price_idr: 0, price_myr: 0, icon: "🤖", category: "Bot", type: "bot" },
        { id: 5, name: "Script Auto Order", price_idr: 350000, price_myr: 105, icon: "📝", category: "Script", type: "normal" },
        { id: 6, name: "Base APK", price_idr: 0, price_myr: 0, icon: "📱", category: "BaseAPK", type: "baseApk" },
        { id: 7, name: "Web Create Script WA", price_idr: 5000, price_myr: 2, icon: "🌐", category: "Script", type: "webScript" }
    ],
    
    // ==================== RAM OPTIONS ====================
    RAM_OPTIONS: [
        { size: "1 GB", price_myr: 0.40, price_idr: 4000 },
        { size: "2 GB", price_myr: 0.50, price_idr: 5000 },
        { size: "3 GB", price_myr: 0.60, price_idr: 6000 },
        { size: "4 GB", price_myr: 0.70, price_idr: 7000 },
        { size: "5 GB", price_myr: 0.80, price_idr: 8000 },
        { size: "6 GB", price_myr: 0.90, price_idr: 9000 },
        { size: "7 GB", price_myr: 1.00, price_idr: 10000 },
        { size: "8 GB", price_myr: 1.10, price_idr: 11000 },
        { size: "9 GB", price_myr: 1.20, price_idr: 12000 },
        { size: "Unlimited", price_myr: 2.00, price_idr: 20000 },
        { size: "PT (Premium)", price_myr: 25, price_idr: 430000 }
    ],
    
    // ==================== BOT PACKAGES ====================
    BOT_PACKAGES: [
        { name: "Bot Jaga Group", desc: "Bot untuk menjaga group WhatsApp", price_myr: 3, price_idr: 50000, features: ["Auto jaga group", "Anti link", "Anti spam"] },
        { name: "Bot Panel via WS", desc: "Bot panel via WhatsApp", price_myr: 3, price_idr: 50000, features: ["Panel control", "Admin command"] },
        { name: "Bot Promote", desc: "Bot untuk promote produk", price_myr: 3, price_idr: 50000, features: ["Auto promote", "Broadcast message"] },
        { name: "Bot Sederhana", desc: "300+ fitur siap pakai", price_myr: 4, price_idr: 70000, features: ["300+ fitur", "Downloader", "Sticker maker"] },
        { name: "Bot MD", desc: "2.000+ fitur premium", price_myr: 7, price_idr: 120000, features: ["2000+ fitur", "Anti spam", "Auto reply"] },
        { name: "Custom Bot", desc: "Bebas request fitur", price_myr: 10, price_idr: 175000, features: ["Custom fitur", "Full support"] }
    ],
    
    // ==================== BUG MANTA PACKAGES ====================
    BUG_MANTA_PACKAGES: [
        { name: "Member Harian", desc: "Akses 1 hari", price_myr: 1, price_idr: 17000, duration: "1 Hari", features: ["Full akses bug"] },
        { name: "Member Bulanan", desc: "Akses 30 hari", price_myr: 10, price_idr: 170000, duration: "30 Hari", features: ["Full akses bug", "Update berkala"] },
        { name: "Full Up", desc: "Akses permanen", price_myr: 15, price_idr: 255000, duration: "Permanen", features: ["Full akses bug", "Update forever"] },
        { name: "Reseller", desc: "Jual kembali bug Manta", price_myr: 20, price_idr: 340000, duration: "Permanen", features: ["Harga reseller", "Support bisnis"] }
    ],
    
    // ==================== BASE APK PACKAGES ====================
    BASE_APK_PACKAGES: [
        { name: "Base APK Xcube", desc: "Ada RAT", price_myr: 10, price_idr: 170000, features: ["Premium Xcube", "Ada RAT"] },
        { name: "Base APK Miyako", desc: "No RAT", price_myr: 3, price_idr: 51000, features: ["Miyako Base", "Clean", "No RAT"] },
        { name: "Base APK RVSDP", desc: "No RAT", price_myr: 5, price_idr: 85000, features: ["RVSDP Base", "No RAT"] },
        { name: "Base APK Dheat Core", desc: "No RAT", price_myr: 5, price_idr: 85000, features: ["Dheat Core", "No RAT"] },
        { name: "Base APK Magnum X", desc: "Ada RAT", price_myr: 10, price_idr: 170000, features: ["Magnum X", "Ada RAT"] },
        { name: "Base APK Dheat Core V2", desc: "Ada RAT", price_myr: 10, price_idr: 170000, features: ["Dheat Core V2", "Ada RAT"] },
        { name: "Base APK Glacier", desc: "Ada RAT", price_myr: 5, price_idr: 85000, features: ["Glacier Base", "Ada RAT"] },
        { name: "Base APK Valhalla", desc: "No RAT", price_myr: 7, price_idr: 120000, features: ["Valhalla Base", "No RAT"] }
    ],
    
    // ==================== RANK OPTIONS ====================
    RANK_OPTIONS: [
        { name: "Silver", icon: "⚪", price_idr: 5000 }, { name: "Gold", icon: "🟠", price_idr: 5000 },
        { name: "Platinum", icon: "🔵", price_idr: 5000 }, { name: "Diamond", icon: "🟣", price_idr: 5000 },
        { name: "Master", icon: "🔴", price_idr: 5000 }, { name: "Grandmaster", icon: "🟡", price_idr: 5000 },
        { name: "Legend", icon: "☣️", price_idr: 5000 }, { name: "Heroic", icon: "♋", price_idr: 5000 },
        { name: "Mytich", icon: "Ⓜ️", price_idr: 5000 }, { name: "Supreme", icon: "🌀", price_idr: 5000 },
        { name: "Eternal", icon: "✡️", price_idr: 5000 }, { name: "Imortal", icon: "🪯", price_idr: 5000 },
        { name: "Phantom", icon: "♒", price_idr: 5000 }, { name: "Dominator", icon: "🚹", price_idr: 5000 },
        { name: "Conqueror", icon: "⚛️", price_idr: 5000 }, { name: "Emperor", icon: "☦️", price_idr: 5000 },
        { name: "Nether", icon: "✡️", price_idr: 5000 }, { name: "Aether", icon: "🔯", price_idr: 5000 },
        { name: "Wither", icon: "♋", price_idr: 5000 }, { name: "Epsilon", icon: "☯️", price_idr: 5000 }
    ],
    
    // ==================== FUNGSI BANTU ====================
    generateOrderId: () => {
        const prefix = 'MZZ';
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}${timestamp}${random}`;
    },
    
    formatCurrency: (amount, currency = 'IDR') => {
        if (currency === 'MYR') return `RM ${amount.toLocaleString()}`;
        return `Rp ${amount.toLocaleString()}`;
    },
    
    getQRISImage: (orderId = null, amount = null) => {
        if (orderId && amount) {
            return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=QRIS-MUZZ-${orderId}-${amount}`;
        }
        return '/assets/qris-muzzshop.jpg';
    },
    
    getDuitNowImage: (orderId = null, amount = null) => {
        if (orderId && amount) {
            return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DUITNOW-MUZZ-${orderId}-${amount}`;
        }
        return '/assets/duitnow-muzzshop.jpg';
    },
    
    getProductById: (id) => {
        return CONFIG.PRODUCTS.find(p => p.id === id);
    },
    
    getProductsByCategory: (category) => {
        if (category === 'all') return CONFIG.PRODUCTS;
        return CONFIG.PRODUCTS.filter(p => p.category === category);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
              }
