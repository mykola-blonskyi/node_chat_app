const generateMessage = (from, text) => {
  return {
    from,
    text,
    created_at: new Date().getTime()
  };
};

const generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?=${lat},${lng}`,
    created_at: new Date().getTime()
  };
};

module.exports = {generateMessage, generateLocationMessage};