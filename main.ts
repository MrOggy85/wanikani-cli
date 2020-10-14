console.log('----------------------------');
console.log("Welcome to WaniKani CLI!");
console.log('----------------------------');

import { getEnv, setEnv } from './EnvManager.ts';
import getSummary, { nextReview } from './commands/getSummary.ts';
import { getSubject } from './subjects.ts';

console.log('hej', Math.floor(Math.random() * 40));
console.log('hej', Math.floor(Math.random() * 40));
console.log('hej', Math.floor(Math.random() * 40));
console.log('hej', Math.floor(Math.random() * 40));

// const env = await getEnv();
// console.log('env', await getEnv());

// async function get(url: string) {
//   await spinner.start('Requesting...');
//   const res = await fetch(url, {
//     headers: {
//       Authorization: 'Bearer 0df8f202-51da-47de-9a65-5b44c5064295',
//     },
// });

// const body = await res.json();
// await spinner.stop();
// return body;
// }

// async function reviewStatistics() {
//   const result = await get('https://api.wanikani.com/v2/review_statistics');
//   console.log('result', result.data[0].data);
// }



const buf = new Uint8Array(1024);

while(true) {
  const env = await getEnv();
  if (!env.AUTH_TOKEN) {
    console.log('Please enter WaniKani Auth Token');

    const h = await Deno.stdin.read(buf);
    const authToken = new TextDecoder().decode(buf.subarray(0, h!));
    console.log('authToken', authToken);

    await setEnv('AUTH_TOKEN', authToken);
    continue;
  }

  const n = await Deno.stdin.read(buf);
  const textRaw = new TextDecoder().decode(buf.subarray(0, n!));

  const text = textRaw.trim();

  if (text.length === 0) {
    continue;
  }

  switch (text) {
    case 'summary':
      await getSummary();
      break;

    case 'next':
      const r = nextReview();
      console.log('r', r);
      const subject = await getSubject(r);
      console.log('subject', subject.characters, subject.meanings[0]?.meaning);
      break;

    default:
      break;
  }
}
