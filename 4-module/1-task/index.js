function makeFriendsList(friends) {

   let ul = document.createElement('ul');

  for (let obj of friends) 
    ul.innerHTML += `<li>${obj.firstName}  ${obj.lastName}</li>`;
  
  return ul

//   return friends.reduce( 
//  (ul, obj) => `<li>${obj.firstName}  ${obj.lastName}</li>`, `` 
//   )

}


