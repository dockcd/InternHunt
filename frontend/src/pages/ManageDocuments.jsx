// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const DOCUMENT_TYPES = [
//   { key: 'bonafide', label: 'Bonafide Letter' },
//   { key: 'offer', label: 'Offer Letter' },
//   { key: 'completion', label: 'Completion Certificate' },
//   { key: 'report', label: 'Internship Report' },
// ];

// export default function ManageDocuments() {
//   const [internships, setInternships] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [uploadStatus, setUploadStatus] = useState({}); // { internshipId_docType: 'Uploading...' | 'Success' | 'Error' }

//   const token = Cookies.get('token');
//   const email = Cookies.get('email'); // Assuming you store email in cookie; alternatively, decode from token or fetch separately

//   useEffect(() => {
//     async function fetchInternships() {
//       try {
//         const res = await axios.get('http://localhost:5000/api/students/internships/my', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setInternships(res.data.internships);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch internships');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchInternships();
//   }, [token]);

//   async function handleFileUpload(event, internshipId, docType) {
//     const file = event.target.files[0];
//     if (!file) return;

//     const key = `${internshipId}_${docType}`;
//     setUploadStatus(prev => ({ ...prev, [key]: 'Uploading...' }));

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const url = `http://localhost:5000/api/documents/upload/${email}/${internshipId}/${docType}`;
//       const res = await axios.post(url, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUploadStatus(prev => ({ ...prev, [key]: 'Success' }));
//     } catch (err) {
//       setUploadStatus(prev => ({ ...prev, [key]: 'Error uploading file' }));
//     }
//   }

//   if (loading) return <div className="p-4 text-center">Loading internships...</div>;
//   if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <h2 className="text-3xl font-bold mb-6">Manage Documents</h2>
//       {internships.length === 0 ? (
//         <p>No internships found. Please add internships first.</p>
//       ) : (
//         <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {internships.map(internship => (
//             <div key={internship.id} className="bg-white p-6 rounded shadow">
//               <h3 className="text-xl font-semibold mb-2">{internship.role}</h3>
//               <p className="mb-4 text-gray-700">
//                 <strong>Company:</strong> {internship.company_name}
//               </p>
//               {DOCUMENT_TYPES.map(({ key, label }) => {
//                 const statusKey = `${internship.id}_${key}`;
//                 return (
//                   <div key={key} className="mb-4">
//                     <label className="block mb-1 font-medium">{label}</label>
//                     <input
//                       type="file"
//                       accept=".pdf,.doc,.docx"
//                       onChange={e => handleFileUpload(e, internship.id, key)}
//                       className="block"
//                     />
//                     <small className="text-sm text-gray-600">
//                       {uploadStatus[statusKey]}
//                     </small>
//                   </div>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const DOCUMENT_TYPES = [
  { key: 'bonafide', label: 'Bonafide Letter', dbKey: 'bonafide_letter_url' },
  { key: 'offer', label: 'Offer Letter', dbKey: 'internship_offer_letter_url' },
  { key: 'completion', label: 'Completion Certificate', dbKey: 'internship_completion_letter_url' },
  { key: 'report', label: 'Internship Report', dbKey: 'internship_report_url' },
];

export default function ManageDocuments() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState({});
  const [docInfo, setDocInfo] = useState({}); // { internshipId: { docType: url/null, ... } }

  const token = Cookies.get('token');
  const email = Cookies.get('email');

  // Fetch internships
  useEffect(() => {
    async function fetchInternships() {
      try {
        const res = await axios.get('http://localhost:5000/api/students/internships/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInternships(res.data.internships);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch internships');
      } finally {
        setLoading(false);
      }
    }
    fetchInternships();
  }, [token]);

  // Fetch uploaded status per internship
  useEffect(() => {
    async function fetchDocs() {
      for (const internship of internships) {
        try {
          const url = `http://localhost:5000/api/documents/${email}/${internship.id}`;
          const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
          setDocInfo(prev => ({ ...prev, [internship.id]: res.data }));
        } catch {
          setDocInfo(prev => ({ ...prev, [internship.id]: {} }));
        }
      }
    }
    if (internships.length > 0) fetchDocs();
  }, [internships, email, token]);

  // Handle file upload
  async function handleFileUpload(event, internshipId, docType, dbKey) {
    const file = event.target.files[0];
    if (!file) return;

    const statusKey = `${internshipId}_${docType}`;
    setUploadStatus(prev => ({ ...prev, [statusKey]: 'Uploading...' }));

    const formData = new FormData();
    formData.append('file', file);

    try {
      const url = `http://localhost:5000/api/documents/upload/${email}/${internshipId}/${docType}`;
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadStatus(prev => ({ ...prev, [statusKey]: 'Success' }));

      // Refetch document info for this internship to update status
      try {
        const docRes = await axios.get(
          `http://localhost:5000/api/documents/${email}/${internshipId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDocInfo(prev => ({ ...prev, [internshipId]: docRes.data }));
      } catch {}
    } catch (err) {
      setUploadStatus(prev => ({ ...prev, [statusKey]: 'Error uploading file' }));
    }
  }

  if (loading) return <div className="p-4 text-center">Loading internships...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Manage Documents</h2>
      {internships.length === 0 ? (
        <p>No internships found. Please add internships first.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {internships.map(internship => (
            <div key={internship.id} className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">{internship.role}</h3>
              <p className="mb-4 text-gray-700">
                <strong>Company:</strong> {internship.company_name}
              </p>
              {DOCUMENT_TYPES.map(({ key, label, dbKey }) => {
                const statusKey = `${internship.id}_${key}`;
                const uploaded = docInfo[internship.id]?.[dbKey];
                return (
                  <div key={key} className="mb-4">
                    <label className="block mb-1 font-medium">{label}</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={e => handleFileUpload(e, internship.id, key, dbKey)}
                      className="block"
                    />
                    <small className="text-sm text-gray-600">
                      {uploadStatus[statusKey]
                        ? uploadStatus[statusKey]
                        : uploaded
                          ? 'Uploaded'
                          : 'No file chosen'}
                    </small>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}