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
  } = useDatePickerStore();

  useEffect(() => {
    const calculateDates = () => {
      let dates: Date[] = [];
      if (!startDate) return;

      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : new Date(start);

      if (recurrenceType === "daily") {
        const daysInterval = customizationOptions.days || 1;

        for (
          let date = new Date(start);
          date <= end;
          date.setDate(date.getDate() + daysInterval)
        ) {
          dates.push(new Date(date));
        }
      }

      if (recurrenceType === "weekly" && customizationOptions.specificDays) {
        const daysOfWeek = customizationOptions.specificDays;
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
            dates.push(new Date(date));
          }
        }
      }

      if (recurrenceType === "monthly" && customizationOptions.nthDay) {
        const nthDay = customizationOptions.nthDay;

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
            dates.push(tempDate);
          }
        }
      }

      if (
        recurrenceType === "yearly" &&
        customizationOptions.specificMonth &&
        customizationOptions.specificYearDay
      ) {
        const specificMonth = customizationOptions.specificMonth;
        const specificYearDay = customizationOptions.specificYearDay;

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
            dates.push(tempDate);
          }
        }
      }

      setSelectedDates(dates);
    };

    calculateDates();
  }, [
    recurrenceType,
    customizationOptions,
    startDate,
    endDate,
    setSelectedDates,
  ]);

  return (
    <div className="space-y-4 my-4 w-full ">
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
            {date.toDateString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
