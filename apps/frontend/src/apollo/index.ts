import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import {
  ApolloClient,
  createHttpLink,
  FieldPolicy,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
