import { CONTACT } from "../data";
import { Phone, MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-rose-950 text-rose-50 py-16 border-t border-rose-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div>
          <h3 className="text-2xl font-serif font-bold text-white mb-4">
            {CONTACT.businessName}
          </h3>
          <p className="text-rose-200/80 max-w-sm mb-6">
            Premium home salon services exclusively for females. Professional care, exceptional comfort.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/50 border border-rose-800 text-sm text-rose-300">
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
            <span>By {CONTACT.name}</span>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-rose-200/80">
              <Phone className="w-5 h-5 text-rose-400 shrink-0" />
              <span>
                Mobile / WhatsApp: <br />
                <a href={`tel:+91${CONTACT.phone}`} className="text-white hover:text-rose-300 transition-colors">
                  +91 {CONTACT.phone}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3 text-rose-200/80">
              <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
              <span>
                {CONTACT.address}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-rose-900/50 text-center text-rose-400/60 text-sm">
        &copy; {new Date().getFullYear()} {CONTACT.businessName}. All rights reserved.
      </div>
    </footer>
  );
}
