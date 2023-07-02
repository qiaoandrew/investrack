import Carousel from '@/components/UI/Carousel';
import CategoryCard from '@/components/cards/CategoryCard';
import { CATEGORIES } from '@/constants/categories';

export default function Categories() {
  return (
    <Carousel title='Categories' margin='mb-section'>
      {CATEGORIES.map((category) => (
        <CategoryCard
          key={category.id}
          label={category.label}
          image={category.image}
          route={`/categories/${category.id}`}
          bg={category.bg}
        />
      ))}
    </Carousel>
  );
}
