import { TableField } from '@/types/types';

export const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export const extractDomain = (url: string) => {
  let domain = url.replace(/^(https?:\/\/)?(www\.)?/i, '');
  domain = domain.split('/')[0];
  domain = domain.split(':')[0];
  return domain;
};

export const formatNumber = (num: number) => {
  num = Math.round(num * 100) / 100;
  if (num === 0) return '0';
  const isNegative = num < 0;
  num = Math.abs(num);

  let formattedNum;
  if (num >= 1000000000000) {
    formattedNum = (num / 1000000000000).toFixed(2).replace(/\.00$/, '') + 'T';
  } else if (num >= 1000000000) {
    formattedNum = (num / 1000000000).toFixed(2).replace(/\.00$/, '') + 'B';
  } else if (num >= 1000000) {
    formattedNum = (num / 1000000).toFixed(2).replace(/\.00$/, '') + 'M';
  } else if (num >= 1000) {
    formattedNum = (num / 1000).toFixed(2).replace(/\.00$/, '') + 'K';
  } else {
    formattedNum = num.toString();
  }

  return isNegative ? '-' + formattedNum : formattedNum;
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${month}/${day}/${year}`;
};

export const getHiddenClasses = (i: number, length: number) => {
  let hiddenClasses = '';

  if (i === length - 1) {
    hiddenClasses += 'hidden ';
  }
  if (length % 2 === 0 && i === length - 2) {
    hiddenClasses += 'sm:hidden ';
  }
  if (length % 3 === 0 && i >= length - 3) {
    hiddenClasses += '2xl:hidden';
  } else if (length % 3 === 1 && i === length - 1) {
    hiddenClasses += '2xl:hidden';
  } else if (length % 3 === 2 && i >= length - 2) {
    hiddenClasses += '2xl:hidden';
  } else {
    hiddenClasses += '2xl:block';
  }

  return hiddenClasses;
};

export const getTableFields = (
  fields: Record<string, (string | TableField)[]>,
  data: Record<string, number | string>
) => {
  const result: Record<string, string>[] = [];
  Object.entries(fields).forEach(([key, value]) => {
    const parts: string[] = [];
    for (let i = 0; i < value.length; i++) {
      if (i % 2 === 0) {
        if (!data[(value[i] as TableField).key]) {
          return;
        } else if ((value[i] as TableField).type === 'number') {
          parts.push(
            formatNumber(data[(value[i] as TableField).key] as number)
          );
        } else {
          parts.push(data[(value[i] as TableField).key] as string);
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
