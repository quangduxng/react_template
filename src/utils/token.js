export const getToken = () => {
   return localStorage.getItem("token");
};

export const removeToken = () => {
   return localStorage.removeItem("token");
};

export const setToken = (value) => {
   return localStorage.setItem('token', value)
}

export const getUserId = () => {
   return localStorage.getItem("userId");
};

export const removeUserId = () => {
   return localStorage.removeItem("userId");
};

export const setUserId = (value) => {
   return localStorage.setItem('userId', value)
}

export const isLoggedIn = () => {
   const token = getToken();
   if (token) {
      return true;
   }
   return false;
};
