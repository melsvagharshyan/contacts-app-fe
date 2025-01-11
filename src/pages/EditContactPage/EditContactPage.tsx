import { useForm } from '@tanstack/react-form';
import { useParams } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllContacts, updateContact } from '../../api/contacts.api';
import { TErrorResponse } from '../../api/types';
import { TGetContactsResponse } from '../../types/contacts.types';
import showToast from '../../helpers/toastHelper';
import { ToastType } from '../../types/toast.types';
import { contactSchema, TContact } from './utils/validations';
import { contactFields } from './utils/constants';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';

export const EditContactPage: React.FC = () => {
  const contactId = useParams({
    select: (params) => params.userId,
    strict: false,
  });
  const queryClient = useQueryClient();

  const { data: contacts } = useQuery<TGetContactsResponse, TErrorResponse>({
    queryKey: ['contacts'],
    queryFn: getAllContacts,
  });

  const contact = contacts?.find((contact) => contact?._id === contactId);

  const form = useForm<TContact>({
    defaultValues: {
      firstName: contact?.firstName || '',
      lastName: contact?.lastName || '',
      contactDescription: contact?.contactDescription || '',
      avatar: contact?.avatar || '',
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
    validators: {
      onSubmit: contactSchema,
    },
  });

  const { mutate, isPending } = useMutation<void, TErrorResponse, TContact>({
    mutationFn: (formData: TContact) => updateContact(contactId || '', formData),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['contacts'] });
      showToast('Contact Updated', ToastType.INFO);
    },
    onError: (error) => {
      showToast(error.message, ToastType.ERROR);
      console.error('Error updating contact:', error);
    },
  });

  return (
    <div className="p-6 bg-white rounded-lg w-1/2">
      <h1 className="text-2xl font-bold text-start text-blue-light mb-8">Edit Contact</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {contactFields.map(({ name, label, required }) => (
          <div key={name}>
            <form.Field
              name={name as keyof TContact}
              children={(field) => (
                <TextInput
                  label={label}
                  name={field.name}
                  value={field.state.value}
                  required={required}
                  field={field}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>
        ))}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit]) => (
            <Button
              type="submit"
              text="EDIT"
              variant="primary"
              size="large"
              disabled={!canSubmit || isPending}
              loading={isPending}
              fullWidth
            />
          )}
        />
      </form>
    </div>
  );
};
