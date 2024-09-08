"use client";
import useDatePickerStore from "@/store/useDatePickerStore";
const RecurrenceOptions: React.FC = () => {
  // Extracting the setRecurrenceType function from the store to update the recurrence type.
  const setRecurrenceType = useDatePickerStore(
    (state) => state.setRecurrenceType
  );

  // Extracting the current recurrence type from the store to determine the active option.
  const recurrenceType = useDatePickerStore((state) => state.recurrenceType);

  // Defining the possible recurrence options.
  const options: Array<"Daily" | "Weekly" | "Monthly" | "Yearly"> = [
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
  ];

  return (
    <div className="mb-4 space-y-4">
      {/* Title for the recurrence section */}
      <h1 className="text-2xl font-semibold">Recurrence:</h1>

      {/* Buttons for each recurrence option */}
      <div className="mb-4 w-full items-center flex gap-4 justify-start">
        {options.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 m-2 text-white bg-amber-500 rounded hover:bg-amber-700 ${
              recurrenceType === option.toLowerCase() ? "bg-yellow-900" : ""
            }`}
            onClick={() =>
              // Update the recurrence type in the global store based on the selected option
              setRecurrenceType(
                option.toLowerCase() as
                  | "daily"
                  | "weekly"
                  | "monthly"
                  | "yearly"
              )
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecurrenceOptions;
