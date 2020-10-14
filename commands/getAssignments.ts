import { Await } from '../types/helpers.ts';
import assignments from '../requests/assignments.ts';
import { HandledError } from '../Error.ts';

export default async function getAssignments() {
  let result: Await<ReturnType<typeof assignments>>;
  try {
    result = await assignments();
  } catch (error) {
    console.log('error', error);
    if (!error.isHandled) throw error;

    const handledError = error as HandledError;
    if (handledError.code === 'UNAUTHORIZED') {
      console.log('Auth Token is wrong. Please correct!');
    }

    return;
  }
}
