import { create } from "zustand";

// Zustand store with extended customization options
const useDatePickerStore = create<DatePickerState>((set) => ({
  recurrenceType: "daily",
  customizationOptions: {},
  startDate: null,
  endDate: null,
  selectedDates: [],
  setRecurrenceType: (type) => set({ recurrenceType: type }),
  setCustomizationOptions: (options) =>
    set((state) => ({
      customizationOptions: { ...state.customizationOptions, ...options },
    })),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setSelectedDates: (dates) => set({ selectedDates: dates }),
}));

export default useDatePickerStore;
