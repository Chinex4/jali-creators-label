import { useEffect, useMemo, useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export type Country = { name: string; flag: string; cca2: string };

type Props = {
  value?: string; // country name
  onChange: (value: string | null) => void;
  required?: boolean;
  id?: string; // used for hidden input for form submission/validation
};

export default function CountrySelect({
  value,
  onChange,
  required,
  id,
}: Props) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,cca2"
        );
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
      } catch {
        setCountries([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filtered =
    query.trim() === ""
      ? countries
      : countries.filter((c) =>
          c.name.toLowerCase().includes(query.trim().toLowerCase())
        );

  const current = useMemo(
    () => countries.find((c) => c.name === value),
    [countries, value]
  );

  return (
    <div className="relative">
      {/* Hidden input so forms can submit and 'required' works */}
      <input
        type="text"
        id={id}
        name={id}
        value={value ?? ""}
        onChange={() => {}}
        required={required}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      <Combobox value={value ?? ""} onChange={onChange}>
        <div className="relative">
          <div
            className="
              flex items-center gap-2 w-full rounded-2xl bg-[#F3EFEB] px-4 py-2
              focus-within:ring-2 focus-within:ring-primary/20
            "
          >
            {current?.flag ? (
              <img
                alt=""
                src={current.flag}
                className="h-5 w-7 rounded-sm object-cover"
              />
            ) : (
              <MagnifyingGlassIcon className="h-5 w-5 text-primary/60" />
            )}

            <Combobox.Input
              displayValue={(v: string) => v}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={loading ? "Loading countries..." : "Country"}
              className="
                flex-1 bg-transparent text-primary outline-none placeholder:text-primary/60
                py-2
              "
            />

            <Combobox.Button className="shrink-0">
              <ChevronUpDownIcon className="h-5 w-5 text-primary/60" />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options
              className="
                absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl
                bg-white shadow-lg ring-1 ring-black/5 focus:outline-none
              "
            >
              {filtered.length === 0 && !loading ? (
                <div className="px-4 py-3 text-sm text-neutral-600">
                  No results.
                </div>
              ) : (
                filtered.map((c) => (
                  <Combobox.Option
                    key={c.cca2 || c.name}
                    value={c.name}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 text-sm ${
                        active ? "bg-[#F3EFEB] text-primary" : "text-primary"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center gap-3">
                        {c.flag ? (
                          <img
                            alt=""
                            src={c.flag}
                            className="h-5 w-7 rounded-sm object-cover"
                          />
                        ) : (
                          <span className="inline-block h-5 w-7 bg-neutral-200 rounded-sm" />
                        )}
                        <span
                          className={`truncate ${
                            selected ? "font-semibold" : ""
                          }`}
                        >
                          {c.name}
                        </span>
                        {selected ? (
                          <CheckIcon className="ml-auto h-4 w-4" />
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
