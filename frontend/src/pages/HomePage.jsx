import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import axios from 'axios';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes")
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false)

      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("An error occurred while fetching notes. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [])


  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'> Loading notes...</div>}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
             ))}
          </div>
        )}

      </div>

    </div>
  )
}

export default HomePage
