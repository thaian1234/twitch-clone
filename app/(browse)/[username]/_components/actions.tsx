"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { startTransition, useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
	isFollowing: boolean;
	userId: string;
}

export function Actions({ isFollowing, userId }: ActionsProps) {
	const [isPending, startTransistion] = useTransition();

	const handleFollow = function () {
		startTransistion(() => {
			onFollow(userId)
				.then((data) =>
					toast.success(
						`You are now following ${data?.following?.username}`
					)
				)
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const handleUnfollow = function () {
		startTransistion(() => {
			onUnfollow(userId)
				.then((data) =>
					toast.success(
						`You have unfollowed user: ${data?.following?.username}`
					)
				)
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const onClick = () => {
		if (isFollowing) {
			handleUnfollow();
		} else {
			handleFollow();
		}
	};

	const handleBlock = () => {
		startTransition(() => {
			onUnblock(userId)
				.then((data) =>
					toast.success(`Blocked the user ${data.blocked.username}`)
				)
				.catch(() => toast.error("Something went wrong"));
		});
	};

	return (
		<>
			<Button disabled={isPending} onClick={onClick} variant="primary">
				{isFollowing ? "Unfollow" : "Follow"}
			</Button>

			<Button onClick={handleBlock} disabled={isPending}>
				Unblock
			</Button>
		</>
	);
}
