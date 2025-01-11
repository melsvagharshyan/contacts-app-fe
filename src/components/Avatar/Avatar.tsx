import clsx from 'clsx';
import defaultAvatarUrl from '../../assets/images/avatar.jpeg';

interface AvatarProps {
  avatarUrl?: string;
  size?: '10' | '20' | '30' | '40' | '50' | '60';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatarUrl, size = '40', className = '' }) => {
  const sizeClass = `w-${size} h-${size}`;

  return (
    <img
      src={avatarUrl ? avatarUrl : defaultAvatarUrl}
      alt="User Avatar"
      className={clsx('rounded-2xl object-cover', sizeClass, className)}
    />
  );
};

export default Avatar;
