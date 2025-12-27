export default function OrderStatusBadge({ status }) {
  const styles = {
    ordered: "bg-blue-100 text-blue-600",
    accepted: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
