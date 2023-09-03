import dynamic from 'next/dynamic';

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false },
);

interface EditorOutputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

// const renderers = {
//   image: CustomImageRenderer,
//   code: CustomCodeRenderer,
// }

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
};

const EditorOutput = ({ content }: EditorOutputProps) => {
  return (
    <>
      <Output
        style={style}
        className="text-sm"
        //   renderers={renderers}
        data={content}
      />{' '}
    </>
  );
};

export default EditorOutput;
