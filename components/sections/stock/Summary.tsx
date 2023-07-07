import Table from '@/components/UI/Table';

import { TableItem } from '@/types/types';

type SummaryProps = {
  summary: TableItem[];
  loading: boolean;
  error: boolean;
};

export default function Summary({ summary, loading, error }: SummaryProps) {
  return (
    <section className='mx-dashboard mb-20 2xl:mb-24'>
      <h2 className='mb-6 text-2xl font-semibold text-white md:mb-8 2xl:text-3xl'>
        Summary
      </h2>
      <Table items={summary} loading={loading} error={error} />
    </section>
  );
}
