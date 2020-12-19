import { MdStore as icon } from 'react-icons/md';

export default {
  // Computer name
  name: 'storeSettings',
  // Visible title
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'pizzamasters',
      title: 'Pizza Masters Currently Working',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotpizzas',
      title: 'Our clients favorite pizzas of the week',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
