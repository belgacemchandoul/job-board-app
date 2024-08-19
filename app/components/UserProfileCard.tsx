import Link from "next/link";

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
    <div>
      {title && <p>{title}</p>}
      <Link href={link} className="border rounded-md p-4">
        {data.map((item, index) => (
          <div key={index}>
            {item.label ? (
              <p>
                {item.label} : {item.value}{" "}
              </p>
            ) : (
              <p>{item.value}</p>
            )}
          </div>
        ))}
      </Link>
    </div>
  );
};

export default UserProfileCard;
