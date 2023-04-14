import { CopyClipBoard } from "$lib/components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeNonPOJOs = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const getImageUrl = (
  collectionId: string,
  recordId: string,
  fileName: string,
  size = "0x0"
) => {
  return `http://127.0.0.1:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const copyToClipBoard = (tournamentId: string) => {
  const clipBoard = new CopyClipBoard({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: document.getElementById("clipboard") as any,
    props: {
      link: `http://127.0.0.1:5173/tournament/${tournamentId}`,
    },
  });
  clipBoard.$destroy();
  handleCopy();
};

const handleCopy = () => {
  alert(`Copied a link to your clipboard`);
};

export const getNumberSuffix = (number: number) => {
  const suffixes = ["st", "nd", "rd"];
  const suffix =
    number % 100 >= 11 && number % 100 <= 13 ? "th" : suffixes[(number % 10) - 1] || "th";
  return `${number}${suffix}`;
};
