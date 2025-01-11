import { FC } from 'react';
import SearchInput from '../SearchInput/SearchInput';

interface SearchBarProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchValue, onSearchChange, onButtonClick }) => {
  return (
    <div className="relative w-full mb-4 flex gap-2">
      <SearchInput value={searchValue} onChange={onSearchChange} />
      <button
        onClick={onButtonClick}
        className="bg-white text-blue-500 border border-gray-300 py-2 px-4 rounded-lg hover:bg-blue-100"
      >
        New
      </button>
    </div>
  );
};

export default SearchBar;
