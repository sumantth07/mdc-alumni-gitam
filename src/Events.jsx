import { CalendarDays, Sparkles } from "lucide-react";
import "./Events.css";

const typeClass = {
  "Workshop":        "event-type-workshop",
  "Fun Event":       "event-type-fun",
  "Competition":     "event-type-competition",
  "Hackathon":       "event-type-hackathon",
  "Debug Challenge": "event-type-debug",
};

const Events = () => {
  const events = [
    { name: "Create Your Portfolio",  type: "Workshop",        date: "23-01-2026" },
    { name: "PowerBI Workshop",       type: "Workshop",        date: "29-12-2025" },
    { name: "Flappy Fun",             type: "Fun Event",       date: "16-10-2025" },
    { name: "Resolution Rumble",      type: "Competition",     date: "05-01-2026" },
    { name: "Winter Wave Hackathon",  type: "Hackathon",       date: "15-12-2025" },
    { name: "Who Broke This?",        type: "Debug Challenge", date: "30-09-2025" },
    { name: "Data Canvas",            type: "Workshop",        date: "23-10-2025" },
  ];

  return (
    <div className="events-wrapper" id="events">
      <div className="events-header">
        <h1>Events</h1>
        <p>Explore MDC workshops, hackathons, and competitions.</p>
      </div>
      <div className="events-grid">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-date">
              <CalendarDays size={15} />
              <span>{event.date}</span>
            </div>
            <h2 className="event-title">{event.name}</h2>
            <div className={`event-type-badge ${typeClass[event.type] || "event-type-default"}`}>
              <Sparkles size={12} />
              {event.type}
            </div>
            <button className="event-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;