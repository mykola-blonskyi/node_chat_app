const expect = require('expect');

const {generateMessage} = require('./message');

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