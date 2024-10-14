// utils/encryption.js
import CryptoJS from 'crypto-js';

// Secret key (manage this securely in a real application)
const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY;

// Encrypt message
export const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, encryptionKey).toString();
};

// Decrypt message
export const decryptMessage = (encryptedMessage) => {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
