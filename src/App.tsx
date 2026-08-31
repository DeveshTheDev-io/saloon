/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from "./components/Hero";
import { ServicesGrid } from "./components/ServicesGrid";
import { BookingForm } from "./components/BookingForm";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <main className="min-h-screen bg-rose-50 font-sans selection:bg-rose-200 selection:text-rose-900">
      <Hero />
      <ServicesGrid />
      <BookingForm />
      <Footer />
    </main>
  );
}
