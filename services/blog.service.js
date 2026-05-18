import FetchBase from '../lib/fetchBase';
import { API_ENDPOINTS, API_DEFAULT_VALUE } from '../lib/constants';

class Blog extends FetchBase {
  getAllBlogs = async (pageNo, filterValue) => {
    try {
      let temp = {};
      pageNo ? (temp._start = pageNo) : (temp._start = API_DEFAULT_VALUE?.DEFAULT_PAGE);
      filterValue?.search && (temp.title_contains = filterValue?.search);
      filterValue?.category && (temp._q = filterValue?.category);
      filterValue?.archives && (temp._q = filterValue?.archives);

      let pageLimit = API_DEFAULT_VALUE?.BLOG_PAGE_LIMIT;
      let publishedAtDesc = `publishedAt:${API_DEFAULT_VALUE?.SORTING_DESC}`;
      // let publishedAtDesc = `createdAt:${API_DEFAULT_VALUE?.SORTING_DESC}`;
      let response = await this.getStrapi(`${API_ENDPOINTS.GET_BLOG_LIST}`, {
        _sort: publishedAtDesc,
        _limit: pageLimit,
        ...temp,
      });
      if (response?.length || response?.length == 0) {
        return response;
      }
      return undefined;
    } catch (err) {
      return undefined;
    } finally {
      console.log('finally');
    }
  };

  getAllBlogsCount = async () => {
    try {
      let response = await this.getStrapi(API_ENDPOINTS.GET_BLOG_LIST_COUNT);

      return response;
    } catch (err) {
      return undefined;
    } finally {
      console.log('finally');
    }
  };

  getBlogBySlug = async slug => {
    try {
      let temp = {};
      slug && (temp.slug = slug);
      let response = await this.getStrapi(`${API_ENDPOINTS.GET_BLOG_LIST}`, {
        ...temp,
      });
      if (response[0]?.id) {
        response = await this.getStrapi(`${API_ENDPOINTS.GET_BLOG_LIST}/${response[0]?.id}`);
        return response;
      }
      if (response?.length) {
        return response;
      }
      return undefined;
    } catch (err) {
      return undefined;
    } finally {
      console.log('finally');
    }
  };

  getRecentBlogs = async () => {
    try {
      let pageNumber = API_DEFAULT_VALUE?.DEFAULT_PAGE;
      let pageLimit = API_DEFAULT_VALUE?.BLOG_PAGE_LIMIT;
      let publishedAtDesc = `publishedAt:${API_DEFAULT_VALUE?.SORTING_DESC}`;
      let response = await this.getStrapi(`${API_ENDPOINTS.GET_BLOG_LIST}`, {
        _sort: publishedAtDesc,
        _start: pageNumber,
        _limit: pageLimit,
      });
      if (response?.length) {
        return response;
      }
      return undefined;
    } catch (err) {
      return undefined;
    } finally {
      console.log('finally');
    }
  };

  getBlogsCategory = async () => {
    try {
      let response = await this.getStrapi(`${API_ENDPOINTS.GET_BLOG_CATEGORIES}`);
      return response;
    } catch (err) {
      return undefined;
    } finally {
      console.log('finally');
    }
  };

  getArchivesBlog = async () => {
    try {
      let response = await this.getStrapi(`${API_ENDPOINTS.GET_BLOG_ARCHIVES}`);
      if (response?.length) {
        return response;
      }
      return undefined;
    } catch (err) {
      return undefined;
    } finally {
      console.log('finally');
    }
  };
}

const blogService = new Blog();

export default blogService;
