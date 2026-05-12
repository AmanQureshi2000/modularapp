import apiClient from "../config/axios";

export const getChannelData = async (searchInput) => {
    const res = await apiClient(`/youtube/channel?query=${searchInput}`);
    return res.data.data; // Returns channel data directly
}

export const getVideos = async (channelId, pageToken = null) => {
    const res = await apiClient(`/youtube/videos`, {
        params: { channelId, pageToken }
    });
    return res.data; // Returns { items, nextPageToken }
}