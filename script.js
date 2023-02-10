let complementary_nucleotides_dna = {"adenine":"thymidine", 
    "guanidine":"cytidine", 
    "thymidine":"adenine", 
    "cytidine":"guanidine"};

let complementary_nucleotides_rna = {"adenine":"uridine", 
    "guanidine":"cytidine", 
    "uridine":"adenine", 
    "cytidine":"guanidine", 
    "thymidine":"adenine"};

table = document.getElementById("chains_table");


function collectTriplets() {
    let triplet = [];
    for (let i = 1; i < 12; i++) {
        let t = table.rows[0].cells[i].childNodes[0];
        if (table.rows[0].cells[i].innerHTML == '-') {continue;}
        if (t.value in complementary_nucleotides_dna) {
            triplet.push(t.value);
            t.style.backgroundColor = "rgb(34, 34, 34)";
        } else {
            for (let j = 1; j < 12; j++) {
                let s = table.rows[0].cells[j].childNodes[0];
                if (table.rows[0].cells[j].innerHTML == '-') {continue;}
                if (!(s.value in complementary_nucleotides_dna)) {
                    s.style.backgroundColor = "rgba(255, 0, 0, 0.548)";
                    document.getElementById("operation_status").innerHTML = "Operation failed";
                }
            }
            return;
        }
    }

    let triplets = new Array(4);
    for (let i = 0; i < triplets.length; i++) {
        triplets[i] = new Array(10);
    }
    
    triplets[0] = triplet;

    for (let i = 1; i < 2; i++) {
        for (let j = 0; j < 9; j++) {
            triplets[i][j] = complementary_nucleotides_dna[triplets[i - 1][j]];
        }
    }
    
    for (let i = 2; i < 4; i++) {
        for (let j = 0; j < 9; j++) {
            triplets[i][j] = complementary_nucleotides_rna[triplets[i - 1][j]];
        }
    }
    return triplets;
}


function loading() {
    document.getElementById("operation_status").innerHTML = "";
    document.getElementById("loading").style.display = "block";
    const myTimeout = setTimeout(showResult, 5000);
}

function showResult() {  
    document.getElementById("loading").style.display = "none";
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 12; j++) {
            if (table.rows[i].cells[j].innerHTML == '-') {
                continue;
            }
            if (j == 1 || j == 2 || j == 3) {
                table.rows[i].cells[j].childNodes[0].value = collectTriplets()[i][j - 1];
                continue;
            }
            if (j == 9 || j == 10 || j == 11) {
                table.rows[i].cells[j].childNodes[0].value = collectTriplets()[i][j - 3];
                continue;
            }
            table.rows[i].cells[j].childNodes[0].value = collectTriplets()[i][j - 2];
        }
    }
}


function reset() {
    document.getElementById("operation_status").innerHTML = "";
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 12; j++) {
            if (table.rows[i].cells[j].innerHTML == '-') {
                continue;
            }
            table.rows[i].cells[j].childNodes[0].value = "";
            table.rows[i].cells[j].childNodes[0].style.backgroundColor = "rgb(34, 34, 34)";
        }
    }
}


function show_nucleotides() {
    if (document.getElementById("complementary_acids").style.display === "none") {
		document.getElementById("complementary_acids").style.display = "block";
	} else {
		document.getElementById("complementary_acids").style.display = "block";
	}

    document.getElementById("available_nucleotides").style.display = "none";
    document.getElementById("unavailable_nucleotides").style.display = "block";
}


function hide_nucleotides() {
    if (document.getElementById("complementary_acids").style.display === "block") {
		document.getElementById("complementary_acids").style.display = "none";
	} else {
		document.getElementById("complementary_acids").style.display = "none";
	}

    document.getElementById("unavailable_nucleotides").style.display = "none";
    document.getElementById("available_nucleotides").style.display = "block";
}


function kaboom() {
    document.body.style.visibility = "hidden";
}


function add_nucleotide(added_value) {
    for (let i = 1; i < 12; i++) {
        if (table.rows[0].cells[i].innerHTML == '-') {
            continue;
        }
        if (!table.rows[0].cells[i].childNodes[0].value) {
            table.rows[0].cells[i].childNodes[0].value = added_value;
            return;
        }
    }
}


function names_to_letters() {
    let codons = new Array(3);
    let nucleotides = [];
    for (let i = 0; i < codons.length; i++) {
        codons[i] = new Array(3);
    }
    
    for (let i = 1; i < 12; i++) {
        if (table.rows[2].cells[i].innerHTML == '-') {
            continue;
        }
        nucleotides.push(table.rows[2].cells[i].childNodes[0].value[0]);
    }
    
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++) {
            codons[i][j] = nucleotides[0];
            nucleotides.shift();
        }
    }
    return codons;
}