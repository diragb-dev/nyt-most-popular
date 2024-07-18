// Typescript:
import { NYTArticleListItem } from '../types';

// Exports:
export const MOCK_ARTICLES: NYTArticleListItem[] = [
  {
    id: 1,
    title: 'Test Article 1',
    uri: 'nyt://article/1',
    url: 'https://www.nytimes.com/2023/07/18/test-article-1.html',
    asset_id: 1000001,
    source: 'The New York Times',
    published_date: '2023-07-18',
    updated: '2023-07-18T12:00:00-04:00',
    section: 'Technology',
    subsection: '',
    nytdsection: 'technology',
    adx_keywords: 'Artificial Intelligence;Testing',
    column: null,
    byline: 'By John Doe',
    type: 'Article',
    abstract: 'This is test article 1.',
    des_facet: ['Artificial Intelligence', 'Testing'],
    org_facet: ['New York Times'],
    per_facet: ['John Doe'],
    geo_facet: ['New York'],
    media: [{
      type: 'image',
      subtype: 'photo',
      caption: 'A test image',
      copyright: '2023 The New York Times',
      approved_for_syndication: 1,
      'media-metadata': [
        {
          url: 'https://example.com/image-small.jpg',
          format: 'Standard Thumbnail',
          height: 75,
          width: 75
        },
        {
          url: 'https://example.com/image-medium.jpg',
          format: 'mediumThreeByTwo210',
          height: 140,
          width: 210
        },
        {
          "url": "https://example.com/image-large.jpg",
          "format": "mediumThreeByTwo440",
          "height": 293,
          "width": 440
        }
      ]
    }],
    eta_id: 0
  },
  {
    id: 2,
    title: 'Test Article 2',
    uri: 'nyt://article/2',
    url: 'https://www.nytimes.com/2023/07/18/test-article-2.html',
    asset_id: 1000002,
    source: 'The New York Times',
    published_date: '2023-07-18',
    updated: '2023-07-18T13:00:00-04:00',
    section: 'Science',
    subsection: '',
    nytdsection: 'science',
    adx_keywords: 'Space;Testing',
    column: null,
    byline: 'By Jane Smith',
    type: 'Article',
    abstract: 'This is test article 2.',
    des_facet: ['Space', 'Testing'],
    org_facet: ['New York Times'],
    per_facet: ['Jane Smith'],
    geo_facet: ['Cape Canaveral'],
    media: [{
      type: 'image',
      subtype: 'photo',
      caption: 'A test image',
      copyright: '2023 The New York Times',
      approved_for_syndication: 1,
      'media-metadata': [
        {
          url: 'https://example.com/image-small.jpg',
          format: 'Standard Thumbnail',
          height: 75,
          width: 75
        },
        {
          url: 'https://example.com/image-medium.jpg',
          format: 'mediumThreeByTwo210',
          height: 140,
          width: 210
        },
        {
          "url": "https://example.com/image-large.jpg",
          "format": "mediumThreeByTwo440",
          "height": 293,
          "width": 440
        }
      ]
    }],
    eta_id: 0
  }
];