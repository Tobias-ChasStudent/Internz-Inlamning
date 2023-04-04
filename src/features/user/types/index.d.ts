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

type CompanyTypes = {
  logo: string;
  name: string;
  url: string;
  description: string;
};

type LoginFormTypes = {
  email: string;
  password: string;
};

type AccountType = "student" | "company";

interface UserType extends EditStudentAccountFormInputs {
  company?: null | string;
  id: string;
  email: string;
  username: string;
  photo: null | string;
  type: AccountType;
}

type AuthMode = "login" | "register" | "verify" | "company";

type EditMode = "account" | "security" | "company";

type EditStudentAccountFormInputs = {
  photo?: FileList | string;
  username?: string;
  title?: string;
  phone?: string;
  location?: string;
  skills?: string[];
  introduction?: string;
  education?: string;
  start_date?: Date;
  end_date?: Date;
};

type EditCompanyAccountFormInputs = {
  photo?: FileList | string;
  username?: string;
  phone?: string;
  introduction?: string;
};

type EditCompanyFormInputs = {
  logo?: FileList | string;
  name?: string;
  url?: string;
  description?: string;
};

type EmailFormInputs = {
  email: string;
};

type SecurityFormInputs = {
  current_password: string;
  password: string;
  password_confirm: string;
};

type Profile = {
  user: UserType;
  company: CompanyFormTypes;
};
