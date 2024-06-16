"use client"
import { useEffect, useState } from 'react';
import { firestore } from '@/lib/firebase/firebase';
import Link from 'next/link';
import { Button } from '../ui/button';

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

const BrowseBuses = () => {
  const [buses, setBuses] = useState<Bus[]>([]);

  useEffect(() => {
    const fetchBuses = async () => {
      const querySnapshot = await firestore.collection('buses').get();
      const busesData: Bus[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        busesData.push({
          id: doc.id,
          busName: data.busName,
          totalSeats: data.totalSeats,
          currentOccupancy: data.currentOccupancy,
          availableDays: data.availableDays,
          busRoute: {
            source: data.busRoute.source,
            destination: data.busRoute.destination,
          },
        } as Bus);
      });
      setBuses(busesData);
    };

    fetchBuses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Buses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buses.map((bus) => (
          <div key={bus.id} className="border p-4 hover:bg-gray-100">
            <h2 className="text-lg font-bold mb-2">{bus.busName}</h2>
              <p>
                <span className="font-bold">Route:</span> {bus.busRoute.source} to {bus.busRoute.destination}
              </p>
              <p>
                <span className="font-bold">Available Days:</span> {bus.availableDays.join(', ')}
              </p>
            <Link href={`/bus/${bus.id}`} className="text-blue-500">
              <Button> Click to See Details</Button>

            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseBuses;
