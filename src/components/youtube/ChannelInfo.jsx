import React from 'react';

function ChannelInfo({ channelData }) {
  return (
    <div style={{
      marginTop: '30px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <img
          src={channelData.snippet.thumbnails.default.url}
          alt="Channel thumbnail"
          style={{ borderRadius: '50%', width: '80px', height: '80px' }}
        />
        <div>
          <h2 style={{ margin: 0 }}>{channelData.snippet.title}</h2>
          <p style={{ margin: '5px 0', color: '#666' }}>{channelData.snippet.description}</p>
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '15px',
      }}>
        <p><strong>👥 Subscribers:</strong> {Number(channelData.statistics.subscriberCount).toLocaleString()}</p>
        <p><strong>📺 Videos:</strong> {Number(channelData.statistics.videoCount).toLocaleString()}</p>
        <p><strong>👁️ Total Views:</strong> {Number(channelData.statistics.viewCount).toLocaleString()}</p>
        <p><strong>🌍 Country:</strong> {channelData.snippet.country || 'N/A'}</p>
        {channelData.brandingSettings?.channel?.keywords && (
          <p><strong>🏷️ Keywords:</strong> {channelData.brandingSettings.channel.keywords}</p>
        )}
      </div>

      {channelData.brandingSettings?.image?.bannerExternalUrl && (
        <div style={{ marginTop: '20px' }}>
          <strong>🎨 Banner:</strong>
          <img
            src={channelData.brandingSettings.image.bannerExternalUrl}
            alt="Channel banner"
            style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
          />
        </div>
      )}

      {channelData.topicDetails?.topicCategories?.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          <strong>📚 Topics:</strong>
          <ul style={{ paddingLeft: '20px' }}>
            {channelData.topicDetails.topicCategories.map((topic, i) => (
              <li key={i}>
                <a href={topic} target="_blank" rel="noreferrer">{topic}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChannelInfo;