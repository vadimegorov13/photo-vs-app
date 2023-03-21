// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeNonPOJOs = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
