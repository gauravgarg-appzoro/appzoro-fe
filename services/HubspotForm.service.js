import FetchBase from '../lib/fetchBase';
import { HUBSPOT_FORM_ID } from '../lib/constants';
import { getBase64 } from '../lib/helpers';

class HubspotForm extends FetchBase {
  postContact = async values => {
    try {
      let [status, result] = await this.postHubspot(HUBSPOT_FORM_ID?.CONTACT_US, { ...values });
      if (status) {
        return [true, result];
      }
      return [false, undefined];
    } catch (err) {
      return [false, undefined];
    } finally {
      console.log('finally');
    }
  };

  postRequestQuote = async values => {
    try {
      let [status, result] = await this.postHubspot(HUBSPOT_FORM_ID?.REQUEST_A_QUOTE, { ...values });
      if (status) {
        return [true, result];
      }
      return [false, undefined];
    } catch (err) {
      return [false, undefined];
    } finally {
      console.log('finally');
    }
  };

  postEnterpriseSolutions = async values => {
    try {
      let [status, result] = await this.postHubspot(HUBSPOT_FORM_ID?.ENTERPRISE_SOLUTIONS, { ...values });
      if (status) {
        return [true, result];
      }
      return [false, undefined];
    } catch (err) {
      return [false, undefined];
    } finally {
      console.log('finally');
    }
  };

  postFreeConsultation = async values => {
    try {
      let [status, result] = await this.postHubspot(HUBSPOT_FORM_ID?.FREE_CONSULTATION, { ...values });
      console.log(status, result)
      if (status) {
        return [true, result];
      }
      return [false, undefined];
    } catch (err) {
      console.log(err)
      return [false, undefined];
    } finally {
      console.log('finally');
    }
  };
  servicePageConsulation = async values => {
    try {
      let [status, result] = await this.postHubspot(HUBSPOT_FORM_ID?.SERVICE_PAGE_FORM, { ...values });
      console.log(status, result)
      if (status) {
        return [true, result];
      }
      return [false, undefined];
    } catch (err) {
      console.log(err)
      return [false, undefined];
    } finally {
      console.log('finally');
    }
  };
  caseStudyDownloadEnquiry = async values => {
    try {
      let [status, result] = await this.postHubspot(HUBSPOT_FORM_ID?.CASE_STUDY_DOWNLOAD_ENQUIRY, { ...values });
      console.log(status, result)
      if (status) {
        return [true, result];
      }
      return [false, undefined];
    } catch (err) {
      console.log(err)
      return [false, undefined];
    } finally {
      console.log('finally');
    }
  };

  postSubscribe = async values => {
    try {
      let [status, result] = await this.postHubspot(HUBSPOT_FORM_ID?.BLOG_SUBSCRIBE, { ...values });
      if (status) {
        return [true, result];
      }
      return [false, undefined];
    } catch (err) {
      return [false, undefined];
    } finally {
      console.log('finally');
    }
  };

  postJobApply = async values => {
    try {
      const { firstname, email, phone, upload_resume, qualification } = values;
      let file = await getBase64(upload_resume?.fileList[0].originFileObj);

      let [status, result] = await this.postHubspot(HUBSPOT_FORM_ID?.CAREER, {
        firstname,
        email,
        phone,
        upload_resume: file,
        qualification,
      });
      // let [status, result] = await this.postHubspotWithFormData(
      //   HUBSPOT_FORM_ID?.CAREER,
      //   generateFormData({
      //     firstname,
      //     email,
      //     phone,
      //     upload_resume: upload_resume.fileList[0].originFileObj,
      //     qualification,
      //   })
      // );
      if (status) {
        return [true, result];
      }
      return [false, undefined];
    } catch (err) {
      return [false, undefined];
    } finally {
      console.log('finally');
    }
  };

  postSendComment = async values => {
    try {
      let [status, result] = await this.postHubspot(HUBSPOT_FORM_ID?.BLOG_COMMENT, { ...values });
      if (status) {
        return [true, result];
      }
      return [false, undefined];
    } catch (err) {
      return [false, undefined];
    } finally {
      console.log('finally');
    }
  };
}

const HubspotFormService = new HubspotForm();

export default HubspotFormService;
