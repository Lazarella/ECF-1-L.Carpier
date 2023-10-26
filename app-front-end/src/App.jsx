import './App.css'
import AddProject from './routes/AddProject'
import ProjectList from './routes/ProjectList'

function App() {


  return (
    <>
    <img src="https://adamgannon.files.wordpress.com/2014/11/mjqwwtn.jpg" alt="landscape" />
      <header className='container text-center p-4 bg-transparent text-white'>
      <h1 className='display-4 p-4'>Step up coz your projects are great</h1>
      <h2>Fitter
Happier 
<b> MORE PRODUCTIVE </b>  
Comfortable </h2>
</header>
<div className='d-flex gap-4 m-4 p-4'>
      <AddProject/>
      <ProjectList />
      </div>
    </>
  )
}

export default App
