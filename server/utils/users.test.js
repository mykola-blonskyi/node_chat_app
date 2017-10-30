const expect = require('expect');

const {Users} = require('./users');

describe('User class', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'User1',
        room: 'Room 1'
      },
      {
        id: '2',
        name: 'User2',
        room: 'Room 2'
      },
      {
        id: '3',
        name: 'User3',
        room: 'Room 1'
      },
    ];
  });

  it('Should add user', () => {
    let test_user = {
      id: '1',
      name: 'Nick',
      room: 'Test room'
    };

    let users = new Users();

    let me = users.addUser('1', 'Nick', 'Test room');
    expect(users.users).toEqual([test_user]);
    expect(me).toInclude(test_user);
  });

  it('Should return names for room 1', () => {
    let user_list = users.getUserList('Room 1');
    expect(user_list.length).toBe(2);
  });

  it('Should remove user by id', () => {
    let remove_user = users.removeUser('1');
    expect(remove_user).toEqual({
        id: '1',
        name: 'User1',
        room: 'Room 1'
      });
    expect(users.users.length).toBe(2);
  });

  it('Should not remove user', () => {
    let remove_user = users.removeUser('11');

    expect(remove_user).toEqual(null);
    expect(users.users.length).toBe(3);
  });

  it('Should return a user by id', () => {
    let user2 = users.getUser('2');

    expect(user2.name).toBe('User2');
  });

  it('Should not return user', () => {
    expect(users.getUser('11')).toNotExist();
  });
});