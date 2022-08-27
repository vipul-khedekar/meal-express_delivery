export function fetchUser() {
  let userInfo = localStorage.getItem(`user`);
  if (userInfo !== undefined) {
    return JSON.parse(localStorage.getItem(`user`));
  } else {
    localStorage.clear();
  }
}
