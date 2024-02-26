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

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json("Hello!");
});

app.get('/books', (req, res) => {
	const query = "SELECT * FROM books"
	db.query(query, (error, data) => {
		if (error) {
			return res.json(error);
		}

		return res.json(data);
	});
});

app.post('/books', (req, res) => {
	const query = 'INSERT INTO BOOKS ("title", "desc", "cover") VALUES (?)';
	const values = [req.body.title, req.body.desc, req.body.cover];

	db.query(query, [values], (error, data) => {
		if (error) {
			return res.json(error);
		}

		return res.json('hey hey');
	})
});

app.listen(8800, () => {
	console.log('success');
});
