import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { CATEGORIES } from '@/constants/categories';
import { StockQuote } from '@/interfaces/interfaces';
import StockList from '@/components/UI/StockList';

export default function Category({ stocks }: { stocks: StockQuote[] }) {
  const router = useRouter();
  const { category } = router.query;

  return (
    <section className='mx-dashboard'>
      <h1 className='mb-4 text-4xl font-semibold text-white 2xl:text-5xl'>
        {CATEGORIES.find((c) => c.id === category)?.label}
      </h1>
      <StockList stocks={stocks} />
    </section>
  );
}

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get(
    `${FRONTEND_BASE_URL}/api/stocks/categories`,
    {
      params: { type: params?.category },
    }
  );
  return {
    props: {
      stocks: data,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = CATEGORIES.map((category) => ({
    params: { category: category.id },
  }));

  return {
    paths,
    fallback: false,
  };
};
