import get from './get.ts';
import { SubjectType } from './types.ts';

const URL = 'https://api.wanikani.com/v2/assignments';

type Response = {
  readonly object: 'collection';
  readonly url: 'https://api.wanikani.com/v2/assignments';
  readonly pages: {
    readonly per_page: number;
    readonly next_url: string;
    readonly previous_url: string | null;
  };
  readonly total_count: number;
  readonly data_updated_at: string; // ISO 8601 Date
  readonly data: Data[];
}

type Data = {
  readonly id: number;
  readonly object: 'assignment';
  readonly url: string;
  readonly data_updated_at: string; // ISO 8601 Date
  readonly data: {
    readonly created_at: string; // ISO 8601 Date
    readonly subject_id: number;
    readonly subject_type: SubjectType;
    readonly srs_stage: number;
    readonly srs_stage_name: string;
    readonly unlocked_at: string;
    readonly started_at: string;
    readonly passed_at: string;
    readonly burned_at: string | null;
    readonly available_at: string;
    readonly resurrected_at: string | null;
    readonly passed: Boolean;
  };
};

export default async function assignments() {
  const result = await get<Response>(URL);
  console.log('result', result.data[0].data);
  return result;
}
