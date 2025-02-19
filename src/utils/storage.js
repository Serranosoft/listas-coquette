import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';
import { convertDateToString } from './date';

const db = SQLite.openDatabaseSync("coquette_list");
export async function initDb() {
    await db.execAsync('PRAGMA foreign_keys = ON');
    db.execAsync(`
        CREATE TABLE IF NOT EXISTS list (id TEXT PRIMARY KEY NOT NULL, color TEXT, title TEXT, last_update TEXT);
        CREATE TABLE IF NOT EXISTS listItem (id TEXT PRIMARY KEY NOT NULL, listId TEXT, value TEXT, checked BOOL, last_update TEXT, FOREIGN KEY (listId) REFERENCES list(id) ON DELETE CASCADE);
    `);
}

export async function insertInitialList() {
    const listId = uuid.v4();
    db.runAsync("INSERT INTO list (id, color, title, last_update) VALUES (?, ?, ?, ?)", listId, "rgb(254,143,171)", "Lista de la compra", convertDateToString(new Date()));
    const listItemId = uuid.v4();
    db.runAsync("INSERT INTO listItem (id, listId, value, checked, last_update) VALUES (?, ?, ?, ?, ?)", listItemId, listId, "Magdalenas", false, convertDateToString(new Date()));
}

// Actualizador de la tablas
export async function updateDatabase() {
    addCheckboxColumn();
};

async function addCheckboxColumn() {
    try {
        const result = await db.getAllAsync("PRAGMA table_info(list);");
        const columns = result.map(row => row.name);
    
        if (!columns.includes('checkbox')) {
            await db.execAsync("ALTER TABLE List ADD COLUMN checkbox TEXT");
        }
    } catch (error) {
        console.error("Error al verificar/agregar la columna:", error);
    }
}


// LISTAS

export async function getAllList() {
    const allRows = await db.getAllAsync('SELECT * FROM list');
    return allRows;
}

export async function insertList(color, title, last_update) {
    const id = uuid.v4();
    db.runAsync("INSERT INTO list (id, color, title, last_update) VALUES (?, ?, ?, ?)", id, color, title, last_update);
}

export async function updateList(id, color, title, last_update) {
    db.runAsync("UPDATE list SET color = ? WHERE id = ?", color, id);
    db.runAsync("UPDATE list SET title = ? WHERE id = ?", title, id);
    db.runAsync("UPDATE list SET last_update = ? WHERE id = ?", last_update, id);
}

export async function updateListCheckbox(id, checkbox) {
    db.runAsync("UPDATE list SET checkbox = ? WHERE id = ?", checkbox, id);
}

export async function deleteListFromId(id) {
    db.runAsync("DELETE FROM list WHERE id = ?", id);
}

export async function getListFromId(id) {
    const x = await db.getFirstAsync('SELECT * FROM list WHERE id = ?', id)
    return x;
}

// ITEMS

export async function insertItemToListId(listId, value, checked, last_update) {
    const id = uuid.v4();
    db.runAsync("INSERT INTO listItem (id, listId, value, checked, last_update) VALUES (?, ?, ?, ?, ?)", id, listId, value, checked, last_update);
}

export async function updateItem(id, value, last_update) {
    db.runAsync("UPDATE listItem SET value = ? WHERE id = ?", value, id);
    db.runAsync("UPDATE listItem SET last_update = ? WHERE id = ?", last_update, id);
}

export async function updateItemStatus(id, checked) {
    db.runAsync("UPDATE listItem SET checked = ? WHERE id = ?", checked, id);
}

export async function deleteItemFromId(id) {
    db.runAsync("DELETE FROM listItem WHERE id = ?", id);
}

export async function getItemsFromListId(id) {
    const x = await db.getAllAsync('SELECT * FROM listItem WHERE listId = ?', id)
    return x;
}

export async function getItemsLength(listId) {
    const x = await db.getFirstAsync('SELECT COUNT(*) FROM listItem WHERE listId = ?', listId);
    return x;
}

export async function getItemsCheckedLength(listId, checked = true) {
    const x = await db.getFirstAsync('SELECT COUNT(*) FROM listItem WHERE checked = ? AND listId = ?', checked, listId);
    return x;
}

// AUX
export async function dropAll() {
    db.execAsync(`
        DROP TABLE IF EXISTS list;
        DROP TABLE IF EXISTS listItem;
    `);
}