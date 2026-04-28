import { Link } from 'react-router';

export function CardList({entries, filteredText}) {
  const cards = entries.map(entry => 
      entry.title.toLowerCase().includes(filteredText.toLowerCase()) && 
      <Card 
        key={entry.id_post} 
        id_post={entry.id_post} 
        title={entry.title} 
        date={entry.date} 
        img={entry.image}    
      />
  )
  return (
    <div className='card-list'>
      {cards}
    </div>
  )
}

export function Card({id_post, img, title, date}) {
  return (
    <Link to={`/blog/${id_post}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className='card'>
        <img src={`/${img}`} alt={title}></img>
        <h1>{title}</h1>
        <p>{date}</p>
      </div>
    </Link>
  )
}