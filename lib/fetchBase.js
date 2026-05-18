import { BASE_URL, HUBSPOT_FORM_API, HUBSPOT_FORM_ID, API_STATUS } from './constants';
import { messageNotification } from './notification';

class FetchBaseAPI {
  // for serializing the object to query string
  serialize(obj = {}) {
    return Object.keys(obj).length
      ? '?' +
          Object.keys(obj)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
            .join('&')
      : '';
  }
  get headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      devicetype: 'web',
      // ...(COOKIE_STOAGE.getItem('token') && {
      //   Authorization: `jwt ${COOKIE_STOAGE.getItem('token')}`,
      //   organizationId: COOKIE_STOAGE.getItem('organizationId'),
      // }),
    };
  }
  // this will convert object to form data
  getFormData(object = {}) {
    const formData = new FormData();
    for (const key in object) {
      formData.append(key, object[key]);
    }
    return formData;
  }

  // download({ filename, text }) {
  //   const pom = document.createElement('a')
  //   pom.setAttribute(
  //     'href',
  //     'data:text/csv;charset=utf-8,' + encodeURIComponent(text)
  //   )
  //   pom.setAttribute('download', filename)

  //   if (document.createEvent) {
  //     const event = document.createEvent('MouseEvents')
  //     event.initEvent('click', true, true)
  //     pom.dispatchEvent(event)
  //   } else {
  //     pom.click()
  //   }
  // }

  // ---------------- Method for Hubspot ------------------------------
  // this will construct the API url

  postBody(data = {}) {
    const dataValues = data || {};
    const fields = [];

    const hubspotFormate = {};
    for (const key in dataValues) {
      if (dataValues[key] === undefined) {
        delete dataValues[key];
      } else {
        let newData = {};
        let subObject = '';
        if (typeof dataValues[key] === 'object') {
          const subDataValues = dataValues[key];
          for (const fkey in subDataValues) {
            subObject = `${subObject}${subDataValues[fkey]};`;
          }
        }
        newData.name = key;
        newData.value = dataValues[key];
        subObject && (newData.value = subObject);
        fields.push(newData);
      }
    }
    const headers = this.headers;
    hubspotFormate.fields = fields;
    // hubspotFormate.submittedAt = new Date().toISOString();

    if (headers['Content-Type'] === 'application/json') {
      return JSON.stringify(hubspotFormate);
    } else {
      return this.getFormData(hubspotFormate);
    }
  }

  constructHubstpotUrl(url) {
    return `${HUBSPOT_FORM_API}${HUBSPOT_FORM_ID?.PORTAL_ID}/${url}`;
  }
  async fetchMethodHubspot(url, options) {
    try {
      const response = await fetch(url, options);
      if (response.status === 401) {
        setTimeout(() => {
          window.location.reload();
        }, 250);
      }
      const jsonRes = await response.json();

      if (response.status === API_STATUS.SUCCESS || response.status === API_STATUS.CREATED) {
        return [true, jsonRes];
      } else {
        messageNotification('error', jsonRes.message);
        jsonRes['__response'] = response;
        throw jsonRes;
      }
    } catch (err) {
      messageNotification('error', err.message);
      return [false, err];
    }
  }

  postHubspot(url, data) {
    return this.fetchMethodHubspot(this.constructHubstpotUrl(url), {
      method: 'POST',
      body: this.postBody(data),
      headers: this.headers,
    });
  }

  postHubspotWithFormData = (url, data) => {
    let newHeaders = this.headers;
    delete newHeaders['Content-Type'];
    // Object.assign(newHeaders, {'Content-Type': "application/x-www-form-urlencoded"});
    // Object.assign(newHeaders, {"content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"});
    // Object.assign(newHeaders, {"Content-Type": "multipart/form-data"});
    return this.fetchMethodHubspot(this.constructHubstpotUrl(url), {
      method: 'POST',
      body: data,
      headers: newHeaders,
    });
  };

  //----------- Method for Strapionly ------------------
  // this will construct the API url
  constructUrl(url) {
    return BASE_URL + url;
  }
  async fetchMethodStrapi(url, options) {
    try {
      const response = await fetch(url, options);
      if (response.status === 401) {
        setTimeout(() => {
          window.location.reload();
        }, 250);
      }
      const jsonRes = await response.json();

      if (jsonRes.success || response.status === API_STATUS.SUCCESS || response.status === API_STATUS.CREATED) {
        return jsonRes;
      } else {
        messageNotification('error', jsonRes.message);
        jsonRes['__response'] = response;
        throw jsonRes;
      }
    } catch (e) {
      throw e;
    }
  }
  getStrapi(url, data) {
    return this.fetchMethodStrapi(this.constructUrl(url) + this.serialize(data), {
      method: 'GET',
      headers: this.headers,
    });
  }

  get(url, data) {
    return this.fetchMethod(this.constructUrl(url) + this.serialize(data), {
      method: 'GET',
      headers: this.headers,
    });
  }
  // End Strapi configration only

  // async downloadReport(url, data) {
  //   try {
  //     const response = await fetch(
  //       this.constructUrl(url) + this.serialize(data),
  //       {
  //         headers: this.headers,
  //       }
  //     )
  //     const filename = response.headers.get('content-disposition').split('"')[1]
  //     const text = await response.text()
  //     this.downloadReport({ filename, text })
  //   } catch (error) {
  //     throw new Error(error.message)
  //   }
  // }

  // post(url, data) {
  //   return this.fetchMethod(this.constructUrl(url), {
  //     method: 'POST',
  //     body: this.postBody(data),
  //     headers: this.headers,
  //   })
  // }

  // postWithFormData = (url, data) => {
  //   let newHeaders = this.headers
  //   delete newHeaders['Content-Type']
  //   return this.fetchMethod(this.constructUrl(url), {
  //     method: 'POST',
  //     body: data,
  //     headers: newHeaders,
  //   })
  // }

  // delete(url, data) {
  //   return this.fetchMethod(this.constructUrl(url), {
  //     method: 'Delete',
  //     body: this.postBody(data),
  //     headers: this.headers,
  //   })
  // }

  // put(url, data) {
  //   return this.fetchMethod(this.constructUrl(url), {
  //     method: 'PUT',
  //     body: this.postBody(data),
  //     headers: this.headers,
  //   })
  // }
}
//   const FetchBase = new FetchBaseAPI()

export default FetchBaseAPI;
