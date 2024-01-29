"use client";

import { useSiderbar } from "@/store/use-sidebar";
import { Stream, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface RecommendedProps {
	data: (User & {
		stream: { isLive: boolean } | null;
	})[];
}

export function Recommended({ data }: RecommendedProps) {
	const { collapsed } = useSiderbar((state) => state);

	const showLabel = !collapsed && data.length > 0;
	return (
		<div>
			{showLabel && (
				<div className="pl-6 mb-4">
					<p className="text-sm text-muted-foreground">Recommended</p>
				</div>
			)}

			<ul className="space-y-2 px-2">
				{data.map((user) => (
					<li key={user.id}>
						<UserItem
							username={user.username}
							imageUrl={user.imageUrl}
							isLive={user.stream?.isLive}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

export function RecommendedSkeleton() {
	return (
		<ul className="px-2">
			{[...Array(3)].map((_, i) => (
				<UserItemSkeleton key={i} />
			))}
		</ul>
	);
}
