"use client"
import { useState, useEffect } from 'react';
import { firestore } from '@/lib/firebase/firebase';
import { useParams } from 'next/navigation';

const CancelBooking = () => {
  const params = useParams<{ id: string}>();
  const id = params.id;
  const [seatPlan, setSeatPlan] = useState<Set<string>>(new Set());
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchSeatPlan = async () => {
        const seatPlanDoc = await firestore.collection('seatPlans').doc(id as string).get();
        if (seatPlanDoc.exists) {
          const seatPlanData = seatPlanDoc.data();
          if (seatPlanData && seatPlanData.seatPlan) {
            setSeatPlan(new Set(seatPlanData.seatPlan));
          }
        }
      };

      fetchSeatPlan();
    }
  }, [id]);

  const handleCancelBooking = async () => {
    if (selectedSeat && seatPlan.has(selectedSeat)) {
      const newSeatPlan = new Set(seatPlan);
      newSeatPlan.delete(selectedSeat);

      await firestore.collection('seatPlans').doc(id as string).update({
        seatPlan: Array.from(newSeatPlan),
      });

      setSeatPlan(newSeatPlan);
      alert('Booking canceled successfully');
    } else {
      alert('Seat not booked or not selected');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cancel Booking</h1>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(10, 1fr)`, gridTemplateRows: `repeat(4, 1fr)` }}>
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => {
            const seatId = `${row}-${col}`;
            return (
              <div
                key={seatId}
                onClick={() => setSelectedSeat(seatId)}
                className={`flex justify-center items-center p-2 cursor-pointer ${seatPlan.has(seatId) ? 'bg-red-500' : 'bg-green-500'} ${selectedSeat === seatId ? 'ring ring-blue-500' : ''}`}
              >
                {seatId}
              </div>
            );
          })
        )}
      </div>
      <button onClick={handleCancelBooking} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Cancel Booking
      </button>
    </div>
  );
};

export default CancelBooking;
