const multiSelect = document.querySelector(".multiselect");
const botunAtrNext = document.querySelector(".atr-page-next");
const botunFovNext = document.querySelector(".fov-page-next");
const botunFovPrev = document.querySelector(".fov-page-prev");
const botunKljNext = document.querySelector(".klj-page-next");
const botunKljPrev = document.querySelector(".klj-page-prev");
const botunNfPrev = document.querySelector(".nf-page-prev");
const gridContainer = document.querySelector(".grid-container");
const unosAtributa = document.querySelector(".unos-atributa");
const atributInput = document.querySelector(".atribut-input");
const addAtribut = document.querySelector(".add-atribut");
const addRelacija = document.querySelector(".addRelacija");
const atributiList = document.querySelector(".atributi-list");
const atributDeleteBtn = document.querySelectorAll(".atrBtni", ".delete-btn");
const forme = document.querySelector(".forme");

let atrNum = 0,
	relNum = 0,
	kljucNum = 0,
	gridPos = 0;

let atributi = [


	// { id: 0, value: "St" },
	// { id: 1, value: "V" },
	// { id: 2, value: "P" },
	// { id: 3, value: "U" },
	// { id: 4, value: "So" },
	// { id: 5, value: "O" },


	{ id: 0, value: "A" },
	{ id: 1, value: "B" },
	{ id: 2, value: "C" },
	{ id: 3, value: "D" },
	{ id: 4, value: "E" },


	// { id: 0, value: "A" },
	// { id: 1, value: "B" },
	// { id: 2, value: "C" },
	// { id: 3, value: "D" },

	// { id: 0, value: "A" },
	// { id: 1, value: "B" },
	// { id: 2, value: "C" },
	// { id: 3, value: "D" },
	// { id: 4, value: "E" },


	// { id: 0, value: "A" },
	// { id: 1, value: "B" },
	// { id: 2, value: "C" },
	// { id: 3, value: "D" },


	// { id: 0, value: "A" },
	// { id: 1, value: "B" },
	// { id: 2, value: "C" },
	// { id: 3, value: "D" },

];
let funkcijskeOvisnosti = [


	// { id: 0, l: [2], r: [3] },
	// { id: 1, l: [1, 4], r: [2] },
	// { id: 2, l: [1, 3], r: [4] },
	// { id: 3, l: [0, 1], r: [4] },
	// { id: 4, l: [0, 2], r: [5] },


	{ id: 0, l: [0, 1], r: [2, 3] },
	{ id: 1, l: [3], r: [4] },
	{ id: 2, l: [0], r: [2] },
	{ id: 3, l: [1], r: [3] },


	// { id: 0, l: [0], r: [1] },
	// { id: 1, l: [1], r: [0, 2, 3] },
	// { id: 2, l: [2], r: [3] },


	// { id: 0, l: [0, 1], r: [2] },
	// { id: 1, l: [1], r: [2] },
	// { id: 2, l: [2], r: [3] },


	// { id: 0, l: [0], r: [1, 2] },
	// { id: 1, l: [1], r: [3] },
	// { id: 2, l: [2], r: [3] },
	// { id: 3, l: [2], r: [1] },


	// { id: 0, l: [0], r: [1, 2] },
	// { id: 1, l: [1], r: [0] },
	// { id: 2, l: [2], r: [1] },

];
let origTxt = [];
let kljucevi = [];

function findId(arr, el) {
	return arr.findIndex((element) => element.id == el);
}

function updateSelectText(relID) {
	let selTxtL = document.getElementsByClassName(`selectText ${relID}-l`);
	let selTxtR = document.getElementsByClassName(`selectText ${relID}-r`);
	if (funkcijskeOvisnosti[findId(funkcijskeOvisnosti, relID)]["l"].length != 0)
		selTxtL[0].innerText = strFromArr(funkcijskeOvisnosti[findId(funkcijskeOvisnosti, relID)]["l"]);
	else selTxtL[0].innerText = "Izaberite atribut/e";
	if (funkcijskeOvisnosti[findId(funkcijskeOvisnosti, relID)]["r"].length != 0)
		selTxtR[0].innerText = strFromArr(funkcijskeOvisnosti[findId(funkcijskeOvisnosti, relID)]["r"]);
	else selTxtR[0].innerText = "Izaberite atribut/e";
}

function strFromArr(arr) {
	let string = "";
	arr.forEach((el) => {
		string += atributi[findId(atributi, el)].value + ", ";
	});
	string = string.replace(/,\s*$/, "");
	return string;
}

function onLoad() {
	gridContainer.style.marginLeft = `${gridPos}vw`;
	showAtributi();
	if (atributi.length !== 0) atrNum = atributi[atributi.length - 1].id + 1;
	if (funkcijskeOvisnosti.length !== 0)
		relNum = funkcijskeOvisnosti[funkcijskeOvisnosti.length - 1].id + 1;
}

function createFO(relID, onLoad) {
	if (!onLoad) {
		funkcijskeOvisnosti.push({ id: relID, l: [], r: [] });
	}

	let relacija = document.createElement("div");
	relacija.classList.add("relacija", relID);

	let selBoxL = document.createElement("div");
	selBoxL.classList.add("selectBox", relID, "lijevo");

	let selTxtL = document.createElement("div");
	selTxtL.classList.add("selectText", `${relID}-l`);
	selBoxL.appendChild(selTxtL);

	let checkboxesContainer = document.createElement("div");
	checkboxesContainer.classList.add("checkboxes");
	atributi.forEach((el) => {
		const cBoxL = document.createElement("div");
		cBoxL.classList.add("cBox", `${relID}-l-${el.id}`);
		cBoxL.innerHTML = `
				<input id="${relID}-l-${el.id}" class="inpCB" type="checkbox">
				<label class="cbox-label" for="${relID}-l-${el.id}">
					<span class="check-label">${el.value}</span>
					<span class="checkmark"></span>
				</label>
			`;
		if (
			funkcijskeOvisnosti[findId(funkcijskeOvisnosti, relID)][
				"l"
			].includes(el.id)
		) {
			cBoxL.children[0].checked = true;
		}
		checkboxesContainer.appendChild(cBoxL);
	});

	selBoxL.appendChild(checkboxesContainer);

	const selBoxR = document.createElement("div");
	selBoxR.classList.add("selectBox", relID, "desno");

	let selTxtR = document.createElement("div");
	selTxtR.classList.add("selectText", `${relID}-r`);
	selBoxR.appendChild(selTxtR);

	checkboxesContainer = document.createElement("div");
	checkboxesContainer.classList.add("checkboxes");
	atributi.forEach((el) => {
		const cBoxR = document.createElement("div");
		cBoxR.classList.add("cBox", `${relID}-r-${el.id}`);
		cBoxR.innerHTML = `
				<input id="${relID}-r-${el.id}" class="inpCB" type="checkbox">
				<label class="cbox-label" for="${relID}-r-${el.id}">
					<span class="check-label">${el.value}</span>
					<span class="checkmark"></span>
				</label>
			`;
		if (
			funkcijskeOvisnosti[findId(funkcijskeOvisnosti, relID)][
				"r"
			].includes(el.id)
		) {
			cBoxR.children[0].checked = true;
		}
		checkboxesContainer.appendChild(cBoxR);
	});

	selBoxR.appendChild(checkboxesContainer);

	let relStrelica = document.createElement("div");
	relStrelica.classList = "strelica";

	let relDelete = document.createElement("div");
	relDelete.classList = `relDelete ${relID}`;
	relDelete.innerText = ``

	relacija.appendChild(selBoxL);
	relacija.appendChild(relStrelica);
	relacija.appendChild(selBoxR);
	relacija.appendChild(relDelete)
	multiSelect.appendChild(relacija);
}

function showAtributi() {
	atributi.forEach((atribut) => {
		const atributDiv = document.createElement("div");
		atributDiv.classList.add("atribut", `${atribut.id}`);
		atributDiv.innerHTML = `
		<div class="atrTxt">${atribut.value}</div>
		<div class="atrBtni">
			<button class="edit-btn"></button>
			<button class="save-btn"></button>
			<button class="cancel-btn"></button>
			<button class="delete-btn"></button>
		</div>`;
		atributiList.appendChild(atributDiv);
	});
}

function dodajAtribut(e) {
	e.preventDefault();
	if (atributInput.value != "") {
		const atributDiv = document.createElement("div");
		atributDiv.classList.add("atribut", `${atrNum}`);
		atributDiv.innerHTML = `
		<div class="atrTxt">${atributInput.value}</div>
		<div class="atrBtni">
			<button class="edit-btn"></button>
			<button class="save-btn"></button>
			<button class="cancel-btn"></button>
			<button class="delete-btn"></button>
		</div>`;
		atributiList.appendChild(atributDiv);
		atributi.push({ id: atrNum++, value: atributInput.value });
		localStorage.setItem("atributi", JSON.stringify(atributi));
		atributInput.value = "";
	}
}

function klikloAtribut(e) {
	const botun = e.target;
	if (botun.classList[0] === "delete-btn") {
		const atribut = botun.parentElement.parentElement;
		atribut.classList.add("ajKuc");
		atribut.addEventListener("transitionend", function () {
			atribut.remove();
		});
		atributi.splice(findId(atributi, atribut.classList[1]), 1);
		funkcijskeOvisnosti.forEach((rel) => {
			rel.l = rel.l.filter((e) => e != atribut.classList[1]);
			rel.r = rel.r.filter((e) => e != atribut.classList[1]);
		});
		return;
	}
	if (botun.classList[0] === "edit-btn") {
		const atribut = botun.parentElement.parentElement;
		let saveBtn = atribut.querySelector(".save-btn");
		let deleteBtn = atribut.querySelector(".delete-btn");
		let cancelBtn = atribut.querySelector(".cancel-btn");
		let atributTxt = atribut.children[0];
		origTxt.push({ id: atribut.classList[1], value: atributTxt.innerText });
		atributTxt.addEventListener("keypress", (e) => {
			if (e.which === 13) {
				e.preventDefault();
				saveBtn.click();
			}
		});
		atributTxt.contentEditable = true;
		atributTxt.focus();
		botun.style.display = "none";
		deleteBtn.style.display = "none";
		cancelBtn.style.display = "block";
		saveBtn.style.display = "block";
		atribut.style.background = "#dcdcdd";
		atributTxt.style.background = "#dcdcdd";
		atributTxt.style.color = "#292a2b";
		Array.from(atribut.children[1].children).forEach((el) => {
			el.style.background = "#dcdcdd";
			el.style.background = "#dcdcdd";
			el.style.color = "#292a2b";
		});
		return;
	}
	if (botun.classList[0] === "save-btn") {
		const atribut = botun.parentElement.parentElement;
		let saveBtn = atribut.querySelector(".save-btn");
		let editBtn = atribut.querySelector(".edit-btn");
		let deleteBtn = atribut.querySelector(".delete-btn");
		let cancelBtn = atribut.querySelector(".cancel-btn");
		let atributTxt = atribut.children[0];
		atributTxt.contentEditable = false;
		saveBtn.style.display = "none";
		cancelBtn.style.display = "none";
		deleteBtn.style.display = "block";
		editBtn.style.display = "block";
		atribut.style.background = "#292a2b";
		atributTxt.style.background = "#292a2b";
		atributTxt.style.color = "#b0b3b8";
		Array.from(atribut.children[1].children).forEach((el) => {
			el.style.background = "#292a2b";
			el.style.background = "#292a2b";
			el.style.color = "#b0b3b8";
		});
		atributi[findId(atributi, atribut.classList[1])].value =
			atributTxt.innerText;
		return;
	}
	if (botun.classList[0] === "cancel-btn") {
		const atribut = botun.parentElement.parentElement;
		let saveBtn = atribut.querySelector(".save-btn");
		let editBtn = atribut.querySelector(".edit-btn");
		let deleteBtn = atribut.querySelector(".delete-btn");
		let cancelBtn = atribut.querySelector(".cancel-btn");
		let atributTxt = atribut.children[0];
		let orTxtId = findId(origTxt, atribut.classList[1]);
		atributTxt.innerText = origTxt[orTxtId].value;
		origTxt.splice(orTxtId, 1);
		atributTxt.contentEditable = false;
		saveBtn.style.display = "none";
		cancelBtn.style.display = "none";
		deleteBtn.style.display = "block";
		editBtn.style.display = "block";
		atribut.style.background = "#292a2b";
		atributTxt.style.background = "#292a2b";
		atributTxt.style.color = "#b0b3b8";
		Array.from(atribut.children[1].children).forEach((el) => {
			el.style.background = "#292a2b";
			el.style.background = "#292a2b";
			el.style.color = "#b0b3b8";
		});
		return;
	}
}

function checker(parent, child) {
	return child.every((el) => parent.includes(el));
}

function subChecker(parent, child) {
	let isFound = false;
	parent.forEach((subArray) => {
		if (checker(subArray, child)) isFound = true;
	});
	return isFound;
}

function subCheckerObrnuti(parent, child) {
	let jeri = false;
	parent.forEach((subArray) => {
		if (checker(child, subArray.value)) jeri = true;
	});
	return jeri;
}

function ispitajRO(potencijalniKljuc, koraci) {
	for (let broj = 0; broj < 2; broj++) {
		funkcijskeOvisnosti.forEach((rel) => {
			if (
				checker(potencijalniKljuc, rel.l) &&
				!checker(potencijalniKljuc, rel.r)
			) {
				potencijalniKljuc = potencijalniKljuc.concat(rel.r);
				potencijalniKljuc = potencijalniKljuc.filter(
					(value, index, self) =>
						index === self.findIndex((t) => t === value)
				);

				broj = 0;
				let par = document.createElement("p");
				par.innerText = `${strFromArr(
					potencijalniKljuc
				)} | ${strFromArr(rel.l)} -> ${strFromArr(rel.r)}`;
				koraci.append(par);
			}
		});
	}

	if (
		checker(
			potencijalniKljuc,
			atributi.map((el) => {
				return el.id;
			})
		)
	) {
		return true;
	}
}

function combinationUtil(arr, n, r, index, data, i, potencijalniKljucevi) {
	if (index == r) {
		let mjau = [];
		for (let j = 0; j < r; j++) {
			mjau.push(data[j]);
		}
		potencijalniKljucevi.push(mjau);
		return;
	}

	if (i >= n) {
		return;
	}

	data[index] = arr[i];
	combinationUtil(arr, n, r, index + 1, data, i + 1, potencijalniKljucevi);

	combinationUtil(arr, n, r, index, data, i + 1, potencijalniKljucevi);
}

function ispitajFO(LS, kljuceviDiv) {
	let potencijalniKljucevi = [];
	for (let r = 1; r < LS.length; r++) {
		let data = new Array(r);

		combinationUtil(LS, LS.length, r, 0, data, 0, potencijalniKljucevi);
	}

	for (let i = 0; i < potencijalniKljucevi.length; i++) {
		let koraci = document.createElement("div");
		if (
			!subCheckerObrnuti(kljucevi, potencijalniKljucevi[i]) &&
			ispitajRO(potencijalniKljucevi[i], koraci)
		) {
			kljucevi.push({
				id: kljucNum++,
				value: potencijalniKljucevi[i],
				koraci: koraci.innerHTML,
			});
		}
	}

	kljucevi.forEach((kljuc) => {
		let klj = document.createElement("div");
		klj.className = `Kljuc ${kljuc.id}`;
		klj.innerHTML = `<p><br><br>Kljuc: ${kljuc.id + 1}: ${strFromArr(
			kljuc.value
		)}\n\n<br><br></p>`;
		klj.innerHTML += kljuc.koraci;
		kljuceviDiv.append(klj);
	});
}

function nadiKljuceve() {
	let LS = [],
		BS = [],
		RS = [],
		NS = [];
	let kljuceviDiv = document.querySelector(".kljucevi");
	kljuceviDiv.innerHTML = "";
	funkcijskeOvisnosti.forEach((rel) => {
		rel.l.forEach((le) => {
			if (!LS.includes(le)) {
				LS.push(le);
			}
		});
		rel.r.forEach((re) => {
			if (!RS.includes(re)) {
				RS.push(re);
			}
		});
	});
	atributi.forEach((el) => {
		if (!LS.includes(el.id) && !RS.includes(el.id) && !NS.includes(el.id))
			NS.push(el.id);
	});
	LS.forEach((le) => {
		if (RS.includes(le)) {
			BS.push(le);
			LS = LS.filter((e) => e !== le);
			RS = RS.filter((e) => e !== le);
		}
	});

	let strane = document.createElement("div");
	strane.className = "strane";
	strane.innerHTML = `<p>Samo s lijeve strane: ${strFromArr(
		LS
	)} <br>S obe strane: ${strFromArr(
		BS
	)} <br>Samo s desne strane: ${strFromArr(
		RS
	)} <br>Ni s jedne strane: ${strFromArr(NS)}<br></p>`;

	kljuceviDiv.append(strane);
	LS = LS.concat(NS);

	if (ispitajFO(LS, kljuceviDiv)) {
		return;
	}
	LS = LS.concat(BS);
	ispitajFO(LS, kljuceviDiv);
}
let ro = [];
function normalizirajTrecu() {
	ro = [];
	let i = 0;
	let trecaNF = document.createElement("div");
	trecaNF.className = "trecaNF";
	const random = Math.floor(Math.random() * kljucevi.length);
	let str_R = "";
	atributi.forEach((at) => {
		str_R += at.value + ", ";
	});
	str_R = str_R.replace(/,\s*$/, "");
	ro_R = [];
	fo_novi = [];
	i = 0;
	funkcijskeOvisnosti.forEach(f => {
		f.r.forEach(R => {
			fo_novi.push({
				id: i++,
				l: [...f.l],
				r: [R]
			})
		})
	})
	let str_F = "{ ";
	fo_novi.forEach((fo) => {
		let potR = [...fo.l, ...fo.r];
		str_F += `${strFromArr(fo.l)} -> ${strFromArr(fo.r)} | `;
		ro_R.forEach(r => potR.every((el) => r.includes(el)))

		if (!subChecker(ro_R, potR)) {
			ro_R.push([...potR]);
		}

	});
	str_F = str_F.replace(/\|\s*$/, "}");
	let str_K = strFromArr(kljucevi[random].value);
	if (!subChecker(ro_R, kljucevi[random].value))
		ro_R.push(kljucevi[random].value);

	i = 0;

	ro_R.forEach(r => {
		let F_novi = [...fo_novi];
		let izbaci = [];
		for (let x = 0; x < F_novi.length; x++) {
			if (!checker(r, [...fo_novi[x].l, ...fo_novi[x].r])) {
				izbaci.push(F_novi[x].id);
			}
		}
		izbaci.forEach(x => {
			F_novi = F_novi.filter(f => f.id !== x)
		})
		ro.push(
			{
				id: i++,
				R: [...r],
				F: [...F_novi]
			}
		);
	})
	let str_ro = "{ ";
	ro.forEach((r) => {
		str_ro += `${strFromArr(r.R)} | `;
	});
	str_ro = str_ro.replace(/\|\s*$/, "}");
	trecaNF.innerHTML = `
    <p>R = ${str_R}</p>
    <p>F = ${str_F}</p>
    <p>K = ${str_K}</p><br>
    <p>ρ = ${str_ro}</p><br>`;

	ro.forEach((r) => {
		str_F = "{ "
		r.F.forEach((fo) => {
			str_F += `${strFromArr(fo.l)} -> ${strFromArr(fo.r)} | `;
		});
		str_F = str_F.replace(/\|\s*$/, "}");
		if (r.F.length == 0)
			str_F = "{ }"
		trecaNF.innerHTML += `<p>F${r.id + 1} = ${str_F}</p>`
	});
	forme.append(trecaNF);

	return;
}
function normalizirajBC() {
	let BC_NF = document.createElement("div");
	BC_NF.className = "BcNF";

	while (!checkBCNF(ro));

	ro.forEach(r => {
		ro.forEach(r1 => {
			if (checker(r1.R, r.R) && r.id !== r1.id)
				ro = ro.filter(r2 => r2.id !== r.id)
		})
	})

	let str_F = "";
	let str_ro = "";

	str_ro = "ρ = { "

	ro.forEach((r) => {
		str_ro += `${strFromArr(r.R)} | `;
	});
	str_ro = str_ro.replace(/\|\s*$/, "}");

	BC_NF.innerHTML += `<p>${str_ro}</p><br>`

	ro.forEach((r) => {
		str_F = "{ "
		r.F.forEach((fo) => {
			str_F += `${strFromArr(fo.l)} -> ${strFromArr(fo.r)} | `;
		});
		str_F = str_F.replace(/\|\s*$/, "}");
		if (r.F.length == 0)
			str_F = "{ }"
		BC_NF.innerHTML += `<p>F${r.id + 1} = ${str_F}</p>`
	});

	forme.append(BC_NF);
	return;
}

function checkBCNF(array) {
	let ro_novi = [...array];
	let roID = 0;
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].F.length; j++) {
			if (!(isTrivial(array[i].F[j].l, array[i].F[j].r) || isSuperKey(array[i].F[j].l, array[i].R, array[i].F))) {
				ro_novi = ro_novi.filter(r => r.id !== array[i].id)
				let R_novi = [...array[i].R];
				R_novi = R_novi.filter(x => !array[i].F[j].r.includes(x))
				let F_novi = [...array[i].F];
				let izbaci = [];
				for (let x = 0; x < F_novi.length; x++) {
					if (!checker(R_novi, [...array[i].F[x].l, ...array[i].F[x].r])) {
						izbaci.push(F_novi[x].id);
					}
				}
				izbaci.forEach(x => {
					F_novi = F_novi.filter(f => f.id !== x)
				})
				roID = ro_novi[ro_novi.length - 1].id + 1;
				ro_novi.push(
					{
						id: roID++,
						R: [...array[i].F[j].l, ...array[i].F[j].r],
						F: [
							{ id: 0, l: [...array[i].F[j].l], r: [...array[i].F[j].r] }
						]
					},
					{
						id: roID++,
						R: [...R_novi],
						F: [...F_novi]

					})
				ro = ro_novi;
				return false;
			}
		}
	}
	return true;
}

function isTrivial(l, r) {
	return checker(l, r);
}

function isSuperKey(l, R, F) {

	let superkey = l;
	for (let i = 0; i < F.length; i++) {

		if ((checker(superkey, F[i].l)) && !(checker(superkey, F[i].r))) {
			superkey = superkey.concat(F[i].r);
			i = -1;
		}
		if (checker(superkey, R)) return true;
	}
	return false;
}

document.addEventListener("DOMContentLoaded", onLoad);

addAtribut.addEventListener("click", dodajAtribut);
atributiList.addEventListener("click", klikloAtribut);

document.addEventListener("click", (b) => {
	if (botunAtrNext.contains(b.target)) {
		gridPos -= 100;
		gridContainer.style.marginLeft = `${gridPos}vw`;
		multiSelect.innerHTML = "";
		funkcijskeOvisnosti.forEach((rel) => {
			createFO(rel.id, true);
			updateSelectText(rel.id);
		});
		return;
	}
	if (botunFovNext.contains(b.target)) {
		gridPos -= 100;
		gridContainer.style.marginLeft = `${gridPos}vw`;
		nadiKljuceve();
		return;
	}
	if (botunFovPrev.contains(b.target)) {
		gridPos += 100;
		gridContainer.style.marginLeft = `${gridPos}vw`;
		return;
	}
	if (botunKljPrev.contains(b.target)) {
		gridPos += 100;
		gridContainer.style.marginLeft = `${gridPos}vw`;
		kljucevi = [];
		kljucNum = 0;
		return;
	}
	if (botunKljNext.contains(b.target)) {
		gridPos -= 100;
		gridContainer.style.marginLeft = `${gridPos}vw`;
		forme.innerHTML = "";
		normalizirajTrecu();
		normalizirajBC();
		return;
	}
	if (botunNfPrev.contains(b.target)) {
		gridPos += 100;
		gridContainer.style.marginLeft = `${gridPos}vw`;
		return;
	}

	if (addRelacija.contains(b.target)) {
		createFO(relNum, false);
		updateSelectText(relNum);
		relNum++;
		return;
	}

	let selectBoxes = document.querySelectorAll(".selectBox");
	selectBoxes.forEach((box) => {
		if (box.contains(b.target)) {
			box.children[1].classList.toggle("active");
			return;
		}
		box.children[1].classList.remove("active");
	});

	let checkBoxes = document.querySelectorAll(".cBox");

	checkBoxes.forEach((box) => {
		if (
			box.contains(b.target) &&
			b.target.localName !== "label" &&
			b.target.localName !== "span"
		) {
			let ab = box.classList[1].split("-");
			let rel = findId(funkcijskeOvisnosti, ab[0]);
			let strana = ab[1];
			let el = parseInt(ab[2]);

			if (box.children[0].checked == true) {
				if (!funkcijskeOvisnosti[rel][strana].includes(el)) {
					funkcijskeOvisnosti[rel][strana].push(el);
					funkcijskeOvisnosti[rel][strana].sort();
					updateSelectText(rel);
				}
			} else {
				funkcijskeOvisnosti[rel][strana] = funkcijskeOvisnosti[rel][
					strana
				].filter((e) => e !== el);
				funkcijskeOvisnosti[rel][strana].sort();
				updateSelectText(rel);
			}
		}
	});


	let relDeletes = document.querySelectorAll(".relDelete");

	relDeletes.forEach((delBtn) => {
		if (delBtn.contains(b.target)) {
			const fo = b.target.parentElement;
			fo.classList.add("ajKuc");
			fo.addEventListener("transitionend", function () {
				fo.remove();
			});
			funkcijskeOvisnosti.splice(fo.classList[1], 1)
		}
	})
});
