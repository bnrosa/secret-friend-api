function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

module.exports = function raffleSecretFriend(userList){
    if(userList.length < 3){
        return false;
    }

    let users = userList.map(user => user._id);
    let friends = [...users];
    const len = users.length;
    let matchs = {};

    for(let i = 0; i <users.length;i++){
        user = users[i];
        
        for(let j=0; j<len; j++){
            let randomNumber = getRndInteger(0, friends.length);
            friend = friends[randomNumber];

            if(friends.length == 1 && friend == user){
                //"Sou o último e tirei eu mesmo, alguém troca comigo!"
                for(prop in matchs){
                    console.log(prop);
                    if(prop != user && matchs[prop] != friend){
                        matchs[user] = matchs[prop];
                        matchs[prop] = friend;
                        break;
                    }
                }
                break;
            }
            else if(friend != user){
                //If it's not the user itself, we match
                matchs[user] = friend;
                friends = friends.filter(e => e != friend);  
                break 
            }
            else{
                //If a user matchs itself, we come back and try one more time
                j--;
            }
        }    
    }

    return matchs;
}