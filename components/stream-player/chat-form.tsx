"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
	onSubmit: () => void;
	value?: string;
	onChange: (value: string) => void;
	isHidden: boolean;
	isFollowersOnly: boolean;
	isFollowing: boolean;
	isDelayed: boolean;
}

export function ChatForm({
	onSubmit,
	onChange,
	value,
	isHidden,
	isFollowersOnly,
	isFollowing,
	isDelayed,
}: ChatFormProps) {
	const [isDelayBlock, setIsDelayBlock] = useState(false);
	const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
	const isDisabled =
		isHidden || isDelayBlock || isFollowersOnlyAndNotFollowing;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (!value || isDisabled) return;

		if (isDelayed && !isDelayBlock) {
			setIsDelayBlock(true);
			setTimeout(() => {
				setIsDelayBlock(false);
				onSubmit();
			}, 3000);
		} else {
			onSubmit();
		}
	};

	if (isHidden) return null;

	return (
		<form
			className="flex flex-col items-center gap-y-4 p-3"
			onSubmit={handleSubmit}
		>
			<div className="w-full rounded-md">
				<ChatInfo
					isDelayed={isDelayed}
					isFollowersOnly={isFollowersOnly}
				/>
				<Input
					onChange={(e) => onChange(e.target.value)}
					disabled={isDisabled}
					placeholder="Send a message"
					className={cn(
						"border-white/10",
						(isFollowersOnly || isDelayed) &&
							"rounded-t-none border-t-0 "
					)}
					value={value}
				/>
			</div>
			<div className="ml-auto">
				<Button
					type="submit"
					variant="primary"
					size="sm"
					disabled={isDisabled}
				>
					Chat
				</Button>
			</div>
		</form>
	);
}

export function ChatFormSkeleton() {
	return (
		<div className="flex flex-col items-center gap-y-4 p-3">
			<Skeleton className="w-full h-10" />
			<div className="flex items-center gap-x-2 ml-auto">
				<Skeleton className="size-7" />
				<Skeleton className="h-7 w-12" />
			</div>
		</div>
	);
}
