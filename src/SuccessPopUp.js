const SuccessPopUp = ({ winner, handleRestart }) => {
  return (
    <dialog className="success" open={winner}>
      <div className="success-notification">
        <h3>{winner}</h3>
        <button onClick={handleRestart} className="success-button">
          Restart
        </button>
      </div>
    </dialog>
  );
};

export default SuccessPopUp;
