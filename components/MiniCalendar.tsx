"use client";
import useDatePickerStore from "../store/useDatePickerStore";
import { useEffect } from "react";

const MiniCalendar: React.FC = () => {
  const {
    recurrenceType,
    customizationOptions,
    startDate,
    endDate,
    setSelectedDates,
    selectedDates,
  } = useDatePickerStore(); // Extracting required states and methods from the store.

  useEffect(() => {
    const calculateDates = () => {
      let dates: Date[] = [];
      if (!startDate) return; // No dates to calculate if startDate is not set.

      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : new Date(start); // Default endDate to startDate if not provided.

      // Handle daily recurrence
      if (recurrenceType === "daily") {
        const daysInterval = customizationOptions.days || 1; // Default to 1 if not set.

        for (
          let date = new Date(start);
          date <= end;
          date.setDate(date.getDate() + daysInterval)
        ) {
          dates.push(new Date(date)); // Add each date in the interval to the array.
        }
      }

      // Handle weekly recurrence
      if (recurrenceType === "weekly" && customizationOptions.specificDays) {
        const daysOfWeek = customizationOptions.specificDays; // Specific days of the week to include.
        const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds

        for (
          let date = new Date(start);
          date <= end;
          date.setDate(date.getDate() + 1)
        ) {
          if (
            daysOfWeek.includes(
              date.toLocaleDateString("en-US", { weekday: "long" })
            )
          ) {
            dates.push(new Date(date)); // Add dates that match the specific days.
          }
        }
      }

      // Handle monthly recurrence
      if (recurrenceType === "monthly" && customizationOptions.nthDay) {
        const nthDay = customizationOptions.nthDay; // Specific day of the month.

        for (
          let date = new Date(start);
          date <= end;
          date.setMonth(date.getMonth() + (customizationOptions.months || 1))
        ) {
          const tempDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            nthDay
          );
          if (tempDate >= start && tempDate <= end) {
            dates.push(tempDate); // Add dates that match the nth day of each month.
          }
        }
      }

      // Handle yearly recurrence
      if (
        recurrenceType === "yearly" &&
        customizationOptions.specificMonth &&
        customizationOptions.specificYearDay
      ) {
        const specificMonth = customizationOptions.specificMonth; // Specific month of the year.
        const specificYearDay = customizationOptions.specificYearDay; // Specific day of the month.

        for (
          let date = new Date(start);
          date <= end;
          date.setFullYear(
            date.getFullYear() + (customizationOptions.years || 1)
          )
        ) {
          const monthIndex = new Date(
            `${specificMonth} 1, ${date.getFullYear()}`
          ).getMonth();
          const tempDate = new Date(
            date.getFullYear(),
            monthIndex,
            specificYearDay
          );
          if (tempDate >= start && tempDate <= end) {
            dates.push(tempDate); // Add dates that match the specific month and day.
          }
        }
      }

      setSelectedDates(dates); // Update the selected dates in the store.
    };

    calculateDates(); // Calculate the dates when dependencies change.
  }, [
    recurrenceType,
    customizationOptions,
    startDate,
    endDate,
    setSelectedDates,
  ]);

  return (
    <div className="space-y-4 my-4 w-full">
      {selectedDates?.length > 0 && (
        <>
          <h1 className="text-2xl font-semibold text-center">
            MINI CALENDAR 📅{" "}
          </h1>
          <hr className="w-full h bg-slate-900" />
        </>
      )}
      <div className="grid grid-cols-7 gap-1">
        {selectedDates?.map((date, index) => (
          <div key={index} className="p-2 text-center border rounded">
            {date.toDateString()} {/* Display the formatted date string */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
