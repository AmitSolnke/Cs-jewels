import React from 'react';

export const parseHtmlContent = (html) => {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(html, 'text/html');
  return parsedDocument.body.textContent || '';
};

export const isSameArray = (arr1, arr2) => {
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;
  return [...arr1]
    .sort()
    .every((val, index) => val === [...arr2].sort()[index]);
};
