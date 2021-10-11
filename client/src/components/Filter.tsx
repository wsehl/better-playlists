import React from "react"

interface Props {
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Filter(props: Props) {
  return (
    <input
      type="text"
      placeholder="Type something..."
      className="h-10 px-2 rounded border border-gray-800 hover:border-gray-500-spotify placeholder-gray-600 focus:ring-1 focus:outline-none ring-gray-500 ring-opacity-20 bg-gray-800-spotify"
      onKeyUp={(event: any) => props.onTextChange(event.target.value)}
    />
  )
}
