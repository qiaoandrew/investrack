import Search from '@/components/sections/home/Search';
import Trending from '@/components/sections/home/Trending';
import Categories from '@/components/sections/home/Categories';
import Markets from '@/components/sections/home/Markets';
import MarketNews from '@/components/sections/home/MarketNews';

export default function Home() {
  return (
    <>
      <Search />
      <Trending />
      <Categories />
      <Markets />
      <MarketNews />
    </>
  );
}
