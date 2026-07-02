import { EventHero } from "@/app/components/events/EventHero";
import { EventsExplorer } from "@/app/components/events/EventsExplorer";
import { EventTimeline } from "@/app/components/events/EventTimeline";
import { EventGallery } from "@/app/components/events/EventGallery";
import { EventActionCards } from "@/app/components/events/EventActionCards";

export const metadata = {
  title: "SDG Events & Impact Sessions — StepUp for SDG",
  description:
    "Join education drives, school innovation workshops, NGO collaborations, CSR partner meets, and youth-led SDG action events that create measurable impact.",
};

export default function EventsPage() {
  return (
    <>
      <EventHero />
      <EventsExplorer />
      <EventTimeline />
      {/* Gallery hidden per request — code preserved */}
      <div className="hidden">
        <EventGallery />
      </div>
      <EventActionCards />
    </>
  );
}
