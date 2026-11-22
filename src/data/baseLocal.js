import { openDatabaseAsync } from 'expo-sqlite';

let apertura;

export function abrirBaseLocal() {
    if (!apertura) {
        apertura = openDatabaseAsync('solicitudes.db').then(async (db) => {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS solicitudes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    asunto TEXT NOT NULL,
                    descripcion TEXT NOT NULL,
                    sincronizado INTEGER NOT NULL DEFAULT 0
                );
                CREATE TABLE IF NOT EXISTS inventarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    categoria TEXT NOT NULL,
                    creadoEn TEXT NOT NULL
                );
            `);
            return db;
        }).catch((error) => {
            apertura = undefined;
            throw error;
        });
    }
    return apertura;
}
