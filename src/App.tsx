import React, { useEffect, useState } from 'react';
import './App.css';
import { User } from './model';
import { getUser } from './service/services';
import Loader from './components/Loader';

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
