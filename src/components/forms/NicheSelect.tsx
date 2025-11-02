type Props = {
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  id?: string;
};

const NICHES = [
  "Lifestyle",
  "Tech",
  "Fashion",
  "Food",
  "Comedy",
  "Gaming",
  "Education",
  "Beauty",
  "Music",
  "Sports",
  "Business",
  "Other",
];

export default function NicheSelect({ value, onChange, required, id }: Props) {
  return (
    <select
      id={id}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl bg-[#F3EFEB] text-primary px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20"
    >
      <option value="">Select Your Niche</option>
      {NICHES.map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  );
}
