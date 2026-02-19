/**
 * MSW server setup for Node.js test environment
 * This server intercepts HTTP requests during Jest tests
 */
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * Create and export MSW server instance with default handlers
 * The server is started/stopped in jest.setup.js
 */
export const server = setupServer(...handlers);
