

export default function getInitials(name: string) {
  if (!name) return '';
  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0].toUpperCase())
    .join('');
}

export function formatUSD(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function capitalizeFirst(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function shortenFrequency(word: string) {
  const map = {
    monthly: 'mth',
    weekly: 'wkly',
    daily: 'dly',
    yearly: 'yr',
    annually: 'yr'
  };

  return map[word.toLowerCase()] || word;
}

export function renderStatusIcon(status: string) {
    if (status === 'SUCCEEDED') return '✅';
    else if (status === 'FAILED') return '❌';
    else return '⏱️';
}