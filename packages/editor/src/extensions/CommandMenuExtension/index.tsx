import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';

export const CommandMenuExt = Extension.create({
  name: 'command-menu',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        command: ({ editor, range, props }: any) => {
          props.id?.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export * from './CommandSuggestion';
