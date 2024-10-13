import React, { useState } from 'react';
import axios from 'axios';
import Table from './Table';
import ChatWindow from './ChatWindow';

function Home() {

  const data = React.useMemo(
    () => [
      { name: "John Doe", age: 28, role: "Developer" },
      { name: "Jane Smith", age: 34, role: "Designer" },
      { name: "Mike Johnson", age: 45, role: "Manager" },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Role",
        accessor: "role",
      },
    ],
    []
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle form submission and file upload
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Replace with your own upload URL
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        <Table columns={columns} data={data} />

      </form>
      <ChatWindow />
    </>
  );
}

export default Home;
