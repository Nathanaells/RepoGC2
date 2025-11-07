export function PrimaryButton({ text, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-medium mb-5"
    >
      {text}
    </button>
  );
}

export function SecondaryButton({ text, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
    >
      {text}
    </button>
  );
}
