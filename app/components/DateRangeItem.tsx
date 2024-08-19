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
      <div>{label}</div>
      <div>{details}</div>
      <div>
        {startDate} - {endDate}
      </div>
    </div>
  );
};

export default DateRangeItem;
