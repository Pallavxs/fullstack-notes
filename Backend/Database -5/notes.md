# 🍃 MongoDB Notes 

---

## 📌 1. MongoDB Atlas

* **MongoDB Atlas** is a **cloud-hosted MongoDB service**.
* It allows you to use MongoDB **without installing it locally**.
* Commonly used in **production applications**.

### 🔹 Features:

* Free cluster (for beginners)
* Automatic backups
* Built-in security
* Easy scaling

### 🔗 Connection String Example:

```bash
mongodb+srv://username:password@cluster0.mongodb.net/myDB
```

---

## 📌 2. Mongoose

* **Mongoose** is an **ODM (Object Data Modeling) library** for MongoDB and Node.js.

### 🔹 It helps to:

* Define **Schema** (structure of data)
* Create **Models**
* Perform database operations easily

* Schema = A schema defines how you data should look .

### 🔹ex - const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

* Model - A model is created from a schema 

const User = mongoose.model('User', userSchema);

### 🔹 Now User can:
create data
read data
update data
delete data

### 📦 Install:

```bash
npm install mongoose
```

---

## 🧠 3. Simple Understanding

* MongoDB Atlas → Database in cloud ☁️
* Mongoose → Tool to interact with database 🔧

---

## 📌 4. What is MongoDB?

MongoDB is a NoSQL database.
It stores data in JSON-like format (called documents)

---

## 📦 5. One-line Memory Version

👉 MongoDB = Data is stored as BSON (Binary JSON) documents, not tables.

---

## 🧩 6. Key Terms Definitions

### 📄 Document

A document is a single record in MongoDB stored in JSON-like format (BSON).
Example shows one document

### 📁 Collection

A collection is a group of documents (like a table in SQL).

### 🗄️ Database

A database is a group of collections.

---

## 📦 7. Example

```json
{
  "name": "John",
  "age": 25,
  "city": "Delhi"
}
```

👉 This is a document

---

## 🏗️ 8. Structure

```
Database
   ↓
Collection
   ↓
Documents
```

---

## ⚙️ 9. Common Commands

### 1. Show databases

```
show dbs
```

### 2. Create / use database

```
use myDatabase
```

### 3. Show collections

```
show collections
```

---

## ✍️ 10. Insert Data

```js
db.users.insertOne({
  name: "John",
  age: 25
})
```

---

## 📖 11. Read Data

```js
db.users.find()
```

---

## ✏️ 12. Update Data

```js
db.users.updateOne(
  { name: "John" },
  { $set: { age: 30 } }
)
```

---

## 🗑️ 13. Delete Data

```js
db.users.deleteOne({ name: "John" })
```

---

## 🔗 14. MongoDB with Node.js

### Install:

```
npm install mongoose
```

### Connect:

```js
const mongoose = require('mongoose');

mongoose.connect("your_mongodb_url")
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));
```

---
