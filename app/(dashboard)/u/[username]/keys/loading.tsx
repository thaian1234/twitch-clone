import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingKeysPage() {
	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-2xl font-bold">Keys & URLs</h1>
				<Skeleton className="w-28 h-10" />
			</div>

			<div className="space-y-4">
				<Skeleton className="w-full h-24" />
				<Skeleton className="w-full h-36" />
			</div>
		</div>
	);
}
