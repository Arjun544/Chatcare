import React from 'react'

const StoryTile = ({story}) => {
  return <div className="h-16 w-16 mr-4 rounded-full bg-red-600">{story.name}</div>;
}

export default StoryTile