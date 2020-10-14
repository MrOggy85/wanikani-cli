import { ensureFile } from './deps.ts';
import requestGetSubject from './requests/subjects.ts';
import { Await } from './types/helpers.ts';

const SUBJECTS_FILE = './subjects.json';

type Subject = Await<ReturnType<typeof requestGetSubject>>['data'];

type Subjects = { [id: number]: Subject };

export async function getSubjects() {
  await ensureFile(SUBJECTS_FILE);
  const subjectsFileRaw = await Deno.readTextFile(SUBJECTS_FILE);
  if (!subjectsFileRaw) {
    return {} as Subjects;
  }

  const subjects = JSON.parse(subjectsFileRaw) as Subjects;
  return subjects;
}

export async function getSubject(id: number) {
  const subjects = await getSubjects();

  const subject = subjects[id];
  console.log('subject', subject);
  if (subject) {
    return subject;
  }

  const s = await requestGetSubject(id);
  subjects[id] = s.data;
  await writeSubjects(subjects);
  return s.data;
}

async function writeSubjects(subjects: Subjects) {
  const subjectsStringified = JSON.stringify(subjects);
  await Deno.writeTextFile(SUBJECTS_FILE, subjectsStringified);
}
