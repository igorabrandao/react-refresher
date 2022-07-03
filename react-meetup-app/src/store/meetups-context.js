import { createContext, useState } from "react";

const MeetupsContext = createContext({
  meetups: [],
  totalMeetups: 0,
  addMeetup: () => {},
  removeMeetup: () => {},
});

export function MeetupsContextProvider(props) {
  const [meetups, setMeetups] = useState([]);

  function addMeetupHandler(meetup) {
    setMeetups((prevMeetups) => {
      prevMeetups.concat(meetup);
    });
  }

  function removeMeetupHandler(meetupId) {
    setMeetups((prevMeetups) => {
      prevMeetups.filter((meetup) => meetup.id !== meetupId);
    });
  }

  const context = {
    meetups: meetups,
    totalMeetups: meetups.length,
    addMeetup: addMeetupHandler,
    removeMeetup: removeMeetupHandler,
  };

  return (
    <MeetupsContextProvider value={context}>
      {props.children}
    </MeetupsContextProvider>
  );
}

export default MeetupsContext;
