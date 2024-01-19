"use client";

import { UserAvartarSkeleton, UserAvatar } from "@/components/ui/user-avatar";
import { VerifiedMark } from "@/components/verified-mark";
import {
	useParticipants,
	useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
	hostName: string;
	imageUrl: string;
	hostIdentity: string;
	viewerIdentity: string;
	name: string;
	isFollowing: boolean;
}

export function Header({
	hostIdentity,
	hostName,
	imageUrl,
	viewerIdentity,
	name,
	isFollowing,
}: HeaderProps) {
	const participants = useParticipants();
	const participant = useRemoteParticipant(hostIdentity);

	const isLive = !!participant;
	const participantCount = participants.length - 1;

	const hostAsViewer = `host-${hostIdentity}`;
	const isHost = viewerIdentity === hostAsViewer;

	return (
		<div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
			<div className="flex items-center gap-x-3">
				<UserAvatar
					imageUrl={imageUrl}
					username={hostName}
					size="lg"
					isLive={isLive}
					showBadge
				/>
				<div className="space-y-1">
					<div className="flex items-center gap-x-2">
						<h2 className="text-lg font-semibold">{hostName}</h2>
						<VerifiedMark />
					</div>
					<p className="text-sm font-semibold">{name}</p>
					{isLive ? (
						<div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
							<UserIcon className="size-4" />
							<p>
								{participantCount}{" "}
								{participantCount === 1 ? "viewer" : "viewers"}
							</p>
						</div>
					) : (
						<p className="font-semibold text-xs text-muted-foreground">
							Offline
						</p>
					)}
				</div>
			</div>
			<Actions
				isFollowing={isFollowing}
				hostIdentity={hostIdentity}
				isHost={isHost}
			/>
		</div>
	);
}

export function HeaderSkeleton() {
	return (
		<div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4 mt-4">
			<div className="flex items-center gap-x-2">
				<UserAvartarSkeleton size="lg" />
				<div className="space-y-4">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-4 w-24" />
				</div>
			</div>
			<ActionsSkeleton />
		</div>
	);
}
