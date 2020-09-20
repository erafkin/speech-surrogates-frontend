const API_URL = 'http://localhost:3000/api';
// const API_URL = 'https://speech-surrogates-backend.herokuapp.com/api';
const LOCAL_STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_USERNAME_KEY = 'username';

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  ADMIN: '/admin',
  BLOG: '/blog',
  NEW_BLOG: '/new-blog',
  RESET_PASSWORD: '/reset-password',
  LANGUAGES: '/languages/:lang_name',
  NEW_LANG: '/new-media-entry',
  MY_BIO: '/my-bio',
  BIOS: '/bios',
  MAP: '/map',
  NEW_MAP_LANG: '/new-map-entry',
  PROFILE: '/profile',
  ABOUT: '/about/:about_title',
  NEW_ABOUT: '/new-about',
};

export {
  API_URL,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USERNAME_KEY,
  ROUTES,
};
