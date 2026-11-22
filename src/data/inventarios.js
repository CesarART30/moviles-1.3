import { abrirBaseLocal } from './baseLocal';

function presentarInventario({ id, creadoEn, ...datos }) {
    return {
        ...datos,
        id: `local-${id}`,
        fecha: new Date(creadoEn).toLocaleDateString('es-EC'),
        discrepancias: null,
        productosContados: 0,
    };
}

export async function listarInventariosLocales() {
    const db = await abrirBaseLocal();
    const filas = await db.getAllAsync('SELECT id, nombre, categoria, creadoEn FROM inventarios ORDER BY id DESC');
    return filas.map(presentarInventario);
}

export async function guardarInventarioLocal(nombre, categoria) {
    const db = await abrirBaseLocal();
    const creadoEn = new Date().toISOString();
    const { lastInsertRowId } = await db.runAsync(
        'INSERT INTO inventarios (nombre, categoria, creadoEn) VALUES (?, ?, ?)',
        nombre,
        categoria,
        creadoEn,
    );
    return presentarInventario({ id: lastInsertRowId, nombre, categoria, creadoEn });
}
