"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
	hostIdentity: string;
	isFollowing: boolean;
	isHost: boolean;
}

export function Actions({ hostIdentity, isFollowing, isHost }: ActionsProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const { userId } = useAuth();

	const handleFollow = () => {
		startTransition(() => {
			onFollow(hostIdentity)
				.then((data) =>
					toast.success(
						`You are now following ${data.following.username}`
					)
				)
				.catch(() => toast.error("Something went wrong"));
		});
	};
	const handleUnollow = () => {
		startTransition(() => {
			onUnfollow(hostIdentity)
				.then((data) =>
					toast.success(
						`You are now unfollowing ${data.following.username}`
					)
				)
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const toggleFollow = () => {
		if (!userId) {
			return router.push("/sign-in");
		}

		if (isHost) {
			return toast.error("Cannot follow yourself");
		}

		if (isFollowing) {
			handleUnollow();
		} else {
			handleFollow();
		}
	};

	return (
		<Button
			disabled={isPending || isHost}
			onClick={toggleFollow}
			variant="primary"
			size="sm"
			className="w-full lg:w-auto"
		>
			<Heart
				className={cn(
					"size-4 mr-2",
					isFollowing ? "fill-white" : "fill-none"
				)}
			/>
			{isFollowing ? "Unfollow" : "Follow"}
		</Button>
	);
}

export function ActionsSkeleton() {
	return <Skeleton className="h-10 w-full lg:w-24" />;
}
