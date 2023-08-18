import 'reflect-metadata';
import { HealthResolver } from '../health/health';

describe('health', () => {
  test('should return OK', async () => {
    const resolver = new HealthResolver();

    const response = await resolver.health();

    expect(response).toEqual('OK');
  });
});
