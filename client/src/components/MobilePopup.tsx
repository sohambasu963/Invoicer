export default function MobilePopup(setShowPopup: any) {
  return (
    <div className="popup fixed inset-0 flex items-center -mt-16 p-4 h-[60vh] w-[95vw]">
      <div className="bg-white rounded-lg shadow-lg p-5 relative">
        <button
          className="absolute top-2 right-2 text-lg"
          onClick={() => setShowPopup(false)}
        >
          &times;
        </button>
        <p>Please use a desktop device for a better experience.</p>
      </div>
    </div>
  );
}
