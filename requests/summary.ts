import get from './get.ts';
import { SubjectType } from './types.ts';

const URL = 'https://api.wanikani.com/v2/summary';

type Response = {
  readonly object: 'report';
  readonly url: 'https://api.wanikani.com/v2/summary';
  readonly data_updated_at: string; // ISO 8601 Date
  readonly data: Data;
}

type Data = {
  lessons: Lesson[];
  next_reviews_at: string; // ISO 8601 Date
  reviews: Review[];
}

type Lesson = {
  available_at: string; // ISO 8601 Date
  subject_ids: number[];
}

type Review = {
  available_at: string; // ISO 8601 Date
  subject_ids: number[];
}

export default async function summary() {
  const result = await get<Response>(URL);
  // console.log('result', result.data[0].data);
  return result;
}
