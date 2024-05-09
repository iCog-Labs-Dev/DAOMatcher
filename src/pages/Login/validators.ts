export const validateName = (
  name: string,
  setNameError: React.Dispatch<React.SetStateAction<string>>) => {
  // Basic name validation
  if (!name || name.trim() === "") {
    return "Name cannot be empty";
  }

  // Allow letters, spaces, apostrophes, and hyphens
  if (!/^[A-Za-z '-]+$/.test(name)) {
    setNameError("Name can only contain letters, spaces, apostrophes, and hyphens");

    return false;
  }
  setNameError("");
  return true;
};


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
  // Basic password validation
  if (
    !password ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    )
  ) {
    setPassError("Enter a strong password");
    return false;
  }
  setPassError("");
  return true;
};

export const confirmPassword = (password: string, confirmPassword: string,
   setPassError: React.Dispatch<React.SetStateAction<string>>) => {
  if (password !== confirmPassword) {
    setPassError("Passwords do not match");
    return false;
  }
  setPassError("");
  return true;
};



