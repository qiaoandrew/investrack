import Search from '@/components/sections/home/Search';
import Markets from '@/components/sections/home/Markets';
import Categories from '@/components/sections/home/Categories';
import Trending from '@/components/sections/home/Trending';

export default function Home() {
  return (
    <>
      <Search />
      <Markets />
      <Categories />
      <Trending />
    </>
  );
}
