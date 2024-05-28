import { Routes, Route } from 'react-router-dom';
import { routesConfig } from './routes/routes'

function App() {
 
  return (
    <>
      <Routes>
       {routesConfig.map((route, index) => ( <Route key={index} path={route.path} element={route.page}/>))}
      </Routes>
    </>
  )
}

export default App
