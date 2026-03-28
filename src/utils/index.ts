export const formatDate = (date: string | null) => {
  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
    .format(new Date(date))
    .replace(' г.', '');
};
