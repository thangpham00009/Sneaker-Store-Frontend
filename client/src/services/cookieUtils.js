/**
 * @param {string} name 
 * @returns {string|null} 
 */
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }

  return null;
};

/**
 * @returns {boolean}
 */
export const hasRefreshToken = () => {
  return getCookie("refreshToken") !== null;
};
