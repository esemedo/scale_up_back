export function getStatusNumber(status?: string) {
  let statusNumber: number | undefined;
  switch (status) {
    case "pending":
      statusNumber = 0;
      break;
    case "approved":
      statusNumber = 1;
      break;
    case "rejected":
      statusNumber = 2;
      break;
    default:
      break;
  }

  return statusNumber;
}
