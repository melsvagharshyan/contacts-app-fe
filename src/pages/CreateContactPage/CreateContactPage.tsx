import { useForm } from '@tanstack/react-form';
import { createContact } from '../../api/contacts.api';
import { TErrorResponse } from '../../api/types';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import showToast from '../../helpers/toastHelper';
import { ToastType } from '../../types/toast.types';
import { contactSchema, TContact } from './utils/validations';
import { contactFields } from './utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const CreateContactPage: React.FC = () => {
  const queryClient = useQueryClient();

  const form = useForm<TContact>({
    defaultValues: {
      firstName: '',
      lastName: '',
      contactDescription: '',
      avatar: '',
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
    validators: {
      onSubmit: contactSchema,
    },
  });

  const { mutate, isPending } = useMutation<void, TErrorResponse, TContact>({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['contacts'] });
      showToast('Contact Created', ToastType.INFO);
      form.reset();
    },
    onError: (error) => {
      showToast(error.message, ToastType.ERROR);
      console.error('Error creating contact:', error);
    },
  });

  return (
    <div className="p-6 bg-white rounded-lg w-1/2">
      <h1 className="text-2xl font-bold text-start text-blue-light mb-8">Add New Contact</h1>
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
              text="CREATE"
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
