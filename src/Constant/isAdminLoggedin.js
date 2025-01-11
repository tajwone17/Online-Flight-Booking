const adminToken =  localStorage.getItem('adminToken');
const isAdminLoggedin = adminToken ? true : false; 

export  {isAdminLoggedin};