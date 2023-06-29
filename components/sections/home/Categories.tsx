import Carousel from '@/components/UI/Carousel';
import CategoryCard from '@/components/cards/CategoryCard';
import computerGraphic from '@/public/img/graphics/computer.png';

const CATEGORIES = [
  {
    label: 'Technology',
    graphic: computerGraphic,
    bg: 'bg-gradient-to-tr from-[#2438824D] to-[#24388200]',
    route: '/categories/technology',
  },
  {
    label: 'Finance',
    graphic: computerGraphic,
    bg: 'bg-gradient-to-tr from-[#2438824D] to-[#24388200]',
    route: '/categories/technology',
  },
  {
    label: 'Utilities',
    graphic: computerGraphic,
    bg: 'bg-gradient-to-tr from-[#2438824D] to-[#24388200]',
    route: '/categories/technology',
  },
  {
    label: 'Communications',
    graphic: computerGraphic,
    bg: 'bg-gradient-to-tr from-[#2438824D] to-[#24388200]',
    route: '/categories/technology',
  },
  {
    label: 'Health',
    graphic: computerGraphic,
    bg: 'bg-gradient-to-tr from-[#2438824D] to-[#24388200]',
    route: '/categories/technology',
  },
];

export default function Categories() {
  return (
    <Carousel title='Categories' margin='mb-section'>
      {CATEGORIES.map((category) => (
        <CategoryCard
          key={category.label}
          label={category.label}
          graphic={category.graphic}
          route={category.route}
          bg={category.bg}
        />
      ))}
    </Carousel>
  );
}
