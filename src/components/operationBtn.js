function OperationBtn({ operation, dispatch, theme }) {
  const handleInput = () => {
    dispatch({
      type: "operation",
      payload: { operation },
    });
  };
  return (
    <button type="button" className={`btn btn-${theme}`} onClick={handleInput}>
      {operation}
    </button>
  );
}

export default OperationBtn;
