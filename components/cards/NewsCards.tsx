/* eslint-disable @next/next/no-img-element */

export interface NewsCardProps {
  headline: string;
  summary?: string;
  image: string;
  url: string;
}

export default function NewsCard({
  headline,
  summary,
  image,
  url,
}: NewsCardProps) {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='transition-300 w-80 overflow-hidden rounded-xl border border-grey2 hover:bg-grey3 hover:bg-opacity-60'
    >
      <img src={image} alt={headline} className='h-40 w-80 object-cover' />
      <div className='whitespace-normal px-5 pb-7 pt-4'>
        <p
          className={`line-clamp-2 font-medium text-white 2xl:text-lg ${
            summary ? 'mb-2' : ''
          }`}
        >
          {headline}
        </p>
        {summary && (
          <p className='line-clamp-3 text-sm text-grey1 2xl:text-md'>
            {summary}
          </p>
        )}
      </div>
    </a>
  );
}
