import { apiClient } from '@/lib/api/client';
import { API_CONFIG } from '@/lib/api/config';
import { UserProfile, Achievement, ApiResponse } from '@/lib/api/types';

interface ExperienceResult {
  newExperience: number;
  newLevel: number;
  leveledUp: boolean;
  rewards?: Array<{
    type: 'coins' | 'achievement' | 'vip_trial';
    value: any;
  }>;
}

class UserService {
  /**
   * Get user profile
   */
  async getUserProfile(userId?: string): Promise<UserProfile> {
    const url = userId ? `${API_CONFIG.endpoints.profile}/${userId}` : API_CONFIG.endpoints.profile;
    const response = await apiClient.get<UserProfile>(url);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to fetch user profile');
  }

  /**
   * Update user profile
   */
  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiClient.put<UserProfile>(
      API_CONFIG.endpoints.updateProfile,
      updates
    );

    if (response.success && response.data) {
      // Update stored user data
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...response.data };
        this.setCurrentUser(updatedUser);
      }
      return response.data;
    }

    throw new Error(response.error || 'Failed to update profile');
  }

  /**
   * Add experience points to user
   */
  async addExperience(amount: number): Promise<ExperienceResult> {
    const response = await apiClient.post<ExperienceResult>(
      `${API_CONFIG.endpoints.profile}/experience`,
      { amount }
    );

    if (response.success && response.data) {
      // Update local user data
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        currentUser.experience = response.data.newExperience;
        currentUser.level = response.data.newLevel;
        this.setCurrentUser(currentUser);
      }
      return response.data;
    }

    throw new Error(response.error || 'Failed to add experience');
  }

  /**
   * Get user achievements
   */
  async getUserAchievements(): Promise<Achievement[]> {
    const response = await apiClient.get<Achievement[]>(API_CONFIG.endpoints.achievements);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to fetch achievements');
  }

  /**
   * Unlock achievement
   */
  async unlockAchievement(achievementId: string): Promise<Achievement> {
    const response = await apiClient.post<Achievement>(
      `${API_CONFIG.endpoints.achievements}/${achievementId}/unlock`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to unlock achievement');
  }

  /**
   * Get coin balance
   */
  async getCoinBalance(): Promise<number> {
    const response = await apiClient.get<{ balance: number }>(API_CONFIG.endpoints.coinBalance);

    if (response.success && response.data) {
      // Update local user data
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        currentUser.coinBalance = response.data.balance;
        this.setCurrentUser(currentUser);
      }
      return response.data.balance;
    }

    throw new Error(response.error || 'Failed to fetch coin balance');
  }

  /**
   * Calculate experience percentage for progress bar
   */
  calculateExperiencePercentage(current: number, required: number): number {
    if (required === 0) return 0;
    return Math.min(Math.round((current / required) * 100), 100);
  }

  /**
   * Check if user should level up
   */
  shouldLevelUp(experience: number, experienceRequired: number): boolean {
    return experience >= experienceRequired;
  }

  /**
   * Get current user from localStorage (helper method)
   */
  private getCurrentUser(): UserProfile | null {
    const userStr = localStorage.getItem('tarot_current_user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (error) {
      return null;
    }
  }

  /**
   * Set current user in localStorage (helper method)
   */
  private setCurrentUser(user: UserProfile): void {
    localStorage.setItem('tarot_current_user', JSON.stringify(user));
  }
}

export const userService = new UserService();
