import Search from '@/components/sections/home/Search';
import Trending from '@/components/sections/home/Trending';
import Categories from '@/components/sections/home/Categories';
import Markets from '@/components/sections/home/Markets';
import MarketNews from '@/components/sections/home/MarketNews';
import SEO from '@/components/SEO/SEO';

export default function Home() {
  return (
    <>
      <SEO
        title='Investrack | Research the Markets'
        description='Investigate the markets while creating personalized watchlists and portfolio using Investrack.'
      />
      <Search />
      <Trending />
      <Categories />
      <Markets />
      <MarketNews />
    </>
  );
}
