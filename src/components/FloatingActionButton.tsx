import { useState, useRef } from "react";
import type { Holding } from "../data/holdings";

interface FABProps {
  stocks: Holding[];
  onAction: (type: "buy" | "sell", stock: Holding) => void;
}

const FloatingActionButton: React.FC<FABProps> = ({ stocks, onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 80 }); // Initial position
  const fabRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    const rect = fabRef.current!.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const getTopStock = (): Holding | undefined => {
    if (stocks.length > 0) return stocks[0];
    return [...stocks].sort((a, b) => a.symbol.localeCompare(b.symbol))[0];
  };

  const handleClick = (type: "buy" | "sell") => {
    const selected = getTopStock();
    if (selected) {
      onAction(type, selected);
      setIsExpanded(false);
    }
  };

  return (
    <div
      ref={fabRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 9999,
      }}
      className="cursor-grab rounded-full text-white shadow-md transition-shadow shadow-blue-400 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400"
    >
      <div className="relative">
        {/* Expanded Buttons (positioned absolutely above the FAB) */}
        {isExpanded && (
          <div className="absolute -top-28 right-0 flex flex-col items-end space-y-2">
            <button
              onClick={() => handleClick("buy")}
              className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded shadow"
            >
              Buy
            </button>
            <button
              onClick={() => handleClick("sell")}
              className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded shadow"
            >
              Sell
            </button>
          </div>
        )}

        {/* FAB Toggle Button */}
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="bg-blue-600 w-14 h-14 rounded-full shadow-xl text-white text-2xl flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default FloatingActionButton;
