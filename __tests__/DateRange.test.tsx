import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateRange from "@/components/DateRange";
import { create } from "zustand";

// Mock Zustand store with a mock implementation
jest.mock("../store/useDatePickerStore", () => {
  const actualCreate = jest.requireActual("zustand").create;
  const setState = jest.fn();

  return {
    __esModule: true,
    default: actualCreate(() => ({
      setStartDate: setState,
      setEndDate: setState,
    })),
  };
});

describe("DateRange", () => {
  it("calls setStartDate and setEndDate when inputs change", () => {
    const useDatePickerStore = require("../store/useDatePickerStore").default;
    const setStartDate = useDatePickerStore.getState().setStartDate;
    const setEndDate = useDatePickerStore.getState().setEndDate;

    render(<DateRange />);

    // Simulate user input for start date using label text
    fireEvent.change(screen.getByLabelText(/Start Date/i), {
      target: { value: "2024-01-01" },
    });
    expect(setStartDate).toHaveBeenCalledWith("2024-01-01");

    // Simulate user input for end date using label text
    fireEvent.change(screen.getByLabelText(/End Date/i), {
      target: { value: "2024-01-02" },
    });
    expect(setEndDate).toHaveBeenCalledWith("2024-01-02");
  });
});
