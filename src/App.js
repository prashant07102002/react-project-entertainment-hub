import './App.css';
import { BrowserRouter, React, Route, Routes } from 'react-router-dom'
import Header from './components/header/header';
import SimpleBottomNavigation from './components/mainnav';
import Movies from './Pages/Movies/Movies';
import Search from './Pages/Search/Search';
import Series from './Pages/Series/Series';
import Trending from './Pages/Trending/Trending';
import { Container } from '@material-ui/core';
function App() {
    return (
        <BrowserRouter>
            <Header />
            <div className="App">
                <Container>
                    <Routes>
                        <Route path='/' Component={Trending} exact />
                        <Route path='/movies' Component={Movies} />
                        <Route path='/series' Component={Series} />
                        <Route path='/search' Component={Search} />
                    </Routes>
                </Container>
            </div>
            <SimpleBottomNavigation />
        </BrowserRouter>
    );
}

export default App;
