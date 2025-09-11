import { services } from "@/data/services";
import ServiceItem from "@/components/ServiceItem";

export default function Services() {
  return (
    <div>
      <h2 id="services-heading" className="text-3xl md:text-5xl font-semibold tracking-tight">Services</h2>
      <p className="mt-3 text-muted max-w-2xl">End-to-end solutions for digital presence, from websites and branding to content and video.</p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <ServiceItem key={s.id} title={s.title} description={s.description} />
        ))}
      </div>
    </div>
  );
}


