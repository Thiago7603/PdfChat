const cleanText = (text) => {
    return text.replace(/[^a-zA-Z0-9\s]/g, '').trim(); // Eliminar caracteres especiales
};

module.exports = { cleanText };
