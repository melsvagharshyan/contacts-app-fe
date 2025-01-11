export type TContact = {
  _id: string;
  firstName: string;
  lastName: string;
  contactDescription: string;
  avatar: string;
};

export type TGetContactsResponse = TContact[];
