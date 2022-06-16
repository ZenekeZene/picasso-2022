import Painter from 'modules/paint/painter/Painter'

export const path = '/'

const Home = () => {
  return (
    <article>
      <h1 className="heading">Picasso</h1>
      <Painter />
    </article>
  )
}

export default Home
