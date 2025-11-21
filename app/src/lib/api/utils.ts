import { ApiError } from './types';

/**
 * Format error message for display to user
 */
export function formatErrorMessage(error: ApiError | Error | unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as ApiError).message;
  }
  
  return 'An unexpected error occurred';
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: ApiError | unknown): boolean {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    return (error as ApiError).code === 'NETWORK_ERROR';
  }
  return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: ApiError | unknown): boolean {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    return (error as ApiError).status === 401;
  }
  return false;
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | unknown;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on auth errors
      if (isAuthError(error)) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

/**
 * Build query string from object
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Parse error response from API
 */
export function parseApiError(error: any): ApiError {
  if (error.response) {
    const data = error.response.data;
    return {
      message: data?.message || data?.error || 'An error occurred',
      code: data?.code,
      status: error.response.status,
      details: data?.details,
    };
  }
  
  if (error.request) {
    return {
      message: 'Network error. Please check your connection.',
      code: 'NETWORK_ERROR',
    };
  }
  
  return {
    message: error.message || 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  };
}
