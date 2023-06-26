import builder from '../../builder';

export const Post = builder.prismaObject('Post', {
  name: 'Post',
  description: 'Post',
  fields: t => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    intro: t.exposeString('intro'),
    image: t.exposeString('image', {
      nullable: true,
    }),
    content: t.expose('content', {
      type: 'JSON',
    }),
    author: t.relation('author'),
    createdAt: t.expose('createdAt', {
      type: 'Date',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'Date',
    }),
  }),
});
