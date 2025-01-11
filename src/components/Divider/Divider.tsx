import { FC } from 'react';

interface DividerProps {
  className?: string;
}

const Divider: FC<DividerProps> = ({ className }) => {
  return <div className={`w-full h-[1px] bg-gray-300 ${className || ''}`} role="separator" />;
};

export default Divider;
