import Spinner from 'https://raw.githubusercontent.com/ameerthehacker/cli-spinners/master/mod.ts';
import { getEnv } from '../EnvManager.ts';
import { ErrorType, createError } from '../Error.ts';

const spinner = Spinner.getInstance();

export default async function get<T>(url: string) {
  await spinner.start('Requesting...');

  const authToken = (await getEnv()).AUTH_TOKEN;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (res.status !== 200) {
    await spinner.stop();

    if (res.status === 401) {
      const err = new Error();
      throw createError(err, 'UNAUTHORIZED')
    }
  }

  const body = await res.json() as T;
  await spinner.stop();
  return body;
}
