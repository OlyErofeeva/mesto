export default class UserInfo {
  constructor({ fullNameSelector, bioSelector, avatarSelector }) {
    this._fullName = document.querySelector(fullNameSelector);
    this._bio = document.querySelector(bioSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  
  getUserInfo() {
    return { 
      name: this._fullName.textContent, 
      bio: this._bio.textContent, 
      id: this._id
    };
  }

  setUserInfo({ name, about, _id }) {
    this._fullName.textContent = name;
    this._bio.textContent = about;
    this._id = _id;
  }

  setAvatar(link) {
    this._avatarElement.src = link;
  }
}