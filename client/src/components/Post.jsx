import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const API = import.meta.env.VITE_API_URL;

export default function Post() {
  const { id_post } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/posts/${id_post}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('ERROR:', error);
        setLoading(false);
      });
  }, [id_post]);

  if (loading) {
    return <div className="post-container"><p>Cargando...</p></div>;
  }

  if (!post.id_post) {
    return <div className="post-container"><p>Post no encontrado</p></div>;
  }

  return (
    <div className="post-container">
      {post.image && <img src={`/${post.image}`} alt={post.title} className="post-image"></img>}
      <h1>{post.title}</h1>
      <div className="post-meta">
        <p>
          Escrito por:{' '}
          <Link to={`/author/${post.id_author}`} className="author-link">
            {post.id_author}
          </Link>
        </p>
        <p className="post-date">{post.date}</p>
      </div>
      <p className="post-text">{post.text}</p>
    </div>
  );
}