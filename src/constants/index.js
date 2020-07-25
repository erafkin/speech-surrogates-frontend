// const API_URL = 'http://localhost:3000/api';
const API_URL = 'https://speech-surrogates-backend.herokuapp.com/api';
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
  ABOUT: '/about',
  SPEECH_SURROGATES: '/speech-surrogates',
  LANGUAGES: '/languages/:lang_name',
  NEW_LANG: '/new-grant-language',
  MY_BIO: '/my-bio',
  BIOS: '/bios',
  MAP: '/map',
  TYPOLOGICAL_QUESTIONS: '/typological-questions',
};

export {
  API_URL,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USERNAME_KEY,
  ROUTES,
};
