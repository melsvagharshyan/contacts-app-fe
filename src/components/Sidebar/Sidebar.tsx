import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { TGetContactsResponse } from '../../types/contacts.types';
import { TErrorResponse } from '../../api/types';
import { getAllContacts } from '../../api/contacts.api';
import Divider from '../Divider/Divider';
import SearchBar from '../Searchbar/Searchbar';

const Sidebar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const { data: contacts } = useQuery<TGetContactsResponse, TErrorResponse>({
    queryKey: ['contacts'],
    queryFn: getAllContacts,
  });

  const filteredContacts = contacts?.filter(
    (contact) =>
      contact?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      contact?.lastName?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleClick = () => navigate({ to: '/create' });

  return (
    <div className="w-80 p-4 bg-gray-100 flex-shrink-0 border rounded-lg">
      <SearchBar
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onButtonClick={handleClick}
      />
      <Divider />
      <div className="flex flex-col px-3 items-start mt-5 h-[400px] overflow-y-auto scroll-smooth">
        {filteredContacts?.map((contact) => (
          <Link
            key={contact._id}
            className="text-black p-2 hover:bg-blue-600 hover:text-white cursor-pointer rounded-md w-full text-start hover:opacity-90"
            to="/contact/$userId"
            params={{ userId: String(contact._id) }}
          >
            {`${contact.firstName} ${contact.lastName}`}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
