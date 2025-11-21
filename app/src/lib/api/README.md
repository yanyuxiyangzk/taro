# API Client Module

This module provides a centralized API client for making HTTP requests to the backend server.

## Features

- **Axios-based HTTP client** with TypeScript support
- **Automatic authentication** via JWT tokens
- **Token refresh** mechanism for expired tokens
- **Request/response interceptors** for error handling
- **Type-safe API calls** with TypeScript interfaces
- **Environment configuration** support

## Usage

### Basic API Calls

```typescript
import { apiClient } from '@/lib/api';

// GET request
const response = await apiClient.get('/endpoint');

// POST request
const response = await apiClient.post('/endpoint', { data });

// PUT request
const response = await apiClient.put('/endpoint', { data });

// DELETE request
const response = await apiClient.delete('/endpoint');
```

### Authentication

```typescript
import { apiClient } from '@/lib/api';

// Set tokens after login
apiClient.setToken('access_token');
apiClient.setRefreshToken('refresh_token');

// Check if authenticated
const isAuth = apiClient.isAuthenticated();

// Clear tokens on logout
apiClient.clearTokens();
```

### Error Handling

```typescript
import { apiClient, formatErrorMessage } from '@/lib/api';

try {
  const response = await apiClient.get('/endpoint');
  // Handle success
} catch (error) {
  const message = formatErrorMessage(error);
  console.error(message);
}
```

### Using Endpoints

```typescript
import { API_CONFIG, buildEndpoint } from '@/lib/api';

// Simple endpoint
const url = API_CONFIG.endpoints.profile;

// Endpoint with parameters
const url = buildEndpoint(API_CONFIG.endpoints.postDetail, { id: '123' });
```

## Configuration

Environment variables can be set in `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENV=development
```

## File Structure

- `client.ts` - Main API client with interceptors
- `config.ts` - API configuration and endpoints
- `types.ts` - TypeScript interfaces for API requests/responses
- `utils.ts` - Helper functions for error handling and retries
- `index.ts` - Module exports

## Token Management

The API client automatically:
- Adds authentication tokens to requests
- Refreshes expired tokens
- Redirects to login on authentication failure
- Stores tokens in localStorage

## Error Handling

The client handles various error scenarios:
- Network errors
- Authentication errors (401)
- Server errors (5xx)
- Request timeouts

All errors are normalized to the `ApiError` interface for consistent handling.
