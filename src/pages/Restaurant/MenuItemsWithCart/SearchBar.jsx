export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search by Menu item name or Restaurant name"
      className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-96"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
