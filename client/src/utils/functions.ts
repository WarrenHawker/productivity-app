export const formatDate = (input: Date | string): string => {
  const date = input instanceof Date ? input : new Date(input);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric' as const,
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate.replace(/(\d+)(st|nd|rd|th)/, '$1');
};

export const fetchData = async (urlSuffix: string) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/${urlSuffix}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const formatDateForInput = (date: Date | string) => {
  if (typeof date == 'string') {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
