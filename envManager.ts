import { ensureFile } from './deps.ts';

const ENV_FILE = './.env';

type ENV_VARS = {
  AUTH_TOKEN: string;
}

export async function getEnv() {
  await ensureFile(ENV_FILE);
  const envRaw = await Deno.readTextFile(ENV_FILE);

  const envRawRows = envRaw.split('\n');
  const env: ENV_VARS = {
    AUTH_TOKEN: '',
  };

  const envKeys = Object.keys(env);

 envRawRows.forEach(x => {
    const row = x.split('=');
    const key = row[0];

    if (envKeys.includes(key)) {
      const value = row[1];
      env[key as keyof ENV_VARS] = value;
    }


    // const value = row[1];

    // return row;
    // if (key === env.AUTH_TOKEN) {
    //   env.AUTH_TOKEN = value;
    // }
  });

  return env;
}

export async function setEnv(key: keyof ENV_VARS, value: string) {
  const env = await getEnv();

  env[key] = value;

  const updatedEnvRawRows = Object.keys(env).map(x => {
    return `${x}=${env[x as keyof ENV_VARS]}`;
  })

  // await ensureFile(ENV_FILE);
  // const envRaw = await Deno.readTextFile(ENV_FILE);

  // const envRawRows = envRaw.split('\n');

  // const updatedEnvRawRows = envRawRows
  //   .filter(x => x)
  //   .filter(x => {
  //     const row = x.split('=');
  //     return row[0] && row[1];
  //   })
  //   // .map(x => {
  //   //   const row = x.split('=');
  //   // })
  //   .map(x => {
  //     const row = x.split('=');
  //     const currentKey = row[0];
  //     const currentValue = row[1];

  //     if (currentKey === key) {
  //       return `${key}=${value}`;
  //     }
  //     return `${currentKey}=${currentValue}`;
  //   });

  const updatedEnvRaw = updatedEnvRawRows.join('\n');
  console.log('updatedEnvRaw', updatedEnvRaw);

  await Deno.writeTextFile(ENV_FILE, updatedEnvRaw);
}
