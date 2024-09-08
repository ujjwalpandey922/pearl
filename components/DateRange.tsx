"use client";
import useDatePickerStore from "../store/useDatePickerStore";

const DateRange: React.FC = () => {
  const { setStartDate, setEndDate } = useDatePickerStore((state) => ({
    setStartDate: state.setStartDate,
    setEndDate: state.setEndDate,
  }));

  return (
    <div className="my-4">
      <label>
        <span className="text-2xl font-semibold"> Start Date:</span>
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          className="ml-2 border rounded p-1 bg-transparent"
          placeholder="2022-01-01"
        />
      </label>
      <label className="ml-4">
        <span className="text-2xl font-semibold"> End Date:</span>
        <input
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
          className="ml-2 border rounded p-1 bg-transparent"
          placeholder="2022-01-01"
        />
      </label>
    </div>
  );
};

export default DateRange;
