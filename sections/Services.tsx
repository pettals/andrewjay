import { services } from "@/data/services";
import ServiceItem from "@/components/ServiceItem";

export default function Services() {
  return (
    <div className="px-4 sm:px-6 md:px-0">
      <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight">Services</h2>
      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted max-w-2xl">End-to-end solutions for digital presence, from websites and branding to content and video. [Updated Sept 2025]</p>
      <div className="mt-6 sm:mt-8 md:mt-10 pb-6 sm:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((s) => (
          <ServiceItem key={s.id} title={s.title} description={s.description} />
        ))}
      </div>
    </div>
  );
}


