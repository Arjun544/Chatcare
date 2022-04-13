import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

import styles from "./Home.module.css";

const stories = [
  {
    name: "Sara",
  },
  {
    name: "Sam",
  },
  {
    name: "Arjun",
  },
];

const Conversations = () => {
  const [isStoriesOpened, setIsStoriesOpened] = useState(false);

  return (
    <>
      {/* Stories */}
      <div className={styles.stories}>
        <div className={styles.collapsedStories}>
          <h5>Stories (12)</h5>
          <TiArrowSortedDown
            onClick={(e) => setIsStoriesOpened(!isStoriesOpened)}
            fontSize={25}
            style={{
              transform: "rotate(-90deg)",
            }}
          />
        </div>
        {/* Stories list */}
        {isStoriesOpened && (
          <div className={styles.openedStories}>
            {stories.map((story, index) => (
              <div className={styles.storyItem}>{story.name}</div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.conversationWrapper}>
        <div className={styles.messages}></div>
      </div>
    </>
  );
};

export default Conversations;
