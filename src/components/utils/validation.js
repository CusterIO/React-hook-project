export const ValidateCharacters = input => {
  if (!input) {
    return true;
  } else if (!input.match(/^[a-zA-Z0-9 .,!?@)(\-\r\n]+$/)) {
    return true;
  }

  return false;
};

/**
 * This is a modified version of the regex at: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 * @param {*} email
 */
export const ValidateEmail = email => {
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|one|nes|tech|app|agency|blog|auto|buy|business)\b/;
  return !re.test(String(email).toLowerCase());
};

export const ValidateRepeatEmail = ({ email, repeatEmail }) => {
  if (email === repeatEmail) {
    return false;
  }

  return true;
};

export const ValidateRepeatPassword = ({ password, repeatPassword }) => {
  if (password === repeatPassword) {
    return false;
  }

  return true;
};

export const ValidatePassword = password => {
  let strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
  return !strongRegex.test(String(password));
};

export const ValidateText = input => {
  if (!input) {
    return true;
  } else if (!input.match(/^[a-zA-Z0-9 .,!?)(\-\r\n]+$/)) {
    return true;
  }
  return false;
};
