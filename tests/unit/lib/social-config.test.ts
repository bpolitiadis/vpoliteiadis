import { describe, it, expect } from 'vitest';
import { getSocialProfile, getAllSocialProfiles, socialProfiles } from '@/lib/social-config';

describe('social-config utilities', () => {
  describe('getSocialProfile', () => {
    it('should return profile for existing platform', () => {
      const profile = getSocialProfile('github');
      expect(profile).toBeDefined();
      expect(profile?.platform).toBe('github');
      expect(profile?.username).toBe('bpolitiadis');
    });

    it('should return profile for linkedin', () => {
      const profile = getSocialProfile('linkedin');
      expect(profile).toBeDefined();
      expect(profile?.platform).toBe('linkedin');
      expect(profile?.username).toBe('vasileios-politeiadis');
    });

    it('should return profile for instagram', () => {
      const profile = getSocialProfile('instagram');
      expect(profile).toBeDefined();
      expect(profile?.platform).toBe('instagram');
      expect(profile?.username).toBe('arte.imaginari');
    });

    it('should return undefined for non-existent platform', () => {
      const profile = getSocialProfile('nonexistent');
      expect(profile).toBeUndefined();
    });

    it('should be case-sensitive', () => {
      const profile = getSocialProfile('GitHub');
      expect(profile).toBeUndefined();
    });

    it('should return profiles with all required fields', () => {
      const profile = getSocialProfile('github');
      expect(profile).toHaveProperty('platform');
      expect(profile).toHaveProperty('username');
      expect(profile).toHaveProperty('displayName');
      expect(profile).toHaveProperty('deepLink');
      expect(profile).toHaveProperty('webUrl');
      expect(profile).toHaveProperty('icon');
      expect(profile).toHaveProperty('ariaLabel');
    });
  });

  describe('getAllSocialProfiles', () => {
    it('should return all social profiles', () => {
      const profiles = getAllSocialProfiles();
      expect(profiles).toBeInstanceOf(Array);
      expect(profiles.length).toBeGreaterThan(0);
    });

    it('should return the same array as socialProfiles', () => {
      const profiles = getAllSocialProfiles();
      expect(profiles).toEqual(socialProfiles);
    });

    it('should return profiles with all required fields', () => {
      const profiles = getAllSocialProfiles();
      profiles.forEach(profile => {
        expect(profile).toHaveProperty('platform');
        expect(profile).toHaveProperty('username');
        expect(profile).toHaveProperty('displayName');
        expect(profile).toHaveProperty('deepLink');
        expect(profile).toHaveProperty('webUrl');
        expect(profile).toHaveProperty('icon');
        expect(profile).toHaveProperty('ariaLabel');
      });
    });
  });
});
