export const getMatchColor = (percentage: number): string => {
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 60) return 'text-blue-600';
  if (percentage >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

export const getMatchBgColor = (percentage: number): string => {
  if (percentage >= 80) return 'bg-green-100';
  if (percentage >= 60) return 'bg-blue-100';
  if (percentage >= 40) return 'bg-yellow-100';
  return 'bg-red-100';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
