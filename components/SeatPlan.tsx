// components/SeatPlan.tsx
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';
import { firestore } from '@/lib/firebase/firebase';

interface SeatPlanProps {
  rows: number;
  cols: number;
  busId: string;
}

const SeatPlan = ({ rows, cols, busId }: SeatPlanProps) => {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  const toggleSeat = (row: number, col: number) => {
    const seatId = `${row}-${col}`;
    const newSelectedSeats = new Set(selectedSeats);
    if (newSelectedSeats.has(seatId)) {
      newSelectedSeats.delete(seatId);
    } else {
      newSelectedSeats.add(seatId);
    }
    setSelectedSeats(newSelectedSeats);
  };

  const handleSaveSeatPlan = async () => {
    try {
      const seatPlan = Array.from(selectedSeats);
      await firestore.collection('seatPlans').doc(busId).set({ busId, seatPlan });
      alert('Seat plan saved successfully');
    } catch (error) {
      console.error('Error saving seat plan:', error);
      alert('Failed to save seat plan');
    }
  };

  return (
    <div className="p-4">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              onClick={() => toggleSeat(row, col)}
              className={`flex justify-center items-center p-2 cursor-pointer ${
                selectedSeats.has(`${row}-${col}`)
                  ? 'text-red-500'
                  : 'text-blue-500'
              }`}
            >
              <FontAwesomeIcon icon={faChair} size="2x" />
            </div>
          ))
        )}
      </div>
      <button
        onClick={handleSaveSeatPlan}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Save Seat Plan
      </button>
    </div>
  );
};

export default SeatPlan;
