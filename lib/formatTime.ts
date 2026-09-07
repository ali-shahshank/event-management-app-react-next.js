export function formatTime(time: string): string {
  const [hoursStr, minutes] = time.split(':');
  const hours = parseInt(hoursStr, 10);

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${displayHours}:${minutes} ${period}`;
}
