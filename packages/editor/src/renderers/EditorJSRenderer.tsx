import { OutputBlockData, OutputData } from '@editorjs/editorjs';
import React from 'react';
import editorJsHtml from 'editorjs-html';
import CodeRenderer from './codeRenderer';

const EditorJsToHtml = editorJsHtml({
  code: (block: OutputBlockData<string>) => {
    return <CodeRenderer code={block.data.code} />;
  },
});

type Props = {
  data: OutputData;
};
type ParsedContent = string | JSX.Element;

const EditorJsRenderer = ({ data }: Props) => {
  const html = EditorJsToHtml.parse(data) as ParsedContent[];
  return (
    <div className="prose max-w-full">
      {html.map((item, index) => {
        if (typeof item === 'string') {
          // eslint-disable-next-line react/no-array-index-key, react/no-danger
          return <div dangerouslySetInnerHTML={{ __html: item }} key={index} />;
        }
        return item;
      })}
    </div>
  );
};

export default EditorJsRenderer;
