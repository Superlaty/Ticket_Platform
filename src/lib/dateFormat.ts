export function formatDate(dateString: string) {
  if(!dateString){
    return "";
  }
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('zh-TW', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24小時制
  });

  return formatter.format(date).replace(/\//g, '/');
};