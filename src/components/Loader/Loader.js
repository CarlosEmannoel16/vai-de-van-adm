import { MutatingDots,Dna,Watch, Rings, MagnifyingGlass } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MagnifyingGlass
        height="100"
        width="100"
        color="#320D6D"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
