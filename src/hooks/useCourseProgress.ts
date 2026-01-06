import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { modules, TOTAL_MODULES } from '@/data/modules';
import { useAuth } from './useAuth';

export function useCourseProgress() {
  const { user } = useAuth();
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    if (!user) {
      setCompletedModules([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('course_progress')
        .select('module_id')
        .eq('user_id', user.id);

      if (error) throw error;
      
      setCompletedModules(data?.map(p => p.module_id) ?? []);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const markModuleCompleted = async (moduleId: number) => {
    if (!user || completedModules.includes(moduleId)) return;

    try {
      const { error } = await supabase
        .from('course_progress')
        .insert({ user_id: user.id, module_id: moduleId });

      if (error && error.code !== '23505') throw error; // Ignore duplicate errors
      
      setCompletedModules(prev => [...prev, moduleId]);
    } catch (error) {
      console.error('Error marking module completed:', error);
    }
  };

  const isModuleCompleted = (moduleId: number) => {
    return completedModules.includes(moduleId);
  };

  const getProgressPercentage = () => {
    return TOTAL_MODULES === 0 ? 0 : Math.round((completedModules.length / TOTAL_MODULES) * 100);
  };

  const isAllModulesCompleted = () => {
    return completedModules.length >= TOTAL_MODULES;
  };

  return {
    completedModules,
    isLoading,
    markModuleCompleted,
    isModuleCompleted,
    getProgressPercentage,
    isAllModulesCompleted,
    completedCount: completedModules.length,
    totalModules: TOTAL_MODULES,
    refreshProgress: loadProgress,
  };
}
