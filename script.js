/**
 * ============================================================================
 * MUZZ SHOP - AUTO ORDER SYSTEM
 * VERSION: 3.0.0
 * FULL JAVASCRIPT WITH ALL FUNCTIONALITIES
 * ============================================================================
 */

// ==================== GLOBAL VARIABLES ====================
let currentUser = null;
let currentFilter = 'all';
let selectedProduct = null;
let selectedRam = null;
let selectedTitle = null;
let selectedRamTitle = null;
let selectedTitleItem = null;
let selectedItem = null;
let selectedBot = null;
let selectedBaseApk = null;
let selectedRank = null;
let selectedScriptVip = null;
let selectedPaidPromote = null;
let selectedListMmMc = null;
let selectedDmFF = null;
let selectedRobux = null;
let selectedDmMl = null;
let selectedBoostLike = null;
let selectedBoostFollowers = null;
let selectedBoostView = null;
let timerInterval = null;
let resetEmailTemp = '';

// ==================== KURS VALUTA ====================
const KURS = {
    MYR_TO_IDR: 3500,
    IDR_TO_MYR: 1 / 3500
};

// ==================== FORMATTER ====================
const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

const myrFormatter = new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

// ==================== DATA PRODUK LENGKAP ====================
const products = [
    {
        id: 1,
        name: "Panel Pterodactyl (Biasa)",
        price: "RM 0.40 - RM 2",
        priceIdr: 1400,
        icon: "🖥️",
        desc: "Panel hosting game premium tanpa title",
        category: "Panel",
        features: ["1 GB - Unlimited", "Pilih RAM sesuai kebutuhan"],
        type: "panelBiasa"
    },
    {
        id: 2,
        name: "Panel Pterodactyl (Title)",
        price: "RM 4.40 - RM 31",
        priceIdr: 15400,
        icon: "👑",
        desc: "Panel hosting game dengan title Reseller/PT/Owner/CEO",
        category: "Panel",
        features: ["Reseller", "PT", "Owner", "CEO"],
        type: "panelTitle"
    },
    {
        id: 3,
        name: "Murid Bug",
        price: "RM 2 - RM 9",
        priceIdr: 7000,
        icon: "🐛",
        desc: "Bug exploit untuk berbagai layanan",
        category: "Bug",
        features: ["Akses", "Reseller", "VIP", "Owner", "CEO"],
        type: "muridBug"
    },
    {
        id: 4,
        name: "Aplikasi Bug Manta",
        price: "RM 1 - RM 25",
        priceIdr: 3500,
        icon: "🦈",
        desc: "Unlimited quota bug for Manta",
        category: "Bug",
        features: ["Harian", "Bulanan", "Full Up", "Reseller", "PT"],
        type: "bugManta"
    },
    {
        id: 5,
        name: "Bot WhatsApp",
        price: "RM 3 - RM 10",
        priceIdr: 10500,
        icon: "🤖",
        desc: "Bot WhatsApp dengan berbagai paket",
        category: "Bot",
        features: ["6 Paket Tersedia"],
        type: "bot"
    },
    {
        id: 6,
        name: "Script Auto Order",
        price: "Rp 35.000",
        priceIdr: 35000,
        icon: "📝",
        desc: "Auto order script for marketplace",
        category: "Script",
        features: ["Multi Account", "Anti Detect"],
        type: "normal"
    },
    {
        id: 7,
        name: "Base APK",
        price: "RM 3 - RM 10",
        priceIdr: 10500,
        icon: "📱",
        desc: "Base APK berbagai pilihan",
        category: "BaseAPK",
        features: ["8 Pilihan Base APK"],
        type: "baseApk"
    },
    {
        id: 8,
        name: "Web Create Script WA",
        price: "Rp 5.000/rank",
        priceIdr: 5000,
        icon: "🌐",
        desc: "Web script WA dengan rank",
        category: "Script",
        features: ["20 Rank Tersedia"],
        type: "webScript"
    },
    {
        id: 9,
        name: "Script VIP",
        price: "RM 1 - RM 3",
        priceIdr: 3500,
        icon: "⭐",
        desc: "Koleksi script premium via Telegram",
        category: "Script",
        features: ["12 Script Tersedia"],
        type: "scriptVip"
    },
    {
        id: 10,
        name: "Paid Promote WA",
        price: "RM 1 - RM 7",
        priceIdr: 3500,
        icon: "📢",
        desc: "Promote produk di WhatsApp",
        category: "Promote",
        features: ["4 Paket Tersedia"],
        type: "paidPromote"
    },
    {
        id: 11,
        name: "List MM/MC Muz",
        price: "FREE - RM 20",
        priceIdr: 0,
        icon: "📋",
        desc: "List MM/MC Muz",
        category: "Script",
        features: ["7 Pilihan Tersedia"],
        type: "listMmMc"
    },
    {
        id: 12,
        name: "DM Free Fire",
        price: "RM 2 - RM 335",
        priceIdr: 7000,
        icon: "🔥",
        desc: "Top Up Diamond Free Fire",
        category: "Game",
        features: ["15 Pilihan DM"],
        type: "dmFreeFire"
    },
    {
        id: 13,
        name: "Robux",
        price: "RM 4 - RM 250",
        priceIdr: 14000,
        icon: "💰",
        desc: "Top Up Robux Roblox",
        category: "Game",
        features: ["9 Pilihan + Custom"],
        type: "robux"
    },
    {
        id: 14,
        name: "DM ML",
        price: "RM 1.50 - RM 503",
        priceIdr: 5250,
        icon: "⚔️",
        desc: "Top Up Diamond Mobile Legends",
        category: "Game",
        features: ["11 Pilihan DM"],
        type: "dmMl"
    },
    {
        id: 15,
        name: "Boost Like TikTok",
        price: "RM 3 - RM 23",
        priceIdr: 10500,
        icon: "❤️",
        desc: "Boost like untuk TikTok",
        category: "TikTok",
        features: ["5 Paket Tersedia"],
        type: "boostLikeTikTok"
    },
    {
        id: 16,
        name: "Boost Followers TikTok",
        price: "RM 2 - RM 33",
        priceIdr: 7000,
        icon: "👥",
        desc: "Boost followers untuk TikTok",
        category: "TikTok",
        features: ["5 Paket Tersedia"],
        type: "boostFollowersTikTok"
    },
    {
        id: 17,
        name: "Boost View TikTok",
        price: "RM 2 - RM 20",
        priceIdr: 7000,
        icon: "👁️",
        desc: "Boost view untuk TikTok",
        category: "TikTok",
        features: ["5 Paket Tersedia"],
        type: "boostViewTikTok"
    }
];

// ==================== DATA PAKET LENGKAP ====================
const ramData = [
    { name: "1 GB", rm: "0.40", idr: 1400, price_myr: 0.40, price_idr: 1400 },
    { name: "2 GB", rm: "0.50", idr: 1750, price_myr: 0.50, price_idr: 1750 },
    { name: "3 GB", rm: "0.60", idr: 2100, price_myr: 0.60, price_idr: 2100 },
    { name: "4 GB", rm: "0.70", idr: 2450, price_myr: 0.70, price_idr: 2450 },
    { name: "5 GB", rm: "0.80", idr: 2800, price_myr: 0.80, price_idr: 2800 },
    { name: "6 GB", rm: "0.90", idr: 3150, price_myr: 0.90, price_idr: 3150 },
    { name: "7 GB", rm: "1.00", idr: 3500, price_myr: 1.00, price_idr: 3500 },
    { name: "8 GB", rm: "1.10", idr: 3850, price_myr: 1.10, price_idr: 3850 },
    { name: "9 GB", rm: "1.20", idr: 4200, price_myr: 1.20, price_idr: 4200 },
    { name: "Unlimited", rm: "2.00", idr: 7000, price_myr: 2.00, price_idr: 7000 }
];

const titleData = [
    { name: "Reseller", rm: "4", idr: 14000, price_myr: 4, price_idr: 14000 },
    { name: "PT (Premium)", rm: "25", idr: 87500, price_myr: 25, price_idr: 87500 },
    { name: "Owner", rm: "5", idr: 17500, price_myr: 5, price_idr: 17500 },
    { name: "CEO", rm: "6", idr: 21000, price_myr: 6, price_idr: 21000 }
];

const muridBugData = [
    { name: "Akses", rm: "2", idr: 7000, price_myr: 2, price_idr: 7000, desc: "Full akses bug" },
    { name: "Reseller", rm: "4", idr: 14000, price_myr: 4, price_idr: 14000, desc: "Bisa jual, harga reseller" },
    { name: "VIP", rm: "5", idr: 17500, price_myr: 5, price_idr: 17500, desc: "Prioritas, support 24/7" },
    { name: "Owner", rm: "7", idr: 24500, price_myr: 7, price_idr: 24500, desc: "Full akses, update forever" },
    { name: "CEO", rm: "9", idr: 31500, price_myr: 9, price_idr: 31500, desc: "Semua fitur, support prioritas" }
];

const bugMantaData = [
    { name: "Member Harian (1 Hari)", rm: "1", idr: 3500, price_myr: 1, price_idr: 3500, duration: "1 Hari" },
    { name: "Member Bulanan (30 Hari)", rm: "10", idr: 35000, price_myr: 10, price_idr: 35000, duration: "30 Hari" },
    { name: "Full Up (Permanent)", rm: "15", idr: 52500, price_myr: 15, price_idr: 52500, duration: "Permanent" },
    { name: "Reseller (Permanent)", rm: "20", idr: 70000, price_myr: 20, price_idr: 70000, duration: "Permanent" },
    { name: "PT (Permanent)", rm: "25", idr: 87500, price_myr: 25, price_idr: 87500, duration: "Permanent" }
];

const botData = [
    { name: "Bot Jaga Group", rm: "3", idr: 10500, price_myr: 3, price_idr: 10500, desc: "Bot untuk menjaga group" },
    { name: "Bot Panel via WS", rm: "3", idr: 10500, price_myr: 3, price_idr: 10500, desc: "Bot panel via WhatsApp" },
    { name: "Bot Promote", rm: "3", idr: 10500, price_myr: 3, price_idr: 10500, desc: "Bot untuk promote produk" },
    { name: "Bot Sederhana (300+ fitur)", rm: "4", idr: 14000, price_myr: 4, price_idr: 14000, desc: "300+ fitur siap pakai" },
    { name: "Bot MD (2000+ fitur)", rm: "7", idr: 24500, price_myr: 7, price_idr: 24500, desc: "2000+ fitur premium" },
    { name: "Custom Bot (Request fitur)", rm: "10", idr: 35000, price_myr: 10, price_idr: 35000, desc: "Bebas request fitur" }
];

const baseApkData = [
    { name: "Base APK Xcube (Ada RAT)", rm: "10", idr: 35000, price_myr: 10, price_idr: 35000, desc: "Ada RAT" },
    { name: "Base APK Miyako (No RAT)", rm: "3", idr: 10500, price_myr: 3, price_idr: 10500, desc: "No RAT" },
    { name: "Base APK RVSDP (No RAT)", rm: "5", idr: 17500, price_myr: 5, price_idr: 17500, desc: "No RAT" },
    { name: "Base APK Dheat Core (No RAT)", rm: "5", idr: 17500, price_myr: 5, price_idr: 17500, desc: "No RAT" },
    { name: "Base APK Magnum X (Ada RAT)", rm: "10", idr: 35000, price_myr: 10, price_idr: 35000, desc: "Ada RAT" },
    { name: "Base APK Dheat Core V2 (Ada RAT)", rm: "10", idr: 35000, price_myr: 10, price_idr: 35000, desc: "Ada RAT" },
    { name: "Base APK Glacier (Ada RAT)", rm: "5", idr: 17500, price_myr: 5, price_idr: 17500, desc: "Ada RAT" },
    { name: "Base APK Valhalla (No RAT)", rm: "7", idr: 24500, price_myr: 7, price_idr: 24500, desc: "No RAT" }
];

const rankData = [
    "⚪ Silver", "🟠 Gold", "🔵 Platinum", "🟣 Diamond", "🔴 Master", "🟡 Grandmaster",
    "☣️ Legend", "♋ Heroic", "Ⓜ️ Mytich", "🌀 Supreme", "✡️ Eternal", "🪯 Imortal",
    "♒ Phantom", "🚹 Dominator", "⚛️ Conqueror", "☦️ Emperor", "✡️ Nether", "🔯 Aether", "♋ Wither", "☯️ Epsilon"
];

const scriptVipData = [
    { name: "Sc Auto Order Notel", rm: "3", idr: 10500, price_myr: 3, price_idr: 10500 },
    { name: "Sc Auto Order", rm: "2", idr: 7000, price_myr: 2, price_idr: 7000 },
    { name: "Sc Fix Merah", rm: "1", idr: 3500, price_myr: 1, price_idr: 3500 },
    { name: "Sc Gacha", rm: "2", idr: 7000, price_myr: 2, price_idr: 7000 },
    { name: "Sc AI", rm: "3", idr: 10500, price_myr: 3, price_idr: 10500 },
    { name: "Sc Asisten", rm: "2", idr: 7000, price_myr: 2, price_idr: 7000 },
    { name: "Sc Jaseb", rm: "3", idr: 10500, price_myr: 3, price_idr: 10500 },
    { name: "SC Auto Report Telegram", rm: "1", idr: 3500, price_myr: 1, price_idr: 3500 },
    { name: "Sc Ubot Auto Order", rm: "1", idr: 3500, price_myr: 1, price_idr: 3500 },
    { name: "Sc Nted V9", rm: "1", idr: 3500, price_myr: 1, price_idr: 3500 },
    { name: "Sc Zerk MD", rm: "1", idr: 3500, price_myr: 1, price_idr: 3500 },
    { name: "Sc Tools", rm: "1", idr: 3500, price_myr: 1, price_idr: 3500 }
];

const promoteData = [
    { name: "Promote 1x", rm: "1", idr: 3500, price_myr: 1, price_idr: 3500, isCustom: false },
    { name: "Promote 5x", rm: "3", idr: 10500, price_myr: 3, price_idr: 10500, isCustom: false },
    { name: "Promote 10x", rm: "7", idr: 24500, price_myr: 7, price_idr: 24500, isCustom: false },
    { name: "Promote Sampai Sold", rm: "0", idr: 0, price_myr: 0, price_idr: 0, isCustom: true }
];

const listData = [
    { name: "1-99", rm: "0", idr: 0, price_myr: 0, price_idr: 0, isFree: true },
    { name: "100-199", rm: "0.50", idr: 1750, price_myr: 0.50, price_idr: 1750, isFree: false },
    { name: "200-299", rm: "1", idr: 3500, price_myr: 1, price_idr: 3500, isFree: false },
    { name: "300-399", rm: "2", idr: 7000, price_myr: 2, price_idr: 7000, isFree: false },
    { name: "400-499", rm: "3", idr: 10500, price_myr: 3, price_idr: 10500, isFree: false },
    { name: "500-1k++", rm: "5", idr: 17500, price_myr: 5, price_idr: 17500, isFree: false },
    { name: "Swap", rm: "20", idr: 70000, price_myr: 20, price_idr: 70000, isFree: false, isSwap: true }
];

const dmFFData = [
    { amount: "25 DM", rm: "2", idr: 7000, price_myr: 2, price_idr: 7000 },
    { amount: "50 DM", rm: "3", idr: 10500, price_myr: 3, price_idr: 10500 },
    { amount: "100 DM", rm: "5", idr: 17500, price_myr: 5, price_idr: 17500 },
    { amount: "200 DM", rm: "8", idr: 28000, price_myr: 8, price_idr: 28000 },
    { amount: "300 DM", rm: "12", idr: 42000, price_myr: 12, price_idr: 42000 },
    { amount: "310 DM", rm: "13", idr: 45500, price_myr: 13, price_idr: 45500 },
    { amount: "520 DM", rm: "18", idr: 63000, price_myr: 18, price_idr: 63000 },
    { amount: "830 DM", rm: "30", idr: 105000, price_myr: 30, price_idr: 105000 },
    { amount: "930 DM", rm: "34", idr: 119000, price_myr: 34, price_idr: 119000 },
    { amount: "1060 DM", rm: "35", idr: 122500, price_myr: 35, price_idr: 122500 },
    { amount: "1580 DM", rm: "52", idr: 182000, price_myr: 52, price_idr: 182000 },
    { amount: "2180 DM", rm: "70", idr: 245000, price_myr: 70, price_idr: 245000 },
    { amount: "3240 DM", rm: "105", idr: 367500, price_myr: 105, price_idr: 367500 },
    { amount: "5600 DM", rm: "165", idr: 577500, price_myr: 165, price_idr: 577500 },
    { amount: "11500 DM", rm: "335", idr: 1172500, price_myr: 335, price_idr: 1172500 }
];

const robuxData = [
    { amount: "100 Robux", rm: "4", idr: 14000, price_myr: 4, price_idr: 14000, isCustom: false },
    { amount: "300 Robux", rm: "8", idr: 28000, price_myr: 8, price_idr: 28000, isCustom: false },
    { amount: "500 Robux", rm: "15", idr: 52500, price_myr: 15, price_idr: 52500, isCustom: false },
    { amount: "1.000 Robux", rm: "30", idr: 105000, price_myr: 30, price_idr: 105000, isCustom: false },
    { amount: "1.500 Robux", rm: "50", idr: 175000, price_myr: 50, price_idr: 175000, isCustom: false },
    { amount: "2.000 Robux", rm: "60", idr: 210000, price_myr: 60, price_idr: 210000, isCustom: false },
    { amount: "3.000 Robux", rm: "100", idr: 350000, price_myr: 100, price_idr: 350000, isCustom: false },
    { amount: "5.000 Robux", rm: "170", idr: 595000, price_myr: 170, price_idr: 595000, isCustom: false },
    { amount: "10.000 Robux", rm: "250", idr: 875000, price_myr: 250, price_idr: 875000, isCustom: false },
    { amount: "Custom Robux", rm: "0", idr: 0, price_myr: 0, price_idr: 0, isCustom: true }
];

const dmMlData = [
    { amount: "13 DM", rm: "1.50", idr: 5250, price_myr: 1.50, price_idr: 5250 },
    { amount: "42 DM", rm: "4", idr: 14000, price_myr: 4, price_idr: 14000 },
    { amount: "70 DM", rm: "7", idr: 24500, price_myr: 7, price_idr: 24500 },
    { amount: "140 DM", rm: "12", idr: 42000, price_myr: 12, price_idr: 42000 },
    { amount: "284 DM", rm: "22", idr: 77000, price_myr: 22, price_idr: 77000 },
    { amount: "355 DM", rm: "28", idr: 98000, price_myr: 28, price_idr: 98000 },
    { amount: "429 DM", rm: "34", idr: 119000, price_myr: 34, price_idr: 119000 },
    { amount: "716 DM", rm: "55", idr: 192500, price_myr: 55, price_idr: 192500 },
    { amount: "1446 DM", rm: "105", idr: 367500, price_myr: 105, price_idr: 367500 },
    { amount: "2976 DM", rm: "207", idr: 724500, price_myr: 207, price_idr: 724500 },
    { amount: "7502 DM", rm: "503", idr: 1760500, price_myr: 503, price_idr: 1760500 }
];

const boostLikeData = [
    { amount: "2k Likes", rm: "3", idr: 10500, price_myr: 3, price_idr: 10500 },
    { amount: "5k Likes", rm: "7", idr: 24500, price_myr: 7, price_idr: 24500 },
    { amount: "10k Likes", rm: "12", idr: 42000, price_myr: 12, price_idr: 42000 },
    { amount: "20k Likes", rm: "20", idr: 70000, price_myr: 20, price_idr: 70000 },
    { amount: "30k Likes", rm: "23", idr: 80500, price_myr: 23, price_idr: 80500 }
];

const boostFollowersData = [
    { amount: "100 Followers", rm: "2", idr: 7000, price_myr: 2, price_idr: 7000 },
    { amount: "500 Followers", rm: "7", idr: 24500, price_myr: 7, price_idr: 24500 },
    { amount: "1k Followers", rm: "12", idr: 42000, price_myr: 12, price_idr: 42000 },
    { amount: "2k Followers", rm: "22", idr: 77000, price_myr: 22, price_idr: 77000 },
    { amount: "3k Followers", rm: "33", idr: 115500, price_myr: 33, price_idr: 115500 }
];

const boostViewData = [
    { amount: "2k Views", rm: "2", idr: 7000, price_myr: 2, price_idr: 7000 },
    { amount: "5k Views", rm: "4", idr: 14000, price_myr: 4, price_idr: 14000 },
    { amount: "10k Views", rm: "7", idr: 24500, price_myr: 7, price_idr: 24500 },
    { amount: "20k Views", rm: "10", idr: 35000, price_myr: 10, price_idr: 35000 },
    { amount: "50k Views", rm: "20", idr: 70000, price_myr: 20, price_idr: 70000 }
];

// ==================== AUTHENTICATION FUNCTIONS ====================
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const publicPages = ['index.html', 'login.html', 'register.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (!currentUser && !publicPages.includes(currentPage)) {
        window.location.href = 'login.html';
        return null;
    }
    return currentUser;
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('pendingOrder');
    window.location.href = 'index.html';
}

function login() {
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;
    const errorDiv = document.getElementById('errorMsg');
    
    if (errorDiv) errorDiv.style.display = 'none';
    
    if (!email || !password) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Email dan password wajib diisi!';
        }
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Email atau password salah!';
        }
    }
}

function register() {
    const name = document.getElementById('regName')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim();
    const wa = document.getElementById('regWa')?.value.trim();
    const password = document.getElementById('regPassword')?.value;
    const confirmPassword = document.getElementById('regConfirmPassword')?.value;
    const errorDiv = document.getElementById('errorMsg');
    const successDiv = document.getElementById('successMsg');
    
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
    
    if (!name || !email || !password) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Semua field harus diisi!';
        }
        return;
    }
    
    if (password !== confirmPassword) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Password tidak cocok!';
        }
        return;
    }
    
    if (password.length < 4) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Password minimal 4 karakter!';
        }
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Email sudah terdaftar!';
        }
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        wa: wa || '-',
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    if (successDiv) {
        successDiv.style.display = 'block';
        successDiv.innerHTML = '✅ Registrasi berhasil! Redirecting to login...';
    }
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// ==================== FORGOT PASSWORD FUNCTIONS ====================
function openForgotModal() {
    const modal = document.getElementById('forgotModal');
    if (modal) {
        document.getElementById('step1').style.display = 'block';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('resetEmail').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmNewPassword').value = '';
        document.getElementById('forgotErrorMsg').style.display = 'none';
        document.getElementById('forgotSuccessMsg').style.display = 'none';
        modal.classList.add('active');
    }
}

function closeForgotModal() {
    const modal = document.getElementById('forgotModal');
    if (modal) modal.classList.remove('active');
}

function verifyEmail() {
    const email = document.getElementById('resetEmail').value;
    const errorDiv = document.getElementById('forgotErrorMsg');
    const successDiv = document.getElementById('forgotSuccessMsg');
    
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
    
    if (!email) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Masukkan email Anda!';
        }
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Email tidak ditemukan! Silakan register terlebih dahulu.';
        }
        return;
    }
    
    resetEmailTemp = email;
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    
    if (successDiv) {
        successDiv.style.display = 'block';
        successDiv.innerHTML = '✅ Email terverifikasi! Masukkan password baru Anda.';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 2000);
    }
}

function resetPassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    const errorDiv = document.getElementById('forgotErrorMsg');
    const successDiv = document.getElementById('forgotSuccessMsg');
    
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
    
    if (!newPassword || !confirmPassword) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Isi kedua field password!';
        }
        return;
    }
    
    if (newPassword.length < 4) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Password minimal 4 karakter!';
        }
        return;
    }
    
    if (newPassword !== confirmPassword) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Password tidak cocok!';
        }
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === resetEmailTemp);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        
        if (successDiv) {
            successDiv.style.display = 'block';
            successDiv.innerHTML = '✅ Password berhasil diubah! Silakan login dengan password baru Anda.';
        }
        
        setTimeout(() => {
            closeForgotModal();
            document.getElementById('loginPassword').value = '';
        }, 2000);
    } else {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ User tidak ditemukan!';
        }
    }
}

function backToStep1() {
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('resetEmail').value = '';
    document.getElementById('forgotErrorMsg').style.display = 'none';
    document.getElementById('forgotSuccessMsg').style.display = 'none';
}

// ==================== DASHBOARD FUNCTIONS ====================
function loadDashboard() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('welcomeName').innerHTML = `Halo, ${user.name}! 👋`;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = orders.filter(o => o.customerEmail === user.email);
    
    document.getElementById('orderCount').innerHTML = userOrders.length;
    
    const ordersList = document.getElementById('ordersList');
    if (ordersList) {
        if (userOrders.length === 0) {
            ordersList.innerHTML = `
                <div class="empty-orders">
                    <i class="fas fa-inbox"></i>
                    <p>Belum ada pesanan</p>
                    <a href="products.html" style="color:#00d2ff; text-decoration:none;">Mulai belanja sekarang</a>
                </div>
            `;
        } else {
            ordersList.innerHTML = userOrders.reverse().map(order => `
                <div class="order-item">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                        <div>
                            <strong>${order.productName}</strong><br>
                            <small style="color: #718096;">ID: ${order.orderId}</small><br>
                            <small style="color: #718096;">${order.date}</small><br>
                            <small style="color: #718096;">Total: Rp ${order.price.toLocaleString()}</small>
                        </div>
                        <span style="background: ${order.status === 'paid' ? '#22c55e' : '#eab308'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem;">
                            ${order.status === 'paid' ? '✅ Lunas' : '⏳ Menunggu Pembayaran'}
                        </span>
                    </div>
                </div>
            `).join('');
        }
    }
}

// ==================== PRODUCTS FUNCTIONS ====================
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    let filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="text-align:center; grid-column:1/-1; padding:3rem; color:white;">Tidak ada produk di kategori ini</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card" onclick="buyProduct(${product.id})">
            <div class="badge-category">${product.category}</div>
            <div class="product-icon">${product.icon}</div>
            <div class="product-title">${product.name}</div>
            <div class="product-price">
                ${product.price}<br>
                <span style="font-size:0.8rem; color:#666;">Rp ${product.priceIdr.toLocaleString()}</span>
            </div>
            <div class="product-desc">${product.desc}</div>
            <div class="product-features">${product.features.map(f => `<span>✓ ${f}</span>`).join('')}</div>
            <button class="btn-buy">Beli Sekarang →</button>
        </div>
    `).join('');
}

function filterProducts(category) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === category.toLowerCase() || (category === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });
    renderProducts();
}

function buyProduct(productId) {
    const user = checkAuth();
    if (!user) return;
    
    const product = products.find(p => p.id === productId);
    selectedProduct = product;
    
    // Untuk produk normal langsung checkout
    if (product.type === 'normal') {
        const pendingOrder = {
            orderId: 'ORD' + Date.now() + Math.floor(Math.random() * 1000),
            productId: product.id,
            productName: product.name,
            price: product.priceIdr,
            customerName: user.name,
            customerEmail: user.email,
            customerPhone: user.wa || '-',
            date: new Date().toLocaleString('id-ID'),
            timestamp: Date.now()
        };
        localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
        window.location.href = 'checkout.html';
        return;
    }
    
    // Untuk produk dengan pilihan, buka modal
    const modalId = product.type + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        modal.classList.add('active');
        loadProductOptions();
    }
}

function loadProductOptions() {
    if (selectedProduct.type === 'panelBiasa') loadRamBiasaOptions();
    else if (selectedProduct.type === 'panelTitle') { loadRamTitleOptions(); loadTitleOptions(); }
    else if (selectedProduct.type === 'muridBug') loadMuridBugOptions();
    else if (selectedProduct.type === 'bugManta') loadBugMantaOptions();
    else if (selectedProduct.type === 'bot') loadBotOptions();
    else if (selectedProduct.type === 'baseApk') loadBaseApkOptions();
    else if (selectedProduct.type === 'webScript') loadRankOptions();
    else if (selectedProduct.type === 'scriptVip') loadScriptVipOptions();
    else if (selectedProduct.type === 'paidPromote') loadPaidPromoteOptions();
    else if (selectedProduct.type === 'listMmMc') loadListOptions();
    else if (selectedProduct.type === 'dmFreeFire') loadDmFFOptions();
    else if (selectedProduct.type === 'robux') loadRobuxOptions();
    else if (selectedProduct.type === 'dmMl') loadDmMlOptions();
    else if (selectedProduct.type === 'boostLikeTikTok') loadBoostLikeOptions();
    else if (selectedProduct.type === 'boostFollowersTikTok') loadBoostFollowersOptions();
    else if (selectedProduct.type === 'boostViewTikTok') loadBoostViewOptions();
}

// ==================== PANEL FUNCTIONS ====================
function loadRamBiasaOptions() {
    const container = document.getElementById('ramBiasaOptions');
    if (!container) return;
    container.innerHTML = ramData.map((item, i) => `
        <div class="package-option" onclick="selectRamBiasa(${i})" id="ramBiasaOption${i}">
            <span class="package-name">${item.name}</span>
            <span class="package-price">RM ${item.rm} / Rp ${item.idr.toLocaleString()}</span>
        </div>
    `).join('');
}

function selectRamBiasa(index) {
    clearSelection('ramBiasaOptions');
    document.querySelectorAll('#ramBiasaOptions .package-option')[index].classList.add('selected');
    selectedRam = ramData[index];
}

function confirmPanelBiasa() {
    if (!selectedRam) { alert('Silakan pilih RAM terlebih dahulu!'); return; }
    closeModal('panelBiasaModal');
    proceedToCheckout(selectedRam.idr, `${selectedProduct.name} - ${selectedRam.name}`);
}

function loadRamTitleOptions() {
    const container = document.getElementById('ramTitleOptions');
    if (!container) return;
    container.innerHTML = ramData.map((item, i) => `
        <div class="package-option" onclick="selectRamTitle(${i})" id="ramTitleOption${i}">
            <span class="package-name">${item.name}</span>
            <span class="package-price">RM ${item.rm}</span>
        </div>
    `).join('');
}

function selectRamTitle(index) {
    clearSelection('ramTitleOptions');
    document.querySelectorAll('#ramTitleOptions .package-option')[index].classList.add('selected');
    selectedRamTitle = ramData[index];
    updateTotalTitle();
}

function loadTitleOptions() {
    const container = document.getElementById('titleOptions');
    if (!container) return;
    container.innerHTML = titleData.map((item, i) => `
        <div class="package-option" onclick="selectTitle(${i})" id="titleOption${i}">
            <span class="package-name">${item.name}</span>
            <span class="package-price">RM ${item.rm}</span>
        </div>
    `).join('');
}

function selectTitle(index) {
    clearSelection('titleOptions');
    document.querySelectorAll('#titleOptions .package-option')[index].classList.add('selected');
    selectedTitleItem = titleData[index];
    updateTotalTitle();
}

function updateTotalTitle() {
    let total = 0;
    if (selectedRamTitle) total += parseFloat(selectedRamTitle.rm);
    if (selectedTitleItem) total += parseFloat(selectedTitleItem.rm);
    const span = document.getElementById('totalPriceTitle');
    if (span) span.innerHTML = `RM ${total.toFixed(2)}`;
}

function confirmPanelTitle() {
    if (!selectedRamTitle) { alert('Silakan pilih RAM terlebih dahulu!'); return; }
    if (!selectedTitleItem) { alert('Silakan pilih Title terlebih dahulu!'); return; }
    closeModal('panelTitleModal');
    const totalIdr = selectedRamTitle.idr + selectedTitleItem.idr;
    proceedToCheckout(totalIdr, `${selectedProduct.name} - ${selectedRamTitle.name} (${selectedTitleItem.name})`);
}

// ==================== MURID BUG FUNCTIONS ====================
function loadMuridBugOptions() {
    const container = document.getElementById('muridBugOptions');
    if (!container) return;
    container.innerHTML = muridBugData.map((item, i) => `
        <div class="package-option" onclick="selectMuridBug(${i})" id="muridBugOption${i}">
            <span class="package-name">${item.name}</span>
            <span class="package-price">RM ${item.rm} / Rp ${item.idr.toLocaleString()}</span>
        </div>
    `).join('');
}

function selectMuridBug(index) {
    clearSelection('muridBugOptions');
    document.querySelectorAll('#muridBugOptions .package-option')[index].classList.add('selected');
    selectedItem = muridBugData[index];
}

function confirmMuridBug() {
    if (!selectedItem) { alert('Silakan pilih paket terlebih dahulu!'); return; }
    closeModal('muridBugModal');
    proceedToCheckout(selectedItem.idr, `${selectedProduct.name} - ${selectedItem.name}`);
}

// ==================== BUG MANTA FUNCTIONS ====================
function loadBugMantaOptions() {
    const container = document.getElementById('bugMantaOptions');
    if (!container) return;
    container.innerHTML = bugMantaData.map((item, i) => `
        <div class="package-option" onclick="selectBugManta(${i})" id="bugMantaOption${i}">
            <span class="package-name">${item.name}</span>
            <span class="package-price">RM ${item.rm} / Rp ${item.idr.toLocaleString()}</span>
        </div>
    `).join('');
}

function selectBugManta(index) {
    clearSelection('bugMantaOptions');
    document.querySelectorAll('#bugMantaOptions .package-option')[index].classList.add('selected');
    selectedItem = bugMantaData[index];
}

function confirmBugManta() {
    if (!selectedItem) { alert('Silakan pilih paket terlebih dahulu!'); return; }
    closeModal('bugMantaModal');
    proceedToCheckout(selectedItem.idr, `${selectedProduct.name} - ${selectedItem.name}`);
}

// ==================== BOT WHATSAPP FUNCTIONS ====================
function loadBotOptions() {
    const container = document.getElementById('botOptions');
    if (!container) return;
    container.innerHTML = botData.map((item, i) => `
        <div class="package-option" onclick="selectBot(${i})" id="botOption${i}">
            <span class="package-name">${item.name}</span>
            <span class="package-price">RM ${item.rm} / Rp ${item.idr.toLocaleString()}</span>
        </div>
    `).join('');
}

function selectBot(index) {
    clearSelection('botOptions');
    document.querySelectorAll('#botOptions .package-option')[index].classList.add('selected');
    selectedBot = botData[index];
}

function confirmBot() {
    if (!selectedBot) { alert('Silakan pilih paket bot terlebih dahulu!'); return; }
    closeModal('botModal');
    if (selectedBot.name.includes('Custom Bot')) {
        const fitur = prompt('Masukkan daftar fitur yang diinginkan untuk Custom Bot:', 'Fitur 1, Fitur 2, Fitur 3...');
        proceedToCheckout(selectedBot.idr, `${selectedProduct.name} - Custom Bot (Fitur: ${fitur || 'Tidak ada fitur'})`);
    } else {
        proceedToCheckout(selectedBot.idr, `${selectedProduct.name} - ${selectedBot.name}`);
    }
}

// ==================== BASE APK FUNCTIONS ====================
function loadBaseApkOptions() {
    const container = document.getElementById('baseApkOptions');
    if (!container) return;
    container.innerHTML = baseApkData.map((item, i) => `
        <div class="package-option" onclick="selectBaseApk(${i})" id="baseApkOption${i}">
            <span class="package-name">${item.name}</span>
            <span class="package-price">RM ${item.rm} / Rp ${item.idr.toLocaleString()}</span>
        </div>
    `).join('');
}

function selectBaseApk(index) {
    clearSelection('baseApkOptions');
    document.querySelectorAll('#baseApkOptions .package-option')[index].classList.add('selected');
    selectedBaseApk = baseApkData[index];
}

function confirmBaseApk() {
    if (!selectedBaseApk) { alert('Silakan pilih Base APK terlebih dahulu!'); return; }
    closeModal('baseApkModal');
    proceedToCheckout(selectedBaseApk.idr, `${selectedProduct.name} - ${selectedBaseApk.name}`);
}

// ==================== WEB SCRIPT FUNCTIONS ====================
function loadRankOptions() {
    const container = document.getElementById('rankOptions');
    if (!container) return;
    container.innerHTML = rankData.map((rank, i) => `
        <div class="package-option" onclick="selectRank(${i})" id="rankOption${i}">
            <span class="package-name">${rank}</span>
            <span class="package-price">Rp 5.000</span>
        </div>
    `).join('');
}

function selectRank(index) {
    clearSelection('rankOptions');
    document.querySelectorAll('#rankOptions .package-option')[index].classList.add('selected');
    selectedRank = rankData[index];
}

function confirmWebScript() {
    if (!selectedRank) { alert('Silakan pilih rank terlebih dahulu!'); return; }
    closeModal('webScriptModal');
    proceedToCheckout(5000, `${selectedProduct.name} - ${selectedRank}`);
}

// ==================== SCRIPT VIP FUNCTIONS ====================
function loadScriptVipOptions() {
    const container = document.getElementById('scriptVipOptions');
    if (!container) return;
    container.innerHTML = scriptVipData.map((item, i) => `
        <div class="package-option" onclick="selectScriptVip(${i})" id="scriptVipOption${i}">
            <span class="package-name">${item.name}</span>
            <span class="package-price">RM ${item.rm} / Rp ${item.idr.toLocaleString()}</span>
        </div>
    `).join('');
}

function selectScriptVip(index) {
    clearSelection('scriptVipOptions');
    document.querySelectorAll('#scriptVipOptions .package-option')[index].classList.add('selected');
    selectedScriptVip = scriptVipData[index];
}

function confirmScriptVip() {
    if (!selectedScriptVip) { alert('Silakan pilih script terlebih dahulu!'); return; }
    closeModal('scriptVipModal');
    proceedToCheckout(selectedScriptVip.idr, `${selectedProduct.name} - ${selectedScriptVip.name}`);
}

// ==================== PAID PROMOTE FUNCTIONS ====================
function loadPaidPromoteOptions() {
    const container = document.getElementById('paidPromoteOptions');
    if (!container) return;
    container.innerHTML = promoteData.map((item, i) => `
        <div class="package-option" onclick="selectPaidPromote(${i})" id="paidPromoteOption${i}">
            <span class="package-name">${item.name}</span>
            <span class="package-price">${item.isCustom ? 'Sesuai item' : `RM ${item.rm} / Rp ${item.idr.toLocaleString()}`}</span>
        </div>
    `).join('');
    document.getElementById('customPromoteForm').style.display = 'none';
}

function selectPaidPromote(index) {
    clearSelection('paidPromoteOptions');
    document.querySelectorAll('#paidPromoteOptions .package-option')[index].classList.add('selected');
    selectedPaidPromote = promoteData[index];
    const customForm = document.getElementById('customPromoteForm');
    if (customForm) customForm.style.display = selectedPaidPromote.isCustom ? 'block' : 'none';
}

function confirmPaidPromote() {
    if (!selectedPaidPromote) { alert('Silakan pilih paket promote terlebih dahulu!'); return; }
    closeModal('paidPromoteModal');
    if (selectedPaidPromote.isCustom) {
        const itemName = document.getElementById('itemName')?.value;
        const itemPrice = parseFloat(document.getElementById('itemPrice')?.value);
        if (!itemName) { alert('Masukkan nama item!'); return; }
        if (isNaN(itemPrice) || itemPrice <= 0) { alert('Masukkan harga item yang valid!'); return; }
        proceedToCheckout(itemPrice * 3500, `${selectedProduct.name} - ${selectedPaidPromote.name} (${itemName} - RM ${itemPrice})`);
    } else {
        proceedToCheckout(selectedPaidPromote.idr, `${selectedProduct.name} - ${selectedPaidPromote.name}`);
    }
}

// ==================== LIST MM/MC FUNCTIONS ====================
function loadListOptions() {
    const container = document.getElementById('listMmMcOptions');
    if (!container) return;
    container.innerHTML = listData.map((item, i) => `
        <div class="package-option" onclick="selectList(${i})" id="listMmMcOption${i}">
            <span class="package-name">${item.name}</span>
            <span class="package-price">${item.isFree ? 'FREE' : `RM ${item.rm} / Rp ${item.idr.toLocaleString()}`}</span>
        </div>
    `).join('');
    document.getElementById('customSwapForm').style.display = 'none';
}

function selectList(index) {
    clearSelection('listMmMcOptions');
    document.querySelectorAll('#listMmMcOptions .package-option')[index].classList.add('selected');
    selectedListMmMc = listData[index];
    const swapForm = document.getElementById('customSwapForm');
    if (swapForm) swapForm.style.display = selectedListMmMc.isSwap ? 'block' : 'none';
}

function confirmListMmMc() {
    if (!selectedListMmMc) { alert('Silakan pilih jumlah list terlebih dahulu!'); return; }
    closeModal('listMmMcModal');
    if (selectedListMmMc.isSwap) {
        const from = document.getElementById('swapFrom')?.value;
        const to = document.getElementById('swapTo')?.value;
        if (!from || !to) { alert('Masukkan akun asal dan tujuan!'); return; }
        proceedToCheckout(selectedListMmMc.idr, `${selectedProduct.name} - Swap (${from} → ${to})`);
    } else if (selectedListMmMc.isFree) {
        proceedToCheckout(0, `${selectedProduct.name} - ${selectedListMmMc.name} (FREE)`);
    } else {
        proceedToCheckout(selectedListMmMc.idr, `${selectedProduct.name} - ${selectedListMmMc.name}`);
    }
}

// ==================== DM FREE FIRE FUNCTIONS ====================
function loadDmFFOptions() {
    const container = document.getElementById('dmFreeFireOptions');
    if (!container) return;
    container.innerHTML = dmFFData.map((item, i) => `
        <div class="package-option" onclick="selectDmFF(${i})" id="dmFreeFireOption${i}">
            <span class="package-name">${item.amount}</span>
            <span class="package-price">RM ${item.rm} / Rp ${item.idr.toLocaleString()}</span>
        </div>
    `).join('');
}

function selectDmFF(index) {
    clearSelection('dmFreeFireOptions');
    document.querySelectorAll('#dmFreeFireOptions .package-option')[index].classList.add('selected');
    selectedDmFF = dmFFData[index];
}

function confirmDmFreeFire() {
    const ffId = document.getElementById('ffId')?.value;
    if (!selectedDmFF) { alert('Silakan pilih jumlah Diamond terlebih dahulu!'); return; }
    if (!ffId) { alert('Masukkan ID Free Fire Anda!'); return; }
    closeModal('dmFreeFireModal');
    proceedToCheckout(selectedDmFF.idr, `${selectedProduct.name} - ${selectedDmFF.amount} (ID: ${ffId})`);
}

// ==================== ROBUX FUNCTIONS ====================
function loadRobuxOptions() {
    const container = document.getElementById('robuxOptions');
    if (!container) return;
    container.innerHTML = robuxData.map((item, i) => `
        <div class="package-option" onclick="selectRobux(${i})" id="robuxOption${i}">
            <span class="package-name">${item.amount}</span>
            <span class="package-price">${item.isCustom ? 'Custom' : `RM ${item.rm} / Rp ${item.idr.toLocaleString()}`}</span>
        </div>
    `).join('');
    document.getElementById('customRobuxForm').style.display = 'none';
}

function selectRobux(index) {
    clearSelection('robuxOptions');
    document.querySelectorAll('#robuxOptions .package-option')[index].classList.add('selected');
    selectedRobux = robuxData[index];
    const customForm = document.getElementById('customRobuxForm');
    if (customForm) customForm.style.display = selectedRobux.isCustom ? 'block' : 'none';
}

function confirmRobux() {
    const username = document.getElementById('robloxUser')?.value;
    if (!selectedRobux) { alert('Silakan pilih jumlah Robux terlebih dahulu!'); return; }
    if (!username) { alert('Masukkan Username Roblox Anda!'); return; }
    closeModal('robuxModal');
    if (selectedRobux.isCustom) {
        const customAmount = document.getElementById('customRobux')?.value;
        if (!customAmount) { alert('Masukkan jumlah Robux!'); return; }
        const price = Math.ceil(customAmount / 100) * 4 * 3500;
        proceedToCheckout(price, `${selectedProduct.name} - Custom ${customAmount} Robux (User: ${username})`);
    } else {
        proceedToCheckout(selectedRobux.idr, `${selectedProduct.name} - ${selectedRobux.amount} (User: ${username})`);
    }
}

// ==================== DM ML FUNCTIONS ====================
function loadDmMlOptions() {
    const container = document.getElementById('dmMlOptions');
    if (!container) return;
    container.innerHTML = dmMlData.map((item, i) => `
        <div class="package-option" onclick="selectDmMl(${i})" id="dmMlOption${i}">
            <span class="package-name">${item.amount}</span>
            <span class="package-price">RM ${item.rm} / Rp ${item.idr.toLocaleString()}</span>
        </div>
    `).join('');
}

function selectDmMl(index) {
    clearSelection('dmMlOptions');
    document.querySelectorAll('#dmMlOptions .package-option')[index].classList.add('selected');
    selectedDmMl = dmMlData[index];
}

function confirmDmMl() {
    const mlId = document.getElementById('mlId')?.value;
    if (!selectedDmMl) { alert('Silakan pilih jumlah Diamond terlebih dahulu!'); return; }
    if (!mlId) { alert('Masukkan ID Mobile Legends Anda!'); return; }
    closeModal('dmMlModal');
    proceedToCheckout(selectedDmMl.idr, `${selectedProduct.name} - ${selectedDmMl.amount} (ID: ${mlId})`);
}

// ==================== BOOST FUNCTIONS ====================
function loadBoostLikeOptions() {
    const container = document.getElementById('boostLikeOptions');
    if (!container) return;
    container.innerHTML = boostLikeData.map((item, i) => `
        <div class="package-option" onclick="selectBoostLike(${i})" id="boostLikeOption${i}">
            <span class="package-name">${item.amount}</span>
            <span class="package-price">RM ${item.rm} / Rp ${item.idr.toLocaleString()}</span>
        </div>
    `).join('');
}

function selectBoostLike(index) {
    clearSelection('boostLikeOptions');
    document.querySelectorAll('#boostLikeOptions .package-option')[index].classList.add('selected');
    selectedBoostLike = boostLikeData[index];
}

function confirmBoostLike() {
    if (!selectedBoostLike) { alert('Silakan pilih paket boost like terlebih dahulu!'); return; }
    closeModal('boostLikeTikTokModal');
    proceedToCheckout(selectedBoostLike.idr, `${selectedProduct.name} - ${selectedBoostLike.amount}`);
}

function loadBoostFollowersOptions() {
    const container = document.getElementById('boostFollowersOptions');
    if (!container) return;
    container.innerHTML = boostFollowersData.map((item, i) => `
        <div class="package-option" onclick="selectBoostFollowers(${i})" id="boostFollowersOption${i}">
            <span class="package-name">${item.amount}</span>
            <span class="package-price">RM ${item.rm} / Rp ${item.idr.toLocaleString()}</span>
        </div>
    `).join('');
}

function selectBoostFollowers(index) {
    clearSelection('boostFollowersOptions');
    document.querySelectorAll('#boostFollowersOptions .package-option')[index].classList.add('selected');
    selectedBoostFollowers = boostFollowersData[index];
}

function confirmBoostFollowers() {
    if (!selectedBoostFollowers) { alert('Silakan pilih paket boost followers terlebih dahulu!'); return; }
    closeModal('boostFollowersTikTokModal');
    proceedToCheckout(selectedBoostFollowers.idr, `${selectedProduct.name} - ${selectedBoostFollowers.amount}`);
}

function loadBoostViewOptions() {
    const container = document.getElementById('boostViewOptions');
    if (!container) return;
    container.innerHTML = boostViewData.map((item, i) => `
        <div class="package-option" onclick="selectBoostView(${i})" id="boostViewOption${i}">
            <span class="package-name">${item.amount}</span>
            <span class="package-price">RM ${item.rm} / Rp ${item.idr.toLocaleString()}</span>
        </div>
    `).join('');
}

function selectBoostView(index) {
    clearSelection('boostViewOptions');
    document.querySelectorAll('#boostViewOptions .package-option')[index].classList.add('selected');
    selectedBoostView = boostViewData[index];
}

function confirmBoostView() {
    if (!selectedBoostView) { alert('Silakan pilih paket boost view terlebih dahulu!'); return; }
    closeModal('boostViewTikTokModal');
    proceedToCheckout(selectedBoostView.idr, `${selectedProduct.name} - ${selectedBoostView.amount}`);
}

// ==================== HELPER FUNCTIONS ====================
function clearSelection(containerId) {
    const options = document.querySelectorAll(`#${containerId} .package-option`);
    options.forEach(opt => opt.classList.remove('selected'));
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
    // Reset semua selected variables
    selectedItem = null;
    selectedRam = null;
    selectedTitle = null;
    selectedRamTitle = null;
    selectedTitleItem = null;
    selectedBot = null;
    selectedBaseApk = null;
    selectedRank = null;
    selectedScriptVip = null;
    selectedPaidPromote = null;
    selectedListMmMc = null;
    selectedDmFF = null;
    selectedRobux = null;
    selectedDmMl = null;
    selectedBoostLike = null;
    selectedBoostFollowers = null;
    selectedBoostView = null;
}

function proceedToCheckout(price, productName) {
    const user = checkAuth();
    if (!user) return;
    
    const pendingOrder = {
        orderId: 'ORD' + Date.now() + Math.floor(Math.random() * 1000),
        productId: selectedProduct.id,
        productName: productName,
        price: price,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.wa || '-',
        date: new Date().toLocaleString('id-ID'),
        timestamp: Date.now()
    };
    
    localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
    window.location.href = 'checkout.html';
}

// ==================== CHECKOUT FUNCTIONS ====================
function loadCheckout() {
    const user = checkAuth();
    if (!user) return;
    
    const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));
    
    if (!pendingOrder) {
        window.location.href = 'products.html';
        return;
    }
    
    const container = document.getElementById('checkoutContent');
    if (container) {
        container.innerHTML = `
            <div class="order-summary">
                <h3>📋 Detail Pesanan</h3>
                <div class="order-detail"><span>ID Pesanan</span><strong>${pendingOrder.orderId}</strong></div>
                <div class="order-detail"><span>Produk</span><strong>${pendingOrder.productName}</strong></div>
                <div class="order-detail"><span>Total Harga</span><strong class="price-total">Rp ${pendingOrder.price.toLocaleString()}</strong></div>
            </div>
            <div class="order-summary">
                <h3>👤 Informasi Pembeli</h3>
                <div class="order-detail"><span>Nama</span><strong>${pendingOrder.customerName}</strong></div>
                <div class="order-detail"><span>Email</span><strong>${pendingOrder.customerEmail}</strong></div>
                <div class="order-detail"><span>WhatsApp</span><strong>${pendingOrder.customerPhone}</strong></div>
            </div>
            <button class="btn" onclick="goToPayment()">Lanjut ke Pembayaran →</button>
            <a href="products.html" class="back-link">← Kembali ke Produk</a>
        `;
    }
}

function goToPayment() {
    window.location.href = 'payment.html';
}

// ==================== PAYMENT FUNCTIONS ====================
function loadPayment() {
    const user = checkAuth();
    if (!user) return;
    
    const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));
    
    if (!pendingOrder) {
        window.location.href = 'products.html';
        return;
    }
    
    const summaryDiv = document.getElementById('orderSummary');
    if (summaryDiv) {
        summaryDiv.innerHTML = `
            <p><strong>ID Pesanan:</strong> ${pendingOrder.orderId}</p>
            <p><strong>Produk:</strong> ${pendingOrder.productName}</p>
            <p><strong>Total:</strong> <span style="color:#00d2ff; font-weight:700;">Rp ${pendingOrder.price.toLocaleString()}</span></p>
        `;
    }
    
    const qrisApps = ['Dana', 'OVO', 'GoPay', 'LinkAja', 'ShopeePay'];
    const duitnowApps = ['Maybank2u', 'Touch n Go', 'GrabPay', 'Boost', 'RHB Bank'];
    
    const qrisAppsDiv = document.getElementById('qrisApps');
    const duitnowAppsDiv = document.getElementById('duitnowApps');
    
    if (qrisAppsDiv) qrisAppsDiv.innerHTML = qrisApps.map(app => `<span>${app}</span>`).join('');
    if (duitnowAppsDiv) duitnowAppsDiv.innerHTML = duitnowApps.map(app => `<span>${app}</span>`).join('');
    
    // Set QRIS image from assets
    const qrisImage = document.getElementById('qrisImage');
    if (qrisImage) {
        qrisImage.src = '/assets/qris-muzzshop.jpg';
        qrisImage.onerror = function() {
            this.src = 'https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=QRIS-MUZZSHOP';
        };
    }
    
    // Set DuitNow image from assets
    const duitnowImage = document.getElementById('duitnowImage');
    if (duitnowImage) {
        duitnowImage.src = '/assets/duitnow-muzzshop.jpg';
        duitnowImage.onerror = function() {
            this.src = 'https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=DUITNOW-MUZZSHOP';
        };
    }
}

function selectMethod(method) {
    document.querySelectorAll('.method-card').forEach(card => card.classList.remove('selected'));
    document.getElementById(method + 'Card')?.classList.add('selected');
    
    document.querySelectorAll('.payment-detail').forEach(detail => detail.classList.remove('active'));
    document.getElementById(method + 'Detail')?.classList.add('active');
    
    if (timerInterval) clearInterval(timerInterval);
    startTimer(method === 'qris' ? 'qrisTimer' : 'duitnowTimer');
}

function startTimer(elementId) {
    let timeLeft = 1800;
    const timerElement = document.getElementById(elementId);
    if (!timerElement) return;
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.innerHTML = `⏳ Sisa waktu: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;
        if (timeLeft < 0) clearInterval(timerInterval);
    }, 1000);
}

function confirmQRISPayment() {
    confirmPayment('QRIS Indonesia');
}

function confirmDuitNowPayment() {
    confirmPayment('DuitNow Malaysia');
}

function confirmPayment(paymentMethod) {
    const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));
    if (!pendingOrder) return;
    
    // Simpan ke riwayat pesanan
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const existingIndex = orders.findIndex(o => o.orderId === pendingOrder.orderId);
    
    const orderData = {
        ...pendingOrder,
        paymentMethod: paymentMethod,
        status: 'paid',
        paidAt: new Date().toISOString()
    };
    
    if (existingIndex !== -1) {
        orders[existingIndex] = orderData;
    } else {
        orders.push(orderData);
    }
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Buat pesan WhatsApp
    const message = `Hai owner, saya habis membeli ${pendingOrder.productName} saya ingin mengambil benda ini, ini biodata saya

ID Pesanan : ${pendingOrder.orderId}
Nama Pembeli : ${pendingOrder.customerName}
Barang Dibeli : ${pendingOrder.productName}
Harga : Rp ${pendingOrder.price.toLocaleString()}
Metode Bayar : ${paymentMethod}
Tanggal Beli : ${pendingOrder.date}

Mohon segera kirimkan ini

Note : 
!! JANGAN HAPUS , LANGSUNG KIRIM SAJA !!`;
    
    const ownerNumber = '60175632450';
    const waLink = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;
    
    alert('✅ Pembayaran berhasil dikonfirmasi! Anda akan diarahkan ke WhatsApp.');
    window.open(waLink, '_blank');
    
    localStorage.removeItem('pendingOrder');
    window.location.href = 'dashboard.html';
}

// ==================== CONTACT FUNCTIONS ====================
function contactCS() {
    const csNumber = '60175632450';
    const message = 'Halo CS, saya butuh bantuan untuk order di Muzz Shop';
    window.open(`https://wa.me/${csNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// ==================== PROFILE FUNCTIONS ====================
function loadProfile() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('profileName').innerHTML = user.name;
    document.getElementById('profileEmail').innerHTML = user.email;
    document.getElementById('profilePhone').innerHTML = user.wa || '-';
    document.getElementById('profileSince').innerHTML = new Date(user.createdAt).toLocaleDateString('id-ID');
}

function viewOrders() {
    window.location.href = 'orders.html';
}

// ==================== ORDERS HISTORY FUNCTIONS ====================
function loadOrdersHistory() {
    const user = checkAuth();
    if (!user) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = orders.filter(o => o.customerEmail === user.email);
    
    const container = document.getElementById('ordersHistoryList');
    if (container) {
        if (userOrders.length === 0) {
            container.innerHTML = '<div class="empty-orders">📦 Belum ada pesanan<br><br><a href="products.html" style="color:#00d2ff;">Mulai belanja</a></div>';
        } else {
            container.innerHTML = userOrders.reverse().map(order => `
                <div class="order-item">
                    <div style="display:flex; justify-content:space-between; flex-wrap:wrap;">
                        <div>
                            <strong>${order.productName}</strong><br>
                            <small>ID: ${order.orderId}</small><br>
                            <small>Tanggal: ${order.date}</small><br>
                            <small>Total: Rp ${order.price.toLocaleString()}</small>
                        </div>
                        <span style="background:${order.status === 'paid' ? '#22c55e' : '#eab308'}; color:white; padding:4px 12px; border-radius:20px;">
                            ${order.status === 'paid' ? '✅ Lunas' : '⏳ Menunggu'}
                        </span>
                    </div>
                </div>
            `).join('');
        }
    }
}

// ==================== INITIALIZE PAGE ====================
document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    
    if (page === 'dashboard.html') loadDashboard();
    if (page === 'products.html') renderProducts();
    if (page === 'checkout.html') loadCheckout();
    if (page === 'payment.html') loadPayment();
    if (page === 'profile.html') loadProfile();
    if (page === 'orders.html') loadOrdersHistory();
    
    // Set active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        }
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('forgotModal');
    if (event.target === modal) {
        closeForgotModal();
    }
    
    // Close other modals when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
     }
