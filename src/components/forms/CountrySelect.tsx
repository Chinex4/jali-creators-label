import { useEffect, useMemo, useState } from "react";

export type Country = { name: string; flag: string; cca2: string };

type Props = {
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  id?: string;
};

export default function CountrySelect({ value, onChange, required, id }: Props) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2");
        const data = await res.json();
        if (!alive) return;
        const list: Country[] = data
          .map((c: any) => ({
            name: c?.name?.common ?? "",
            flag: c?.flags?.png ?? c?.flags?.svg ?? "",
            cca2: c?.cca2 ?? "",
          }))
          .filter((c: Country) => c.name)
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(list);
      } catch (e) {
        setCountries([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const options = useMemo(() => countries, [countries]);

  return (
    <div className="relative">
      <select
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl bg-[#F3EFEB] text-primary px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
      >
        <option value="">{loading ? "Loading countries..." : "Country"}</option>
        {options.map((c) => (
          <option key={c.cca2 || c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      {/* Show the selected flag (if available) */}
      {value && (
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          {(() => {
            const current = options.find((o) => o.name === value);
            return current ? (
              <img src={current.flag} alt="" className="h-5 w-7 object-cover rounded-sm" />
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
}
