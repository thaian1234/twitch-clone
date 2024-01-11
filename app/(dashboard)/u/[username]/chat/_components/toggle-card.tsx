"use client";

import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
	label: string;
	value: boolean;
	field: FieldTypes;
}

export function ToggleCard({ label, value = false, field }: ToggleCardProps) {
	const [isPending, startTrasition] = useTransition();

	const onchange = () => {
		startTrasition(() => {
			updateStream({ [field]: !value })
				.then(() => toast.success(`${label} settings updated`))
				.catch(() => toast.error("Something went wrong"));
		});
	};

	return (
		<div className="rounded-xl bg-muted p-6">
			<div className="flex items-center justify-between">
				<p className="font-semibold shrink-0">{label}</p>
				<div className="space-y-2">
					<Switch
						onCheckedChange={onchange}
						disabled={isPending}
						checked={value}
					>
						{value ? "On" : "Off"}
					</Switch>
				</div>
			</div>
		</div>
	);
}

export function ToggleCardSkeleton() {
	return (
		<div>
			<Skeleton className="rounded-xl p-10 w-full" />
		</div>
	);
}
