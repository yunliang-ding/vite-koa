import cloneDeepWith from 'lodash.clonedeepwith';
import React from 'react';

export const isEmpty = (param: any) => {
  if (param === null || param === undefined) {
    return true;
  }
  if (Array.isArray(param)) {
    return param.length === 0;
  }
  if (typeof param === 'string') {
    return param.trim() === '';
  }
  if (typeof param === 'object') {
    return Object.keys(param).length === 0;
  }
  return false;
};

export const uuid = (size: number = 10) => {
  return Math.random()
    .toString(16)
    .substring(2, size + 2);
};

/** ReactElement 对象不参与深拷贝 */
export const cloneDeep = (source: any) => {
  return cloneDeepWith(source, (target: any) => {
    if (React.isValidElement(target)) {
      return target;
    }
  });
};

/** 获取类型 */
export const getType = (obj: any): string => {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  return type.toLocaleLowerCase();
};

// 千分位，小数点2位
export const NumberFormat = (
  number: any,
  options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  },
  emptyNode = '-',
) => {
  if (isNaN(Number.parseFloat(number))) {
    return emptyNode;
  }
  return Number(number).toLocaleString('zh-CH', options);
};

export const textWrapRender = (v: string) => {
  return v;
}