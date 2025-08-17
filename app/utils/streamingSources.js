// Streaming source providers with fallback chain
export const STREAMING_SOURCES = {
  VIDSRC: {
    id: 'vidsrc',
    name: 'VidSrc',
    quality: 'HD',
    priority: 1,
    getUrl: (type, tmdbId) => {
      if (type === 'movie') {
        return `https://vidsrc.xyz/embed/movie?tmdb=${tmdbId}`;
      } else {
        return `https://vidsrc.xyz/embed/tv?tmdb=${tmdbId}`;
      }
    }
  },
  VIDSRC_TO: {
    id: 'vidsrc_to',
    name: 'VidSrc Pro',
    quality: 'HD',
    priority: 2,
    getUrl: (type, tmdbId) => {
      if (type === 'movie') {
        return `https://vidsrc.to/embed/movie/${tmdbId}`;
      } else {
        return `https://vidsrc.to/embed/tv/${tmdbId}`;
      }
    }
  },
  EMBED_SU: {
    id: 'embed_su',
    name: 'EmbedSu',
    quality: 'HD',
    priority: 3,
    getUrl: (type, tmdbId) => {
      if (type === 'movie') {
        return `https://embed.su/embed/movie/${tmdbId}`;
      } else {
        return `https://embed.su/embed/tv/${tmdbId}`;
      }
    }
  },
  SUPEREMBED: {
    id: 'superembed',
    name: 'SuperEmbed',
    quality: 'HD',
    priority: 4,
    getUrl: (type, tmdbId) => {
      if (type === 'movie') {
        return `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`;
      } else {
        return `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1&s=1`;
      }
    }
  },
  TWOEMBED: {
    id: '2embed',
    name: '2Embed',
    quality: 'HD',
    priority: 5,
    getUrl: (type, tmdbId) => {
      if (type === 'movie') {
        return `https://www.2embed.cc/embed/${tmdbId}`;
      } else {
        return `https://www.2embed.cc/embedtv/${tmdbId}`;
      }
    }
  }
};

// Get all sources sorted by priority
export const getAllSources = () => {
  return Object.values(STREAMING_SOURCES).sort((a, b) => a.priority - b.priority);
};

// Get source by ID
export const getSourceById = (id) => {
  return Object.values(STREAMING_SOURCES).find(source => source.id === id);
};

// Get streaming URL for a specific source
export const getStreamingUrl = (sourceId, mediaType, tmdbId) => {
  const source = getSourceById(sourceId);
  if (!source) return null;
  
  return source.getUrl(mediaType, tmdbId);
};

// Get all available URLs for a media item
export const getAllStreamingUrls = (mediaType, tmdbId) => {
  return getAllSources().map(source => ({
    ...source,
    url: source.getUrl(mediaType, tmdbId)
  }));
};