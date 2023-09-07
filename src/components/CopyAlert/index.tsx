type CopyAlertProps = {
  handleClose: () => void
};

function CopyAlert({ handleClose }:CopyAlertProps) {
  return (
    <section>
      <span>Link copied!</span>
      <button type="button" onClick={ handleClose }>X</button>
    </section>
  );
}

export default CopyAlert;
