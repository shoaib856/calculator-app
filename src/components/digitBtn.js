function DigitBtn({ digit, dispatch, theme }) {
  const handleInput = () => {
    dispatch({
      type: "digit",
      payload: { digit },
    });
  };
  return (
    <button type="button" className={`btn-${theme}`} onClick={handleInput}>
      {digit}
    </button>
  );
}

export default DigitBtn;
