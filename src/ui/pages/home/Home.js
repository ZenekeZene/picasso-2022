import Canvas from 'modules/paint/canvas/Canvas'

export const path = '/'

const Home = () => {
  return (
    <article>
      <h1>Home</h1>
      <img src="/selfi.jpeg" className="selfi" width="600" height="600" />
      <Canvas />
    </article>
  )
}

export default Home
