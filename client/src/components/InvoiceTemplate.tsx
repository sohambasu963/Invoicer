'use client';
import React, { useState } from 'react';

export default function InvoiceTemplate() {
  const [clientName, setClientName] = useState('Client Name');
  const [companyName, setCompanyName] = useState('Company Name');
  const [companyEmail, setCompanyEmail] = useState('Company Email');
  const [issueDate, setIssueDate] = useState('MM/DD/YYYY');
  const [contactName, setContactName] = useState('Contact Name');
  const [contactEmail, setContactEmail] = useState('Contact Email');

  const handleClientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(event.target.value);
  };

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
  };

  const handleCompanyEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyEmail(event.target.value);
  };

  const handleIssueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIssueDate(event.target.value);
  };

  const handleContactNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactName(event.target.value);
  };

  const handleContactEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactEmail(event.target.value);
  };

  return (
    <div
      className="bg-white p-10 flex flex-col justify-between"
      style={{
        width: '816px',
        height: '1056px',
        boxShadow: '0px 0px 8px rgba(0,0,0,0.1)',
        margin: '5vh auto',
      }}
    >
      <header className="flex justify-between items-center">
        <h1 className="text-6xl font-satoshi-variable font-bold">Invoice</h1>
        <div className="text-right">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="font-satoshi-variable text-md inline-block border-b-2 border-gray-300"
          />
          <br />
          <input
            type="email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            className="font-satoshi-variable text-md inline-block border-b-2 border-gray-300"
          />
        </div>
      </header>

      <h2 className="text-xl mt-4 font-satoshi-variable font-bold">
        Client —{' '}
        <input
          type="text"
          value={clientName}
          onChange={handleClientNameChange}
          className="inline-block border-b-2 border-gray-300"
        />
      </h2>

      <section className="my-8">
        {/* Client Details */}
        <p className="font-gambetta-variable text-lg">
          <strong>Date of Issue:</strong>{' '}
          <input
            type="text"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="font-gambetta-variable text-lg inline-block border-b-2 border-gray-300"
          />
        </p>

        <p className="font-gambetta-variable text-lg">
          <strong>Billed To:</strong>
        </p>

        <input
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          className="font-gambetta-variable text-lg inline-block border-b-2 border-gray-300"
        />
        <br />
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className="font-gambetta-variable text-lg inline-block border-b-2 border-gray-300"
        />
      </section>

      <section className="flex-grow">
        {/* Invoice Details Section */}
        <div className="w-full text-left">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-satoshi-variable text-sm uppercase">
              Services
            </h3>
            <h3 className="font-satoshi-variable text-sm uppercase">Price</h3>
          </div>

          <div className="border-t-2 border-black pt-4">
            <div className="flex justify-between mb-4">
              <div>
                <h4 className="font-gambetta-variable text-xl mb-1">Item</h4>
                <p className="font-satoshi-variable text-md text-gray-400">
                  Description
                </p>
              </div>
              <p className="text-md">$2,000.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Structure Section */}
      <section className="flex-grow-0 mb-8">
        <h3 className="font-satoshi-variable text-sm uppercase mb-2">
          Payment Structure
        </h3>
        <div className="border-t-2 border-black py-4">
          {/* Payment Row */}
          <div className="flex mb-4">
            <p className="flex-grow font-satoshi-variable text-md w-1/2">
              Payment 1: Jan 1, 2024
            </p>
            <p className="font-satoshi-variable text-gray-400 text-md w-1/4 text-center">
              50.00%
            </p>
            <p className="font-satoshi-variable text-md w-1/4 text-right">
              $1,000.00
            </p>
          </div>
          <div className="flex mb-2">
            <p className="flex-grow font-satoshi-variable text-md w-1/2">
              Payment 2: Jan 31, 2024
            </p>
            <p className="font-satoshi-variable text-gray-400 text-md w-1/4 text-center">
              50.00%
            </p>
            <p className="font-satoshi-variable text-md w-1/4 text-right">
              $1,000.00
            </p>
          </div>
        </div>
      </section>

      {/* Total Section */}
      <section className="flex-grow-0">
        <div className="flex justify-end">
          <h3 className="font-satoshi-variable text-lg font-bold">
            Total Due (USD):
          </h3>
        </div>
        <div className="border-t-2 border-black pt-4">
          <div className="flex justify-end">
            <p className="font-satoshi-variable text-4xl font-bold">
              $2,000.00
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
