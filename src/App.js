import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "./constants";

function App() {
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [maxWord, setMaxWord] = useState(50)
  const [summary, setSummary] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUpload = async () => {
    setSubmitting(true);
    if (!file) {
      alert('Please select a PDF file.');
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('pdf_file', file);
    formData.append('max_word', maxWord)


    try {
      // Replace 'YOUR_DJANGO_API_URL' with the actual URL of your Django API endpoint for uploading PDFs and generating summaries.
      const response = await axios.post('http://localhost:8000/api/summary/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.message) {
        alert(response.data.message);
        console.log(response.data);
        setSummary(response.data.summary);
        setShowSummary(true);
        setSubmitting(false);
        // setFile(null);
      } else {
        alert('Summary generation failed. Please try again.');
        setShowSummary(false);
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setShowSummary(false);
      setSubmitting(false);
      alert('Error uploading PDF:', error || error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Get A Summary for your Document
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Document
            </label>
            <div className="mt-2">
              <input
                id="file"
                name="file"
                type="file"
                accept=".pdf" onChange={handleFileSelect}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>




          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Summary Size
              </label>

            </div>
            <div className="mt-2">
              <input
                id="maxWord"
                name="maxWord"
                type="number"
                value={maxWord}
                onChange={(e) => setMaxWord(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              disabled={submitting}
              onClick={handleUpload}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get Summary
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              {showSummary && (
                <div className="text-sm">
                  <p className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {summary}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
}

export default App;
