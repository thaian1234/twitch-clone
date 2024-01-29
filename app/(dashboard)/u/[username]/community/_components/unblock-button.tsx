"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
	userId: string;
	children: React.ReactNode;
}

export function UnblockButton({ userId, children }: UnblockButtonProps) {
	const [isPending, startTransition] = useTransition();

	const onClick = () => {
		startTransition(() => {
			onUnblock(userId)
				.then((result) =>
					toast.success(`User ${result?.blocked.username} unblocked`)
				)
				.catch(() => toast.error("Cannot not unblock this user"));
		});
	};
	return (
		<Button
			disabled={isPending}
			onClick={onClick}
			variant="link"
			size="sm"
			className="text-blue-500 w-full"
		>
			{children}
		</Button>
	);
}
