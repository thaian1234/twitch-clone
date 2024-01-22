import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "./_components/toggle-card";

export default function ChatLoading() {
	return (
		<div className="p-6 space-y-4">
			<h1 className="text-2xl font-bold">Chat settings</h1>

			<div className="space-y-4">
				{[...Array(3)].map((_, i) => (
					<ToggleCardSkeleton key={i} />
				))}
			</div>
		</div>
	);
}
