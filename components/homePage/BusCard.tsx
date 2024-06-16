type BusCardProps = {
    bus: {
      id: number;
      name: string;
      route: string;
      totalSeats: number;
      currentOccupancy: number;
    };
  };
  
  const BusCard: React.FC<BusCardProps> = ({ bus }) => {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{bus.name}</h2>
          <p className="text-gray-700">Route: {bus.route}</p>
          <p className="text-gray-700">Total Seats: {bus.totalSeats}</p>
          <p className="text-gray-700">Current Occupancy: {bus.currentOccupancy}</p>
        </div>
      </div>
    );
  };
  
  export default BusCard;
  