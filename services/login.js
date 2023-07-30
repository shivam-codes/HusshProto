export async function loginUser(credentials) {
   return fetch('http://localhost:8000/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials["data"])
    })
    .then(data => data.json())
}

export function getToken(){
    if(typeof window !== 'undefined')
    {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if(userToken)
    return userToken.token;
    else return null;
    }
    return null;
}

export function getprofile(){
    if(typeof window !== 'undefined')
    {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken.name;
    }
    return null;
}

export function setToken(userToken)
{
   sessionStorage.setItem('token', JSON.stringify(userToken));
}

export async function link(tag)
{
    const userid = getToken();
    const res = fetch(`http://localhost:8000/link/${tag}_${userid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(data => data.json())
    
    return res;
}

export async function getQuery(query)
{
   const res =  fetch('http://127.0.0.1:8000/query/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
              
    })
    .then((data) => data.json())
    .catch((err) => {
        console.log(err.message);
    })
    return res;
}