import React, { useState } from 'react';
import { getChannelData, getVideos } from '../../api/services/youtube.service.js';
import ChannelInfo from './ChannelInfo';
import VideoList from './VideoList.jsx';

function Youtube() {
  const [searchInput, setSearchInput] = useState('');
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchChannelInfo = async () => {
    if (!searchInput.trim()) return;
    setLoading(true);
    setChannelData(null);
    setVideos([]);
    setNextPageToken(null);

    try {
      const data = await getChannelData(searchInput);
      setChannelData(data);
      fetchVideos(data.id);
    } catch (err) {
      console.error('Error fetching channel info:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async (channelId, pageToken = null) => {
    try {
      const data = await getVideos(channelId, pageToken);
      setVideos(prev => [...prev, ...data.items]);
      setNextPageToken(data.nextPageToken);
    } catch (err) {
      console.error('Error fetching videos:', err.response?.data || err.message);
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchChannelInfo();
    }
  };

  const loadMoreVideos = () => {
    if (channelData && nextPageToken) {
      fetchVideos(channelData.id, nextPageToken);
    }
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      padding: '30px 20px',
      maxWidth: '1100px',
      margin: 'auto',
      backgroundColor: '#f9f9f9',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        🎬 YouTube Channel Info Finder
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Enter channel name, @handle, ID, or URL"
          value={searchInput}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
          style={{
            padding: '12px 16px',
            width: '60%',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginRight: '10px',
            fontSize: '16px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
          }}
        />
        <button
          onClick={fetchChannelInfo}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '6px',
            backgroundColor: '#ff0000',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(255,0,0,0.3)',
            transition: 'background 0.3s ease',
          }}
        >
          🔍 Search
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center', fontSize: '18px' }}>Loading...</p>}

      {channelData && (
        <ChannelInfo channelData={channelData} />
      )}

      {videos.length > 0 && (
        <VideoList 
          videos={videos} 
          nextPageToken={nextPageToken}
          onLoadMore={loadMoreVideos}
        />
      )}
    </div>
  );
}

export default Youtube;