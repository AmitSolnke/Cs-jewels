import AboutUs from './Components/Screens/AboutUs';
import NewsAndBlogs from './Components/Screens/NewsAndBlogs';
import ContactUs from './Components/Screens/ContactUs';
import FindAStore from './Components/Screens/FindAStore';
import Home from './Components/Screens/Home';
import AuthModal from './Components/Screens/AuthModal';
import MyOrder from './Components/Screens/MyOrder';
// import Dashboard from './Components/Screens/Dashboard';
import TermsAndCondition from './Components/Screens/TermsAndCondition';
import CRSPolicy from './Components/Screens/CRSPolicy';
import PrivacyPolicy from './Components/Screens/PrivacyPolicy';
import ProductDetails from './Components/Screens/ProductDetails';
import Bullions from './Components/Screens/Bullions/Bullions';
import Jewellerys from './Components/Screens/Jewellerys';
import { PersonalDetails } from './Components/Screens/PersonalDetails';
import { AddressBook } from './Components/Screens/Address-book/AddressBook';
import { ShoppingBag } from './Components/Screens/ShoppingBag';
import { Wishlist } from './Components/Screens/Wishlist/Wishlist';
import { PaymentSuccess } from './Components/Screens/Checkout/PaymentSuccess';
import { YourDetails } from './Components/Screens/Checkout/YourDetails';
import { Delivery } from './Components/Screens/Checkout/Delivery';
import { Navigate } from 'react-router-dom';
import { ProductCatalogues } from './Components/Screens/Product-catalogue/ProductCatalogues';
import { ProductDetailsLatest } from './Components/Screens/Product-details/ProductDetailsLatest';

export const normalRouts = [
  {
    path: '/success/payment/:order_id',
    name: 'PaymentSuccess',
    element: <PaymentSuccess />,
    exact: true,
    strict: false,
  },
]

export const frontAppRoutes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
    exact: true,
    strict: false,
  },
  {
    path: '/contact-us',
    name: 'Contact Us',
    element: <ContactUs />,
    exact: true,
    strict: false,
  },
  {
    path: '/terms-and-conditions',
    name: 'Terms And Condition',
    element: <TermsAndCondition />,
    exact: true,
    strict: false,
  },
  {
    path: '/CSR-Policy',
    name: 'CRS Policy',
    element: <CRSPolicy />,
    exact: true,
    strict: false,
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    element: <PrivacyPolicy />,
    exact: true,
    strict: false,
  },
  {
    path: '/aboutus',
    name: 'About Us',
    element: <AboutUs />,
    exact: true,
    strict: false,
  },
  {
    path: '/auth',
    name: 'Auth',
    element: <AuthModal />,
    exact: true,
    strict: false,
  },
  {
    path: '/news-&-blog',
    name: 'News And Blogs',
    element: <NewsAndBlogs />,
    exact: true,
    strict: false,
  },
  {
    path: '/bullions',
    name: 'Bullions',
    element: <Bullions />,
    exact: true,
    strict: false,
  },
  {
    path: '/jewellerys',
    name: 'Jewellerys',
    element: <Jewellerys />,
    exact: true,
    strict: false,
  },
  {
    path: '/find-a-store',
    name: 'Find A Store',
    element: <FindAStore />,
    exact: true,
    strict: false,
  },
  {
    path: '/wishlist',
    name: 'Wish List',
    element: <Wishlist />,
    exact: true,
    strict: false,
  },
  {
    path: '/shopping-bag',
    name: 'Shopping Bag',
    element: <ShoppingBag />,
    exact: true,
    strict: false,
  },
  // {
  //   path: '/product-details/:id',
  //   name: 'Product Details',
  //   element: <ProductDetails />,
  //   exact: true,
  //   strict: false,
  // },
  {
    path: '/product-details/:id',
    name: 'Product Details',
    element: <ProductDetailsLatest />,
    exact: true,
    strict: false,
  },
  {
    path: '/product-catalogues',
    name: 'Product Catalogues',
    element: <ProductCatalogues />,
    exact: true,
    strict: false,
  },
  
];

export const dashboardRoutes = [
  {
    path: '/dashboard/personal-details',
    name: 'Personal Details',
    element: <PersonalDetails />,
    exact: true,
    strict: false,
  },
  {
    path: '/dashboard/myorder',
    name: 'My Order',
    element: <MyOrder />,
    exact: true,
    strict: false,
  },
  {
    path: '/dashboard/address-book',
    name: 'Address Book',
    element: <AddressBook />,
    exact: true,
    strict: false,
  },
]

export const orderRoutes = [
  {
    path: '/order/check-out',
    name: 'Check Out',
    element: <Navigate to="/order/check-out/details" />,
    exact: true,
    strict: false,
  },
  {
    path: '/order/check-out/details',
    name: 'YourDetails',
    element: <YourDetails />,
    exact: true,
    strict: false,
  },
  {
    path: '/order/check-out/delivery',
    name: 'Delivery',
    element: <Delivery />,
    exact: true,
    strict: false,
  },
]