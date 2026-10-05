interface EmptyStateProps {
  hasTasks: boolean
  isSearching: boolean
}

export default function EmptyState({ hasTasks, isSearching }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-14 text-center transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/40">
      <div className="rounded-full bg-indigo-50 p-4 dark:bg-indigo-900/30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400 dark:text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
        {isSearching ? 'No matching tasks' : hasTasks ? 'Nothing here yet' : 'No tasks yet'}
      </h3>
      <p className="max-w-xs text-sm text-slate-400 dark:text-slate-500">
        {isSearching
          ? 'Try a different search term or filter.'
          : hasTasks
            ? 'No tasks match the current filter.'
            : 'Add your first task above to get started.'}
      </p>
    </div>
  )
}
