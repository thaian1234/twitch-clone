import Link from "next/link";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { User } from "@prisma/client";
import { UserAvartarSkeleton, UserAvatar } from "@/components/ui/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsSliderItemProps {
	data: {
		user: User;
		isLive: boolean;
		name: string;
		thumbnailUrl: string | null;
	};
}

export function ResultsSliderItem({ data }: ResultsSliderItemProps) {
	return (
		<Link href={`/${data.user.username}`}>
			<div className="p-2 gap-x-3 border-2 border-white/20 transform-cpu hover:border-white/50 rounded-md grid grid-cols-12 transition-all">
				<div className="w-full col-span-8">
					<Thumbnail
						src={data.thumbnailUrl}
						fallback={data.user.imageUrl}
						isLive={data.isLive}
						username={data.user.username}
					/>
				</div>

				<div className="flex flex-col items-start text-sm overflow-hidden col-span-4">
					<p className="font-semibold hover:text-blue-500">
						{data.name}
					</p>
					<p className="text-muted-foreground">
						{data.user.username}
					</p>
				</div>
			</div>
		</Link>
	);
}

export function ResultsSliderItemSkeleton() {
	return (
		<div className="size-full space-y-4">
			<ThumbnailSkeleton />
			<div className="flex gap-x-3">
				<UserAvartarSkeleton />
				<div className="flex flex-col gap-y-1">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-3 w-24" />
				</div>
			</div>
		</div>
	);
}
