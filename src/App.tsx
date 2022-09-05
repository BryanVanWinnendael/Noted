import Navbar from './components/nav/Navbar'
import MDEditor from './components/MDEditor'

function App() {
  return (
    <div className="h-auto pb-5 theme-transparent">
      <Navbar />
      <div className='flex h-full ml-5 mr-5 justify-center'>
        <MDEditor />
      </div>
    </div>

  )
}

export default App;
