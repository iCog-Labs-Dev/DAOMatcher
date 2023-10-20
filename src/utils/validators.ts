export const validateEmail = (
  email: string,
  setEmailError: React.Dispatch<React.SetStateAction<string>>
) => {
  // Basic email validation
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    setEmailError("Enter a valid email address");
    return false;
  }
  setEmailError("");
  return true;
};

export const validatePassword = (
  password: string,
  setPassError: React.Dispatch<React.SetStateAction<string>>
) => {
  // Basic email validation
  if (
    !password ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    )
  ) {
    setPassError("Enter a valid password");
    return false;
  }
  setPassError("");
  return true;
};
