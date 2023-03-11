/* eslint-disable no-param-reassign */
/*
find cookie by name
*/
export function getCookie(name: string): string {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : '';
}

export function getCookieValue(name : string): string | undefined {
  const cookie = getCookie(name);

  if (cookie && cookie.indexOf('Bearer') === 0) {
    return cookie.split('Bearer ')[1];
  }

  return cookie;
}

export function setCookie(name:string, value: string, props: { [name:string]: any } = {}) {
  let exp = props.expires;

  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    props.expires = d;
    exp = d;
  }

  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  let updatedCookie = `${name}=${encodeURIComponent(value)}`;

  Object.keys(props).forEach((propName) => {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (!propValue) {
      updatedCookie += `=${propValue}`;
    }
  });

  document.cookie = updatedCookie;
}

export function deleteCookie(name:string) {
  setCookie(name, '', { expires: -1 });
}
