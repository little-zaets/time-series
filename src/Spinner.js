
import RingLoader from "react-spinners/RingLoader";

const Spinner = () => {
	const style = {
    textAlign: "center",
    position: "fixed",
    top: "20%",
    left: "45%"
	};
	return (
		<div style={style}>
			<RingLoader color="#8884d8" size={60}/>
		</div>
	)
}
export default Spinner;