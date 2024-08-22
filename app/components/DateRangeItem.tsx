import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

interface DateRangeItem {
  label: string;
  details: string;
  startDate: string;
  endDate: string;
}
const DateRangeItem: React.FC<DateRangeItem> = ({
  label,
  details,
  startDate,
  endDate,
}) => {
  return (
    <div>
      <div>{capitalizeFirstLetter(label)}</div>
      <div>{capitalizeFirstLetter(details)}</div>
      <div>
        from {startDate} to {endDate}
      </div>
    </div>
  );
};

export default DateRangeItem;
