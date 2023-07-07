import LoadingSpinner from './LoadingSpinner';

import { TableItem } from '@/types/types';
import { getHiddenClasses, extractDomain } from '@/util/helpers';

type TableProps = { items: TableItem[]; loading?: boolean; error?: boolean };

export default function Table({ items, loading, error }: TableProps) {
  if (loading) {
    return <LoadingSpinner />;
  } else if (error) {
    return (
      <p className='text-blue1'>
        An error occurred while fetching data. Please try again later.
      </p>
    );
  }

  return (
    <div className='grid gap-x-8 sm:grid-cols-2 lg:gap-x-12 2xl:grid-cols-3'>
      {items.map((item, i) => (
        <div key={`item-${i}`}>
          <div className='flex justify-between'>
            <p className='text-blue1'>{item.label}</p>
            {item.value.startsWith('http') ? (
              <a
                href={item.value}
                target='_blank'
                rel='noopener noreferrer'
                className='text-white underline underline-offset-4'
              >
                {extractDomain(item.value)}
              </a>
            ) : (
              <p className='text-white'>{item.value}</p>
            )}
          </div>
          <hr
            className={`my-5 border-grey1 border-opacity-40 ${getHiddenClasses(
              i,
              items.length
            )}`}
          />
        </div>
      ))}
    </div>
  );
}
