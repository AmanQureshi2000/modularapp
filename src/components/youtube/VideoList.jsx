import React from 'react';
import VideoCard from './VideoCard';

function VideoList({ videos, nextPageToken, onLoadMore }) {
  if (!videos || videos.length === 0) return null;

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ marginBottom: '20px' }}>📹 Recent Videos</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {videos.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
      </div>

      {nextPageToken && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={onLoadMore}
            style={{
              padding: '12px 30px',
              fontSize: '16px',
              borderRadius: '6px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,123,255,0.3)',
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoList;