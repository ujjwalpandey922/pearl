import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DatePicker from "@/components/DatePicker";
import { create } from "zustand";

// Mock Zustand store with a mock implementation
jest.mock("../store/useDatePickerStore", () => {
  const actualCreate = jest.requireActual("zustand").create;
  return {
    __esModule: true,
    default: actualCreate(() => ({
      recurrenceType: "daily",
      customizationOptions: { days: 1 },
      startDate: "2024-01-01",
      endDate: "2024-01-03",
      selectedDates: [
        new Date("2024-01-01"),
        new Date("2024-01-02"),
        new Date("2024-01-03"),
      ],
      setRecurrenceType: jest.fn(),
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
      setCustomizationOptions: jest.fn(),
      setSelectedDates: jest.fn(),
    })),
  };
});

describe("DatePicker Integration", () => {
  it("allows a user to select a recurrence and see the dates reflected in the mini calendar", () => {
    const useDatePickerStore = require("../store/useDatePickerStore").default;

    render(<DatePicker />);

    // Change the recurrence type to 'Weekly'
    fireEvent.click(screen.getByText(/Weekly/i));
    expect(
      useDatePickerStore.getState().setRecurrenceType
    ).toHaveBeenCalledWith("weekly");

    // Set start date using label text instead of placeholder
    fireEvent.change(screen.getByLabelText(/Start Date/i), {
      target: { value: "2024-01-01" },
    });
    expect(useDatePickerStore.getState().setStartDate).toHaveBeenCalledWith(
      "2024-01-01"
    );

    // Set end date using label text instead of placeholder
    fireEvent.change(screen.getByLabelText(/End Date/i), {
      target: { value: "2024-01-03" },
    });
    expect(useDatePickerStore.getState().setEndDate).toHaveBeenCalledWith(
      "2024-01-03"
    );

    // Check if dates are reflected in the mini calendar
    expect(screen.getByText("Mon Jan 01 2024")).toBeInTheDocument();
    expect(screen.getByText("Tue Jan 02 2024")).toBeInTheDocument();
    expect(screen.getByText("Wed Jan 03 2024")).toBeInTheDocument();
  });
});
