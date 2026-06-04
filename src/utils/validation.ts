export const validateLogin = (
  mobile: string,
  password: string
) => {

  if (!mobile.trim()) {
    return "Please enter contact number";
  }

  if (!password.trim()) {
    return "Please enter password";
  }

  if (mobile.length < 10) {
    return "Invalid mobile number";
  }

  return "";
};