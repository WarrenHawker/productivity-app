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
