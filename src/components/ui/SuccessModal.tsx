import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  details?: string;
  ctaText?: string;
};

export default function SuccessModal({
  open,
  onClose,
  title,
  subtitle,
  details,
  ctaText = "Great!",
}: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end sm:items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
                <div className="p-6 sm:p-8">
                  {/* animated check */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8 text-emerald-600"
                    >
                      <path
                        fill="currentColor"
                        d="M9.5 16.2 5.8 12.5l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4z"
                      />
                    </svg>
                  </motion.div>

                  <Dialog.Title className="text-center text-2xl font-extrabold text-primary">
                    {title}
                  </Dialog.Title>
                  {subtitle && (
                    <p className="mt-2 text-center text-neutral-600">
                      {subtitle}
                    </p>
                  )}
                  {details && (
                    <p className="mt-4 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                      {details}
                    </p>
                  )}

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={onClose}
                      className="rounded-2xl bg-[#187DD0] px-5 py-3 text-white font-semibold hover:opacity-95 active:opacity-90"
                    >
                      {ctaText}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
