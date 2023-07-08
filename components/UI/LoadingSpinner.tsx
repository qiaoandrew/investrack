import { Oval } from 'react-loader-spinner';

import { COLORS } from '@/constants/colors';

type LoadingSpinnerProps = {
  height?: string;
  classes?: string;
};

export default function LoadingSpinner({
  height,
  classes,
}: LoadingSpinnerProps) {
  return (
    <div className={`grid place-content-center ${height} ${classes}`}>
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
