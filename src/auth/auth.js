export const getAuthSession = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken') || null;
    }
    return null;
  }
  
  export const setAuthSession = (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }
  
  export const removeAuthSession = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  }
  
  export const getUserType = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userType') || null;
    }
    return null;
  }
  