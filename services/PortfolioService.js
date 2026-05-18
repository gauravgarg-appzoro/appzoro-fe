import FetchBase from '../lib/fetchBase';
import { API_ENDPOINTS, API_STATUS } from '../lib/constants';

class Portfolio extends FetchBase {
  getAllPortfolios = async () => {
    try {
      let response = await this.getStrapi(API_ENDPOINTS.GET_PORTFOLIO_LIST);
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

  getAllPortfolioById = async id => {
    try {
      let response = await this.getStrapi(`${API_ENDPOINTS.GET_PORTFOLIO_LIST}/${id}`);
      if (response?.status === API_STATUS?.IS_PUBLISHED) {
        return response;
      }
      return undefined;
    } catch (err) {
      return undefined;
    } finally {
      console.log('finally');
    }
  };

  getAllCountryPage = async () => {
    try {
      let response = await this.getStrapi(API_ENDPOINTS.GET_COUNTRY_PAGE_LIST);
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

  getAllCountryPageById = async id => {
    try {
      let response = await this.getStrapi(`${API_ENDPOINTS.GET_COUNTRY_DETAILS_PAGE_LIST}${id}`);
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

const PortfolioService = new Portfolio();

export default PortfolioService;
