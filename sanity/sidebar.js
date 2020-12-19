import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// Build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Pizzeria`)
    .items([
      // Create a new subitem
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🍕</strong>)
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      ...S.documentTypeListItems().filter(item => item.getId() !== 'storeSettings'),
    ]);
}
