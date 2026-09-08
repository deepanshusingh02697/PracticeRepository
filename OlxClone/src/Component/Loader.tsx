import { RotatingLines } from "react-loader-spinner";
const Loader = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "100px",
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RotatingLines
          strokeColor="#0078FA"
          strokeWidth="5"
          animationDuration="0.75"
          width="70"
          visible={true}
        />
      </div>
    </>
  );
};
export default Loader;
