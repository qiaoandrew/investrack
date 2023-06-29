import Header from '@/components/sections/stock/Header';
import Chart from '@/components/sections/stock/Chart';
import MobileButtons from '@/components/sections/stock/MobileButtons';
import KeyStats from '@/components/sections/stock/KeyStats';
import FinancialData from '@/components/sections/stock/FinancialData';
import Description from '@/components/sections/stock/Description';
import Profile from '@/components/sections/stock/Profile';
import News from '@/components/sections/home/News';

export default function Stock() {
  return (
    <>
      <Header />
      <Chart />
      <MobileButtons />
      <KeyStats />
      <FinancialData />
      <Description />
      <Profile />
      <News />
    </>
  );
}
