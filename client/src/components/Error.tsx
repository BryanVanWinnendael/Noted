/* This is a reusable error component */
export const Error = ({ message }: { message?: string[] | string }) => {
  return <p class="text-red-500 text-sm -mt-1">{message}</p>
}
