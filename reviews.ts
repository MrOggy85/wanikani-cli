import { ensureFile } from './deps.ts';

const REVIEWS_FILE = './reviews.json';

export async function getReviews() {
  await ensureFile(REVIEWS_FILE);
  const reviewFileRaw = await Deno.readTextFile(REVIEWS_FILE);

  const reviews = JSON.parse(reviewFileRaw);
  return reviews;
}
