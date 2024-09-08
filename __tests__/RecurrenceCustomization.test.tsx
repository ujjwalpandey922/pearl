import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RecurrenceCustomization from "@/components/RecurrenceCustomization";
import { create } from "zustand";

// Mock Zustand store with a mock implementation
jest.mock("../store/useDatePickerStore", () => {
  const actualCreate = jest.requireActual("zustand").create;
  const setState = jest.fn();

  return {
    __esModule: true,
    default: actualCreate(() => ({
      recurrenceType: "daily",
      customizationOptions: { days: 1 },
      setRecurrenceType: setState,
      setCustomizationOptions: setState,
      setSelectedDates: setState,
      setStartDate: setState,
      setEndDate: setState,
    })),
  };
});

describe("RecurrenceCustomization", () => {
  it("renders daily customization when recurrence type is daily", () => {
    render(<RecurrenceCustomization />);
    expect(screen.getByText("Every X days:")).toBeInTheDocument();
  });

  it("updates the customization options when the input changes", () => {
    render(<RecurrenceCustomization />);
    fireEvent.change(screen.getByPlaceholderText("1"), {
      target: { value: "3" },
    });

    const useDatePickerStore = require("../store/useDatePickerStore").default;
    const setCustomizationOptions =
      useDatePickerStore.getState().setCustomizationOptions;

    expect(setCustomizationOptions).toHaveBeenCalledWith({ days: 3 });
  });
});
