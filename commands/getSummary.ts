import { Await } from '../types/helpers.ts';
import summary from '../requests/summary.ts';
import { HandledError } from '../Error.ts';

const reviews: number[] = [];

export function nextReview() {
  // Math.random();
  const maxLength = reviews.length;
  const nextIndex = Math.floor(Math.random() * maxLength);

  return reviews[nextIndex];
}

export default async function getSummary() {
  let result: Await<ReturnType<typeof summary>>;
  try {
    result = await summary();
  } catch (error) {
    console.log('error', error);
    if (!error.isHandled) throw error;

    const handledError = error as HandledError;
    if (handledError.code === 'UNAUTHORIZED') {
      console.log('Auth Token is wrong. Please correct!');
    }

    return;
  }

  const data = result.data;
  const numberOfLessons = data.lessons[0].subject_ids.length;
  let numberOfReviews = 0;
  data.reviews.forEach((x: any) => {
    numberOfReviews += x.subject_ids.length;
  });

  reviews.push(...data.reviews[0].subject_ids);

  const nextReviewsAt = new Date(data.next_reviews_at);

  console.log(`Number of Lessons ${numberOfLessons}`);
  console.log(`Number of Reviews ${numberOfReviews}`);
  console.log(`Next Review at ${nextReviewsAt}`);
}
