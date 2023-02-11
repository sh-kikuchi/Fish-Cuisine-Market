import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementCount, decrementCount } from '../../slices/countSlice'
import { RootState } from '../../store/index'

function CountPage() {
  const count = useSelector((state: RootState) => state.count);
  const dispatch = useDispatch();
  const increase = () => {
    //dispatchでactionをstoreに渡す
    dispatch(incrementCount());
  };
  const decrease = () => {
    dispatch(decrementCount());
  };
  return (
    <>
      {/* <div className="count">Countコンポーネント:{count}</div> */}
      <p>{count.count}</p>
      <button onClick={increase}>Up</button>
      <button onClick={decrease}>Down</button>
    </>
  );
}
export default CountPage;
