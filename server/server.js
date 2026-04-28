const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
const multer = require('multer');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const storage = multer.diskStorage({
  destination: '../client/src/assets/uploads/',
  filename: function (req, file, cb){ cb(null, file.originalname) }
});
const upload = multer({storage: storage});

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

require('dotenv').config();

const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  allowExitOnIdle: true
};

const db = pgp(cn);

app.use(session({
  store: new pgSession({ pgPromise: db }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 60 * 1000, secure: false }
}));

const authenticateSession = (req, res, next) => {
  if (req.session.id_author) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get('/hello', (req, res) => {
  res.json({ message: "Hola" });
});

app.get('/posts', (req, res) => {
  db.any('SELECT * FROM post')
    .then((data) => res.json(data))
    .catch((error) => {
      console.log('ERROR:', error);
      res.status(500).json({ error: "Error al obtener los posts" });
    });
});

app.get('/posts/:id_post', (req, res) => {
  db.oneOrNone('SELECT * FROM post WHERE id_post=$1', [req.params.id_post])
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: "Post no encontrado" });
      }
    })
    .catch((error) => {
      console.log('ERROR:', error);
      res.status(500).json({ error: "Error en el servidor" });
    });
});

app.get('/authors/:id_author', authenticateSession,  (req, res) => {
  const id = parseInt(req.params.id_author);
  db.oneOrNone('SELECT * FROM author WHERE id_author=$1', [req.params.id_author])
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: "Autor no encontrado" });
      }
    })
    .catch((error) => {
      console.log('ERROR:', error);
      res.status(500).json({ error: "Error al obtener el autor" });
    });
});

app.listen(8000, () => {
  console.log('Servidor corriendo en el puerto 8000');
});

app.post('/posts/new', upload.single('img'), function(req, res){
  db.none("INSERT INTO post (title, date, image, text, id_author) VALUES($1, $2, $3, $4, $5)",
    [req.body.title, req.body.date, req.file.originalname, req.body.text, req.body.id_author])
  .then(() => res.send({ message: 'Post agregado correctamente' }))
  .catch((error) => console.log('ERROR: ', error));
});

app.post('/login', upload.none(), (req, res) => {
  console.log('Body recibido:', req.body);
  const { username, password } = req.body;
  db.oneOrNone("SELECT * FROM author WHERE username=$1", [username])
    .then((data) => {
      if (data != null) {
        if (data.password == password) {
          req.session.id_author = data.id_author;
          req.session.save(function(err) {
            if (err) return next(err);
            res.send(req.session);
          });
        } else {
          res.status(401).send('Invalid email/password');
        }
      } else {
        res.status(401).send('Invalid credentials');
      }
    })
    .catch((error) => console.log('ERROR: ', error));
});

app.get('/session-info', (req, res) => {
  res.json(req.session);
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Failed to destroy session');
    res.send('Session destroyed');
  });
});