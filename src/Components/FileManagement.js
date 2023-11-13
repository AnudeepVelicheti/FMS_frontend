import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { BASE_URL  as  url} from '../Config';

function FileManagement() {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [updateFile, setUpdateFile] = useState(null);
  const [accessToken] = useState(localStorage.getItem("token"));

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

  const uploadFile = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch(url+'/api/upload', {
        method: 'POST',
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
          alert('Please select a file to upload.');
          console.error('Error:', error);
        });
    } else {
      alert('Please select a file to upload.');
    }
  };

  const loadFileList = () => {
    fetch(url+'/api/files', {
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
    // Set the file to be updated in the state
    setUpdateFile(fileToBeUpdated);
  };

  

  const handleUploadFile  = (fileName) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
    fetch(url+'/api/update/' + fileName, {
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
    fetch(url+'/api/delete/' + fileName, {
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
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <br/>
      <button onClick={uploadFile}>Upload</button>
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
                <div style={{display:'flex',justifyContent:'space-between',padding:'1%'}}>
              <button onClick={() => handleUpdateClick(fileObject.fileName)}>Update</button>
                <button id="delete" onClick={() => deleteFile(fileObject.fileName)}>Delete</button>
                </div>
              </td>
              <td>
              {fileObject.createdAt.substring(0,19)}
              </td>
              <td >
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

export default FileManagement;
