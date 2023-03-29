export type PbError = {
  url: string;
  status: number;
  response: {
    code: number;
    message: string;
    data: {
      [key: string]: string[];
    };
  };
  isAbout: boolean;
  originalError: string | null;
  name: string;
};
