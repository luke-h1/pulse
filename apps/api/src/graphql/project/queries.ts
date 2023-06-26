import builder from '../../builder';

export const Project = builder.prismaObject('Project', {
  name: 'Project',
  description: 'Project',
  fields: t => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    intro: t.exposeString('intro'),
    content: t.expose('content', {
      type: 'JSON',
    }),
    githubUrl: t.exposeString('githubUrl', {
      nullable: true,
    }),
    siteUrl: t.exposeString('siteUrl', {
      nullable: true,
    }),
    appStoreUrl: t.exposeString('appStoreUrl', {
      nullable: true,
    }),
    playStoreUrl: t.exposeString('playStoreUrl', {
      nullable: true,
    }),
    tags: t.exposeStringList('tags'),
    author: t.relation('author'),
    createdAt: t.expose('createdAt', {
      type: 'Date',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'Date',
    }),
  }),
});
