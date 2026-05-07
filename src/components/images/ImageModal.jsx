import React, { useState, useEffect } from 'react';
import { uploadImage, updateImage } from '../../api/services/image.service.js';

const ImageModal = ({ image, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fileName: '',
    fileUrl: '',
    mimeType: 'image/jpeg',
    fileSize: ''
  });

  useEffect(() => {
    if (image) {
      setFormData({
        fileName: image.fileName || '',
        fileUrl: image.fileUrl || '',
        mimeType: image.mimeType || 'image/jpeg',
        fileSize: image.fileSize || ''
      });
    }
  }, [image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'fileSize' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (image) {
        await updateImage(image.id, formData);
      } else {
        await uploadImage(formData);
      }
      onSuccess();
    } catch (err) {
      alert('Operation failed.');
    }
  };

  const modalStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
    alignItems: 'center', zIndex: 1000
  };

  return (
    <div style={modalStyle}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '450px' }}>
        <h3 style={{ marginTop: 0 }}>{image ? 'Edit Image Metadata' : 'Add New Image'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>File Name</label>
            <input name="fileName" value={formData.fileName} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Image URL</label>
            <input name="fileUrl" value={formData.fileUrl} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>MIME Type</label>
            <input name="mimeType" value={formData.mimeType} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Size (Bytes)</label>
            <input type="number" name="fileSize" value={formData.fileSize} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px' }}>
              {image ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageModal;