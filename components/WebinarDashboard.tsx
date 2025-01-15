"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Calendar, Link, Users, TrendingUp } from 'lucide-react';
import dynamic from 'next/dynamic';

const Plot = dynamic(
  () => import('react-plotly.js'),
  { ssr: false }
);

interface IEnrollment {
  _id: string;
  webinarId: {
    _id: string;
    name: string;
    description: string;
    email: string;
    webinarlink: string;
    date: string;
    link: string;
  };
  email: string;
  enrollmentDate: string;
}

interface ICategory {
  _id: string;
  name: string;
  description: string;
  email: string;
  webinarlink: string;
  date: string;
  link: string;
}

const DashboardComponent = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Added status
  const [enrollments, setEnrollments] = useState<IEnrollment[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    let timeoutId: NodeJS.Timeout; // To manage delay timer
    
    const fetchData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        setLoading(true); // Start loading
        try {
          const [enrollRes, eventsRes] = await Promise.all([
            fetch(`/api/enrollment?email=${encodeURIComponent(session.user.email)}`),
            fetch(`/api/webinars?email=${encodeURIComponent(session.user.email)}`),
          ]);
  
          if (!enrollRes.ok || !eventsRes.ok) {
            throw new Error('Failed to fetch data');
          }
  
          const [enrollData, eventsData] = await Promise.all([
            enrollRes.json(),
            eventsRes.json(),
          ]);
  
          setEnrollments(enrollData);
          setUpcomingEvents(eventsData);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        } finally {
          setLoading(false); // Stop loading
        }
      } else if (status === "unauthenticated") {
        // Add a slight delay before redirecting
        timeoutId = setTimeout(() => {
          router.push('/signin');
        }, 1000); // Adjust delay duration as needed (e.g., 1000ms = 1 second)
      }
    };
  
    fetchData();
  
    // Cleanup timeout on component unmount
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [status, session, router]);

  // Show loading state while checking authentication
   // Calculate statistics
  const totalEnrollments = enrollments.length;
  const totalUpcoming = upcomingEvents.length;
  const recentEnrollments = enrollments.slice(0, 5);

  // Create data for charts
  const enrollmentsByCategory = enrollments.reduce((acc: { [key: string]: number }, curr) => {
    const category = curr.webinarId.name;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Create timeline data
  const timelineData = enrollments.reduce((acc: { [key: string]: number }, curr) => {
    const date = new Date(curr.enrollmentDate).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-blue-800">My Enrollments</h3>
            <Users className="h-6 w-6 text-blue-800" />
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-2">{totalEnrollments}</p>
        </div>

        <div className="bg-purple-100 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-purple-800">Upcoming Events</h3>
            <Calendar className="h-6 w-6 text-purple-800" />
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-2">{totalUpcoming}</p>
        </div>

        <div className="bg-green-100 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-green-800">Next Event</h3>
            <TrendingUp className="h-6 w-6 text-green-800" />
          </div>
          <p className="text-lg font-bold text-green-900 mt-2">
            {upcomingEvents[0] ? formatDate(upcomingEvents[0].date) : 'No upcoming events'}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Enrollment Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-4">My Enrollment Timeline</h3>
          <Plot
            data={[
              {
                x: Object.keys(timelineData),
                y: Object.values(timelineData),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: '#3B82F6' },
                name: 'Enrollments'
              }
            ]}
            layout={{
              autosize: true,
              height: 300,
              margin: { l: 50, r: 20, t: 20, b: 40 },
              xaxis: { title: 'Date' },
              yaxis: { title: 'Enrollments' },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent'
            }}
            config={{ responsive: true }}
            style={{ width: '100%' }}
          />
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-4">My Categories</h3>
          <Plot
            data={[
              {
                values: Object.values(enrollmentsByCategory),
                labels: Object.keys(enrollmentsByCategory),
                type: 'pie',
                hole: 0.4,
                marker: {
                  colors: ['#3B82F6', '#8B5CF6', '#EC4899', '#F43F5E', '#6366F1']
                }
              }
            ]}
            layout={{
              autosize: true,
              height: 300,
              margin: { l: 20, r: 20, t: 20, b: 20 },
              showlegend: true,
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent'
            }}
            config={{ responsive: true }}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Recent Enrollments Table */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Enrollments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">Category</th>
                <th className="px-4 py-2 text-left text-gray-700">Description</th>
                <th className="px-4 py-2 text-left text-gray-700">Date</th>
                <th className="px-4 py-2 text-center text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentEnrollments.map((enrollment) => (
                <tr key={enrollment._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">
                    {enrollment.webinarId.name}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {enrollment.webinarId.description}
                  </td>
                  <td className="px-4 py-2">
                    {formatDate(enrollment.enrollmentDate)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <a
                      href={`/categories/${enrollment.webinarId._id}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1"
                    >
                      <Link className="h-4 w-4" />
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;