import { MESSAGES, VALIDATION, PATTERN } from './constants';
import moment from 'moment-timezone';

/* eslint-disable no-useless-escape */
const { EMAIL_VALIDATION, PHONE_NUMBER_VALIDATION } = MESSAGES;

export function checkPattern(value, pattern) {
  if (!pattern) {
    return true;
  }
  return pattern?.test(value || '');
}

export function checkIfValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function checkIfPhoneNumber(phonenumber) {
  const re = /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}$/;
  return re.test(String(phonenumber));
}

export const validateEmailMessage = message => (rule, value, callback) => {
  if (value && !checkIfValidEmail(value.trim())) {
    callback(message || EMAIL_VALIDATION);
  }
  callback();
};

export const validatePhoneNumber = message => (rule, value, callback) => {
  if (value && !checkIfPhoneNumber(value.trim())) {
    callback(message || PHONE_NUMBER_VALIDATION);
  }
  callback();
};

export const validateCondition = (rule, value, callback) => {
  if (value) {
    callback();
  }
  callback('Please accept terms and conditions');
};

// used in appzoro
export const formatDate = (date, format = 'MM/DD/YYYY') => {
  return moment(date).format(format);
};

export const formatDateTime = (date, format = 'MM/DD/YYYY hh:mm a') => {
  return moment(date).format(format);
};

export const formatDateMMM = (date, format = 'MMM DD YYYY') => {
  return moment(date).format(format);
};

export const formatDateDDMMMYYYY = (date, format = 'DD MMM YYYY') => {
  return moment(date).format(format);
};

export const formatDay = (date, format = 'DD') => {
  return moment(date).format(format);
};

export const formatMonth = (date, format = 'MMM') => {
  return moment(date).format(format);
};
//

export const getMonthEndDay = (date, dateFormat, format = 'D') => {
  return moment(date, dateFormat)
    .endOf('month')
    .format(format);
};

export const disabledDateTodayFuture = current => {
  return current && current >= moment().startOf('day');
};

export const customDateObject = (year, month, day) => {
  return moment()
    .year(year)
    .month(month)
    .date(day)
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0);
};

export const getStartDate = date => {
  return date
    ?.startOf('day')
    ?.utc()
    .valueOf();
};

export const getEndDate = date => {
  return date
    ?.endOf('day')
    ?.utc()
    .valueOf();
};

export const getCurrentTime = () => {
  return moment()
    .utc()
    .valueOf();
};

export const getCurrentTimeMoment = () => {
  return moment();
};

export const generateRandomColors = () => {
  const colors = [
    { color: '#1281F8', backgroundColor: '#B6E4F9' },
    { color: '#00BBAB', backgroundColor: '#C0ECEA' },
    { color: '#9C56DC', backgroundColor: '#E4C3FF' },
    { color: '#FF6211', backgroundColor: '#FFD0C9' },
    { color: '#FF8100', backgroundColor: '#FBDB9A' },
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateName = (firstName = '', lastName = '') => {
  let string = '';
  if (firstName) {
    string += firstName.trim() + ' ';
  }
  if (lastName) {
    string += lastName.trim();
  }
  return string || '-';
};

export const passwordMessageGenerator = (obj = {}) => {
  const { characters = [], start = 'Please enter at least one ', length = VALIDATION.MIN_PASSWORD } = obj || {};
  const andOnWhichPosition = (characters || []).reduce((acc, condition) => {
    if (condition.result) {
      return acc + 1;
    }
    return acc;
  }, -1);
  let message = [];
  let index = -1;
  (characters || []).forEach(condition => {
    if (!condition.result) {
      return;
    }
    index += 1;
    if (index > 0 && index === andOnWhichPosition) {
      message.push(`and ${condition.msg}`);
    } else {
      message.push(condition.msg);
    }
  });
  let messageArrayLength = message?.length || 0;
  message = message.join(',');
  message += message ? (messageArrayLength < 2 ? ' character' : ' characters') : '';
  let newMessage = start + message;
  let lengthReult = length < VALIDATION.MIN_PASSWORD ? true : false;
  if (lengthReult) {
    if (andOnWhichPosition < 0) {
      newMessage = `minimum required length for password is ${VALIDATION.MIN_PASSWORD} characters`;
    } else {
      newMessage += ` and length should be minimum ${VALIDATION.MIN_PASSWORD} characters`;
    }
  }
  return {
    message: newMessage,
    result: newMessage !== start,
  };
};

export const firstTenNumbers = value => {
  value = value || '';
  const arr = [];
  for (let character of value) {
    let isNumber = Number(character);
    if (!isNaN(isNumber)) {
      arr.push(isNumber);
    }
    if (arr.length >= 10) {
      break;
    }
  }
  return arr.join('');
};

export const phoneTenDigitsValidation = value => {
  let newNumber = firstTenNumbers(value);
  return newNumber.length === 10;
};

export const findDigitsCount = value => {
  let counter = 0;
  value = value || '';
  for (let character of value) {
    if (!isNaN(Number(character))) {
      counter += 1;
    }
  }
  return counter;
};

export const phoneNumberValidation = (rule, value, callback) => {
  if (value) {
    const digits = findDigitsCount(value);
    if (!checkPattern(value, PATTERN.PHONE_NUMBER)) {
      return callback(MESSAGES.PHONE_NUMBER_VALIDATION);
    } else if (digits < VALIDATION.MIN_PHONE_NUMBER) {
      return callback(MESSAGES.PHONE_NUMBER_MIN);
    } else if (digits > VALIDATION.MAX_PHONE_NUMBER) {
      return callback(MESSAGES.PHONE_NUMBER_MAX);
    } else {
      return callback();
    }
  }
  callback();
};

export const multiEmailValidation = (rule, value, callback) => {
  let error = false;
  if (value) {
    value.map(email => {
      if (!checkIfValidEmail(email.value)) {
        error = true;
      }
    });
  }
  if (error) {
    return callback(MESSAGES.EMAIL_VALIDATION);
  } else {
    return callback();
  }
};
export const countryNameFilterForState = (values, avilableCountryForStateBorder) => {
  let countryList = [];
  let sortedlist = values.sort((a, b) => {
    return a?.properties?.name.localeCompare(b?.properties?.name);
  });
  sortedlist.filter(country => {
    if (country?.properties?.id === 'US') {
      countryList.push({
        id: 1,
        sortName: country?.properties?.id,
        name: country?.properties?.name,
        nameForBorder: avilableCountryForStateBorder[country?.properties?.id],
      });
    }
  });
  Object.keys(sortedlist).forEach(countryId => {
    if (avilableCountryForStateBorder[values[countryId].id]) {
      if (!(values[countryId].id === 'US')) {
        countryList.push({
          id: countryId,
          sortName: values[countryId]?.properties?.id,
          name: values[countryId]?.properties?.name,
          nameForBorder: avilableCountryForStateBorder[values[countryId].id],
        });
      }
    }
  });
  return countryList;
};

export const setWorldCountryLawBySortName = (sortName, avilableCountryForStateBorder) => {
  return avilableCountryForStateBorder[sortName];
};

export const imageLoader = url => {
  // Define the promise
  const imgPromise = new Promise(function imgPromise(resolve, reject) {
    // Create the image
    const imgElement = new Image();

    // When image is loaded, resolve the promise
    imgElement.addEventListener('load', function imgOnLoad() {
      resolve(this);
    });

    // When there's an error during load, reject the promise
    imgElement.addEventListener('error', function imgOnError() {
      reject();
    });

    // Assign URL
    imgElement.src = url;
  });

  return imgPromise;
};

export const checkPerimeryPermission = async (arr, primaryPermission) => {
  let isPemission = arr.filter(value => {
    return parseInt(value?.operationId) === primaryPermission && Boolean(value?.canView);
  });
  return isPemission[0]?.canView || false;
};

export const checkPerimeryWithSecondSubPermission = async (arr, secondSubPermission) => {
  let isPemission = arr.filter(value => {
    return parseInt(value?.operationId) === secondSubPermission && Boolean(value?.canView);
  });
  return isPemission[0]?.canView || false;
};
