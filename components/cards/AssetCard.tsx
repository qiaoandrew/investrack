import Link from 'next/link';
import { ChevronUp, ChevronDown } from 'react-feather';
import { COLORS } from '@/constants/colors';

interface AssetCardProps {
  label: string;
  price: number;
  change: number;
  changePercent: number;
  route?: string;
}

export default function AssetCard({
  label,
  price,
  change,
  changePercent,
  route,
}: AssetCardProps) {
  const content = (
    <div
      className={`transition-300 flex gap-4 rounded-md border border-grey2 p-3 hover:bg-grey3 hover:bg-opacity-60 ${
        route ? 'cursor-pointer' : ''
      }`}
    >
      <div>
        <p className='mb-1.5 font-medium text-white'>{label}</p>
        <p className='text-grey1'>{price}</p>
      </div>
      <div className='flex flex-col items-end justify-between'>
        {change >= 0 ? (
          <ChevronUp size={20} color={COLORS.green} className='mt-0.5' />
        ) : (
          <ChevronDown size={20} color={COLORS.red} className='mt-0.5' />
        )}
        <p className={change >= 0 ? 'text-green' : 'text-red'}>
          {change} ({changePercent}%)
        </p>
      </div>
    </div>
  );

  return route ? <Link href={route}>{content}</Link> : content;
}
