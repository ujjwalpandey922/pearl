import DateRange from "./DateRange";
import MiniCalendar from "./MiniCalendar";
import RecurrenceCustomization from "./RecurrenceCustomization";
import RecurrenceOptions from "./RecurrenceOptions";

const DatePicker: React.FC = () => {
  return (
    <div className="p-4 rounded-lg border border-yellow-500 text-white  overflow-auto bg-black bg-opacity-70 backdrop-blur-lg shadow-lg w-full max-w-[80rem] mx-auto h-[calc(100vh-8rem)]">
      <header className="w-full">
        <h1 className="text-4xl mb-4 text-center font-bold">
          Date Picker App...!!!
        </h1>
      </header>
      <section>
        <RecurrenceOptions />
        <RecurrenceCustomization />
        <DateRange />
      </section>
      <div className="my-4">
        <MiniCalendar />
      </div>
    </div>
  );
};

export default DatePicker;
