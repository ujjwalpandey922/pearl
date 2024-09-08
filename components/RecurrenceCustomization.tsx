"use client";
import { daysOfWeek, monthsOfYear } from "@/const";
import useDatePickerStore from "../store/useDatePickerStore";

const RecurrenceCustomization: React.FC = () => {
  const { recurrenceType, setCustomizationOptions } = useDatePickerStore(
    (state) => ({
      recurrenceType: state.recurrenceType,
      setCustomizationOptions: state.setCustomizationOptions,
    })
  );
  const handleCustomizationChange = (
    option: Partial<{
      days: number;
      weeks: number;
      months: number;
      years: number;
      specificDays: string[];
      nthDay?: number;
      specificWeekday?: string;
      specificMonth?: string;
      specificYearDay?: number;
    }>
  ) => {
    setCustomizationOptions(option);
  };

  if (recurrenceType === "daily") {
    return (
      <div>
        <label>
          <span className="text-2xl font-semibold">Every X days:</span>

          <input
            type="number"
            onChange={(e) =>
              handleCustomizationChange({ days: Number(e.target.value) })
            }
            className="ml-2 border rounded p-1 bg-transparent"
            min="1"
            placeholder="1"
          />
        </label>
      </div>
    );
  }

  if (recurrenceType === "weekly") {
    return (
      <div>
        <label className="text-2xl font-semibold">Repeat on:</label>
        <div className="flex flex-wrap gap-2 mt-2 text-2xl font-semibold">
          {daysOfWeek.map((day) => (
            <div key={day}>
              <input
                type="checkbox"
                id={day}
                onChange={(e) => {
                  const selectedDays =
                    useDatePickerStore.getState().customizationOptions
                      .specificDays || [];
                  if (e.target.checked) {
                    handleCustomizationChange({
                      specificDays: [...selectedDays, day],
                    });
                  } else {
                    handleCustomizationChange({
                      specificDays: selectedDays.filter((d) => d !== day),
                    });
                  }
                }}
                className="mr-2 hidden peer"
              />
              <label
                htmlFor={day}
                className="flex items-center cursor-pointer hover:bg-amber-50 hover:text-black rounded border border-yellow-500 px-4 py-2 peer-checked:bg-amber-400 peer-checked:text-black"
              >
                {day}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recurrenceType === "monthly") {
    return (
      <div>
        <label>
          <span className="text-2xl font-semibold"> Every X months:</span>
          <input
            type="number"
            onChange={(e) =>
              handleCustomizationChange({ months: Number(e.target.value) })
            }
            className="ml-2 border rounded p-1 bg-transparent"
            min="1"
            placeholder="1"
          />
        </label>
        <div className="mt-4">
          <label>
            <span className="text-2xl font-semibold">
              {" "}
              On the nth day of the month:
            </span>

            <input
              type="number"
              onChange={(e) =>
                handleCustomizationChange({ nthDay: Number(e.target.value) })
              }
              className="ml-2 border rounded p-1 bg-transparent"
              min="1"
              max="31"
              placeholder="1"
            />
          </label>
        </div>
      </div>
    );
  }

  if (recurrenceType === "yearly") {
    return (
      <div>
        <label>
          <span className="text-2xl font-semibold">Every X years:</span>
          <input
            type="number"
            onChange={(e) =>
              handleCustomizationChange({ years: Number(e.target.value) })
            }
            className="ml-2 border rounded p-1 bg-transparent"
            min="1"
            placeholder="1"
          />
        </label>
        <div className="mt-4">
          <label>
            <span className="text-2xl font-semibold"> On the:</span>
            <input
              type="number"
              onChange={(e) =>
                handleCustomizationChange({
                  specificYearDay: Number(e.target.value),
                })
              }
              className="ml-2 border rounded p-1 bg-transparent"
              min="1"
              max="31"
              placeholder="1"
            />
            <span className="text-2xl font-semibold ml-2"> day of</span>
          </label>
          <select
            onChange={(e) =>
              handleCustomizationChange({ specificMonth: e.target.value })
            }
            className="ml-2 border rounded p-1 bg-transparent "
          >
            <option value="">Select month</option>
            {monthsOfYear.map((month) => (
              <option key={month} value={month} className="text-black">
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return null;
};

export default RecurrenceCustomization;
