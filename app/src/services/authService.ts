import { apiClient } from '@/lib/api/client';
import { API_CONFIG } from '@/lib/api/config';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserProfile,
  ApiResponse,
} from '@/lib/api/types';

class AuthService {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_CONFIG.endpoints.login,
      credentials
    );

    if (response.success && response.data) {
      // Store tokens
      apiClient.setToken(response.data.token);
      apiClient.setRefreshToken(response.data.refreshToken);
      
      // Store user profile in localStorage
      this.setCurrentUser(response.data.user);
      
      return response.data;
    }

    throw new Error(response.error || 'Login failed');
  }

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_CONFIG.endpoints.register,
      userData
    );

    if (response.success && response.data) {
      // Store tokens
      apiClient.setToken(response.data.token);
      apiClient.setRefreshToken(response.data.refreshToken);
      
      // Store user profile
      this.setCurrentUser(response.data.user);
      
      return response.data;
    }

    throw new Error(response.error || 'Registration failed');
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_CONFIG.endpoints.logout);
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      // Clear tokens and user data
      apiClient.clearTokens();
      this.clearCurrentUser();
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return apiClient.isAuthenticated() && this.getCurrentUser() !== null;
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): UserProfile | null {
    const userStr = localStorage.getItem('tarot_current_user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      return null;
    }
  }

  /**
   * Set current user in localStorage
   */
  setCurrentUser(user: UserProfile): void {
    localStorage.setItem('tarot_current_user', JSON.stringify(user));
  }

  /**
   * Clear current user from localStorage
   */
  clearCurrentUser(): void {
    localStorage.removeItem('tarot_current_user');
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem(API_CONFIG.auth.refreshTokenKey);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<{ token: string }>(
      API_CONFIG.endpoints.refreshToken,
      { refreshToken }
    );

    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
      return response.data.token;
    }

    throw new Error('Token refresh failed');
  }
}

export const authService = new AuthService();
