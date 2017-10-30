const _ = require('lodash');

class Users {
  constructor(){
    this.users = [];
  }

  addUser(id, name, room){
    let user = {id: id, name: name, room: room};
    this.users.push(user);

    return user;
  }

  removeUser(id){
    let removed_user = this.getUser(id);

    if(removed_user){
      _.remove(this.users, (user) => user.id === id);
    }

    return removed_user;
  }

  getUser(id){
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList(room){
    let user_list = this.users.filter((user) => user.room === room);

    return user_list.map((user) => user.name);
  }
}

module.exports = {Users};