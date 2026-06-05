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

export const validateSignUp = (
  name: string,
  mobile: string,
  password: string,
  address: string,
  merchantId: string
) => {

  if (!name.trim()) {
    return "Please enter full name";
  }

  if (!password.trim()) {
    return "Please enter password";
  }

  if (!mobile.trim()) {
    return "Please enter contact number";
  }

  if (!password.trim()) {
    return "Please enter password";
  }

  if (!address.trim()) {
    return "Please enter address";
  }

  if (!merchantId.trim()) {
    return "Please enter merchant ID";
  }

  if (mobile.length < 10) {
    return "Invalid mobile number";
  }

  return "";
};