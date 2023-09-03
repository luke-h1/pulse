import { Request, Response } from 'express';
import {
  createMocks,
  createRequest,
  createResponse,
  Mocks,
  MockRequest,
  MockResponse,
  RequestOptions,
  ResponseOptions,
} from 'node-mocks-http';
import Redis from 'ioredis-mock';
import { Context } from '../../types/Context';

type ApiRequest = Context['req'] & ReturnType<typeof createRequest>;
type ApiResponse = Context['res'] & ReturnType<typeof createResponse>;

export function createApiMocks(
  reqOptions?: RequestOptions,
  resOptions?: ResponseOptions,
): Mocks<ApiRequest, ApiResponse> {
  return createMocks(reqOptions, resOptions);
}

export function createApiRequest(
  reqOptions?: RequestOptions,
): MockRequest<ApiRequest> {
  return createRequest(reqOptions);
}

export function createApiResponse(
  resOptions?: ResponseOptions,
): MockResponse<ApiResponse> {
  return createResponse(resOptions);
}

export function createMockRedis() {
  return new Redis();
}
