import Button from "@/components/Button";
import { IconLinkedIn, IconTwitterX, IconInstagram } from "@/components/Icons";

export default function Book() {
  const mailtoUrl = `mailto:andrewjohnonline@me.com?subject=${encodeURIComponent("Appointment Request Re: Project")}&body=${encodeURIComponent("Hey Andrew, Can we talk about my project this week. Let me know when is best for us to have a virtual call.")}`;
  return (
    <div className="px-4 sm:px-6 md:px-0">
      <h2 id="book-heading" className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight">Book a Call</h2>
      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted max-w-2xl">Let's discuss your goals and the outcomes you want to achieve. I'll share relevant work and a simple plan forward.</p>
      <div className="mt-6 sm:mt-8">
        <a href={mailtoUrl} className="block sm:inline-block">
          <Button className="w-full sm:w-auto">Book a slot</Button>
        </a>
      </div>
      <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-4">
        <a 
          className="hover:text-fg focus-ring w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors" 
          href="https://www.linkedin.com/in/andrew-john-a42ba32a/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn"
        >
          <IconLinkedIn className="w-5 h-5 sm:w-full sm:h-full" />
        </a>
        <a 
          className="hover:text-fg focus-ring w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors" 
          href="https://x.com/andrewxjay" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="X (formerly Twitter)"
        >
          <IconTwitterX className="w-5 h-5 sm:w-full sm:h-full" />
        </a>
        <a 
          className="hover:text-fg focus-ring w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors" 
          href="https://www.instagram.com/byandrewjay/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Instagram"
        >
          <IconInstagram className="w-5 h-5 sm:w-full sm:h-full" />
        </a>
      </div>
    </div>
  );
}


