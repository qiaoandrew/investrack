import { formatNumber } from './helpers';

interface Field {
  key: string;
  type: string;
}

export const getTableFields = (
  fields: Record<string, (string | Field)[]>,
  data: Record<string, number | string>
) => {
  const result: Record<string, string>[] = [];
  Object.entries(fields).forEach(([key, value]) => {
    const parts: string[] = [];
    for (let i = 0; i < value.length; i++) {
      if (i % 2 === 0) {
        if (!data[(value[i] as Field).key]) {
          return;
        } else if ((value[i] as Field).type === 'number') {
          parts.push(formatNumber(data[(value[i] as Field).key] as number));
        } else {
          parts.push(data[(value[i] as Field).key] as string);
        }
      } else {
        parts.push(value[i] as string);
      }
    }
    result.push({
      label: key,
      value: parts.join(''),
    });
  });
  return result;
};
