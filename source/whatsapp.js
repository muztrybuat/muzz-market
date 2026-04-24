// ==================== WHATSAPP INTEGRATION ====================

const CONFIG = require('./config.js');

/**
 * Send WhatsApp message to owner
 * @param {Object} order - Order details
 * @returns {string} WhatsApp URL
 */
function sendToOwner(order) {
    const message = CONFIG.WA_TEMPLATE.owner_message(order);
    const ownerNumber = CONFIG.OWNER.phone;
    const waLink = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;
    return waLink;
}

/**
 * Send WhatsApp message to customer
 * @param {Object} order - Order details
 * @returns {string} WhatsApp URL
 */
function sendToCustomer(order) {
    const message = CONFIG.WA_TEMPLATE.customer_message(order);
    const customerNumber = order.customerPhone?.replace('+', '') || '';
    if (!customerNumber || customerNumber === '-') return null;
    const waLink = `https://wa.me/${customerNumber}?text=${encodeURIComponent(message)}`;
    return waLink;
}

/**
 * Get CS WhatsApp link
 * @returns {string} CS WhatsApp URL
 */
function getCSLink() {
    const message = 'Halo CS, saya butuh bantuan untuk order di Muzz Shop';
    return `https://wa.me/${CONFIG.CS.phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Get Owner WhatsApp link
 * @returns {string} Owner WhatsApp URL
 */
function getOwnerLink() {
    return `https://wa.me/${CONFIG.OWNER.phone}`;
}

/**
 * Generate WhatsApp link with custom message
 * @param {string} phoneNumber - WhatsApp number
 * @param {string} message - Message to send
 * @returns {string} WhatsApp URL
 */
function sendWhatsApp(phoneNumber, message) {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Send payment confirmation to owner
 * @param {Object} order - Order details
 * @returns {string} WhatsApp URL
 */
function sendPaymentConfirmation(order) {
    const message = `✅ *Pembayaran Dikonfirmasi!*

Order ID: ${order.orderId}
Produk: ${order.productName}
Customer: ${order.customerName}
Total: Rp ${order.price.toLocaleString()}

Silakan segera proses pesanan.`;
    
    return `https://wa.me/${CONFIG.OWNER.phone}?text=${encodeURIComponent(message)}`;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sendToOwner,
        sendToCustomer,
        getCSLink,
        getOwnerLink,
        sendWhatsApp,
        sendPaymentConfirmation
    };
}