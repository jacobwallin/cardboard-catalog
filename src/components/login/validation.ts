export const constraints = {
  email: {
    email: {
      message: "is not valid.",
    },
  },
  username: {
    format: {
      pattern: "[a-z0-9]+",
      flags: "i",
      message: "can only contain a-z and 0-9",
    },
    length: {
      minimum: 3,
      maximum: 5,
      message: "must be between 3 and 32 characters",
    },
  },
  password: {
    length: {
      minimum: 10,
      message: "must be at least 10 characters",
    },
    // format: {
    //   pattern: "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])$",
    //   message:
    //     "must contain at least 1 letter, 1 number, and 1 special character (@$!%*#?&)",
    // },
  },
  confirmPassword: {
    equality: "password",
  },
};
