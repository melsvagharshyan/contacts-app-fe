import { FC } from 'react';
import { LiaSpinnerSolid } from 'react-icons/lia';

interface SpinnerProps {
  color?: string;
  size?: string;
}

const Spinner: FC<SpinnerProps> = ({ color = 'black', size = '24px' }) => {
  return (
    <LiaSpinnerSolid
      color={color}
      className="animate-spin m-auto"
      style={{ width: size, height: size }}
    />
  );
};

export default Spinner;
