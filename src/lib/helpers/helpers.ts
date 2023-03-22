// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeNonPOJOs = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};


export const getImageUrl = (collectionId:string, recordId:string, fileName:string, size = '0x0') => {
  return `http://127.0.0.1:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`
}