import { useState, useEffect } from 'react';
import { modules } from '@/data/modules';

const PROGRESS_KEY = 'utamv_master360_progress';

interface CourseProgress {
  completedModules: number[];
}

export function useCourseProgress() {
  const [progress, setProgress] = useState<CourseProgress>({ completedModules: [] });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setProgress({
          completedModules: Array.isArray(parsed.completedModules) ? parsed.completedModules : []
        });
      }
    } catch {
      // ignore
    }
  };

  const saveProgress = (newProgress: CourseProgress) => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    setProgress(newProgress);
  };

  const markModuleCompleted = (moduleId: number) => {
    if (!progress.completedModules.includes(moduleId)) {
      const newProgress = {
        completedModules: [...progress.completedModules, moduleId]
      };
      saveProgress(newProgress);
    }
  };

  const clearProgress = () => {
    localStorage.removeItem(PROGRESS_KEY);
    setProgress({ completedModules: [] });
  };

  const isModuleCompleted = (moduleId: number) => {
    return progress.completedModules.includes(moduleId);
  };

  const getProgressPercentage = () => {
    const total = modules.length;
    const completed = progress.completedModules.length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return {
    progress,
    markModuleCompleted,
    clearProgress,
    isModuleCompleted,
    getProgressPercentage,
    completedCount: progress.completedModules.length,
    totalModules: modules.length
  };
}
