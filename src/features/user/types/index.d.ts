type RegisterMode = "student" | "company" | null;

type RegisterFormTypes = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

type AuthMode = "login" | "register" | "verify" | "company";
