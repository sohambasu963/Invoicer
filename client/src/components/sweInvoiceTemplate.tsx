'use client';
import React, { useState, useEffect, forwardRef, RefAttributes } from 'react';

interface Props extends RefAttributes<HTMLDivElement> {}

const SweInvoiceTemplate = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [issueDate, setIssueDate] = useState(formattedToday);
  const [contactName, setContactName] = useState('');
  const [companyStreetAddress, setCompanyStreetAddress] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [currency, setCurrency] = useState('TOTAL DUE (USD)');

  const [accountHolder, setAccountHolder] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [institutionNumber, setInstitutionNumber] = useState("");

  const [services, setServices] = useState([
    { name: '', description: '', subdescription: '', price: '' },
  ]);
  const [payments, setPayments] = useState([
    { date: '', percent: '100.00%', amount: '0' },
  ]);

  const calculateTotal = () => {
    return services.reduce((acc, service) => {
      const price = parseFloat(service.price.replace(/[^\d.-]/g, ''));
      return acc + (isNaN(price) ? 0 : price);
    }, 0);
  };

  const [totalAmount, setTotalAmount] = useState(calculateTotal());

  useEffect(() => {
    setTotalAmount(calculateTotal());
  }, [services]);

  const addService = () => {
    setServices([...services, { name: '', description: '', subdescription: '', price: '' }]);
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      setServices(services.filter((_, i) => i !== index));
    }
  };

  const addPayment = () => {
    setPayments([...payments, { date: '', percent: '100.00%', amount: '0' }]);
  };

  const removePayment = (index: number) => {
    if (payments.length > 1) {
      setPayments(payments.filter((_, i) => i !== index));
    }
  };

  const handlePaymentDateChange = (index: number, newDate: string) => {
    const updatedPayments = payments.map((payment, i) =>
      i === index ? { ...payment, date: newDate } : payment
    );
    setPayments(updatedPayments);
  };

  const distributePayments = () => {
    let subtotal = 0;
    const updatedPayments = payments.map((payment, index) => {
      const percent = 100 / payments.length;
      let amount;

      if (index < payments.length - 1) {
        amount = parseFloat(((percent / 100) * totalAmount).toFixed(2));
        subtotal += amount;
      } else {
        amount = totalAmount - subtotal;
      }

      return {
        ...payment,
        percent: `${percent.toFixed(2)}%`,
        amount: amount.toFixed(2),
      };
    });
    setPayments(updatedPayments);
  };

  useEffect(() => {
    distributePayments();
  }, [payments.length, totalAmount]);

  const formatAmount = (value: string) => {
    let numberValue = Number(value.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(numberValue)) {
      return `$${numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }
    return value;
  };

  const handleServiceNameChange = (index: number, value: string) => {
    const updatedServices = services.map((service, i) =>
      i === index ? { ...service, name: value } : service
    );
    setServices(updatedServices);
  };

  const handleServiceDescriptionChange = (index: number, value: string) => {
    const updatedServices = services.map((service, i) =>
      i === index ? { ...service, description: value } : service
    );
    setServices(updatedServices);
  };

  const handleServiceSubDescriptionChange = (index: number, value: string) => {
    const updatedServices = services.map((service, i) =>
      i === index ? { ...service, subdescription: value } : service
    );
    setServices(updatedServices);
  };

  const handleServicePriceChange = (index: number, value: string) => {
    const updatedServices = services.map((service, i) =>
      i === index ? { ...service, price: value } : service
    );
    setServices(updatedServices);
  };

  const handlePriceInputBlur = (index: number) => {
    const updatedServices = services.map((service, i) => {
      if (i === index) {
        const formattedPrice = formatAmount(service.price);
        return { ...service, price: formattedPrice };
      }
      return service;
    });
    setServices(updatedServices);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const handleClientNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClientName(event.target.value);
  };

  const handleCompanyNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyName(event.target.value);
  };

  const handleCompanyEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyEmail(event.target.value);
  };

  const handleIssueDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIssueDate(event.target.value);
  };

  const handleContactNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactName(event.target.value);
  };

  const handleContactEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactEmail(event.target.value);
  };

  return (
    <div
      ref={ref}
      className="bg-white p-10 flex flex-col justify-between mt-[2vh] mb-[5vh]"
      style={{
        width: '850px',
        height: '1100px',
        boxShadow: '0px 0px 8px rgba(0,0,0,0.1)',
        // margin: '10vh auto',
      }}
    >
      <header className="flex justify-between items-center">
        <h1 className="text-6xl font-satoshi-variable font-bold -mt-16">Invoice</h1>
        <div>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="font-satoshi-variable text-md text-right inline-block border-b-2 border-gray-300 w-64"
            placeholder="Company Name"
          />
          <br />
          <input
            type="email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            className="font-satoshi-variable text-md text-right inline-block border-b-2 border-gray-300 w-64"
            placeholder="Company Email"
          />
          <br />
          <br />
          <input
            type="email"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="font-satoshi-variable text-md text-right inline-block border-b-2 border-gray-300 w-64"
            placeholder="Street Address"
          />
          <br />
          <input
            type="email"
            className="font-satoshi-variable text-md text-right inline-block border-b-2 border-gray-300 w-64"
            placeholder="City, Province"
          />
          <br />
          <input
            type="email"
            className="font-satoshi-variable text-md text-right inline-block border-b-2 border-gray-300 w-64"
            placeholder="Postal Code"
          />
          <br />
          <input
            type="email"
            className="font-satoshi-variable text-md text-right inline-block border-b-2 border-gray-300 w-64"
            placeholder="Country"
          />
        </div>
      </header>

      <h2 className="text-xl -mt-12 font-satoshi-variable font-bold">
        Invoice #
        <input
          type="text"
          value={clientName}
          onChange={handleClientNameChange}
          className="inline-block border-b-2 border-gray-300 w-64"
          placeholder="00X"
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
            className="font-satoshi-variable text-lg inline-block border-b-2 border-gray-300 w-64"
            placeholder="MM/DD/YYYY"
          />
        </p>

        <p className="font-gambetta-variable text-lg">
          <strong>Billed To:</strong>
        </p>

        <input
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          className="font-gambetta-variable text-lg inline-block border-b-2 border-gray-300 w-72"
          placeholder="Company Name"
        />
        <br />
        <input
          type="text"
          value={companyStreetAddress}
          onChange={(e) => setCompanyStreetAddress(e.target.value)}
          className="font-gambetta-variable text-lg inline-block border-b-2 border-gray-300 w-72"
          placeholder="Company Street Address"
        />
        <br />
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className="font-gambetta-variable text-lg inline-block border-b-2 border-gray-300 w-72"
          placeholder="Company Location"
        />
      </section>

      <section className="flex-grow">
        {/* Invoice Details Section */}
        <div className="w-full text-left">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-satoshi-variable text-sm text-gray-500 uppercase">
              Services
            </h3>
            <h3 className="font-satoshi-variable text-sm text-gray-500 uppercase">
              Amount
            </h3>
          </div>

          <div className="border-t-2 border-black pt-4">
            {services.map((service, index) => (
              <div
                className="flex mb-4 items-center justify-between"
                key={index}
              >
                <div className="flex flex-col flex-grow">
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) =>
                      handleServiceNameChange(index, e.target.value)
                    }
                    className="font-gambetta-variable text-xl mb-1 inline-block border-b-2 border-gray-300 w-full"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={service.description}
                    onChange={(e) =>
                      handleServiceDescriptionChange(index, e.target.value)
                    }
                    className="font-satoshi-variable text-md mb-1 inline-block border-b-2 border-gray-300 w-full"
                    placeholder="Description"
                  />

                  <input
                    type="text"
                    value={service.subdescription}
                    onChange={(e) =>
                      handleServiceSubDescriptionChange(index, e.target.value)
                    }
                    className="font-satoshi-variable text-md inline-block border-b-2 border-gray-300 w-full"
                    placeholder="Sub Description"
                  />
                </div>
                <input
                  type="text"
                  value={service.price}
                  onChange={(e) =>
                    handleServicePriceChange(index, e.target.value)
                  }
                  onBlur={() => handlePriceInputBlur(index)}
                  onFocus={(e) =>
                    handleServicePriceChange(
                      index,
                      e.target.value.replace(/[^0-9.-]+/g, '')
                    )
                  }
                  className="font-satoshi-variable text-md inline-block border-b-2 border-gray-300 w-32 text-right ml-4"
                  placeholder="$0.00"
                />
                {index !== 0 && (
                  <button className="pl-2 -mr-8 remove-button">
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      onClick={() => removeService(index)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <button
                className="add-service-button text-sm font-satoshi-variable text-gray-400"
                onClick={addService}
              >
                + Add Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Structure Section */}
      {/* <section className="flex-grow-0 mb-8">
        <h3 className="font-satoshi-variable text-sm text-gray-500 uppercase mb-2">
          Payment Structure
        </h3>
        <div className="border-t-2 border-black py-4">
          {payments.map((payment, index) => (
            <div className="flex mb-4" key={index}>
              <input
                type="text"
                value={payment.date}
                onChange={(e) => handlePaymentDateChange(index, e.target.value)}
                className="flex-grow font-satoshi-variable text-md inline-block border-b-2 border-gray-300 w-1/2"
                placeholder={`Payment ${index + 1}: TBD`}
              />
              <p className="font-satoshi-variable text-gray-400 text-md w-1/4 text-center">
                {payment.percent}
              </p>
              <p className="font-satoshi-variable text-md w-1/4 text-right">
                {formatAmount(payment.amount)}
              </p>
              {index !== 0 && (
                <button className="pl-2 -mr-8 remove-button">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    onClick={() => removePayment(index)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <button
              className="add-payment-button text-sm font-satoshi-variable text-gray-400"
              onClick={addPayment}
            >
              + Add Payment
            </button>
          </div>
        </div>
      </section> */}

      {/* Payment Information Section */}
      <section className="flex-grow-0 mb-8">
        <h3 className="font-satoshi-variable text-sm text-gray-500 uppercase mb-2">
          Payment Information
        </h3>
        <div className="border-t-2 border-black py-4">
          
          <p className="text-xl mt-4 font-satoshi-variable font-bold">
            Account Holder:{' '}
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              className="inline-block border-b-2 border-gray-300 w-64"
              placeholder="Account Holder"
            />
          </p>
          <p className="text-xl mt-4 font-satoshi-variable font-bold">
            Bank Name:{' '}
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="inline-block border-b-2 border-gray-300 w-64"
              placeholder="Bank Name"
            />
          </p>
          <p className="text-xl mt-4 font-satoshi-variable font-bold">
            Phone Number:{' '}
            <input
              type="text"
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value)}
              className="inline-block border-b-2 border-gray-300 w-64"
              placeholder="###-###-####"
            />
          </p>
          <p className="text-xl mt-4 font-satoshi-variable font-bold">
            Swift Code:{' '}
            <input
              type="text"
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
              className="inline-block border-b-2 border-gray-300 w-64"
              placeholder="Swift Code"
            />
          </p>
          <p className="text-xl mt-4 font-satoshi-variable font-bold">
            Account Number:{' '}
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="inline-block border-b-2 border-gray-300 w-64"
              placeholder="Account Number"
            />
          </p>
          <p className="text-xl mt-4 font-satoshi-variable font-bold">
            Bank Code:{' '}
            <input
              type="text"
              value={institutionNumber}
              onChange={(e) => setInstitutionNumber(e.target.value)}
              className="inline-block border-b-2 border-gray-300 w-64"
              placeholder="000"
            />
          </p>
          <p className="text-xl mt-4 font-satoshi-variable font-bold">
            Transit Number:{' '}
            <input
              type="text"
              className="inline-block border-b-2 border-gray-300 w-64"
              placeholder="00000"
            />
          </p>
        </div>
      </section>

      {/* Total Section */}
      <section className="flex-grow-0">
        <div className="flex justify-end">
          <input
            type="text"
            value={currency}
            onChange={handleCurrencyChange}
            className="font-satoshi-variable text-sm text-right text-gray-500 font-bold uppercase inline-block border-b-2 border-gray-300"
            placeholder="TOTAL DUE (USD)"
          />
        </div>
        <div className="border-t-2 border-black pt-4">
          <div className="flex justify-end">
            <p className="font-satoshi-variable text-4xl font-bold">
              ${totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});

SweInvoiceTemplate.displayName = 'InvoiceTemplate';

export default SweInvoiceTemplate;
