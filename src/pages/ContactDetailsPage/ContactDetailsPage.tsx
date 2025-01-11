import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteContact, getAllContacts } from '../../api/contacts.api';
import { TErrorResponse } from '../../api/types';
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import DeleteModal from '../../components/modals/DeleteModal';
import showToast from '../../helpers/toastHelper';
import { ToastType } from '../../types/toast.types';
import { TGetContactsResponse } from '../../types/contacts.types';
import { IoIosStarOutline } from 'react-icons/io';

export const ContactDetailsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userId = useParams({
    from: '/contact/$userId',
    select: (params) => params.userId,
  });

  const { isPending, mutate } = useMutation<void, TErrorResponse, string>({
    mutationFn: (userId: string) => deleteContact(userId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['contacts'] });
      showToast('Contact Deleted', ToastType.INFO);
      setModalOpen(false);
    },
    onError: (error) => {
      showToast(error.message, ToastType.ERROR);
      console.error('Error deleting contact:', error);
    },
  });

  const { data: contacts } = useQuery<TGetContactsResponse, TErrorResponse>({
    queryKey: ['contacts'],
    queryFn: getAllContacts,
  });

  const contact = contacts?.find((contact) => contact?._id === userId);

  if (!contact?._id) {
    navigate({ to: '/' });
    return null;
  }

  const handleDelete = () => {
    if (contact?._id) {
      mutate(contact._id);
    }
  };

  const handleEdit = () => navigate({ to: '/contact/edit/$userId', params: { userId } });

  return (
    <div className="flex items-start p-6 bg-white space-x-6">
      <Avatar avatarUrl={contact?.avatar} size="40" />
      <div className="flex flex-col items-start">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-semibold text-gray-900">{`${contact?.firstName} ${contact?.lastName}`}</h2>
          <IoIosStarOutline color="gray" size={22} />
        </div>
        <p className="text-blue-600 text-sm block mt-1">
          {`${contact?.firstName}${contact?.lastName}`}
        </p>
        <p className="text-gray-500 text-sm text-start mt-1">{contact?.contactDescription}</p>
        <div className="flex space-x-4 mt-4">
          <Button onClick={handleEdit} text="Edit" variant="edit" />
          <Button onClick={() => setModalOpen(true)} text="Delete" variant="delete" />
        </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isPending}
      />
    </div>
  );
};
