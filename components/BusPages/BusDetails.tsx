"use client"
import { useEffect, useState } from 'react';
import { firestore } from '@/lib/firebase/firebase';
import Link from 'next/link';
import { useParams } from 'next/navigation'

interface Bus {
  id: string;
  busName: string;
  totalSeats: number;
  currentOccupancy: number;
  availableDays: string[];
  busRoute: {
    source: string;
    destination: string;
  };
}

const BusDetails = () => {
  const params = useParams<{ id: string}>();
  const id = params.id;
  const [bus, setBus] = useState<Bus | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBusDetails = async () => {
        try {
          const busDoc = await firestore.collection('buses').doc(id).get();
          if (busDoc.exists) {
            const busData = busDoc.data() as Bus; // Explicitly cast to Bus type
            const availableDays: string[] = Array.isArray(busData.availableDays) ? busData.availableDays : [busData.availableDays];
            setBus({
              id: busDoc.id,
              busName: busData.busName,
              totalSeats: busData.totalSeats,
              currentOccupancy: busData.currentOccupancy,
              availableDays: availableDays,
              busRoute: {
                source: busData.busRoute.source,
                destination: busData.busRoute.destination,
              },
            });
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      };

      fetchBusDetails();
    }
  }, [id]);

  if (!bus) return <div>Loading...</div>;

  const occupancyPercentage = (bus.currentOccupancy / bus.totalSeats) * 100;
  let seatColor = 'green';
  if (occupancyPercentage > 60 && occupancyPercentage <= 90) seatColor = 'yellow';
  if (occupancyPercentage > 90) seatColor = 'red';

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{bus.busName}</h1>
      <p>Route: {bus.busRoute.source} to {bus.busRoute.destination}</p>
      <p>Total Seats: {bus.totalSeats}</p>
      <p>Current Occupancy: {bus.currentOccupancy}</p>
      <p>Available Days:</p>
      <ul>
        {bus.availableDays.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
      <p>
        Seat Plan Color: <span className={`inline-block h-4 w-4 rounded-full bg-${seatColor}-500`}></span> {seatColor}
      </p>
      <div className="mt-4">
        <Link href={`/bus/${bus.id}/book`} className="text-blue-500 mr-4">
          Book a Seat
        </Link>
        <Link href={`/bus/${bus.id}/cancel`} className="text-red-500">
          Cancel Booking
        </Link>
      </div>
    </div>
  );
};


export default BusDetails;
