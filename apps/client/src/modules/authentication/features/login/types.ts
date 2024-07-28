type LoginData = {
  email: string;
  password: string;
};

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  role: string;
};

type SignupResponseData = {
  name: string;
  email: string;
  id: string;
  role: string;
};

export { LoginData, SignupFormData, SignupResponseData };
