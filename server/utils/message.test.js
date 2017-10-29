const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('Should generate correct message object', () => {
    let from = 'Nick';
    let text = 'test text';
    let msg = generateMessage(from, text);

    expect(msg.from).toBe(from);
    expect(msg.text).toBe(text);
    expect(msg.created_at).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('Should generate correct location msg', () => {
    let from = 'Nick';
    let lat = 1;
    let lng = 1;
    let urlStr = `https://www.google.com/maps?=${lat},${lng}`

    let locMsg = generateLocationMessage(from, lat, lng);

    expect(locMsg).toInclude({from});
    expect(locMsg.created_at).toBeA('number');
    expect(locMsg.url).toBe(urlStr);
  });
});