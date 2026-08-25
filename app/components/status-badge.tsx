interface StatusProps {
    name: string;
}

export default function Status({name}: StatusProps) {
  return (
    <div
      className={`outline rounded-sm px-1 py-1 font-medium ${
        name === "Danger"
          ? "bg-red-100 text-red-500"
          : name === "Off"
          ? "bg-red-100 text-red-500"
          : name === "Warning"
          ? "bg-yellow-100 text-orange-600"
          : name === "Low"
          ? "bg-yellow-100 text-orange-600"
          : "bg-green-100 text-green-600"
      }`}

      style={{fontSize: "11px"}}
    >
      <span>{name}</span>
    </div>
  );
}
