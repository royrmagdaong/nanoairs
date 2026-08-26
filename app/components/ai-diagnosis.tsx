
export default function AIDiagnosis() {
  return (
    <div className="px-3 py-2 text-gray-600">
      <div className="text-sm font-semibold ">AI Diagnosis</div>
      <ul className="list-disc ml-10 text-sm">
        <li>Water condition is chemically unstable due to low alkalinity, and DO data is unreliable due to sensor error.</li>
        <li>The farm is not in immediate collapse condition, but if alkalinity is not corrected, pH crash risk is high.</li>
      </ul>
    </div>
  );
}
