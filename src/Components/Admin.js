import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { BASE_URL  as  url} from '../Config';

function Admin() {
    const [userList, setUserList] = useState([]);
    const [accessToken] = useState(localStorage.getItem('token'));
  
    useEffect(() => {
      if (accessToken) {
        loadUserList();
      } else {
        // Redirect to the login page or display an error message
        window.location.href = 'login';
      }
    }, [accessToken]);
  
    const loadUserList = () => {
      // Fetch the list of users from your API
      // Replace the fetch call with your actual API endpoint
      fetch(url+'/api/user/admin', {
        method: 'GET',
        headers: {
          'access-token': 'Bearer ' + accessToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserList(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    const toFileList= (fileName) =>
    {
        localStorage.setItem('userId',fileName)
        window.location.href = 'filelist';

    }
  
    const logout = () => {
      localStorage.clear();
      window.location.href = 'login';
    };
  
    return (
      <>
        <Navbar onLogout={() => logout()}></Navbar>
        <div className="container">
          <h2>Admin Page - User List</h2>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.userId}</td>
                  <td><button onClick={()=>toFileList(user.userId)}>{user.name}</button></td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  
  export default Admin;