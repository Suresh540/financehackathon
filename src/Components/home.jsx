import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import ChatWindow from './ChatWindow';
import ContractDetailsTable from './TableHor';
import './Spinner.css';
import './home.css';

function Home() {
  const [files, setSelectedFile] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!files) {
      alert("Please select a file before uploading.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file); // Use the same key for multiple files
    });

    try {
      let url = apiUrl + "/extract";
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      let datas = [];
      datas.push(response.data);
      console.log(response.data);
      setData(datas);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div >
          <button className="gradient-button">
            Load from Ariba
          </button>
          <button className="gradient-button">
            Load from TFT
          </button>
        </div>
        <div style={{marginBottom:'5px'}}>
          <b>(OR)</b>
        </div>
        <div>
          <input type="file" multiple onChange={handleFileChange} />
          <button type="submit">Upload</button>
          {loading ? (<div className="overlay">
            <div className="spinner"></div>
          </div>) :
            (data != null ? <ContractDetailsTable data={data} /> : <></>)
          }
        </div>
      </form>
      <ChatWindow />
    </>
  );
}

export default Home;
