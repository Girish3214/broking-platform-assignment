interface BrokerSelectorProps {
  brokers: string[];
  onSelect: (broker: string) => void;
}

const BrokerSelector: React.FC<BrokerSelectorProps> = ({
  brokers,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Select a Broker</h2>
      <div className="grid grid-cols-2 gap-4">
        {brokers.map(broker => (
          <button
            key={broker}
            onClick={() => onSelect(broker)}
            className="bg-gray-100 hover:bg-blue-100 border rounded px-4 py-2"
          >
            {broker}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrokerSelector;
