export default async function fileReader(file: File): Promise<unknown> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      res(reader.result);
    };

    reader.onerror = () => {
      rej(reader.error);
    };

    reader.readAsDataURL(file);
  });
}
