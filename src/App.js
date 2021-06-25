import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import Home from './components/home'
import Profile from './components/profile'
import SearchDoctors from './components/SearchDoctors'
import { BrowserRouter , Route} from 'react-router-dom';
import Doctor from './components/DoctorInterface'
import Admin from './components/AdminPAnel'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route exact path='/' component={Home} />
        <Route exact path='/doctors' component={SearchDoctors} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/docarea' component={Doctor} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
