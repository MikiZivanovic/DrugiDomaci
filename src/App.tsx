import React, { useEffect, useState } from 'react';
import './App.css';
import { User } from './model';
import { getUser } from './service/services';
import Loader from './components/Loader';
import HomeLayout from './components/HomeLayout';
import { Route, Routes } from 'react-router';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading) {
      return;
    }
    getUser()
      .then(setUser)
      .catch(err => { })
      .finally(() => setLoading(false))
  }, [loading])

  if (loading) {
    return (
      <div className='main'>
        <Loader />
      </div>
    )
  }
  if (!user) {
    return (
      <HomeLayout>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<LoginPage />} />
        </Routes>
      </HomeLayout>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
