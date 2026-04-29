import './App.css'
import { Routes, Route, Link } from 'react-router';
import Home from './pages/home'
import Blog from './pages/blog'
import Contact from './pages/Contact'
import Post from './components/Post'
import Author from './components/Author'
import NewPost from './components/Newpost'
import Login from './components/Login'
 
function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Inicio</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/blog/:id_post" element={<Post />} />
        <Route path="/author/:id_author" element={<Author />} />
        <Route path="/blog/new" element={<NewPost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}
 
export default App