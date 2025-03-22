export default function MenuItemCard({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-300">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-sm text-gray-500 mt-2">🍴 {item.restaurant}</p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 mt-2">💵 ${item.price}</p>
          <p className="text-sm text-gray-500 mt-2">
            <small>Status:</small>{" "}
            {item.available ? "Available" : "Unavailable"}
          </p>
        </div>
      </div>
    </div>
  );
}
