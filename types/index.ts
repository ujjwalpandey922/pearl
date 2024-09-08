// Extend the interface to include the necessary properties
interface CustomizationOptions {
  days?: number;
  weeks?: number;
  months?: number;
  years?: number;
  specificDays?: string[]; // e.g., ['Monday', 'Wednesday']
  nthDay?: number; // e.g., the 5th day of the month
  specificMonth?: string; // e.g., 'January', 'February'
  specificYearDay?: number; // e.g., the 10th day of a specific month in yearly recurrence
}

interface DatePickerState {
  recurrenceType: "daily" | "weekly" | "monthly" | "yearly";
  customizationOptions: CustomizationOptions;
  startDate: string | null;
  endDate: string | null;
  selectedDates: Date[];
  setRecurrenceType: (type: "daily" | "weekly" | "monthly" | "yearly") => void;
  setCustomizationOptions: (options: CustomizationOptions) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setSelectedDates: (dates: Date[]) => void;
}
