import { FC } from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="text-black w-full p-2 pl-10 border border-gray-300 rounded-lg bg-white focus:border-gray-400 focus:outline-none"
        value={value}
        onChange={onChange}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <IoSearch />
      </div>
    </>
  );
};

export default SearchInput;
