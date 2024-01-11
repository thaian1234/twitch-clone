"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSiderbar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export function Toggle() {
	const { collapsed, onExpand, onCollapse } = useSiderbar((state) => state);

	const label = collapsed ? "Expand" : "Collapse";

	return (
		<>
			{collapsed && (
				<div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
					<Hint label={label} side="right" asChild>
						<Button
							onClick={onExpand}
							variant="ghost"
							className="h-auto p-2"
						>
							<ArrowRightFromLine
								aria-label="expand"
								className="size-4"
							/>
						</Button>
					</Hint>
				</div>
			)}
			{!collapsed && (
				<div className="p-3 pl-6 mb-2 items-center flex w-full">
					<p className="font-semibold text-primary">For you</p>
					<Hint label={label} side="right" asChild>
						<Button
							onClick={onCollapse}
							className="h-auto ml-auto p-2"
							variant="ghost"
						>
							<ArrowLeftFromLine
								aria-label="collapse"
								className="size-4"
							/>
						</Button>
					</Hint>
				</div>
			)}
		</>
	);
}

export function ToggleSkeleton() {
	return (
		<div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
			<Skeleton className="h-6 w-[100px]" />
			<Skeleton className="size-6" />
		</div>
	);
}
