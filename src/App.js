import logo from './logo.svg';
import './App.css';
import html2canvas from 'html2canvas'
function App() {

const isMobile = () => {
	return (
		(navigator.userAgent.match(/Android/i)) ||
		(navigator.userAgent.match(/iPhone/i)) ||
		(navigator.userAgent.match(/iPod/i)) ||
		(navigator.userAgent.match(/iPad/i)) ||
		(navigator.userAgent.match(/BlackBerry/i))
	);
}

// SACAR SCREENSHOT Y PASARLO A PDF
const createPdf = () => {
	// CUALQUIER ITEM QUE NO DESEO QUE APAREZCA
	// LE DOY LA CLASE "removeFromPdf";
	const removeFormPdf = () => {
		document.querySelectorAll(".removeFormPdf")
			.forEach((elem) => (elem, elem.remove()));
	}
	let screenShot = document.querySelector("pdf");
	if (isMobile()) {
		removeFormPdf();
		html2canvas(screenShot)
			.then(canvas => {
				let pdf = window.open('', '_self');
				pdf.document.write("<img style='width:100%; height:auto;' src='" + canvas.toDataURL() + "'/>");
				setTimeout(() => {
					pdf.print();
					window.onafterprint(pdf.location.reload());
				}, 200);
			});
	} else {
		removeFormPdf();
		html2canvas(screenShot)
			.then(canvas => {
				let pdf = window.open('', '_blank', 'width=600,height=400,left=50,top=50, toolbar=yes');
				pdf.document.write("<img style='width:100%; height:auto;' src='" + canvas.toDataURL() + "'/>");
				setTimeout(() => {
					pdf.print();
					pdf.close();
					window.onafterprint(window.location.reload());
				}, 200);
			});
	}
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={() => createPdf()}>PDF</button>
    </div>
  );
}

export default App;
