export default class UserInfo {
  constructor({ fullNameSelector, bioSelector }) {
    this._fullName = document.querySelector(fullNameSelector);
    this._bio = document.querySelector(bioSelector);
  }
  
  getUserInfo() {
    return { name: this._fullName.textContent, bio: this._bio.textContent };
  }

  setUserInfo({ newProfileFullName, newProfileBio }) {
    this._fullName.textContent = newProfileFullName;
    this._bio.textContent = newProfileBio;
  }
}