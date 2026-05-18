export const REACT_APP_API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.appzoro.com').replace(/\/$/, '') + '/';
export const BASE_URL = REACT_APP_API_URL;
export const HUBSPOT_FORM_API = `https://api.hsforms.com/submissions/v3/integration/submit/`;
export const HUBSPOT_FORM_API_FILE = `https://api.hubapi.com/filemanager/api/v2/files?hapikey=`;
export const STRAPI_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '') : 'https://admin.appzoro.com';
export const REACT_APP_SITE_URL = 'https://appzoro.com/';

// "start": "NODE_ENV=production node server.js",

export const HUBSPOT_FORM_ID = {
  PORTAL_ID: 20182889,
  CONTACT_US: '17186c12-c609-4200-8511-8dd3db0a2cf0',
  CAREER: 'c7b7bc4e-69a3-46cb-bbd0-2412d021394d',
  REQUEST_A_QUOTE: 'c319fe2d-4860-407a-bf59-509458159625',
  ENTERPRISE_SOLUTIONS: 'b38ac681-7cc3-4844-a908-c10db4c18bfa',
  FREE_CONSULTATION: 'e44d1262-de6c-48f7-a191-b3d9ff8bb334',
  BLOG_SUBSCRIBE: '0a426d04-66b6-4cd8-9d1a-9d7575d70b94',
  BLOG_COMMENT: '19dd96c4-f658-44dc-958a-3ab42424d1d0',
  CASE_STUDY_DOWNLOAD_ENQUIRY: 'ed4c8f5e-9d09-47e5-97d9-367f1b75dcde',
  SERVICE_PAGE_FORM: '8d697ad9-75dc-4ae8-9b8b-a3082f15fe32',
};

export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  IS_PUBLISHED: 'published',
};

export const SHARE_LINK = {
  FACEBOOK: `https://facebook.com/sharer/sharer.php?u=${REACT_APP_SITE_URL}`,
  TWITTER: `https://twitter.com/intent/tweet?text=${REACT_APP_SITE_URL}`,
  PINTEREST: `https://www.pinterest.com/pin/create/button/?url=${REACT_APP_SITE_URL}`,
  LINKEDIN: `https://www.linkedin.com/shareArticle?mini=true&url=${REACT_APP_SITE_URL}`,
};

export const API_DEFAULT_VALUE = {
  BLOG_PAGE_LIMIT: 10,
  DEFAULT_PAGE: 0,
  SORTING_DESC: 'desc',
};
export const API_ENDPOINTS = {
  GET_BLOG_LIST: `posts`,
  GET_BLOG_LIST_COUNT: `posts/count`,
  GET_BLOG_CATEGORIES: `categories`,
  GET_BLOG_ARCHIVES: `archives`,
  GET_PORTFOLIO_LIST: `portfolios`,
  GET_COUNTRY_PAGE_LIST: `country-pages`,
  GET_COUNTRY_DETAILS_PAGE_LIST: `country-pages?_q=`,
  GET_PRESS_LIST: `presses?_sort=PressDate:desc`,
};

export const VALIDATION = {
  MIN_PHONE_NUMBER: 10,
  MAX_PHONE_NUMBER: 12,
  MIN_PASSWORD: 8,
  MAX_PASSWORD: 8,
  MIN_CUSTOMER: 1,
  MIN_CHARACTER: 3,
  MAX_CUSTOMER: 50,
  MAX_CITY: 25,
  MAX_BIO: 250,
  MAX_FIRST_NAME: 25,
  MAX_LAST_NAME: 25,
  MAX_TITLE: 25,
  MAX_PROJECT_NAME: 50,
  MAX_FOLDER_NAME: 50,
  MAX_PROJECT_MANDAYS_DESCRIPTION: 250,
  MAX_ROLE_DESCRIPTION: 250,
  MAX_ACTION_TITEL: 250,
  MAX_ACTION_DESCRIPTION: 500,
  MAX_PROJECT_FINAL_COMMENT: 512,
  MAX_COMMENT: 2000,
  MAX_TITLE_NAME: 255,
  MAX_TASK_NAME: 255,
  MAX_TASK_DESCRIPTION: 2500,
  MAX_ROLE_TITLE: 50,
  MAX_FAQ_FILE_SIZE: 5242880,
  MAX_QUESTION: 512,
  MAX_ANSWER: 2000,
};
export const MESSAGES = {
  FULL_NAME_REQUIRE: 'Please enter your name!',
  FIRST_NAME_REQUIRE: 'Please enter your first name!',
  LAST_NAME_REQUIRE: 'Please enter your last name!',
  PHONE_NUMBER_REQUIRE: 'Please enter your contact number!',
  PHONE_NUMBER_VALIDATION: 'Please enter valid phone number!',
  EMAIL_MSG_SUBJECT: 'Please enter your subject!',
  MSG_TEXT_REQUIRE: 'Please enter your message!',
  EMAIL_VALIDATION: 'Please enter valid email!',
  EMAIL_REQUIRE: 'Please enter an email!',
  UPLOAD_FILE_REQUIRE: 'Please enter upload file!',
  VALID_TEXT_PATTARN: 'incorrect value inputted!',
  PASSWORD_REQUIRE: 'Please enter your password!',
  OLD_PASSWORD_REQUIRE: 'Please enter your old password!',
  COMPANY_NAME_REQUIRE: 'Please enter company name!',
  SERVICES_REQUIRE: 'Please select at least one service!',
  ALPHA_SPACE: 'Only alphabets are allowed!',
  // un used

  CITY_NAME_REQUIRE: 'Please enter city name!',
  NEW_PASSWORD_REQUIRE: 'Please enter your new password!',
  CONFIRM_PASSWORD_REQUIRE: 'Please enter your confirm password!',
  CONFIRM_PASSWORD_NOT_MATCH: "Password and confirm password doesn't match.",
  ADDRRESS_LINE_ONE_REQUIRE: 'Please enter your address!',
  CITY_REQUIRE: 'Please enter city name!',
  STATE_REQUIRE: 'Please select state!',
  COUNTRY_REQUIRE: 'Please select country!',
  AT_LEAST_ONE_DOCUMENT: 'At least one document is required!',
  UPLOAD_FILE: 'Document is required!',
  PASSWORD_MIN: 'Password must contain at least 8 characters!',
  PASSWORD_MAX: 'Password must contain at most 8 characters!',
  NAME_MIN: 'Name must contain at least 3 characters!',
  CITY_MAX: 'City must contain at most 25 characters!',
  BIO_MAX: 'Bio must contain at most 250 characters!',
  FIRST_NAME_MAX: 'This should not exceed than 25 characters!',
  LAST_NAME_MAX: 'This should not exceed than 25 characters!',
  ONLY_NAME_PATTARN: 'Please enter valid name!',
  AT_LEAST_ONE_LOWER_CASE: 'Password must contain at least one lowercase character!',
  AT_LEAST_ONE_UPPER_CASE: 'Password must contain at least one uppercase character!',
  AT_LEAST_ONE_DIGIT: 'Password must contain at least one digit!',
  AT_LEAST_ONE_SPECIAL_CHARACTER: 'Password must contain at least one special character!',
  EMAIL_ALREADY_TAKEN: 'Email address is already taken!',
  EMAIL_ALREADY_ENTERED: 'Email address is already taken in the form!',
  PHONE_NUMBER_MIN: 'minimum 10 characters are required!',
  PHONE_NUMBER_MAX: 'maximum 12 characters are allowed!',
  EMAIL_AT_MOST_ONE: 'Please select/enter at most one email!',
  NAME_WITHOUT_SPACE_PATTARN: 'Please enter valid name!',
};

export const API_RESPONSE_MESSAGES = {
  SUCCESS_FORM_SUBMIT: 'Thanks for submitting the form!',
  SUCCESS_CONSULTATION: 'Thanks for submitting the form. Our consultant will be in touch shortly.',
  SUCCESS_COMMENT: 'Thanks for submitting the comment',
};
/* eslint-disable no-useless-escape */
export const PATTERN = {
  NAME: /^[A-Za-z- ,’'.`~"]+$/,
  ALPHA_SPACE: /^[a-zA-Z ]+$/,
  AT_LEAST_ONE_LOWER_CASE: /[a-z]+/,
  AT_LEAST_ONE_UPPER_CASE: /[A-Z]+/,
  AT_LEAST_ONE_DIGIT: /[0-9]+/,
  AT_LEAST_ONE_SPECIAL_CHARACTER: /[\W]+/,
  PHONE_NUMBER: /^\(?\+?[\d\(\-\s\)]+$/,
  HTML_TAG_IGNORE: /(<([^>]+)>)/gi,
  HREF: /href=("|')(.*?)("|')/g,
  EMAIL: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
  FOLDER_NAME: /^[a-zA-Z0-9]{1,}(?: [a-zA-Z0-9 ]+){0,2}$/,
  NAME_WITHOUT_SPACE: /^[a-zA-Z0-9!@#$&()\_-`.+,/]{1,}(?: [a-zA-Z0-9!@#$&()\ | \ -`.+,/“”" ? * :~%^_=}[ ]+){0,2}$/,
};

export const CAROUSEL = {
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  autoplayTimeout: 1000,
  smartSpeed: 3000,
};

export const MobileAppCarousel = {
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  autoplayTimeout: 1000,
  smartSpeed: 3000,
};

export const WebAppCarousel = {
  responsive: {
    0: {
      items: 1,
    },
    450: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
  autoplayTimeout: 1000,
  smartSpeed: 3000,
};

export const DYNAMIC_ROUTES = {
  copyThat: {
    slugPath: 'copythat?pId=60bf79fd3b91052307f83989',
    slug: 'copythat',
    id: '60bf79fd3b91052307f83989',
  },
  atlantaTechVillage: {
    slugPath: 'official-atlanta-tech-village-app-coworking-space?pId=60c8809ce39bea1f104b8cac',
    slug: 'official-atlanta-tech-village-app-coworking-space',
    id: '60c8809ce39bea1f104b8cac',
  },
  joseline: {
    slugPath: 'joseline?pId=60c88a6fe39bea1f104b8cca',
    slug: 'joseline',
    id: '60c88a6fe39bea1f104b8cca',
  },
};
