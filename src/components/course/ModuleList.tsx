import { modules, Module } from '@/data/modules';
import { useCourseProgress } from '@/hooks/useCourseProgress';

interface ModuleListProps {
  selectedModuleId: number | null;
  onSelectModule: (module: Module) => void;
}

export function ModuleList({ selectedModuleId, onSelectModule }: ModuleListProps) {
  const { isModuleCompleted } = useCourseProgress();

  return (
    <aside className="space-y-4">
      <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-primary">
        MÓDULOS
      </h2>

      <div className="space-y-3 mt-2">
        {modules.map((mod) => {
          const completed = isModuleCompleted(mod.id);
          const isSelected = selectedModuleId === mod.id;

          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => onSelectModule(mod)}
              className={`w-full text-left glass-card rounded-2xl px-4 py-4 flex items-start gap-3 text-sm transition-all ${
                isSelected ? 'lesson-active border-primary/50' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-[11px] font-bold text-muted-foreground border border-border">
                {String(mod.id).padStart(2, '0')}
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  {mod.category}
                </div>
                <div className="font-semibold text-foreground">{mod.title}</div>
                <p className="text-[11px] text-muted-foreground mt-1">{mod.desc}</p>
              </div>
              <div className="ml-2 text-[11px] text-muted-foreground flex items-center gap-1">
                {completed ? (
                  <>
                    <span className="text-success">●</span>
                    <span>Hecho</span>
                  </>
                ) : (
                  <>
                    <span className="text-muted-foreground/50">○</span>
                    <span>Pendiente</span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground">
        Tu progreso se guarda automáticamente en este navegador. Puedes salir y volver cuando quieras.
      </p>
    </aside>
  );
}
