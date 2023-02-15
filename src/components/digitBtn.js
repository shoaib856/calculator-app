function DigitBtn({ digit, dispatch }) {
  const handleInput = () => {
    dispatch({
      type: "digit",
      payload: { digit },
    });
  };
  return (
    <button type="button" className="btn" onClick={handleInput}>
      {digit}
    </button>
  );
}

export default DigitBtn;
