function createList(_json) {
	let target = document.getElementById("panelList");
	let openDiv = document.createElement("div");
	openDiv.classList.add("line");
	target.appendChild(openDiv);
	let closeDiv = document.createElement("div");
	closeDiv.classList.add("line");
	target.appendChild(closeDiv);
	let openDivs = {};
	let closeDivs = {};
	let currentDate = new Date();
	_json.forEach(data => {
		let openDate = new Date(data.open);
		let closeDate = new Date(data.close);
		closeDate.setDate(closeDate.getDate() + 1);
		let area = data.url.slice(-2);
		if (openDate > currentDate || currentDate > closeDate) {
			if(!closeDivs[area]) {
		 		closeDivs[area] = document.createElement("div");
					closeDivs[area].classList.add("line");
					closeDiv.appendChild(closeDivs[area]);
			}
			createFrame(openDate, closeDate, closeDivs[area], `${data.name}\n(${data.open} ~ ${data.close})`, data.url);
		}
		else {
			if(!openDivs[area]) {
		 		openDivs[area] = document.createElement("div");
					openDivs[area].classList.add("line");
					openDiv.appendChild(openDivs[area]);
 			}
			createFrame(openDate, closeDate, openDivs[area], `${data.name}\n(${data.open} ~ ${data.close})`, data.url);
		}
	});
	if (target.children.length <= 0) createFrame(target, "滑走可能なゲレンデはありません。", null);
}

function createFrame(_openDate, _closeDate, _parent, _name, _url) {
	let div = document.createElement("div");
	div.classList.add("frame");
	_parent.appendChild(div);

	createName(_openDate, _closeDate, div, _name);
	if (_url) {
		createIframeBlock(div, _url);
	}
}

function createName(_openDate, _closeDate, _parent, _name) {
	let p = document.createElement("p");
	p.innerText = _name;
	var currentDate = new Date();
	if (_openDate > currentDate || currentDate > _closeDate) {
		p.classList.add("color_red");
	}
	_parent.appendChild(p);
}

function createIframeBlock(_parent, _url) {
	let div = document.createElement("div");
	div.classList.add("iframe_block");
	_parent.appendChild(div);

	let iframe = document.createElement("iframe");
	iframe.src = _url+"#tenki-tbl-margin";
	iframe.frameBorder = "0";
	iframe.scrolling = "no";
	div.appendChild(iframe);
}
