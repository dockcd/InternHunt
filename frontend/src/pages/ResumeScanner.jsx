import React, { useState } from 'react';
import axios from 'axios';

export default function ResumeScanner() {
  const [file, setFile] = useState(null);
  const [parsingResult, setParsingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setParsingResult(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }
    setLoading(true);
    setError('');
    setParsingResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5001/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setParsingResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload and analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col items-center justify-start py-16 px-6 sm:px-10 lg:px-20">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-10 flex flex-col">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-6 text-center">
          Resume Scanner
        </h1>
        <p className="text-center text-indigo-600 dark:text-indigo-400 mb-12 text-lg max-w-3xl mx-auto">
          Upload your resume (PDF, DOCX, TXT) and get detailed insights parsed using advanced NLP.
        </p>

        {/* File Input */}
        <label
          htmlFor="file-upload"
          className="mb-6 cursor-pointer rounded-lg border-4 border-dashed border-indigo-300 dark:border-indigo-600 p-10 text-center text-indigo-500 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition flex flex-col items-center justify-center"
          aria-label="Select resume file"
        >
          {file ? (
            <span className="font-medium text-xl">{file.name}</span>
          ) : (
            <>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16h10M12 12v8m-4-4l8-8m0 0l-8-8m8 8H7" />
              </svg> */}
              <span className="text-lg">Click to select or drag & drop a file here</span>
              <span className="text-sm text-indigo-400 mt-1">(Supported: .pdf, .docx, .txt)</span>
            </>
          )}
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-300 text-white text-xl font-bold rounded-md shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
          aria-live="polite"
          aria-disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-3">
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Analyzing...</span>
            </span>
          ) : (
            'Upload & Analyze'
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="mt-6 rounded-md bg-red-50 border border-red-300 text-red-700 px-6 py-4 font-semibold text-center"
          >
            Error: {error}
          </div>
        )}

        {/* Parsing Result */}
        {parsingResult && (
          <section
            aria-live="polite"
            className="mt-12 overflow-auto max-h-[600px] rounded-lg border border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900 p-8 text-indigo-900 dark:text-indigo-50"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Parsed Resume Data</h2>
            <table className="w-full border-collapse text-left">
              <tbody>
                {Object.entries(parsingResult).map(([field, value]) => {
                  if (!value) return null;
                  let displayValue = value;
                  if (Array.isArray(value)) {
                    displayValue = value.join(', ');
                  } else if (typeof value === 'object') {
                    displayValue = Object.entries(value)
                      .map(([k, v]) => `${k}: ${v.toFixed(1)}%`)
                      .join(', ');
                  }
                  return (
                    <tr
                      key={field}
                      className="border-b border-indigo-300 dark:border-indigo-700 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                    >
                      <th className="p-3 font-semibold bg-indigo-100 dark:bg-indigo-800 w-52 align-top capitalize sticky top-0">
                        {field}
                      </th>
                      <td className="p-3">{displayValue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {parsingResult.Summary && (
              <div className="mt-10 p-6 bg-indigo-100 dark:bg-indigo-800 border border-indigo-300 dark:border-indigo-700 rounded-md text-indigo-900 dark:text-indigo-50 text-lg font-medium leading-relaxed">
                <h3 className="text-2xl font-semibold mb-4 text-center">Summary</h3>
                <p>{parsingResult.Summary}</p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}