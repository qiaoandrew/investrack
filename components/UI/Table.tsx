import { TableItem } from '@/interfaces/interfaces';
import { getHiddenClasses } from '@/util/helpers';

interface TableProps {
  items: TableItem[];
}

export default function Table({ items }: TableProps) {
  return (
    <div className='grid gap-x-8 sm:grid-cols-2 lg:gap-x-12 2xl:grid-cols-3'>
      {items.map((item, i) => (
        <div key={`item-${i}`}>
          <div className='flex justify-between'>
            <p className='text-base text-blue1'>{item.label}</p>
            <p className='text-base text-white'>{item.value}</p>
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
