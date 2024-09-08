import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RecurrenceOptions from "@/components/RecurrenceOptions";
import { create } from "zustand";

// Mock Zustand store with a mock implementation
jest.mock("../store/useDatePickerStore", () => {
  const actualCreate = jest.requireActual("zustand").create;
  const setState = jest.fn();

  return {
    __esModule: true,
    default: actualCreate(() => ({
      recurrenceType: "daily",
      setRecurrenceType: setState,
    })),
  };
});

describe("RecurrenceOptions", () => {
  it("renders all recurrence options", () => {
    render(<RecurrenceOptions />);
    const options = ["Daily", "Weekly", "Monthly", "Yearly"];
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("updates the recurrence type when a button is clicked", () => {
    const useDatePickerStore = require("../store/useDatePickerStore").default;
    const setRecurrenceType = useDatePickerStore.getState().setRecurrenceType;

    render(<RecurrenceOptions />);

    fireEvent.click(screen.getByText("Weekly"));
    expect(setRecurrenceType).toHaveBeenCalledWith("weekly");
  });
});
