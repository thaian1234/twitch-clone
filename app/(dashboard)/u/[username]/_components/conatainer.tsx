"use client";

import { cn } from "@/lib/utils";
import { useCreatorSiderbar } from "@/store/use-creator-sidebar";
import { ReactNode, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
	children: ReactNode;
}

export function Container({ children }: ContainerProps) {
	const { collapsed, onCollapse, onExpand } = useCreatorSiderbar();

	const matches = useMediaQuery(`(max-width: 1024px)`);
	useEffect(() => {
		if (matches) {
			onCollapse();
		} else {
			onExpand();
		}
	}, [onCollapse, onExpand, matches]);

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
