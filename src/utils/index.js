// Устанавливаем токен в cookie
export function setAuthTokenToCookie(token) {
  document.cookie = `authToken=${token}; SameSite=Strict; Secure;`;
}

// Получаем токен из cookie
export function getAuthTokenFromCookie() {
  const name = "authToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
}

// Удаляем токен из cookie
export function deleteAuthTokenFromCookie() {
  document.cookie =
    "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict; Secure;";
}

