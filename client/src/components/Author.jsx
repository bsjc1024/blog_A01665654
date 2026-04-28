import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 

const API = import.meta.env.VITE_API_URL;

export default function Author() {
  const { id_author } = useParams();
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/authors/${id_author}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('ERROR:', error);
        setLoading(false);
      });
  }, [id_author, navigate]);

  if (loading) {
    return <div className="author-container"><p>Cargando...</p></div>;
  }

  if (!author.id_author) {
    return <div className="author-container"><p>Autor no encontrado</p></div>;
  }

  return (
    <div className="author-container">
      {author.image && <img src={`/${author.image}`} alt={author.name} className="author-image"></img>}
      <h1>{author.name}</h1>
      <div className="author-info">
        <p className="author-birthdate">Nacido: {author.birthdate}</p>
        <p className="author-phone">Teléfono: {author.phone}</p>
        <p className="author-email">Email: {author.email}</p>
      </div>
      <p className="author-bio">{author.bio}</p>
    </div>
  );
}