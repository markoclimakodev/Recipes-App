export const formatDate = (dataString:string) => {
  const dataDay = dataString.split('T')[0];
  const data = dataDay.split('-');
  const day = data[2];
  const month = data[1];
  const year = data[0];
  return `${day}/${month}/${year}`;
};
