import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  id?: string; // used for hidden input for form submission/validation
};

const NICHES = [
  "Hospitality",
  "Fitness",
  "Tech",
  "Finance",
  "Branding & Marketing",
  "Management",
  "Food",
  "Agriculture",
  "Fashion",
  "Trade",
];

export default function NicheSelect({ value, onChange, required, id }: Props) {
  const placeholder = "Select Your Niche";

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

      <Listbox value={value ?? ""} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className="
              w-full rounded-2xl bg-[#F3EFEB] text-primary px-5 py-4
              outline-none focus:ring-2 focus:ring-primary/20
              flex items-center justify-between
            "
          >
            <span className={`truncate ${value ? "" : "text-primary/60"}`}>
              {value || placeholder}
            </span>
            <ChevronUpDownIcon className="h-5 w-5 shrink-0 text-primary/60" />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="
                absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl
                bg-white shadow-lg ring-1 ring-black/5 focus:outline-none
              "
            >
              <Listbox.Option
                key="__placeholder"
                value=""
                className={({ active }) =>
                  `cursor-default select-none px-4 py-2 text-sm ${
                    active ? "bg-neutral-100 text-primary" : "text-neutral-600"
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center">
                    <span className="truncate">{placeholder}</span>
                    {selected ? (
                      <CheckIcon className="ml-auto h-4 w-4" />
                    ) : null}
                  </div>
                )}
              </Listbox.Option>

              {NICHES.map((n) => (
                <Listbox.Option
                  key={n}
                  value={n}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 text-sm ${
                      active ? "bg-[#F3EFEB] text-primary" : "text-primary"
                    }`
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center">
                      <span className={`truncate ${selected ? "font-semibold" : ""}`}>
                        {n}
                      </span>
                      {selected ? <CheckIcon className="ml-auto h-4 w-4" /> : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
