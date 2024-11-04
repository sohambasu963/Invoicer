'use client';
import React, { useRef, useState, useEffect } from 'react';
import SweInvoiceTemplate from '@/components/sweInvoiceTemplate';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import MobilePopup from '@/components/MobilePopup';

export default function Home() {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);

  const checkScreenSize = () => {
    const isMobileScreen = window.innerWidth < 768;
    setShowPopup(isMobileScreen);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const downloadAsPNG = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    const borderElements = Array.from(element.querySelectorAll('.border-b-2'));

    const originalMargin = element.style.margin;

    element.style.top = '0';
    element.style.left = '0';
    element.style.margin = '0';

    domtoimage
      .toBlob(element, {
        filter: (node) => {
          if (node instanceof Element) {
            if (
              node.classList.contains('add-service-button') ||
              node.classList.contains('add-payment-button') ||
              node.classList.contains('remove-button')
            ) {
              return false;
            }
            if (node.classList.contains('border-b-2')) {
              node.classList.remove('border-b-2');
            }
          }
          return true;
        },
      })
      .then(function (blob) {
        borderElements.forEach((el) => el.classList.add('border-b-2'));

        saveAs(blob, 'invoice.png');
        element.style.margin = originalMargin;
      })
      .catch(function (error) {
        console.error('dom-to-image failed:', error);
        element.style.margin = originalMargin;
      });
  };

  const downloadAsPDF = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    const borderElements = Array.from(element.querySelectorAll('.border-b-2'));

    const originalMargin = element.style.margin;

    element.style.top = '0';
    element.style.left = '0';
    element.style.margin = '0';

    domtoimage
      .toBlob(element, {
        filter: (node) => {
          if (node instanceof Element) {
            if (
              node.classList.contains('add-service-button') ||
              node.classList.contains('add-payment-button') ||
              node.classList.contains('remove-button')
            ) {
              return false;
            }
            if (node.classList.contains('border-b-2')) {
              node.classList.remove('border-b-2');
            }
          }
          return true;
        },
      })
      .then(function (blob) {
        borderElements.forEach((el) => el.classList.add('border-b-2'));

        const scale = Math.min(
          210 / element.offsetWidth,
          297 / element.offsetHeight
        );

        const pdf = new jsPDF({
          orientation:
            element.offsetWidth > element.offsetHeight
              ? 'landscape'
              : 'portrait',
          unit: 'mm',
          format: [210, 297],
        });

        const url = URL.createObjectURL(blob);
        pdf.addImage(
          url,
          'PNG',
          0,
          0,
          element.offsetWidth * scale,
          element.offsetHeight * scale
        );
        pdf.save('invoice.pdf');
        URL.revokeObjectURL(url);
        element.style.margin = originalMargin;
      })
      .catch(function (error) {
        console.error('dom-to-image failed:', error);
        element.style.margin = originalMargin;
      });
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background: 'linear-gradient(to bottom, #FBF8EF 0%, #F7EFD7 100%)',
      }}
    >
      {showPopup && <MobilePopup setShowPopup={setShowPopup} />}
      <h1 className="text-4xl font-bold font-satoshi-variable mt-8">
        Create an Invoice
      </h1>
      <div className="flex justify-center mt-4 space-x-4">
      <button
          className="bg-blue-500 text-white font-bold font-satoshi-variable py-2 px-4 rounded hover:bg-blue-600 transition duration-500 ease-in-out"
          onClick={downloadAsPDF}
        >
          Download as PDF
        </button>
        <button
          className="bg-green-500 text-white font-bold font-satoshi-variable py-2 px-4 rounded hover:bg-green-600 transition duration-500 ease-in-out"
          onClick={downloadAsPNG}
        >
          Download as PNG
        </button>
        <button
          className="bg-red-500 text-white font-bold font-satoshi-variable py-2 px-4 rounded hover:bg-red-600 transition duration-500 ease-in-out"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <SweInvoiceTemplate ref={invoiceRef} />
    </div>
  );
}
