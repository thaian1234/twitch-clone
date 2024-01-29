import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
	CarouselItem,
} from "@/components/ui/carousel";
import { User } from "@prisma/client";
import { ResultsCard } from "./results-card";
import { ResultsSliderItem } from "./results-slider-item";

type UserData = {
	user: User;
	isLive: boolean;
	name: string;
	thumbnailUrl: string | null;
};

interface ResultsSliderProps {
	data: UserData[];
}

export function ResultsSlider({ data }: ResultsSliderProps) {
	return (
		<Carousel
			opts={{
				align: "center",
				loop: true,
			}}
			className="w-full md:max-w-[85%] lg:max-w-[95%] mb-10"
		>
			<CarouselContent className="-ml-5">
				{data.map((user) => (
					<CarouselItem
						key={user.user.id}
						className="pl-5 lg:basis-1/2"
					>
						<ResultsSliderItem data={user} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
