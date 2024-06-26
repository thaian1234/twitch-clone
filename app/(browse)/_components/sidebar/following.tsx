"use client";

import { useSiderbar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface FollowingProps {
	data: (Follow & {
		following: User & {
			stream: { isLive: boolean } | null;
		};
	})[];
}

export function Following({ data }: FollowingProps) {
	const { collapsed } = useSiderbar((state) => state);

	if (!data.length) {
		return null;
	}

	return (
		<div>
			{!collapsed && (
				<div className="pl-6 mb-4">
					<p className="text-sm text-muted-foreground">Follwing</p>
				</div>
			)}
			<ul className="space-y-2 px-2">
				{data.map((follow) => (
					<li key={follow.following.id}>
						<UserItem
							username={follow.following.username}
							imageUrl={follow.following.imageUrl}
							isLive={follow.following.stream?.isLive}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

export function FollowingSkeleton() {
	return (
		<ul className="px-2 pt-2 lg:pt-0">
			{[...Array(3)].map((_, i) => (
				<UserItemSkeleton key={i} />
			))}
		</ul>
	);
}
