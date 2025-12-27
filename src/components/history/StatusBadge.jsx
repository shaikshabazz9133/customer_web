export default function StatusBadge({ status }) {
  const styles = {
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-600",
    pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}
