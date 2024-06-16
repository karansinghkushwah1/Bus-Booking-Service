"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { firestore } from '@/lib/firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import 'tailwindcss/tailwind.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SeatPlan from '@/components/SeatPlan';
import { getUserRole } from '@/lib/firebase/firestore';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/autoContext';

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

const Admin = () => {
  const router = useRouter();
  const { userLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    const checkUserRole = async () => {
      if (!userLoggedIn || !currentUser) {
        router.push('/auth/signIn');
        return;
      }

      const userRole = await getUserRole(currentUser.uid);
      if (userRole !== 'admin') {
        alert("Not Autherised to use this");
        router.push('/'); // Redirect to homepage if user is not an admin
      }
    };

    checkUserRole();
  }, [router, userLoggedIn, currentUser]);

  const [busDetails, setBusDetails] = useState<Bus>({
    id: '',
    busName: '',
    totalSeats: 0,
    currentOccupancy: 0,
    availableDays: [],
    busRoute: { source: '', destination: '' },
  });
  const [buses, setBuses] = useState<Bus[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = firestore.collection('buses').onSnapshot((snapshot) => {
      const busesData: Bus[] = [];
      snapshot.forEach((doc) => {
        busesData.push({ id: doc.id, ...doc.data() } as Bus);
      });
      setBuses(busesData);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      // Handle checkbox input for availableDays
      if (isChecked) {
        setBusDetails({ ...busDetails, availableDays: [...busDetails.availableDays, name] });
      } else {
        setBusDetails({ ...busDetails, availableDays: busDetails.availableDays.filter(day => day !== name) });
      }
    } else if (name === 'source' || name === 'destination') {
      // Handle source and destination inputs
      setBusDetails({
        ...busDetails,
        busRoute: {
          ...busDetails.busRoute,
          [name]: value
        }
      });
    } else {
      // Handle other inputs
      setBusDetails({ ...busDetails, [name]: value });
    }
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!busDetails.busName || !busDetails.totalSeats || busDetails.availableDays.length === 0 || !busDetails.busRoute) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      if (editing) {
        await firestore.collection('buses').doc(busDetails.id).update(busDetails);
        setEditing(false);
      } else {
        const busId = uuidv4();
        await firestore.collection('buses').doc(busId).set({ ...busDetails, id: busId });
        setSelectedBusId(busId);
      }
      setBusDetails({ id: '', busName: '', totalSeats: 0, currentOccupancy: 0, availableDays: [],  busRoute: { source: '', destination: '' } });
    } catch (err) {
      setError('Failed to save bus details. Please try again.');
    }

    setLoading(false);
  };

  const handleEdit = (bus: Bus) => {
    setBusDetails(bus);
    setEditing(true);
    setSelectedBusId(bus.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this bus?')) {
      await firestore.collection('buses').doc(id).delete();
      setBuses((prevBuses) => prevBuses.filter((bus) => bus.id !== id));
    }
  };

  // const handleSeatPlanUpload = (url: string) => {
  //   setBusDetails({ ...busDetails, seatPlanUrl: url });
  // };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Buses</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label
            htmlFor="busName"
            className="block text-sm font-medium text-gray-700"
          >
            Bus Name
          </label>
          <Input
            type="text"
            id="busName"
            name="busName"
            placeholder="Bus Name"
            value={busDetails.busName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="totalSeats"
            className="block text-sm font-medium text-gray-700"
          >
            Total Seats
          </label>
          <Input
            type="number"
            id="totalSeats"
            name="totalSeats"
            placeholder="Total Seats"
            value={busDetails.totalSeats}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="currentOccupancy"
            className="block text-sm font-medium text-gray-700"
          >
            Current Occupancy
          </label>
          <Input
            type="number"
            id="currentOccupancy"
            name="currentOccupancy"
            placeholder="Current Occupancy"
            value={busDetails.currentOccupancy}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Available Days
          </label>
          <div className="flex space-x-4">
            <label htmlFor="Monday" className="flex items-center space-x-1">
              <input
                type="checkbox"
                id="Monday"
                name="Monday"
                checked={busDetails.availableDays.includes("Monday")}
                onChange={handleChange}
              />
              <span>Monday</span>
            </label>
            <label htmlFor="Tuesday" className="flex items-center space-x-1">
              <input
                type="checkbox"
                id="Tuesday"
                name="Tuesday"
                checked={busDetails.availableDays.includes("Tuesday")}
                onChange={handleChange}
              />
              <span>Tuesday</span>
            </label>
            <label htmlFor="Wednesday" className="flex items-center space-x-1">
              <input
                type="checkbox"
                id="Wednesday"
                name="Wednesday"
                checked={busDetails.availableDays.includes("Wednesday")}
                onChange={handleChange}
              />
              <span>Wednesday</span>
            </label>
            <label htmlFor="Thursday" className="flex items-center space-x-1">
              <input
                type="checkbox"
                id="Thursday"
                name="Thursday"
                checked={busDetails.availableDays.includes("Thursday")}
                onChange={handleChange}
              />
              <span>Thursday</span>
            </label>
            <label htmlFor="Friday" className="flex items-center space-x-1">
              <input
                type="checkbox"
                id="Friday"
                name="Friday"
                checked={busDetails.availableDays.includes("Friday")}
                onChange={handleChange}
              />
              <span>Friday</span>
            </label>
            <label htmlFor="Saturday" className="flex items-center space-x-1">
              <input
                type="checkbox"
                id="Saturday"
                name="Saturday"
                checked={busDetails.availableDays.includes("Saturday")}
                onChange={handleChange}
              />
              <span>Saturday</span>
            </label>
            <label htmlFor="Sunday" className="flex items-center space-x-1">
              <input
                type="checkbox"
                id="Sunday"
                name="Sunday"
                checked={busDetails.availableDays.includes("Sunday")}
                onChange={handleChange}
              />
              <span>Sunday</span>
            </label>
          </div>
        </div>
        {/* <div>
          <label htmlFor="busRoute" className="block text-sm font-medium text-gray-700">Bus Route</label>
          <Input type="text" id="busRoute" name="busRoute" placeholder="Bus Route" value={busDetails.busRoute} onChange={handleChange} />
        </div> */}
        <div>
          <label
            htmlFor="source"
            className="block text-sm font-medium text-gray-700"
          >
            Bus Routes
          </label>
          <label
            htmlFor="source"
            className="block text-sm font-medium text-gray-700"
          >
            Source
          </label>
          <Input
            type="text"
            id="source"
            name="source"
            placeholder="Source"
            value={busDetails.busRoute.source}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-700"
          >
            Destination
          </label>
          <Input
            type="text"
            id="destination"
            name="destination"
            placeholder="Destination"
            value={busDetails.busRoute.destination}
            onChange={handleChange}
          />
        </div>

        {/* <div>
          <label
            htmlFor="seatPlanUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Seat Plan URL
          </label>
          <FileUpload onUpload={handleSeatPlanUpload} />
        </div> */}
        <Button type="submit" disabled={loading}>
          {editing ? "Update Bus" : "Add Bus"}
        </Button>
      </form>

      {selectedBusId && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">
            Seat Selection & Current Occupancy
          </h1>
          <div className="mb-4">
            <label className="mr-2">Rows</label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="border p-2 mr-4"
            />
            <label className="mr-2">Seats per row</label>
            <input
              type="number"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className="border p-2"
            />
          </div>
          {selectedBusId && (
            <SeatPlan rows={rows} cols={cols} busId={selectedBusId} />
          )}
        </div>
      )}

      <h2 className="text-xl font-bold mt-8 mb-4">Existing Buses</h2>
      <ul>
        {buses.map((bus) => (
          <li key={bus.id} className="flex justify-between items-center mb-2">
            <span>
              {bus.busName} - {bus.busRoute.source} to {bus.busRoute.destination}
            </span>
            <div className="flex space-x-2">
              <Button onClick={() => handleEdit(bus)}>Edit</Button>
              <Button onClick={() => handleDelete(bus.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
