interface StatusProps {
    name: string;
}

export default function Status({name}: StatusProps) {
  return (
    <div
      className={`outline rounded-sm px-1 py-1 font-medium ${
        name === "Danger"
          ? "bg-red-200 text-red-700"
          : name === "Off"
          ? "bg-red-200 text-red-700"
          : name === "Warning"
          ? "bg-orange-200 text-orange-700"
          : name === "Low"
          ? "bg-orange-200 text-orange-700"
          : "bg-green-200 text-green-600"
      }`}

      style={{fontSize: "11px"}}
    >
      <span>{name}</span>
    </div>
  );
}
