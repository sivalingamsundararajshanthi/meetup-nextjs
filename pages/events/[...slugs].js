import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";

import EventList from "../../components/events/event-list";

import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage() {
  const router = useRouter();

  const filteredData = router.query.slugs;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const fileteredYear = filteredData[0];
  const fileteredMonth = filteredData[1];

  const numYear = +fileteredYear;
  const numMonth = +fileteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <div>
        <ErrorAlert>
          <p>Invalid filter, please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </div>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </div>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;
