import { Oval } from 'react-loader-spinner';

import { COLORS } from '@/constants/colors';

type LoadingSpinnerProps = {
  height?: string;
  margin?: string;
}

export default function LoadingSpinner({
  height,
  margin,
}: LoadingSpinnerProps) {
  return (
    <div className={`grid place-content-center ${height} ${margin}`}>
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
