import { ClassType } from "type-graphql";
import * as tslib from "tslib";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as argsTypes from "./resolvers/crud/args.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as relationResolvers from "./resolvers/relations/resolvers.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";

export type MethodDecoratorOverrideFn = (decorators: MethodDecorator[]) => MethodDecorator[];

const crudResolversMap = {
  User: crudResolvers.UserCrudResolver,
  Project: crudResolvers.ProjectCrudResolver,
  Post: crudResolvers.PostCrudResolver
};
const actionResolversMap = {
  User: {
    aggregateUser: actionResolvers.AggregateUserResolver,
    createManyUser: actionResolvers.CreateManyUserResolver,
    createOneUser: actionResolvers.CreateOneUserResolver,
    deleteManyUser: actionResolvers.DeleteManyUserResolver,
    deleteOneUser: actionResolvers.DeleteOneUserResolver,
    findFirstUser: actionResolvers.FindFirstUserResolver,
    findFirstUserOrThrow: actionResolvers.FindFirstUserOrThrowResolver,
    users: actionResolvers.FindManyUserResolver,
    user: actionResolvers.FindUniqueUserResolver,
    getUser: actionResolvers.FindUniqueUserOrThrowResolver,
    groupByUser: actionResolvers.GroupByUserResolver,
    updateManyUser: actionResolvers.UpdateManyUserResolver,
    updateOneUser: actionResolvers.UpdateOneUserResolver,
    upsertOneUser: actionResolvers.UpsertOneUserResolver
  },
  Project: {
    aggregateProject: actionResolvers.AggregateProjectResolver,
    createManyProject: actionResolvers.CreateManyProjectResolver,
    createOneProject: actionResolvers.CreateOneProjectResolver,
    deleteManyProject: actionResolvers.DeleteManyProjectResolver,
    deleteOneProject: actionResolvers.DeleteOneProjectResolver,
    findFirstProject: actionResolvers.FindFirstProjectResolver,
    findFirstProjectOrThrow: actionResolvers.FindFirstProjectOrThrowResolver,
    projects: actionResolvers.FindManyProjectResolver,
    project: actionResolvers.FindUniqueProjectResolver,
    getProject: actionResolvers.FindUniqueProjectOrThrowResolver,
    groupByProject: actionResolvers.GroupByProjectResolver,
    updateManyProject: actionResolvers.UpdateManyProjectResolver,
    updateOneProject: actionResolvers.UpdateOneProjectResolver,
    upsertOneProject: actionResolvers.UpsertOneProjectResolver
  },
  Post: {
    aggregatePost: actionResolvers.AggregatePostResolver,
    createManyPost: actionResolvers.CreateManyPostResolver,
    createOnePost: actionResolvers.CreateOnePostResolver,
    deleteManyPost: actionResolvers.DeleteManyPostResolver,
    deleteOnePost: actionResolvers.DeleteOnePostResolver,
    findFirstPost: actionResolvers.FindFirstPostResolver,
    findFirstPostOrThrow: actionResolvers.FindFirstPostOrThrowResolver,
    posts: actionResolvers.FindManyPostResolver,
    post: actionResolvers.FindUniquePostResolver,
    getPost: actionResolvers.FindUniquePostOrThrowResolver,
    groupByPost: actionResolvers.GroupByPostResolver,
    updateManyPost: actionResolvers.UpdateManyPostResolver,
    updateOnePost: actionResolvers.UpdateOnePostResolver,
    upsertOnePost: actionResolvers.UpsertOnePostResolver
  }
};
const crudResolversInfo = {
  User: ["aggregateUser", "createManyUser", "createOneUser", "deleteManyUser", "deleteOneUser", "findFirstUser", "findFirstUserOrThrow", "users", "user", "getUser", "groupByUser", "updateManyUser", "updateOneUser", "upsertOneUser"],
  Project: ["aggregateProject", "createManyProject", "createOneProject", "deleteManyProject", "deleteOneProject", "findFirstProject", "findFirstProjectOrThrow", "projects", "project", "getProject", "groupByProject", "updateManyProject", "updateOneProject", "upsertOneProject"],
  Post: ["aggregatePost", "createManyPost", "createOnePost", "deleteManyPost", "deleteOnePost", "findFirstPost", "findFirstPostOrThrow", "posts", "post", "getPost", "groupByPost", "updateManyPost", "updateOnePost", "upsertOnePost"]
};
const argsInfo = {
  AggregateUserArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyUserArgs: ["data", "skipDuplicates"],
  CreateOneUserArgs: ["data"],
  DeleteManyUserArgs: ["where"],
  DeleteOneUserArgs: ["where"],
  FindFirstUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstUserOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueUserArgs: ["where"],
  FindUniqueUserOrThrowArgs: ["where"],
  GroupByUserArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyUserArgs: ["data", "where"],
  UpdateOneUserArgs: ["data", "where"],
  UpsertOneUserArgs: ["where", "create", "update"],
  AggregateProjectArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyProjectArgs: ["data", "skipDuplicates"],
  CreateOneProjectArgs: ["data"],
  DeleteManyProjectArgs: ["where"],
  DeleteOneProjectArgs: ["where"],
  FindFirstProjectArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstProjectOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyProjectArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueProjectArgs: ["where"],
  FindUniqueProjectOrThrowArgs: ["where"],
  GroupByProjectArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyProjectArgs: ["data", "where"],
  UpdateOneProjectArgs: ["data", "where"],
  UpsertOneProjectArgs: ["where", "create", "update"],
  AggregatePostArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyPostArgs: ["data", "skipDuplicates"],
  CreateOnePostArgs: ["data"],
  DeleteManyPostArgs: ["where"],
  DeleteOnePostArgs: ["where"],
  FindFirstPostArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstPostOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyPostArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniquePostArgs: ["where"],
  FindUniquePostOrThrowArgs: ["where"],
  GroupByPostArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyPostArgs: ["data", "where"],
  UpdateOnePostArgs: ["data", "where"],
  UpsertOnePostArgs: ["where", "create", "update"]
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<
  TModel extends ResolverModelNames
> = keyof typeof crudResolversMap[TModel]["prototype"];

export type ResolverActionsConfig<
  TModel extends ResolverModelNames
> = Partial<Record<ModelResolverActionNames<TModel>, MethodDecorator[] | MethodDecoratorOverrideFn>>
  & {
    _all?: MethodDecorator[];
    _query?: MethodDecorator[];
    _mutation?: MethodDecorator[];
  };

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
  resolversEnhanceMap: ResolversEnhanceMap,
) {
  const mutationOperationPrefixes = [
    "createOne", "createMany", "deleteOne", "updateOne", "deleteMany", "updateMany", "upsertOne"
  ];
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    const allActionsDecorators = resolverActionsConfig._all;
    const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
    for (const resolverActionName of resolverActionNames) {
      const maybeDecoratorsOrFn = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[] | MethodDecoratorOverrideFn | undefined;
      const isWriteOperation = mutationOperationPrefixes.some(prefix => resolverActionName.startsWith(prefix));
      const operationKindDecorators = isWriteOperation ? resolverActionsConfig._mutation : resolverActionsConfig._query;
      const mainDecorators = [
        ...allActionsDecorators ?? [],
        ...operationKindDecorators ?? [],
      ]
      let decorators: MethodDecorator[];
      if (typeof maybeDecoratorsOrFn === "function") {
        decorators = maybeDecoratorsOrFn(mainDecorators);
      } else {
        decorators = [...mainDecorators, ...maybeDecoratorsOrFn ?? []];
      }
      const actionTarget = (actionResolversConfig[
        resolverActionName as keyof typeof actionResolversConfig
      ] as Function).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]["prototype"],
  number | symbol
>;

type ArgFieldsConfig<
  TArgsType extends ArgsTypesNames
> = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
  argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}

const relationResolversMap = {
  User: relationResolvers.UserRelationsResolver,
  Project: relationResolvers.ProjectRelationsResolver,
  Post: relationResolvers.PostRelationsResolver
};
const relationResolversInfo = {
  User: ["projects", "posts"],
  Project: ["author"],
  Post: ["author"]
};

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<
  TModel extends RelationResolverModelNames
> = keyof typeof relationResolversMap[TModel]["prototype"];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames>
  = Partial<Record<RelationResolverActionNames<TModel>, MethodDecorator[] | MethodDecoratorOverrideFn>>
  & { _all?: MethodDecorator[] };

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
  relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    const allActionsDecorators = relationResolverActionsConfig._all ?? [];
    const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
    for (const relationResolverActionName of relationResolverActionNames) {
      const maybeDecoratorsOrFn = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[] | MethodDecoratorOverrideFn | undefined;
      let decorators: MethodDecorator[];
      if (typeof maybeDecoratorsOrFn === "function") {
        decorators = maybeDecoratorsOrFn(allActionsDecorators);
      } else {
        decorators = [...allActionsDecorators, ...maybeDecoratorsOrFn ?? []];
      }
      tslib.__decorate(decorators, relationResolverTarget, relationResolverActionName, null);
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

export type PropertyDecoratorOverrideFn = (decorators: PropertyDecorator[]) => PropertyDecorator[];

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys, PropertyDecorator[] | PropertyDecoratorOverrideFn>
> & { _all?: PropertyDecorator[] };

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    const allFieldsDecorators = enhanceConfig.fields._all ?? [];
    for (const typeFieldName of typeFieldNames) {
      const maybeDecoratorsOrFn = enhanceConfig.fields[
        typeFieldName
      ] as PropertyDecorator[] | PropertyDecoratorOverrideFn | undefined;
      let decorators: PropertyDecorator[];
      if (typeof maybeDecoratorsOrFn === "function") {
        decorators = maybeDecoratorsOrFn(allFieldsDecorators);
      } else {
        decorators = [...allFieldsDecorators, ...maybeDecoratorsOrFn ?? []];
      }
      tslib.__decorate(decorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  User: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt"],
  Project: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "authorId", "createdAt", "updatedAt"],
  Post: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "authorId", "createdAt", "updatedAt"]
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]["prototype"],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

const outputsInfo = {
  AggregateUser: ["_count", "_min", "_max"],
  UserGroupBy: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "_count", "_min", "_max"],
  AggregateProject: ["_count", "_min", "_max"],
  ProjectGroupBy: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "authorId", "createdAt", "updatedAt", "_count", "_min", "_max"],
  AggregatePost: ["_count", "_min", "_max"],
  PostGroupBy: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "authorId", "createdAt", "updatedAt", "_count", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  UserCount: ["projects", "posts"],
  UserCountAggregate: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "_all"],
  UserMinAggregate: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt"],
  UserMaxAggregate: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt"],
  ProjectCountAggregate: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "authorId", "createdAt", "updatedAt", "_all"],
  ProjectMinAggregate: ["id", "title", "slug", "intro", "image", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "status", "authorId", "createdAt", "updatedAt"],
  ProjectMaxAggregate: ["id", "title", "slug", "intro", "image", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "status", "authorId", "createdAt", "updatedAt"],
  PostCountAggregate: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "authorId", "createdAt", "updatedAt", "_all"],
  PostMinAggregate: ["id", "title", "slug", "intro", "image", "status", "authorId", "createdAt", "updatedAt"],
  PostMaxAggregate: ["id", "title", "slug", "intro", "image", "status", "authorId", "createdAt", "updatedAt"]
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]["prototype"],
  number | symbol
>;

type OutputTypeFieldsConfig<
  TOutput extends OutputTypesNames
> = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
  outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

const inputsInfo = {
  UserWhereInput: ["AND", "OR", "NOT", "id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "projects", "posts"],
  UserOrderByWithRelationAndSearchRelevanceInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "projects", "posts", "_relevance"],
  UserWhereUniqueInput: ["id", "email", "username", "AND", "OR", "NOT", "provider", "firstName", "lastName", "emailVerified", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "projects", "posts"],
  UserOrderByWithAggregationInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "_count", "_max", "_min"],
  UserScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt"],
  ProjectWhereInput: ["AND", "OR", "NOT", "id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "authorId", "createdAt", "updatedAt", "author"],
  ProjectOrderByWithRelationAndSearchRelevanceInput: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "authorId", "createdAt", "updatedAt", "author", "_relevance"],
  ProjectWhereUniqueInput: ["id", "slug", "AND", "OR", "NOT", "title", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "authorId", "createdAt", "updatedAt", "author"],
  ProjectOrderByWithAggregationInput: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "authorId", "createdAt", "updatedAt", "_count", "_max", "_min"],
  ProjectScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "authorId", "createdAt", "updatedAt"],
  PostWhereInput: ["AND", "OR", "NOT", "id", "title", "slug", "intro", "image", "tags", "content", "status", "authorId", "createdAt", "updatedAt", "author"],
  PostOrderByWithRelationAndSearchRelevanceInput: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "authorId", "createdAt", "updatedAt", "author", "_relevance"],
  PostWhereUniqueInput: ["id", "slug", "AND", "OR", "NOT", "title", "intro", "image", "tags", "content", "status", "authorId", "createdAt", "updatedAt", "author"],
  PostOrderByWithAggregationInput: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "authorId", "createdAt", "updatedAt", "_count", "_max", "_min"],
  PostScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "title", "slug", "intro", "image", "tags", "content", "status", "authorId", "createdAt", "updatedAt"],
  UserCreateInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "projects", "posts"],
  UserUpdateInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "projects", "posts"],
  UserCreateManyInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt"],
  UserUpdateManyMutationInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt"],
  ProjectCreateInput: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "createdAt", "updatedAt", "author"],
  ProjectUpdateInput: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "createdAt", "updatedAt", "author"],
  ProjectCreateManyInput: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "authorId", "createdAt", "updatedAt"],
  ProjectUpdateManyMutationInput: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "createdAt", "updatedAt"],
  PostCreateInput: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "createdAt", "updatedAt", "author"],
  PostUpdateInput: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "createdAt", "updatedAt", "author"],
  PostCreateManyInput: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "authorId", "createdAt", "updatedAt"],
  PostUpdateManyMutationInput: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "createdAt", "updatedAt"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "search", "mode", "not"],
  StringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "search", "mode", "not"],
  DateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  EnumRoleFilter: ["equals", "in", "notIn", "not"],
  EnumAccountStatusFilter: ["equals", "in", "notIn", "not"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  ProjectListRelationFilter: ["every", "some", "none"],
  PostListRelationFilter: ["every", "some", "none"],
  SortOrderInput: ["sort", "nulls"],
  ProjectOrderByRelationAggregateInput: ["_count"],
  PostOrderByRelationAggregateInput: ["_count"],
  UserOrderByRelevanceInput: ["fields", "sort", "search"],
  UserCountOrderByAggregateInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt"],
  UserMaxOrderByAggregateInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt"],
  UserMinOrderByAggregateInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt"],
  StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "search", "mode", "not", "_count", "_min", "_max"],
  StringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "search", "mode", "not", "_count", "_min", "_max"],
  DateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  EnumRoleWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  EnumAccountStatusWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  JsonFilter: ["equals", "path", "string_contains", "string_starts_with", "string_ends_with", "array_contains", "array_starts_with", "array_ends_with", "lt", "lte", "gt", "gte", "not"],
  StringNullableListFilter: ["equals", "has", "hasEvery", "hasSome", "isEmpty"],
  EnumStatusFilter: ["equals", "in", "notIn", "not"],
  UserRelationFilter: ["is", "isNot"],
  ProjectOrderByRelevanceInput: ["fields", "sort", "search"],
  ProjectCountOrderByAggregateInput: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "authorId", "createdAt", "updatedAt"],
  ProjectMaxOrderByAggregateInput: ["id", "title", "slug", "intro", "image", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "status", "authorId", "createdAt", "updatedAt"],
  ProjectMinOrderByAggregateInput: ["id", "title", "slug", "intro", "image", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "status", "authorId", "createdAt", "updatedAt"],
  JsonWithAggregatesFilter: ["equals", "path", "string_contains", "string_starts_with", "string_ends_with", "array_contains", "array_starts_with", "array_ends_with", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  EnumStatusWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  PostOrderByRelevanceInput: ["fields", "sort", "search"],
  PostCountOrderByAggregateInput: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "authorId", "createdAt", "updatedAt"],
  PostMaxOrderByAggregateInput: ["id", "title", "slug", "intro", "image", "status", "authorId", "createdAt", "updatedAt"],
  PostMinOrderByAggregateInput: ["id", "title", "slug", "intro", "image", "status", "authorId", "createdAt", "updatedAt"],
  ProjectCreateNestedManyWithoutAuthorInput: ["create", "connectOrCreate", "createMany", "connect"],
  PostCreateNestedManyWithoutAuthorInput: ["create", "connectOrCreate", "createMany", "connect"],
  StringFieldUpdateOperationsInput: ["set"],
  NullableStringFieldUpdateOperationsInput: ["set"],
  NullableDateTimeFieldUpdateOperationsInput: ["set"],
  EnumRoleFieldUpdateOperationsInput: ["set"],
  EnumAccountStatusFieldUpdateOperationsInput: ["set"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  ProjectUpdateManyWithoutAuthorNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  PostUpdateManyWithoutAuthorNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  ProjectCreatetagsInput: ["set"],
  UserCreateNestedOneWithoutProjectsInput: ["create", "connectOrCreate", "connect"],
  ProjectUpdatetagsInput: ["set", "push"],
  EnumStatusFieldUpdateOperationsInput: ["set"],
  UserUpdateOneRequiredWithoutProjectsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  PostCreatetagsInput: ["set"],
  UserCreateNestedOneWithoutPostsInput: ["create", "connectOrCreate", "connect"],
  PostUpdatetagsInput: ["set", "push"],
  UserUpdateOneRequiredWithoutPostsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "search", "not"],
  NestedStringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "search", "not"],
  NestedDateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedEnumRoleFilter: ["equals", "in", "notIn", "not"],
  NestedEnumAccountStatusFilter: ["equals", "in", "notIn", "not"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "search", "not", "_count", "_min", "_max"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "search", "not", "_count", "_min", "_max"],
  NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedEnumRoleWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedEnumAccountStatusWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedEnumStatusFilter: ["equals", "in", "notIn", "not"],
  NestedJsonFilter: ["equals", "path", "string_contains", "string_starts_with", "string_ends_with", "array_contains", "array_starts_with", "array_ends_with", "lt", "lte", "gt", "gte", "not"],
  NestedEnumStatusWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  ProjectCreateWithoutAuthorInput: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "createdAt", "updatedAt"],
  ProjectCreateOrConnectWithoutAuthorInput: ["where", "create"],
  ProjectCreateManyAuthorInputEnvelope: ["data", "skipDuplicates"],
  PostCreateWithoutAuthorInput: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "createdAt", "updatedAt"],
  PostCreateOrConnectWithoutAuthorInput: ["where", "create"],
  PostCreateManyAuthorInputEnvelope: ["data", "skipDuplicates"],
  ProjectUpsertWithWhereUniqueWithoutAuthorInput: ["where", "update", "create"],
  ProjectUpdateWithWhereUniqueWithoutAuthorInput: ["where", "data"],
  ProjectUpdateManyWithWhereWithoutAuthorInput: ["where", "data"],
  ProjectScalarWhereInput: ["AND", "OR", "NOT", "id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "authorId", "createdAt", "updatedAt"],
  PostUpsertWithWhereUniqueWithoutAuthorInput: ["where", "update", "create"],
  PostUpdateWithWhereUniqueWithoutAuthorInput: ["where", "data"],
  PostUpdateManyWithWhereWithoutAuthorInput: ["where", "data"],
  PostScalarWhereInput: ["AND", "OR", "NOT", "id", "title", "slug", "intro", "image", "tags", "content", "status", "authorId", "createdAt", "updatedAt"],
  UserCreateWithoutProjectsInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "posts"],
  UserCreateOrConnectWithoutProjectsInput: ["where", "create"],
  UserUpsertWithoutProjectsInput: ["update", "create", "where"],
  UserUpdateToOneWithWhereWithoutProjectsInput: ["where", "data"],
  UserUpdateWithoutProjectsInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "posts"],
  UserCreateWithoutPostsInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "projects"],
  UserCreateOrConnectWithoutPostsInput: ["where", "create"],
  UserUpsertWithoutPostsInput: ["update", "create", "where"],
  UserUpdateToOneWithWhereWithoutPostsInput: ["where", "data"],
  UserUpdateWithoutPostsInput: ["id", "provider", "firstName", "lastName", "email", "emailVerified", "username", "password", "image", "role", "github", "website", "twitter", "bio", "location", "accountStatus", "createdAt", "updatedAt", "projects"],
  ProjectCreateManyAuthorInput: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "createdAt", "updatedAt"],
  PostCreateManyAuthorInput: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "createdAt", "updatedAt"],
  ProjectUpdateWithoutAuthorInput: ["id", "title", "slug", "intro", "image", "content", "githubUrl", "siteUrl", "appStoreUrl", "playStoreUrl", "tags", "status", "createdAt", "updatedAt"],
  PostUpdateWithoutAuthorInput: ["id", "title", "slug", "intro", "image", "tags", "content", "status", "createdAt", "updatedAt"]
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]["prototype"],
  number | symbol
>;

type InputTypeFieldsConfig<
  TInput extends InputTypesNames
> = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
  inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}

