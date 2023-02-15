function OperationBtn({ operation, dispatch }) {
  const handleInput = () => {
    dispatch({
      type: "operation",
      payload: { operation },
    });
  };
  return (
    <button type="button" className="btn" onClick={handleInput}>
      {operation}
    </button>
  );
}

export default OperationBtn;
