import {
	useState,
	ReactNode,
	ReactElement,
	Children,
	isValidElement,
} from "react";
import { twMerge } from "tailwind-merge";

interface TabProps {
	label: string;
	children: ReactNode;
}

export const Tab = ({ children }: TabProps) => {
	return <>{children}</>;
};

interface TabsProps {
	tabBar?: "top" | "bottom" | "hide";
	children: ReactElement<TabProps> | ReactElement<TabProps>[];
}

export const Tabs = ({ tabBar = "top", children }: TabsProps) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const tabs = Children.toArray(children).filter(
		(child): child is ReactElement<TabProps> => {
			return isValidElement(child) && child.type === Tab;
		},
	);

	const tabBarVisible = tabBar !== "hide";
	const tabBarTop = tabBar === "top";

	return (
		<div
			className={twMerge(
				"grid",
				tabBarTop ? "grid-rows-[auto_1fr]" : "grid-rows-[1fr_auto]",
			)}
		>
			{tabBarVisible && (
				<div
					className={twMerge(
						"flex justify-center divide-x",
						tabBarTop
							? "row-start-1 border-b"
							: "row-start-2 border-t",
					)}
				>
					<span />
					{tabs.map((tab, index) => (
						<button
							key={tab.key}
							onClick={() => setActiveIndex(index)}
							className={twMerge(
								"flex items-center gap-2 px-4 py-1",
								"cursor-pointer group",
								activeIndex === index
									? "text-white"
									: "text-gray-600 hover:text-gray-400",
							)}
						>
							<div
								className={twMerge(
									"w-1.5 h-1.5",
									activeIndex === index
										? "bg-white"
										: "bg-gray-600 group-hover:bg-gray-400",
								)}
							/>
							{tab.props.label}
						</button>
					))}
					<span />
				</div>
			)}
			<div
				className={twMerge(
					"w-full overflow-auto",
					tabBarTop ? "row-start-2" : "row-start-1",
				)}
			>
				{tabs[activeIndex]}
			</div>
		</div>
	);
};
