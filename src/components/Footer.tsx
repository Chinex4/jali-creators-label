import JaliButton from "./ui/JaliButton";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-[#FBF7F2] px-4 md:px-0">
      <div className="max-w-6xl mx-auto py-5 md:py-10 flex flex-col gap-10 md:gap-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-0 ">
          {/* Logo left */}
          <Link to="/" className="flex items-center gap-4">
            <img className="w-40 md:w-[201px]" src="/images/logo.png" alt="" />
          </Link>
          {/* CTA row */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <JaliButton
              variant="primary"
              right={
                <span>
                  <img className="w-6" src="/images/emoji.png" alt="" />
                </span>
              }
            >
              Join as a Creator
            </JaliButton>

            <JaliButton
              variant="secondary"
              right={<span>
                  <img className="w-6" src="/images/briefcase.png" alt="" />

              </span>}
            >
              Register as a Brand
            </JaliButton>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between">
          {/* Copyright center */}
          <p className="text-center text-primary/70 text-sm md:text-base">
            Copyright © 2023 Jali | All Rights Reserved
          </p>

          {/* Socials right */}
          <div className="flex items-center gap-5 justify-end">
            <a href="#" aria-label="Facebook" className="hover:opacity-70">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="X" className="hover:opacity-70">
              <FaXTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:opacity-70">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:opacity-70">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="YouTube" className="hover:opacity-70">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
