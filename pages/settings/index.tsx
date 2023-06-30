import Button from '@/components/UI/Button';
import { COLORS } from '@/constants/colors';
import { LogOut } from 'react-feather';

export default function Settings() {
  const buttons = [
    {
      type: 'button',
      label: 'Log Out',
      onClick: () => {},
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
        {buttons.map((button, i) => (
          <Button
            type={button.type as 'route' | 'button'}
            hierarchy='quaternary'
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
