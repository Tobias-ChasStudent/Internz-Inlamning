type RegisterMode = "student" | "company" | null;

type RegisterFormTypes = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

type CompanyFormTypes = {
  logo: FileList | string;
  name: string;
  url: string;
  description: string;
};

type AccountType = "student" | "company";

type UserType = {
  company?: null | string;
  id: string;
  email: string;
  username: string;
  photo: null | string;
  type: AccountType;
};

type AuthMode = "login" | "register" | "verify" | "company";
