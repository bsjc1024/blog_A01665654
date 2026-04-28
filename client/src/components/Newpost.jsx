import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [idAuthor, setIdAuthor] = useState('');

  function handleFile(e) {
    const fileInfo = {
      file: e.target.files[0],
      filename: e.target.files[0].name
    };
    setImg(fileInfo);
  }

  function handleSubmit() {
    const formInfo = new FormData();
    formInfo.append('title', title);
    formInfo.append('date', date);
    formInfo.append('text', text);
    formInfo.append('img', img.file, img.filename);
    formInfo.append('id_author', idAuthor);

    fetch(`${API}/posts/new`, {
      method: "POST",
      body: formInfo,
    })
    .then((res) => res.json())
    .then((data) => { console.log(data); })
    .catch((error) => { console.log(error); });
  }

  return (
    <div className="form">
      <h2>Nuevo Post</h2>
      <label>Título:</label>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Fecha:</label>
      <input type='text' value={date} onChange={(e) => setDate(e.target.value)} />
      <label>Imagen:</label>
      <input type='file' onChange={handleFile} />
      <label>Texto:</label>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <input type='submit' value='Crear Post' onClick={handleSubmit} />
      <label>ID Autor:</label>
      <input type='number' value={idAuthor} onChange={(e) => setIdAuthor(e.target.value)} />
    </div>
  );
}