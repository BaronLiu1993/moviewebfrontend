import { Input } from "@/components/ui/input";

const SearchBar: React.FC = () => {
  return (
    <div className="flex p-4 items-center max-w-md mx-auto">
      <Input placeholder="Search for movies or TV shows..." className="font-figtree font-semibold text-xl rounded-lg bg-gray-100 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );
};

export default SearchBar;
