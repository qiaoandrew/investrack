import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NewsArticle } from '@/interfaces/interfaces';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;

  try {
    const { data } = await axios.get(`${FINANCE_API_BASE_URL}/news`, {
      params: { symbol },
    });
    const formattedNews = data
      .filter((article: any) => article.thumbnail)
      .map((article: any) => ({
        id: article.uuid,
        headline: article.title,
        url: article.link,
        image: article.thumbnail.resolutions[0].url,
      }));
    res.status(200).json(formattedNews as NewsArticle[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
