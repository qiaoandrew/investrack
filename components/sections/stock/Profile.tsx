import Table from '@/components/UI/Table';

import { TableItem } from '@/types/types';

type ProfileProps = {
  profile: TableItem[];
  loading: boolean;
  error: boolean;
};

export default function Profile({ profile, loading, error }: ProfileProps) {
  return (
    <section className='mx-dashboard mb-20 2xl:mb-24'>
      <h2 className='mb-6 text-2xl font-semibold text-white md:mb-8 2xl:text-3xl'>
        Profile
      </h2>
      <Table items={profile} loading={loading} error={error} />
    </section>
  );
}
