export type TErrorResponse = {
  message: string;
};

export type TCreateContactBody = {
  firstName: string;
  lastName: string;
  contactDescription: string;
  avatar: string;
};

export type TUpdateContactBody = TCreateContactBody;
