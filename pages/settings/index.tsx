import { useRouter } from 'next/router';
import { logOut } from '@/util/auth';
import Button from '@/components/UI/Button';
import { LogOut } from 'react-feather';
import { COLORS } from '@/constants/colors';

export default function Settings() {
  const router = useRouter();

  const BUTTONS = [
    {
      type: 'button',
      label: 'Log Out',
      onClick: async () => {
        await logOut();
        router.push('/');
      },
      hierarchy: 'quinary',
      icon: <LogOut size={24} color={COLORS.grey1} />,
    },
  ];

  return (
    <div className='mx-dashboard'>
      <h1 className='mb-6 text-4xl font-semibold text-white 2xl:text-5xl'>
        Settings
      </h1>
      <div className='grid max-w-[366px] gap-5'>
        {BUTTONS.map((button, i) => (
          <Button
            type={button.type as 'route' | 'button'}
            hierarchy='quinary'
            onClick={button.onClick}
            icon={button.icon}
            key={i}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
