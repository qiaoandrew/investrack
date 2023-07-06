import { TableItem } from '@/interfaces/interfaces';
import { getHiddenClasses, extractDomain } from '@/util/helpers';

type TableProps = { items: TableItem[] }

export default function Table({ items }: TableProps) {
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
