import React from 'react';

function VideoCard({ video }) {
  const getDaysAgo = (publishedDate) => {
    const days = Math.floor((new Date() - new Date(publishedDate)) / (1000 * 60 * 60 * 24));
    return `${days} days ago`;
  };

  // Add safety checks
  if (!video?.id?.videoId) return null;

  return (
    <div
      style={{
        borderRadius: '8px',
        background: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'transform 0.2s',
      }}
    >
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
          title={video.snippet.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        ></iframe>
      </div>
      <div style={{ padding: '10px 15px' }}>
        <h4 style={{ margin: '10px 0', fontSize: '16px' }}>{video.snippet.title}</h4>
        <p style={{ fontSize: '14px', color: '#666' }}>
          {new Date(video.snippet.publishedAt).toLocaleDateString()}&nbsp;&nbsp;&nbsp;&nbsp;
          {getDaysAgo(video.snippet.publishedAt)}
        </p>
      </div>
    </div>
  );
}

export default VideoCard;