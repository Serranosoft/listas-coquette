import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';

const db = SQLite.openDatabaseSync("coquette_list");
export async function initDb() {
    await db.execAsync('PRAGMA foreign_keys = ON');
    db.execAsync(`
        CREATE TABLE IF NOT EXISTS list (id TEXT PRIMARY KEY NOT NULL, color TEXT, title TEXT);
        CREATE TABLE IF NOT EXISTS listItem (id TEXT PRIMARY KEY NOT NULL, listId TEXT, value TEXT, checked BOOL, FOREIGN KEY (listId) REFERENCES list(id) ON DELETE CASCADE);
    `);
}


// LISTAS
export async function insertList(color, title) {
    const id = uuid.v4();
    db.runAsync("INSERT INTO list (id, color, title) VALUES (?, ?, ?)", id, color, title);
}

export async function updateList(id, color, title) {
    db.runAsync("UPDATE list SET color = ? WHERE id = ?", color, id);
    db.runAsync("UPDATE list SET title = ? WHERE id = ?", title, id);
}

export async function deleteListFromId(id) {
    db.runAsync("DELETE FROM list WHERE id = ?", id);
}

export async function getListFromId(id) {
    const x = await db.getFirstAsync('SELECT * FROM list WHERE id = ?', id)
    return x;
}

// ITEMS

export async function insertItemToListId(listId, value, checked) {
    const id = uuid.v4();
    db.runAsync("INSERT INTO listItem (id, listId, value, checked) VALUES (?, ?, ?, ?)", id, listId, value, checked);
}

export async function updateItem(id, value) {
    db.runAsync("UPDATE listItem SET value = ? WHERE id = ?", value, id);
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
        DROP TABLE IF EXISTS listItem;
    `);
}


export async function getAllList() {
    const allRows = await db.getAllAsync('SELECT * FROM list');
    return allRows;
}
export async function getAllListItem() {
    const allRows = await db.getAllAsync('SELECT * FROM listItem');
    for (const row of allRows) {
        console.log(row.id, row.listId, row.value, row.checked);
    }
}