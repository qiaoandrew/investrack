import Carousel from '@/components/UI/Carousel';
import NewsCard from '@/components/cards/NewsCard';

import { NewsArticle } from '@/types/types';

type NewsProps = { news: NewsArticle[]; loading: boolean; error: boolean };

export default function News({ news, loading, error }: NewsProps) {
  return (
    <section>
      <Carousel title='News' loading={loading} error={error}>
        {news.map((article) => (
          <NewsCard
            title={article.title}
            image={article.image}
            url={article.url}
            key={article.id}
          />
        ))}
      </Carousel>
    </section>
  );
}
