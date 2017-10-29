const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    created_at: moment().valueOf()
  };
};

const generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?=${lat},${lng}`,
    created_at: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};