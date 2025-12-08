const ZoomMeeting = ({ firstName }) => {
  const handleClick = (event) => {
    event.preventDefault();
    window.open(
      "https://us06web.zoom.us/j/81408067206?pwd=APoK4zISWOP8iDB0vqfBYRUxfcxVpH.1",
      "_blank",
      "noopener,noreferrer"
    );
    window.location.reload();
  };

  return (
    <a
      href="https://us06web.zoom.us/j/81408067206?pwd=APoK4zISWOP8iDB0vqfBYRUxfcxVpH.1"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white rounded"
      onClick={handleClick}
    >
      السلام عليكم ورحمة الله وبركاته
      <br />
      {firstName.toUpperCase()}
      <br />
      CLIQUE ICI POUR REJOINDRE LA RÉUNION
    </a>
  );
};

export default ZoomMeeting;
