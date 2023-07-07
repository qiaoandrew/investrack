import LoadingSpinner from '@/components/UI/LoadingSpinner';

type DescriptionProps = {
  description: string;
  loading: boolean;
  error: boolean;
};

export default function Description({
  description,
  loading,
  error,
}: DescriptionProps) {
  return (
    <section className='mx-dashboard mb-20 2xl:mb-24'>
      <h2 className='mb-3 text-2xl font-semibold text-white 2xl:text-3xl'>
        Description
      </h2>
      {loading && <LoadingSpinner />}
      {error && (
        <p className='leading-loose text-blue1'>
          An error occurred while fetching data. Please try again later.
        </p>
      )}
      {!loading && !error && (
        <p className='leading-loose text-blue1'>{description}</p>
      )}
    </section>
  );
}
