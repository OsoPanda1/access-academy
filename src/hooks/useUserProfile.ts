import { useState, useEffect } from 'react';

const PROFILE_KEY = 'utamv_master360_profile';

export interface UserProfile {
  username: string;
  email: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setProfile({
          username: parsed.username || '',
          email: parsed.email || ''
        });
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfile = (newProfile: UserProfile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
    setProfile(newProfile);
  };

  const clearProfile = () => {
    localStorage.removeItem(PROFILE_KEY);
    setProfile(null);
  };

  return {
    profile,
    isLoading,
    saveProfile,
    clearProfile,
    isAuthenticated: !!profile?.username
  };
}
