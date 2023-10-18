import Rotas from './rota'
import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min'
import NavBar from './componets/navBar'
import './custom.css'

function App() {
  return (
      <>
          <NavBar/>
<div className="container">
  <Rotas/>
</div>
      </>
  );
}

export default App;
