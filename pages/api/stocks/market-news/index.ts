import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { NewsArticle } from '@/types/types';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await axios.get(`${FINANCE_API_BASE_URL}/market-news`);
    const marketNews = data
      .filter((article: any) =>
        [
          'images.mktw.net',
          'mw3.wsj.net',
          'image.cnbcfm.com',
          's.yimg.com',
        ].some((domain) => article.image.includes(domain))
      )
      .map((article: any) => ({
        id: article.id,
        title: article.headline.startsWith(': ')
          ? article.headline.slice(2)
          : article.headline,
        description: article.summary,
        url: article.url,
        image: article.image,
      }));
    res.status(200).json(marketNews as NewsArticle[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching market news.', error });
  }
}
