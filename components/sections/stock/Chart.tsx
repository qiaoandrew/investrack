import { ChevronDown, ChevronUp } from 'react-feather';
import { COLORS } from '@/constants/colors';

interface ChartProps {
  price: number;
  change: number;
  changePercent: number;
}

export default function Chart({ price, change, changePercent }: ChartProps) {
  return (
    <section className='mx-dashboard mb-14 2xl:mb-20'>
      <div className='flex items-center justify-between md:justify-start md:gap-6'>
        <p className='text-5xl font-medium text-white 2xs:text-6xl xs:text-8xl'>
          ${price}
        </p>
        <div className='flex items-center gap-2'>
          {change >= 0 ? (
            <ChevronUp color={COLORS.green} width={24} height={24} />
          ) : (
            <ChevronDown color={COLORS.red} width={24} height={24} />
          )}
          <p
            className={`texl-lg 2xs:text-xl ${
              change >= 0 ? 'text-green' : 'text-red'
            }`}
          >
            {change} ({changePercent}%)
          </p>
        </div>
      </div>
    </section>
  );
}
