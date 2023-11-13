import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { BASE_URL  as  url} from '../Config';

function FileList() {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [accessToken] = useState(localStorage.getItem('token'));
  const [updateFile, setUpdateFile] = useState(null);
  useEffect(() => {
    if (accessToken) {
      loadFileList();
    } else {
      // Redirect to the login page or display an error message
      window.location.href = 'login';
    }
  }, [accessToken]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const loadFileList = () => {
    // Fetch the list of files based on the user's ID from your API
    // Replace the fetch call with your actual API endpoint, passing the user's ID
    const userId = localStorage.getItem('userId');

    fetch(url+"/api/filesById/"+userId, {
      method: 'GET',
      headers: {
        'access-token': 'Bearer ' + accessToken,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setFileList(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleUpdateClick = (fileToBeUpdated) => {
    setUpdateFile(fileToBeUpdated);
  };

  

  const handleUploadFile  = (fileName) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
    fetch(url+'/api/updateAsAdmin/' + fileName, {
      method: 'PUT',
      headers: {
        'access-token': 'Bearer ' + accessToken,
      },
      body: formData,
    })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      loadFileList();
    })
    .catch((error) => {
      alert('Please select a file to update.');
      console.error('Error:', error);
    });
} else {
  alert('Please select a file to update.');
}
  };

  const deleteFile = (fileName) => {
    fetch(url+'/api/deleteAsAdmin/' + fileName, {
      method: 'DELETE',
      headers: {
        'access-token': 'Bearer ' + accessToken,
      }
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        loadFileList();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = 'login';
  };

  return (
    <>
    <Navbar onLogout={()=> logout()}></Navbar>
    <div className="container">
      <h2>File List</h2>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Actions</th>
            <th>Created At</th>
            <th>Modified At</th>
          </tr>
        </thead>
        <tbody>
          {fileList.map((fileObject) => (
            <tr key={fileObject.fileName}>
              <td><a href={'https://d2sm8dpuxev7td.cloudfront.net/'+fileObject.fileUrl}>{fileObject.fileName}</a></td>
              <td >
                <div style={{display:'flex',justifyContent:'space-between'}}>
              <button onClick={() => handleUpdateClick(fileObject.id)}>Update</button>
                <button id="delete" onClick={() => deleteFile(fileObject.id)}>Delete</button>
                </div>
              </td>
              <td >
              {fileObject.createdAt.substring(0,19)}
              </td>
              <td  >
              {fileObject.modifiedAt.substring(0,19)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updateFile && (
          <div>
            <h2>Update File</h2>
            <input type="file" onChange={handleFileChange} />
            <div style={{display:'flex',justifyContent:'space-around'}}>
            <button onClick={()=>handleUploadFile(updateFile)}>Upload</button>
            <button onClick={()=>handleUpdateClick(null)}>Cancel</button>
          </div>
          </div>
        )}
    </div>
    </>
  );
}

export default FileList;