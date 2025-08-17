// Simple heuristic to estimate content availability
// This is based on popularity, release date, and content type
export const getAvailabilityIndicator = (item) => {
  const popularity = item.popularity || 0;
  const voteCount = item.vote_count || 0;
  const releaseDate = item.release_date || item.first_air_date;
  const isRecent = releaseDate && new Date(releaseDate) > new Date('2015-01-01');
  const isPopular = popularity > 50 || voteCount > 1000;
  
  // Higher chance for popular and recent content
  if (isPopular && isRecent) {
    return {
      status: 'high',
      label: 'HD',
      color: 'bg-green-500',
      confidence: 85
    };
  }
  
  // Medium chance for either popular or recent
  if (isPopular || isRecent) {
    return {
      status: 'medium',
      label: 'HD',
      color: 'bg-yellow-500',
      confidence: 65
    };
  }
  
  // Lower chance for older/less popular content
  if (popularity > 10) {
    return {
      status: 'low',
      label: 'SD',
      color: 'bg-orange-500',
      confidence: 40
    };
  }
  
  // Lowest chance
  return {
    status: 'unknown',
    label: '?',
    color: 'bg-gray-500',
    confidence: 20
  };
};

export const getAvailabilityIcon = (status) => {
  switch (status) {
    case 'high':
      return '✓';
    case 'medium':
      return '◐';
    case 'low':
      return '◯';
    default:
      return '?';
  }
};