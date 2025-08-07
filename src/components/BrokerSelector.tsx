interface BrokerSelectorProps {
  brokers: { title: string; logo?: string }[];
  onSelect: (broker: string) => void;
}

interface BrokerSelectorProps {
  brokers: { title: string; logo?: string }[];
  onSelect: (broker: string) => void;
}

const BrokerSelector: React.FC<BrokerSelectorProps> = ({
  brokers,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400 mb-2 italic">
        Choose your preferred trading platform to proceed
      </p>
      <div className="grid grid-cols-2 gap-4">
        {brokers.map(broker => (
          <button
            key={broker.title}
            onClick={() => onSelect(broker.title)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-blue-100 hover:text-white transition duration-200 ease-in-out"
          >
            {broker.logo ? (
              <img
                src={broker.logo}
                alt={`${broker.title} logo`}
                className="h-5 w-full"
              />
            ) : (
              <span className="text-gray-700 font-bold text-sm">
                {broker.title}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrokerSelector;
