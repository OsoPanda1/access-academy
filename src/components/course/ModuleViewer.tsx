import { Module } from '@/data/modules';
import { ModuleContent } from './ModuleContent';

interface ModuleViewerProps {
  module: Module | null;
}

export function ModuleViewer({ module }: ModuleViewerProps) {
  if (!module) {
    return (
      <div className="glass-card rounded-3xl p-6 md:p-8 min-h-[420px]">
        <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-muted-foreground/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <p className="text-xs font-bold tracking-[0.3em] uppercase">
            Selecciona un módulo para comenzar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 min-h-[420px]">
      <ModuleContent module={module} />
    </div>
  );
}
