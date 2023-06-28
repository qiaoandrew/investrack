import { Oval } from 'react-loader-spinner';
import { COLORS } from '@/constants/colors';

export default function LoadingSpinner({ margin }: { margin?: string }) {
  return (
    <div className={`grid place-content-center ${margin}`}>
      <Oval
        width={60}
        height={60}
        color={COLORS.blue1}
        secondaryColor={COLORS.grey2}
        ariaLabel='oval-loading'
        strokeWidth={6}
        strokeWidthSecondary={7}
      />
    </div>
  );
}
