import { useState, ReactNode, ReactElement, Children, isValidElement } from "react";
import { twMerge } from "tailwind-merge";
import { wrap } from "~/util";

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

type TabBarProps = {
    tabs: TabProps[];
    activeIndex: number;
    border: "top" | "bottom";
    onClick: (index: number) => void;
    className?: string;
};

function TabBar({ tabs, activeIndex, border, onClick, className }: TabBarProps) {
    return (
        <div
            className={twMerge(
                "flex justify-center divide-x",
                border === "bottom" ? "row-start-1 border-b" : "row-start-2 border-t",
                className,
            )}
        >
            <span />
            {tabs.map((tab, index) => (
                <button
                    key={tab.label}
                    onClick={() => onClick(index)}
                    className={twMerge(
                        "flex items-center gap-2 px-4 py-1",
                        "cursor-pointer group",
                        activeIndex === index ? "text-white" : "text-gray-600 hover:text-gray-400",
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
                    {tab.label}
                </button>
            ))}
            <span />
        </div>
    );
}

function TabBarMinimal({ tabs, activeIndex, border, onClick, className }: TabBarProps) {
    return (
        <div
            className={twMerge(
                "flex place-content-center min-h-8",
                border === "bottom" ? "row-start-1 border-b" : "row-start-2 border-t",
                className,
            )}
        >
            <button
                className="flex flex-1 items-center justify-start px-2.5 py-1 text-xl leading-0"
                onClick={() => onClick(wrap(activeIndex - 1, tabs.length))}
            >
                {"<"}
            </button>
            {tabs.map((tab, index) => (
                <button
                    key={tab.label}
                    onClick={() => onClick(index)}
                    className={twMerge(
                        "flex items-center px-2 py-1",
                        "cursor-pointer group",
                        activeIndex === index ? "text-white" : "text-gray-600 hover:text-gray-400",
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
                </button>
            ))}
            <button
                className="flex flex-1 items-center justify-end px-2.5 py-1 text-xl leading-0"
                onClick={() => onClick(wrap(activeIndex + 1, tabs.length))}
            >
                {">"}
            </button>
        </div>
    );
}

export const Tabs = ({ tabBar = "top", children }: TabsProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = Children.toArray(children).filter((child): child is ReactElement<TabProps> => {
        return isValidElement(child) && child.type === Tab;
    });

    const tabBarVisible = tabBar !== "hide";
    const tabBarTop = tabBar === "top";

    return (
        <div
            className={twMerge("grid", tabBarTop ? "grid-rows-[auto_1fr]" : "grid-rows-[1fr_auto]")}
        >
            {tabBarVisible && (
                <>
                    <TabBar
                        tabs={tabs.map((t) => t.props)}
                        activeIndex={activeIndex}
                        onClick={setActiveIndex}
                        border={tabBarTop ? "bottom" : "top"}
                        className="not-md:hidden"
                    />
                    <TabBarMinimal
                        tabs={tabs.map((t) => t.props)}
                        activeIndex={activeIndex}
                        onClick={setActiveIndex}
                        border={tabBarTop ? "bottom" : "top"}
                        className="md:hidden"
                    />
                </>
            )}
            <div
                className={twMerge(
                    "w-full aspect-video",
                    tabBarTop ? "row-start-2" : "row-start-1",
                )}
            >
                {tabs[activeIndex]?.props?.children}
            </div>
        </div>
    );
};
