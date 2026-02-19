/**
 * MSW (Mock Service Worker) request handlers for Supabase API
 * These handlers intercept HTTP requests during tests and return mock responses
 */
import { http, HttpResponse } from 'msw';

// Base URL for Supabase REST API
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const REST_API_BASE = `${SUPABASE_URL}/rest/v1`;

/**
 * Mock data for steps
 */
const mockSteps = [
  {
    id: '1',
    title: 'Review quarterly goals',
    priority: 1,
    max_time_minutes: 30,
    status: 'today',
    order: 0,
    north_star_id: 'ns1',
    tag: 'Work',
    created_at: '2026-02-19T08:00:00Z',
    updated_at: '2026-02-19T08:00:00Z',
  },
  {
    id: '2',
    title: 'Write blog post',
    priority: 2,
    max_time_minutes: 60,
    status: 'this_week',
    order: 1,
    north_star_id: 'ns2',
    tag: 'Learning',
    created_at: '2026-02-19T08:00:00Z',
    updated_at: '2026-02-19T08:00:00Z',
  },
];

/**
 * Request handlers for Supabase endpoints
 */
export const handlers = [
  // GET /rest/v1/steps - Fetch all steps
  http.get(`${REST_API_BASE}/steps`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    
    // Filter by status if provided
    if (status) {
      const filtered = mockSteps.filter(step => step.status === status);
      return HttpResponse.json(filtered, { status: 200 });
    }
    
    return HttpResponse.json(mockSteps, { status: 200 });
  }),

  // POST /rest/v1/steps - Create a new step
  http.post(`${REST_API_BASE}/steps`, async ({ request }) => {
    const body = await request.json();
    const newStep = {
      id: `step-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...body,
    };
    
    return HttpResponse.json(newStep, { status: 201 });
  }),

  // PATCH /rest/v1/steps - Update a step
  http.patch(`${REST_API_BASE}/steps`, async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const body = await request.json();
    
    const existingStep = mockSteps.find(step => step.id === id);
    if (!existingStep) {
      return HttpResponse.json(
        { error: 'Step not found' },
        { status: 404 }
      );
    }
    
    const updatedStep = {
      ...existingStep,
      ...body,
      updated_at: new Date().toISOString(),
    };
    
    return HttpResponse.json(updatedStep, { status: 200 });
  }),

  // DELETE /rest/v1/steps - Delete a step
  http.delete(`${REST_API_BASE}/steps`, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    const stepExists = mockSteps.some(step => step.id === id);
    if (!stepExists) {
      return HttpResponse.json(
        { error: 'Step not found' },
        { status: 404 }
      );
    }
    
    return new HttpResponse(null, { status: 204 });
  }),
];
