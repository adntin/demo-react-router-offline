import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import http from './http';
import logo from './logo.svg';

function Navbar() {
  let history = useHistory();
  const isAuthenticated = window.localStorage.getItem('isAuthenticated');

  const handleClick = useCallback(async () => {
    const result = await http.logout();
    if (result) {
      window.localStorage.removeItem('isAuthenticated');
      history.push('/');
      return;
    }
    alert('logout failure', result);
  }, [history]);

  return isAuthenticated ? (
    <p>
      Welcome! <button onClick={handleClick}>Logout</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

function Home() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchGithubData = () => {
      // 远程访问数据也会缓存
      fetch('https://api.github.com/users/adntin')
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          setData(JSON.stringify(json, null, 2));
        })
        .catch(function(error) {
          setData(error.message);
        })
        .finally(function() {
          setLoaded(true);
        });
    };

    if (loaded === false) {
      fetchGithubData();
    }
  }, [loaded]);

  return (
    <div>
      <Navbar />
      <p>Home</p>
      <ul>
        <li>
          <Link to="/products">Product List Page</Link>
        </li>
        <li>
          <Link to="/about">About Page</Link>
        </li>
        <li>
          <Link to="/will-not-match">Will Not Match</Link>
        </li>
      </ul>
      <img src={logo} className="logo" alt="logo" />
      <pre>{loaded ? data : 'fetching github data ...'}</pre>
    </div>
  );
}

export default Home;
