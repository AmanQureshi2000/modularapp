import React, { useEffect, useState } from 'react';
import { getImages, deleteImage } from '../../api/services/image.service.js';

const Table = ({ onEdit }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getImages();
      const sortedData = Array.isArray(data) ? data.sort((a, b) => a.id - b.id) : [];
      setImages(sortedData);
    } catch (err) {
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this image record?')) {
      try {
        await deleteImage(id);
        setImages(images.filter(img => img.id !== id));
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <p>Loading images...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4' }}>
          <th>ID</th>
          <th>Preview</th>
          <th>File Name</th>
          <th>MIME Type</th>
          <th>Size (Bytes)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {images.length > 0 ? (
          images.map((img) => (
            <tr key={img.id}>
              <td>{img.id}</td>
              <td>
                <img src={img.file_url} alt={img.file_name} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
              </td>
              <td>{img.file_name}</td>
              <td>{img.mime_type}</td>
              <td>{img.file_size_bytes.toLocaleString()}</td>
              <td>
                <button onClick={() => onEdit(img)}>Edit</button>
                <button 
                  onClick={() => handleDelete(img.id)} 
                  style={{ marginLeft: '10px', color: 'red' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: 'center' }}>No images found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;