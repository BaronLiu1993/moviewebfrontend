import { Badge } from "@/components/ui/badge";

interface PlaylistItem {
  id: number;
  name: string;
  description: string;
}

interface WatchCardProps {
  playlist: PlaylistItem;
}

const WatchCard = ({ playlist }: WatchCardProps) => {
  return (
    <div className="flex flex-shrink-0 w-56 gap-2 rounded-xl items-center bg-neutral-100">
      <div className="h-16 w-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-sm">{playlist.name}</h3>
      </div>
    </div>
  );
};

export default WatchCard;
