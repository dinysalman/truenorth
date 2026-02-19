import { act } from '@testing-library/react-native';
import { useUIStore } from '@/lib/store/uiStore';

describe('uiStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    act(() => {
      useUIStore.getState().resetUIState();
    });
  });

  describe('initial state', () => {
    it('should initialize with default values', () => {
      const state = useUIStore.getState();

      expect(state.kanbanFilter).toBe('all');
      expect(state.selectedDate).toBeInstanceOf(Date);
      expect(state.activeModal).toBeNull();
      expect(state.isFocusModeActive).toBe(false);
    });
  });

  describe('setKanbanFilter', () => {
    it('should update kanban filter to work', () => {
      act(() => {
        useUIStore.getState().setKanbanFilter('work');
      });

      expect(useUIStore.getState().kanbanFilter).toBe('work');
    });

    it('should update kanban filter to family', () => {
      act(() => {
        useUIStore.getState().setKanbanFilter('family');
      });

      expect(useUIStore.getState().kanbanFilter).toBe('family');
    });

    it('should update kanban filter back to all', () => {
      act(() => {
        useUIStore.getState().setKanbanFilter('health');
        useUIStore.getState().setKanbanFilter('all');
      });

      expect(useUIStore.getState().kanbanFilter).toBe('all');
    });
  });

  describe('setSelectedDate', () => {
    it('should update selected date', () => {
      const testDate = new Date('2026-02-20');

      act(() => {
        useUIStore.getState().setSelectedDate(testDate);
      });

      expect(useUIStore.getState().selectedDate).toBe(testDate);
    });

    it('should handle different date instances', () => {
      const date1 = new Date('2026-01-01');
      const date2 = new Date('2026-12-31');

      act(() => {
        useUIStore.getState().setSelectedDate(date1);
      });
      expect(useUIStore.getState().selectedDate).toBe(date1);

      act(() => {
        useUIStore.getState().setSelectedDate(date2);
      });
      expect(useUIStore.getState().selectedDate).toBe(date2);
    });
  });

  describe('modal actions', () => {
    it('should open createStep modal', () => {
      act(() => {
        useUIStore.getState().openModal('createStep');
      });

      expect(useUIStore.getState().activeModal).toBe('createStep');
    });

    it('should open editStep modal', () => {
      act(() => {
        useUIStore.getState().openModal('editStep');
      });

      expect(useUIStore.getState().activeModal).toBe('editStep');
    });

    it('should open deleteStep modal', () => {
      act(() => {
        useUIStore.getState().openModal('deleteStep');
      });

      expect(useUIStore.getState().activeModal).toBe('deleteStep');
    });

    it('should open weeklyReview modal', () => {
      act(() => {
        useUIStore.getState().openModal('weeklyReview');
      });

      expect(useUIStore.getState().activeModal).toBe('weeklyReview');
    });

    it('should close modal', () => {
      act(() => {
        useUIStore.getState().openModal('createStep');
        useUIStore.getState().closeModal();
      });

      expect(useUIStore.getState().activeModal).toBeNull();
    });

    it('should handle opening different modals sequentially', () => {
      act(() => {
        useUIStore.getState().openModal('createStep');
      });
      expect(useUIStore.getState().activeModal).toBe('createStep');

      act(() => {
        useUIStore.getState().openModal('editStep');
      });
      expect(useUIStore.getState().activeModal).toBe('editStep');
    });
  });

  describe('focus mode actions', () => {
    it('should start focus mode', () => {
      act(() => {
        useUIStore.getState().startFocusMode();
      });

      expect(useUIStore.getState().isFocusModeActive).toBe(true);
    });

    it('should end focus mode', () => {
      act(() => {
        useUIStore.getState().startFocusMode();
        useUIStore.getState().endFocusMode();
      });

      expect(useUIStore.getState().isFocusModeActive).toBe(false);
    });

    it('should toggle focus mode multiple times', () => {
      const store = useUIStore.getState();

      act(() => {
        store.startFocusMode();
      });
      expect(useUIStore.getState().isFocusModeActive).toBe(true);

      act(() => {
        store.endFocusMode();
      });
      expect(useUIStore.getState().isFocusModeActive).toBe(false);

      act(() => {
        store.startFocusMode();
      });
      expect(useUIStore.getState().isFocusModeActive).toBe(true);
    });
  });

  describe('resetUIState', () => {
    it('should reset all state to defaults', () => {
      const testDate = new Date('2026-03-15');

      // Modify all state values
      act(() => {
        useUIStore.getState().setKanbanFilter('work');
        useUIStore.getState().setSelectedDate(testDate);
        useUIStore.getState().openModal('createStep');
        useUIStore.getState().startFocusMode();
      });

      // Verify state was modified
      expect(useUIStore.getState().kanbanFilter).toBe('work');
      expect(useUIStore.getState().selectedDate).toBe(testDate);
      expect(useUIStore.getState().activeModal).toBe('createStep');
      expect(useUIStore.getState().isFocusModeActive).toBe(true);

      // Reset state
      act(() => {
        useUIStore.getState().resetUIState();
      });

      // Verify all values are back to defaults
      const state = useUIStore.getState();
      expect(state.kanbanFilter).toBe('all');
      expect(state.selectedDate).toBeInstanceOf(Date);
      expect(state.activeModal).toBeNull();
      expect(state.isFocusModeActive).toBe(false);
    });
  });

  describe('multiple state updates', () => {
    it('should handle multiple state updates independently', () => {
      const testDate = new Date('2026-02-25');

      act(() => {
        useUIStore.getState().setKanbanFilter('learning');
        useUIStore.getState().setSelectedDate(testDate);
        useUIStore.getState().openModal('weeklyReview');
      });

      const state = useUIStore.getState();
      expect(state.kanbanFilter).toBe('learning');
      expect(state.selectedDate).toBe(testDate);
      expect(state.activeModal).toBe('weeklyReview');
      expect(state.isFocusModeActive).toBe(false); // Should remain unchanged
    });

    it('should not affect other state when updating one value', () => {
      const testDate = new Date('2026-02-20');

      // Set initial state
      act(() => {
        useUIStore.getState().setKanbanFilter('health');
        useUIStore.getState().setSelectedDate(testDate);
        useUIStore.getState().openModal('editStep');
      });

      // Update only filter
      act(() => {
        useUIStore.getState().setKanbanFilter('youtube');
      });

      // Verify only filter changed
      const state = useUIStore.getState();
      expect(state.kanbanFilter).toBe('youtube');
      expect(state.selectedDate).toBe(testDate); // Unchanged
      expect(state.activeModal).toBe('editStep'); // Unchanged
    });
  });
});
