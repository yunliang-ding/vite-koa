export const uuid = (size: number = 10) => {
  return Math.random()
    .toString(16)
    .substring(2, size + 2);
};

export const encrypt = (str: string) => {
  return `{{_#${str}_#}}`;
};

export const decrypt = (str: string, quotation = true) => {
  if (quotation) {
    return str?.replaceAll('"{{_#', '{').replaceAll('_#}}"', '}');
  }
  return str?.replaceAll('{{_#', '{').replaceAll('_#}}', '}');
};