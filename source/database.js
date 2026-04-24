// ==================== DATABASE SIMULASI ====================

let users = [];
let orders = [];
let products = [];

// Inisialisasi produk default
const defaultProducts = [
    { id: 1, name: "Panel Pterodactyl", price: 150000, price_myr: 45, icon: "🖥️", category: "Panel", type: "ram", stock: 10 },
    { id: 2, name: "Murid Bug", price: 85000, price_myr: 25, icon: "🐛", category: "Bug", type: "normal", stock: 25 },
    { id: 3, name: "Aplikasi Bug Manta", price: 0, price_myr: 0, icon: "🦈", category: "Bug", type: "bugManta", stock: 15 },
    { id: 4, name: "Bot WhatsApp", price: 0, price_myr: 0, icon: "🤖", category: "Bot", type: "bot", stock: 50 },
    { id: 5, name: "Script Auto Order", price: 350000, price_myr: 105, icon: "📝", category: "Script", type: "normal", stock: 20 },
    { id: 6, name: "Base APK", price: 0, price_myr: 0, icon: "📱", category: "BaseAPK", type: "baseApk", stock: 30 },
    { id: 7, name: "Web Create Script WA", price: 5000, price_myr: 2, icon: "🌐", category: "Script", type: "webScript", stock: 100 }
];

// Fungsi untuk mendapatkan semua produk
function getProducts() {
    return defaultProducts;
}

// Fungsi untuk mendapatkan produk berdasarkan ID
function getProductById(id) {
    return defaultProducts.find(p => p.id === id);
}

// Fungsi untuk mendapatkan produk berdasarkan kategori
function getProductsByCategory(category) {
    if (category === 'all') return defaultProducts;
    return defaultProducts.filter(p => p.category === category);
}

// Fungsi untuk menyimpan order
function saveOrder(orderData) {
    const existingOrders = JSON.parse(localStorage.getItem('orders_backup') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('orders_backup', JSON.stringify(existingOrders));
    return orderData;
}

// Fungsi untuk mendapatkan orders berdasarkan email
function getOrdersByEmail(email) {
    const existingOrders = JSON.parse(localStorage.getItem('orders_backup') || '[]');
    return existingOrders.filter(o => o.customerEmail === email);
}

// Fungsi untuk update status order
function updateOrderStatus(orderId, status) {
    const existingOrders = JSON.parse(localStorage.getItem('orders_backup') || '[]');
    const orderIndex = existingOrders.findIndex(o => o.orderId === orderId);
    if (orderIndex !== -1) {
        existingOrders[orderIndex].status = status;
        existingOrders[orderIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('orders_backup', JSON.stringify(existingOrders));
        return existingOrders[orderIndex];
    }
    return null;
}

// Fungsi untuk menyimpan user
function saveUser(userData) {
    const existingUsers = JSON.parse(localStorage.getItem('users_backup') || '[]');
    existingUsers.push(userData);
    localStorage.setItem('users_backup', JSON.stringify(existingUsers));
    return userData;
}

// Fungsi untuk mendapatkan user berdasarkan email
function getUserByEmail(email) {
    const existingUsers = JSON.parse(localStorage.getItem('users_backup') || '[]');
    return existingUsers.find(u => u.email === email);
}

// Fungsi untuk mendapatkan semua user
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users_backup') || '[]');
}

// Export untuk Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getProducts,
        getProductById,
        getProductsByCategory,
        saveOrder,
        getOrdersByEmail,
        updateOrderStatus,
        saveUser,
        getUserByEmail,
        getAllUsers,
        defaultProducts
    };
}