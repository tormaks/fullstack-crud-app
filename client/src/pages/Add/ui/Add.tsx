import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
  });
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value  }));
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Добавление новой книги</h1>
      <input
        type="text"
        placeholder="Название"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        placeholder="Описание"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Цена"
        name="price"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Добавить</button>
      {error && "Что-то пошлно не так!"}
      <Link to="/">Посмотреть все книги</Link>
    </div>
  );
};

export default Add;
