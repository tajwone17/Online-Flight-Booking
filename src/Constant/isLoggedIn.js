const token =  localStorage.getItem('token');

const isLoggedIn = token ? true : false; 

export  {isLoggedIn};