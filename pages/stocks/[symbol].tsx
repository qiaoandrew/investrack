import axios from 'axios';
import { type GetServerSideProps } from 'next';
import { StockPrice } from '@/interfaces/interfaces';
import Header from '@/components/sections/stock/Header';
import Chart from '@/components/sections/stock/Chart';
import MobileButtons from '@/components/sections/stock/MobileButtons';
import Summary from '@/components/sections/stock/Summary';
import FinancialData from '@/components/sections/stock/FinancialData';
import Description from '@/components/sections/stock/Description';
import Profile from '@/components/sections/stock/Profile';
import News from '@/components/sections/stock/News';

interface StockProps {
  price: StockPrice;
}

export default function Stock({ price }: StockProps) {
  return (
    <>
      <Header
        name={price.name}
        symbol={price.symbol}
        exchange={price.exchange}
      />
      <Chart
        price={price.price}
        change={price.change}
        changePercent={price.changePercent}
      />
      <MobileButtons />
      <Summary />
      <FinancialData />
      <Description />
      <Profile />
      <News />
    </>
  );
}

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const { symbol } = query;

  const { data: price } = await axios.get(
    `${FRONTEND_BASE_URL}/api/stocks/price`,
    { params: { symbol } }
  );

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return {
    props: { price },
  };
};
