import CheckOut from './Components/Screens/CheckOut';

const shopping_routes = [
  {
    path: '/check-out',
    name: 'Check Out',
    element: <CheckOut />,
    exact: true,
    strict: false,
  },
];

export default shopping_routes;