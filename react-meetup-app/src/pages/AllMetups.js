import { useState, useEffect } from "react";

import MeetupList from "../components/meetups/MeetupList";

function AllMetupsPage() {
  const [isLoading, setIsLoadinng] = useState(false);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoadinng(true);
    fetch(
      "https://react-meetup-app-eda0d-default-rtdb.firebaseio.com/meetups.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };

          meetups.push(meetup);
        }

        setIsLoadinng(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <section>
          <p>Loading...</p>
        </section>
      ) : (
        <section>
          <h1>All Meetups</h1>
          <MeetupList meetups={loadedMeetups} />
        </section>
      )}
    </div>
  );
}

export default AllMetupsPage;
