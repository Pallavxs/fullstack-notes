🍃 MongoDB Notes (Easy Version)
📌 What is MongoDB?

MongoDB is a NoSQL database.
It stores data in JSON-like format (called documents)

📦 One-line memory version

👉 MongoDB = Data is stored as BSON (Binary JSON) documents, not tables.

🧩 Key terms definitions

📄 Document

A document is a single record in MongoDB stored in JSON-like format (BSON).  Example shows one document 

📁 Collection

A collection is a group of documents (like a table in SQL).

🗄️ Database

A database is a group of collections.

📦 Example
{
  "name": "John",
  "age": 25,
  "city": "Delhi"
}

👉 This is a document

🏗️ Structure
Database
   ↓
Collection
   ↓
Documents

⚙️ Common Commands

1. Show databases
show dbs

2. Create / use database
use myDatabase

3. Show collections
show collections

✍️ Insert Data
db.users.insertOne({
  name: "John",
  age: 25
})

📖 Read Data
db.users.find()

✏️ Update Data
db.users.updateOne(
  { name: "John" },
  { $set: { age: 30 } }
)

🗑️ Delete Data
db.users.deleteOne({ name: "John" })
🔗 MongoDB with Node.js


Install:

npm install mongoose

Connect:

const mongoose = require('mongoose');

mongoose.connect("your_mongodb_url")
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));