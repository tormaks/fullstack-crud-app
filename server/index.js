import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "BD24052000",
	database: "books_app",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json("Hello!");
});

app.get("/books", (req, res) => {
	const query = "SELECT * FROM books"
	db.query(query, (error, data) => {
		if (error) {
			return res.json(error);
		}

		return res.json(data);
	});
});

app.get("/books/:id", (req, res) => {
	const query = "SELECT * FROM books WHERE id = ?";
	const bookId = req.params.id;

	db.query(query, [bookId], (error, data) => {
		if (error) {
			return res.json(error);
		}

		return res.json(data[0]);
	});
});

app.post("/books", (req, res) => {
	const query = "INSERT INTO books (`title`, `desc`, `price`) VALUES (?)";
	const values = [req.body.title, req.body.desc, req.body.price];

	db.query(query, [values], (error, data) => {
		if (error) {
			return res.json(error);
		}

		return res.json('Successful');
	})
});

app.delete("/books/:id", (req, res) => {
	const query = "DELETE FROM books WHERE id = ?";
	const bookId = req.params.id;

	db.query(query, [bookId], (error, data) => {
		if (error) {
			return res.json(error);
		}

		return res.json('Successful');
	});
});

app.put("/books/:id", (req, res) => {
	const query = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ? WHERE id = ?";
	const bookId = req.params.id;

	const values = [req.body.title, req.body.desc, req.body.price];

	db.query(query, [...values, bookId], (error, data) => {
		if (error) {
			return res.json(error);
		}

		return res.json('Successful');
	});
});

app.listen(8800, () => {
	console.log('Successful');
});
