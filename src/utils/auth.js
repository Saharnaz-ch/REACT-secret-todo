//utils/auth.js

//saves username in browser's local storage(even after refresh or tab close)
export function login(username) {
  localStorage.setItem("user", username);
}

export function logout() {
  localStorage.removeItem("user");
}

//reads and return the STORED username(for showing a welcome message)
export function getUser() {
  return localStorage.getItem("user");
}

//checks if logged in or out
export function isAuthenticated() {
  //getUser() returns username if logged in and null if not
  //!!getUser() conerts it to true if username exists or false(protect pages from being accessed by users who aren't logged in)
  return !!getUser();
  //return getUser() returns a string or a null
  //but we need a coniditon which is determined by a boolean value so we use !!
}
