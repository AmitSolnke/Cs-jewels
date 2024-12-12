import React from 'react'


 export const parseHtmlContent = (html) => {
        const parser = new DOMParser();
        const parsedDocument = parser.parseFromString(html, 'text/html');
        return parsedDocument.body.textContent || '';
      };