import type { ReactNode } from "react";

type PriceCardProps = {
  asset: "ETH" | "BTC" | "LINK";
  price: number | string;
  icon?: ReactNode;
};

const assetInfo = {
  ETH: {
    name: "Ethereum",
    color: "bg-cyan-100 text-cyan-700",
    emoji: "🦄", 
  },
  BTC: {
    name: "Bitcoin",
    color: "bg-orange-100 text-orange-700",
    emoji: "\u{1FA99}", 
  },
  LINK: {
    name: "Chainlink",
    color: "bg-blue-100 text-blue-700",
    emoji: "🔗",
  },
} as const;

const PriceCard = ({ asset, price, icon }: PriceCardProps) => {
  const info = assetInfo[asset];

  return (
    <div
      className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 shadow-md ${info.color} min-w-[120px]`}
    >
      <div className="text-3xl">{icon ?? info.emoji}</div>
      <div className="text-lg font-semibold">{info.name}</div>
      <div className="text-sm text-gray-500">{asset}</div>
      <div className="text-xl font-bold">
        {typeof price === "number" ? `$${price.toLocaleString()}` : price}
      </div>
    </div>
  );
}

export default PriceCard;