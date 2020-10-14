declare module 'https://raw.githubusercontent.com/ameerthehacker/cli-spinners/master/mod.ts' {
  type spinner = {
    start: (text: string) => Promise<void>;
    stop: () => Promise<void>;
  };

  function getInstance(): spinner;

  export {
    getInstance,
  }
}
