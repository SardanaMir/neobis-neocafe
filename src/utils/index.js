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

// export function setCookie(name, value, days) {
//   let expires = "";
//   if (days) {
//     var date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }

// export function getCookie(name) {
//   try {
//     let nameEQ = name + "=";
//     let ca = document.cookie.split(";");
//     for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == " ") c = c.substring(1, c.length);
//       if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//     }
//     return null;
//   } catch (e) {
//     return null;
//   }
// }

// export function removeCookie(name) {
//   document.cookie = name + "=; Max-Age=-99999999;";
// }