import FetchBase from '../lib/fetchBase';
import { API_ENDPOINTS } from '../lib/constants';

class Portfolio extends FetchBase {
  getPressList = async () => {
    try {
      let response = await this.getStrapi(API_ENDPOINTS.GET_PRESS_LIST);
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

const PressService = new Portfolio();

export default PressService;
