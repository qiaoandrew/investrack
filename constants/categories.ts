import computerGraphic from '@/public/img/graphics/computer.png';
import dollarGraphic from '@/public/img/graphics/dollar.png';
import phoneGraphic from '@/public/img/graphics/phone.png';
import bulbGraphic from '@/public/img/graphics/bulb.png';
import heartGraphic from '@/public/img/graphics/heart.png';
import mapPinGraphic from '@/public/img/graphics/map-pin.png';
import sunGraphic from '@/public/img/graphics/sun.png';
import toolGraphic from '@/public/img/graphics/tool.png';
import cubeGraphic from '@/public/img/graphics/cube.png';
import bagGraphic from '@/public/img/graphics/bag.png';
import shieldGraphic from '@/public/img/graphics/shield.png';

export const CATEGORIES = [
  {
    id: 'ms_technology',
    label: 'Technology',
    image: computerGraphic,
    bg: '#4169E1',
  },
  {
    id: 'ms_financial_services',
    label: 'Finance',
    image: dollarGraphic,
    bg: '#228B22',
  },
  {
    id: 'ms_communication_services',
    label: 'Communication Services',
    image: phoneGraphic,
    bg: '#6B8E23',
  },

  {
    id: 'ms_utilities',
    label: 'Utilities',
    image: bulbGraphic,
    bg: '#FFD700',
  },
  {
    id: 'ms_healthcare',
    label: 'Healthcare',
    image: heartGraphic,
    bg: '#FF8C00',
  },
  {
    id: 'ms_real_estate',
    label: 'Real Estate',
    image: mapPinGraphic,
    bg: '#B22222',
  },
  {
    id: 'ms_energy',
    label: 'Energy',
    image: sunGraphic,
    bg: '#DC143C',
  },
  {
    id: 'ms_industrials',
    label: 'Industrials',
    image: toolGraphic,
    bg: '#FF1493',
  },
  {
    id: 'ms_basic_materials',
    label: 'Basic Materials',
    image: cubeGraphic,
    bg: '#9932CC',
  },
  {
    id: 'ms_consumer_cyclical',
    label: 'Consumer Cyclical',
    image: bagGraphic,
    bg: '#4B0082',
  },
  {
    id: 'ms_consumer_defensive',
    label: 'Consumer Defensive',
    image: shieldGraphic,
    bg: '#6A5ACD',
  },
];
