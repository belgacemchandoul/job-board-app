import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
interface UserProfileCardProps {
  title?: string;
  data: Array<{ label?: string; value: React.ReactNode }>;
  link: string;
}
const UserProfileCard: React.FC<UserProfileCardProps> = ({
  title,
  data,
  link,
}) => {
  return (
    <div className="flex flex-col gap-3 p-4 border rounded-md">
      {title && (
        <div className="flex justify-between items-center text-gray-600">
          <div className="text-lg md:text-xl font-medium">{title}</div>
          <Link href={link}>
            <EditIcon sx={{ fontSize: "16px", md: "19px" }} />
          </Link>
        </div>
      )}
      <section className="flex flex-col gap-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="border rounded-md p-2 md:p-4 text-sm md:text-base"
          >
            {item.label ? (
              <div>
                {item.label}: {item.value}{" "}
              </div>
            ) : (
              <div>{item.value}</div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default UserProfileCard;
