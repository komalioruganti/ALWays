const users = [];

//Join users to the chat
function userJoin(id, username){
    const user = {id,username};
    users.push(user);
    return user;
}

function getCurrentUser(id){
    return users.find(user => user.id === id);
}

module.exports ={
    userJoin,
    getCurrentUser
}
