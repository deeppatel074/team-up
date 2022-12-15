const { ObjectId } = require("mongodb");

export function id(id) {
  if (!id) throw `You must provide an Id.`;
  if (typeof id !== "string") throw `$Id should be a string.`;
  id = id.trim();
  if (id.trim().length <= 0) throw `$Id string should not be empty.`;
  if (!ObjectId.isValid(id.trim())) throw `Enter valid object.`;
  return id;
}

export function checkString(str, name) {
  if (!str) {
    throw `${name} doesn't exists`;
  }
  if (typeof str != "string") {
    throw `${name} is not a string`;
  }
  str = str.trim();
  if (str.length === 0) {
    throw `${name} is empty`;
  }
  return str;
}

export function validateEmail(email) {
  email = this.checkString(email, "email");
  if (email.includes("@") == false) {
    throw `Not a valid Email ID`;
  }
  return email.toLowerCase();
}

export function firstNameValidation(name, str) {
  if (!name) {
    throw `${str} doesn't exists`;
  }
  name = name.trim();

  if (name && name.length === 0) {
    throw `${str} is required`;
  } else if (!/^[A-Za-z]+$/i.test(name)) {
    throw `${str} must be only string without white spaces`;
  } else {
    return name;
  }
}
export function validateDate(date) {
  date = new Date(date).toISOString();
  let today = new Date().toISOString();
  if (date < today) {
    throw `Event can't be held before the current date `;
  }
  return date;
}
export async function validateProfileBody(req, res, next) {
  try {
    req.body.firstName = firstNameValidation(req.body.firstName, "first name");
    req.body.lastName = firstNameValidation(req.body.lastName, "last name");
    return await next();
  } catch (e) {
    return res.error(400, e);
  }
}

export async function validateWorkSpaceName(req, res, next) {
  try {
    req.body.name = checkString(req.body.name, "Workspace Name");
    return await next();
  } catch (e) {
    return res.error(400, e);
  }
}

export async function validateTaskBody(req, res, next) {
  try {
    req.body.title = checkString(req.body.title, "Title");
    req.body.description = checkString(req.body.description, "Description");
    req.body.startDate = validateDate(req.body.startDate);
    req.body.endDate = validateDate(req.body.endDate);
    return await next();
  } catch (e) {
    return res.error(400, e);
  }
}
