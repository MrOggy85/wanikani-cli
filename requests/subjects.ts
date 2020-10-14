import get from './get.ts';
import { SubjectType } from './types.ts';

const URL = 'https://api.wanikani.com/v2/subjects';

type Response = {
  readonly object: SubjectType;
  readonly url: string;
  readonly data_updated_at: string; // ISO 8601 Date
  readonly data: Data;
}

type Data = {
  readonly created_at: string; // ISO 8601 Date
  readonly level: number;
  readonly slug: string;
  readonly hidden_at: unknown;
  readonly document_url: string;
  readonly characters: string;
  readonly meanings: Meaning[] | undefined[];
  readonly auxiliary_meanings: Meaning[] | undefined[];
  readonly readings: Meaning[] | undefined[];
  readonly parts_of_speech: unknown;
  readonly component_subject_ids: number[];
  readonly meaning_mnemonic: string;
  readonly reading_mnemonic: string;
  readonly context_sentences: ContextSentence[];
  readonly pronunciation_audios: PronunciationAudio[];
  readonly lesson_position: number;
};

type Meaning = {
  readonly meaning: string;
  readonly primary: boolean;
  readonly accepted_answer: boolean;
}

type ContextSentence = {
  readonly en: string;
  readonly ja: string;
}

type PronunciationAudio = {
  readonly url: string;
  readonly metadata: {
    readonly gender: string;
    readonly source_id: number;
    readonly pronunciation: string;
    readonly voice_actor_id: number;
    readonly voice_actor_name: string;
    readonly voice_description: string;
  }
  readonly content_type: string;
}

export default async function subject(id: number) {
  const result = await get<Response>(`${URL}/${id}`);
  return result;
}
