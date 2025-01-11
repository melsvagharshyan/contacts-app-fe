import { API } from './api';
import { TCreateContactBody, TUpdateContactBody } from './types';

export const createContact = async (formData: TCreateContactBody) => {
  const { data } = await API.post('/contact', formData);
  return data;
};

export const getAllContacts = async () => {
  const { data } = await API.get(`/contacts`);
  return data;
};

export const updateContact = async (contactId: string, formData: TUpdateContactBody) => {
  const { data } = await API.put(`/contact/${contactId}`, formData);
  return data;
};

export const deleteContact = async (userId: string) => {
  const { data } = await API.delete(`/contact/${userId}`);
  return data;
};
