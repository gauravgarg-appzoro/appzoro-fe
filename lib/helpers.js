// const PORTS = {
//     C_ONE: 3000,
//     C_TWO: 3001,
//     C_THREE: 3002,
//   }
export const REACT_APP_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.appzoro.com/';
// const SKIP_PREFLIGHT_CHECK = true

// const NODE_PATH = 'src'

export const BASE_URL = REACT_APP_API_URL;

export const STRAPI_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '') : 'https://admin.appzoro.com';

export const API_ENDPOINTS = {
  // LOGIN: `${PORTS.C_ONE}/auth/signin`,
  GET_BLOG_LIST: `posts?_sort=publishedAt:desc&_limit=6`,
  GET_PORTFOLIO_LIST: `portfolios`,
};

export const API_STATUS = {
  SUCCESS: 200,
};

export const existSlugMatchWithObject = (value, valueOfObject) => {
  let newValueOfObj = undefined;
  valueOfObject.filter(countryPage => {
    if (countryPage?.slug === value) {
      newValueOfObj = countryPage;
      return;
    }
  });
  return newValueOfObj;
};

export const generateFormData = (values = {}) => {
  let newForm = new window.FormData();
  for (let key of Object.keys(values)) {
    if (![undefined, null].includes(values[key])) {
      if (Array.isArray(values[key])) {
        for (let item of values[key]) {
          newForm.append(key, item);
        }
      } else {
        newForm.append(key, values[key]);
      }
    }
  }
  return newForm;
};

export const getBase64 = img => {
  return new Promise(res => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      res({
        data: reader.result,
        name: img.name,
        type: img.type,
      });
    });
    reader.readAsDataURL(img);
  });
};

export const generateCategoryFilter = (categorySlug, valueOfObject = {}) => {
  let newPath = undefined;
  valueOfObject.filter(category => {
    if (category?.slug === categorySlug) {
      newPath = category.posts;
      return;
    }
  });
  return newPath;
};

export const generateArchivesFilter = (archivesSlug, valueOfObject = {}) => {
  let newPath = undefined;
  valueOfObject.filter(archives => {
    if (archives?.slug === archivesSlug) {
      newPath = archives.posts;
      return;
    }
  });
  return newPath;
};
