import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MiniCalendar from "@/components/MiniCalendar";
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
      startDate: "2024-01-01",
      endDate: "2024-01-03",
      selectedDates: [
        new Date("2024-01-01"),
        new Date("2024-01-02"),
        new Date("2024-01-03"),
      ],
      setSelectedDates: setState,
    })),
  };
});

describe("MiniCalendar", () => {
  it("displays the correct dates for daily recurrence", () => {
    render(<MiniCalendar />);

    // Debug the output to see how dates are rendered
    screen.debug();

    // Use regex or a function to match the dates flexibly
    expect(screen.getByText(/Jan 01 2024/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 02 2024/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 03 2024/)).toBeInTheDocument();
  });
});
