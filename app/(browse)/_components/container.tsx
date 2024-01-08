"use client";

import { cn } from "@/lib/utils";
import { useSiderbar } from "@/store/use-side-bar";
import { ReactNode, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
	children: ReactNode;
}

export function Container({ children }: ContainerProps) {
	const matches = useMediaQuery("(max-width: 1024px");
	const { collapsed, onCollapse, onExpand } = useSiderbar((state) => state);

	useEffect(() => {
		if (matches) {
			onCollapse();
		} else {
			onExpand();
		}
	}, [matches, onCollapse, onExpand]);
	return (
		<div
			className={cn(
				"flex-1",
				collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
			)}
		>
			{children}
		</div>
	);
}
