import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e: any) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${bookId}`);

        console.log(res.data);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBook();
  }, []);

  const handleClick = async (e: any) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (

    <div className="form">
      <h1>Редактировать книгу</h1>
      <input
        value={book.title}
        type="text"
        placeholder="Название"
        name="title"
        onChange={handleChange}
      />
      <textarea
        value={book.desc}
        rows={5}
        placeholder="Описание"
        name="desc"
        onChange={handleChange}
      />
      <input
        value={Number(book.price)}
        type="number"
        placeholder="Цена"
        name="price"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Редактировать</button>
      {error && "Что-то пошлно не так!"}
      <Link to="/">Посмотреть все книги</Link>
    </div>
  );
};

export default Update;
