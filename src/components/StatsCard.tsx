type StatsCardProps = {
  title: string;
  value: string;
  borderColor: string;
  textColor: string;
  icon: React.ReactNode;
};

const StatsCard = ({
  title,
  value,
  icon,
  borderColor,
  textColor,
}: StatsCardProps) => {
  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 ${borderColor} transition-transform transform hover:shadow-xl`}
    >
      <div className={`flex items-center justify-between mb-4`}>
        <div className={`text-3xl ${textColor}`}>{icon}</div>
      </div>
      <h3
        className={`text-xl font-semibold text-gray-800 dark:text-gray-200 ${textColor}`}
      >
        {title}
      </h3>
      <p className={`text-4xl font-bold ${textColor} mt-2`}>{value}</p>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 opacity-20"></div>
    </div>
  );
};

export default StatsCard;
