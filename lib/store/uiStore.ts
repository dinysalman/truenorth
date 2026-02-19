import { create } from 'zustand';

/**
 * Kanban filter options for filtering steps by tag
 */
export type KanbanFilter = 'all' | 'work' | 'family' | 'health' | 'learning' | 'youtube';

/**
 * Modal identifiers for different modal types in the app
 */
export type ModalType = 'createStep' | 'editStep' | 'deleteStep' | 'weeklyReview' | null;

/**
 * UI state shape
 */
interface UIState {
  /** Current filter applied to Kanban board */
  kanbanFilter: KanbanFilter;
  /** Selected date for viewing tasks (defaults to today) */
  selectedDate: Date;
  /** Currently active modal (null if no modal is open) */
  activeModal: ModalType;
  /** Whether focus mode is currently active */
  isFocusModeActive: boolean;
}

/**
 * UI store actions
 */
interface UIActions {
  /** Update the Kanban board filter */
  setKanbanFilter: (filter: KanbanFilter) => void;
  /** Update the selected date for viewing tasks */
  setSelectedDate: (date: Date) => void;
  /** Open a specific modal */
  openModal: (modalType: Exclude<ModalType, null>) => void;
  /** Close the currently active modal */
  closeModal: () => void;
  /** Activate focus mode */
  startFocusMode: () => void;
  /** Deactivate focus mode */
  endFocusMode: () => void;
  /** Reset all UI state to default values */
  resetUIState: () => void;
}

/**
 * Combined UI store type
 */
export type UIStore = UIState & UIActions;

/**
 * Default initial state
 */
const initialState: UIState = {
  kanbanFilter: 'all',
  selectedDate: new Date(),
  activeModal: null,
  isFocusModeActive: false,
};

/**
 * Zustand store for managing local UI state.
 * 
 * This store handles ephemeral UI state that doesn't need to be persisted
 * to the server, including:
 * - Kanban board filters
 * - Selected date for viewing tasks
 * - Modal open/close states
 * - Focus mode activation
 * 
 * @example
 * ```tsx
 * const { kanbanFilter, setKanbanFilter } = useUIStore();
 * 
 * // Update filter
 * setKanbanFilter('work');
 * 
 * // Open modal
 * openModal('createStep');
 * ```
 */
export const useUIStore = create<UIStore>((set) => ({
  ...initialState,
  
  setKanbanFilter: (filter) => set({ kanbanFilter: filter }),
  
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  openModal: (modalType) => set({ activeModal: modalType }),
  
  closeModal: () => set({ activeModal: null }),
  
  startFocusMode: () => set({ isFocusModeActive: true }),
  
  endFocusMode: () => set({ isFocusModeActive: false }),
  
  resetUIState: () => set(initialState),
}));
