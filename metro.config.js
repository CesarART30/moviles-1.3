// Configuración de Metro: solo hace falta para que expo-sqlite funcione en la versión web.
// En Android e iOS no cambia nada.
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// expo-sqlite en web usa un archivo .wasm
config.resolver.assetExts.push('wasm');

// Cabeceras COEP/COOP: habilitan SharedArrayBuffer, que expo-sqlite necesita en el navegador
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    middleware(req, res, next);
  };
};

module.exports = config;
