"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CategoryOverlay, { type MediaItem } from "@/components/CategoryOverlay";

type CategoryKey = "marketing" | "video" | "web";

const CATEGORY_CARDS: Record<CategoryKey, { title: string; subtitle: string; description: string; media: MediaItem[]; gradient: string; }>
  = {
  marketing: {
    title: "Digital Marketing",
    subtitle: "Case studies & campaigns",
    description: `With a decade of experience spanning technology, FMCG and travel, I’ve become known for designing content strategies that deliver measurable results. At Ingram Micro I managed brand activation across EMEA, producing campaigns for vendors like HPE, Cisco, Adobe, Apple and Microsoft that drove more than $1 million in influenced sales and over 100 individual projects. Previous roles include leading social strategy for Britvic Soft Drinks, where my data‑driven approach took Tango’s Instagram following from 2 K to over 13 K, launched Purdey’s social channels past 10 K followers and grew Robinsons and Fruit Shoot to more than 30 K followers across platforms. I bring this mix of creativity and analytics to every project from crafting Facebook Canvas ads and long‑form videos to writing copy that resonates and building full‑funnel campaigns.

I’ve also overseen major launches for hospitality, automotive and travel brands. At creative agency That Lot I rolled out the VOCO hotel brand for IHG, attracting over 3 K followers in the first month, and produced targeted assets that helped Holiday Inn Express hit 1 million Facebook fans. I devised a global social plan for Shell’s Rimula brand across China, Malaysia, Russia and Indonesia. As social content producer at TUI I spearheaded the #HELLOTUI campaign, reaching 75 % of the UK population and pushing TUI’s Facebook community past 1 million while securing more than 5 million engagements for First Choice. I’ve delivered individual pieces that have generated 150 K engagements, 9.95 million video starts and market‑leading recall rates. This blend of hands‑on production, strategic thinking and proven growth makes me an ideal partner for brands seeking to elevate their digital presence.`,
    media: [
      { type: "embed", src: "https://player.vimeo.com/video/258088343?autoplay=0&title=0&byline=0&portrait=0", alt: "Digital Marketing case study video" },
      
    ],
    gradient: "bg-[radial-gradient(60%_50%_at_70%_30%,rgba(255,46,166,0.10),transparent)]",
  },
  video: {
    title: "Video",
    subtitle: "Editorial & motion",
    description: `My show reel is a high‑energy snapshot of the stories I’ve crafted as an editor and director. In just under a minute, you’ll see how I bring brands and artists to life across a range of formats—from social ads and concept pieces to launch films and music videos. I’ve captured the edge of streetwear for Hype Clothing, imagined a fresh take on Nike, introduced homebuyers to INNOVA Homes, and shaped the look and feel of emerging artists like Nate the Lyricist and Dee V. You’ll also glimpse adverts for Alade Perfumes and LORD Timepieces, a dynamic dance showcase, and web and YouTube series for The Good and Louis the Hippie. Even behind‑the‑scenes footage from a wedding finds its place here, showing my ability to tell intimate stories as well as big brand narratives.

This collection isn’t just about slick visuals—it’s a testament to my versatility and storytelling instincts. Whether directing a product launch or cutting a music video, I focus on weaving a narrative that matches the brand’s voice while engaging audiences across social platforms. Each segment highlights my attention to pacing, colour, and composition, as well as my knack for working with talent in front of the camera. The result is a reel that moves smoothly from sportswear to fragrances, from architecture to dance, yet always feels cohesive. If you’re looking for a filmmaker who can adapt to any brief and deliver polished, memorable content, my show reel offers a taste of what I can bring to your next project.`,
    media: [
      { type: "embed", src: "https://player.vimeo.com/video/344082080?autoplay=1&title=0&byline=0&portrait=0", alt: "Showreel" },
      { type: "image", src: "/projects/disney/1.svg" },
      { type: "image", src: "/projects/ember/2.svg" },
      
    ],
    gradient: "bg-[radial-gradient(70%_60%_at_30%_70%,rgba(0,0,0,0.06),transparent)]",
  },
  web: {
    title: "Website Design",
    subtitle: "Product & marketing sites",
    description: `I design and build digital experiences that help businesses stand out and drive results. My web portfolio spans everything from conversion‑driven landing pages and polished WordPress sites to custom email templates for marketing campaigns. I've delivered property websites that showcase listings with ease, sophisticated restaurant sites that capture atmosphere and menu details, vibrant agency portfolios, and engaging blogs that keep readers coming back. Across each project, I focus on aesthetics, performance and brand‑appropriate design so that every site looks great, loads quickly and tells the right story.

Beyond the surface, I believe in crafting sites that work hard behind the scenes. Whether it's integrating booking engines for real‑estate clients, implementing reservation systems for restaurants, or tailoring CMS functionality in WordPress, I balance creativity with technical know‑how. My experience in email marketing means I understand how web and email campaigns can work together to capture and nurture leads. All projects are built with responsive layouts, thoughtful information architecture and an eye on SEO, giving each client a strong foundation for future growth. Together, these skills ensure that your website isn't just a digital business card but a powerful tool for attracting and converting customers.`,
    media: [
      { type: "image", src: "/projects/websites/think-with-ai/Screenshot 2025-09-11 at 13.33.16.png", alt: "Think with AI website screenshot" },
      { type: "image", src: "/projects/websites/innova/Screenshot 2025-09-11 at 12.57.50.png", alt: "Innova website screenshot" },
      { type: "image", src: "/projects/websites/accounts/accounts.png", alt: "Accounting software dashboard interface" },
      { type: "image", src: "/projects/websites/magic-match/Screenshot 2025-06-30 at 17.52.12.png", alt: "MagicMatch outfit generator interface" },
      { type: "image", src: "/projects/websites/octupus-creative/Screenshot 2025-09-11 at 13.31.55.png", alt: "Octupus Creative website screenshot" },
      { type: "image", src: "/projects/websites/think-with-ai/Screenshot 2025-09-11 at 13.33.34.png", alt: "Think with AI website second screenshot" },
      { type: "image", src: "/projects/websites/innova/Screenshot 2025-09-11 at 12.58.49.png", alt: "Innova website second screenshot" },
      { type: "image", src: "/projects/websites/octupus-creative/Screenshot 2025-09-11 at 13.32.10.png", alt: "Octupus Creative website second screenshot" },
    ],
    gradient: "bg-[radial-gradient(65%_55%_at_80%_20%,rgba(0,0,0,0.05),transparent)]",
  },
};

export default function Portfolio() {
  const [active, setActive] = useState<CategoryKey | null>(null);

  return (
    <div className="px-4 sm:px-6 md:px-0">
      <h2 id="portfolio-heading" className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight">Portfolio</h2>
      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted max-w-2xl">Explore my work.</p>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {(Object.keys(CATEGORY_CARDS) as CategoryKey[]).map((key) => {
          const c = CATEGORY_CARDS[key];
          return (
            <motion.div
              key={key}
              className={`group relative overflow-hidden rounded-2xl border border-black/10 bg-white text-left p-4 sm:p-5 md:p-6 ${c.gradient}`}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
            >
              <div className="relative z-[1] h-full flex flex-col">
                <div>
                  <div className="text-xs sm:text-sm text-muted">{c.subtitle}</div>
                  <div className="mt-1 text-lg sm:text-xl md:text-2xl font-semibold">{c.title}</div>
                  <div className="mt-2 sm:mt-3 text-sm text-muted line-clamp-3">{c.description}</div>
                </div>
                <div className="mt-auto pt-4 sm:pt-6">
                  <button 
                    className="w-full sm:w-auto bg-pink-500 text-white hover:bg-pink-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    onClick={() => setActive(key)}
                    aria-label={`Open ${c.title}`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <CategoryOverlay
            isOpen={!!active}
            title={CATEGORY_CARDS[active].title}
            subtitle={CATEGORY_CARDS[active].subtitle}
            description={CATEGORY_CARDS[active].description}
            media={CATEGORY_CARDS[active].media}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

