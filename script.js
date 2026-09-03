// =========================================================
// ABBASALI VENTURE
// Main JavaScript File
// =========================================================


/* =========================================================
   ABBASALI VENTURE
   Main JavaScript File
   ========================================================= */


/* =========================================================
   01. PAGE LOADED
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Abbasali Venture website loaded successfully.");

});


/* =========================================================
   02. ACTIVE NAVIGATION
   ========================================================= */

const currentPage = window.location.pathname.split("/").pop();

const navigationLinks = document.querySelectorAll(".navbar a");

navigationLinks.forEach(function (link) {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});


/* =========================================================
   03. SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".intro, .services-preview, .tools-cta, .service-card"
);


const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal-visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(function (element) {

    element.classList.add("reveal-hidden");

    revealObserver.observe(element);

});


/* =========================================================
   04. BUTTON CLICK EFFECT
   ========================================================= */

const buttons = document.querySelectorAll(
    ".primary-button, .secondary-button, .nav-button"
);


buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        button.classList.add("button-clicked");

        setTimeout(function () {

            button.classList.remove("button-clicked");

        }, 250);

    });

});


/* =========================================================
   05. HEADER SCROLL EFFECT
   ========================================================= */

const header = document.querySelector(".header");


window.addEventListener("scroll", function () {

    if (window.scrollY > 40) {

        header.classList.add("header-scrolled");

    } else {

        header.classList.remove("header-scrolled");

    }

});


/* =========================================================
   06. BACK TO TOP
   ========================================================= */

const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";

backToTop.className = "back-to-top";

backToTop.setAttribute("aria-label", "Back to top");


document.body.appendChild(backToTop);


window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   07. KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        document.activeElement.blur();

    }

});




/* =========================================================
   GST CALCULATOR
   ========================================================= */


/* ---------------------------------------------------------
   OPEN TOOL
   --------------------------------------------------------- */

function openTool(toolName) {

    const workspace = document.getElementById("toolWorkspace");
    const content = document.getElementById("toolContent");

    if (!workspace || !content) return;


    workspace.classList.add("active");


    /* ---------------------------------------------
       GST CALCULATOR
       --------------------------------------------- */

    if (toolName === "gstTool") {

        content.innerHTML = `

            <div class="tool-interface">

                <h3>
                    GST Calculator
                </h3>


                <p>
                    Calculate GST-inclusive and
                    GST-exclusive amounts quickly.
                </p>


                <div class="tool-form">


                    <!-- AMOUNT -->

                    <label>

                        Amount (₹)

                        <input
                            type="number"
                            id="gstAmount"
                            placeholder="Enter amount"
                            min="0"
                        >

                    </label>


                    <!-- GST RATE -->

                    <label>

                        GST Rate

                        <select id="gstRate">

                            <option value="5">
                                5%
                            </option>

                            <option value="12">
                                12%
                            </option>

                            <option value="18" selected>
                                18%
                            </option>

                            <option value="28">
                                28%
                            </option>

                        </select>

                    </label>


                    <!-- CALCULATION TYPE -->

                    <label>

                        Calculation Type

                        <select id="gstType">

                            <option value="add">
                                Add GST
                            </option>

                            <option value="remove">
                                Remove GST
                            </option>

                        </select>

                    </label>


                    <!-- BUTTONS -->

                    <div>

                        <button
                            class="tool-button"
                            onclick="calculateGST()">

                            Calculate GST →

                        </button>


                        <button
                            class="tool-reset"
                            onclick="resetGST()">

                            Reset

                        </button>

                    </div>


                </div>


                <!-- RESULT -->

                <div
                    class="tool-result"
                    id="gstResult">

                    <small>
                        RESULT
                    </small>

                    <strong>
                        Enter an amount to calculate.
                    </strong>

                </div>


            </div>

        `;

    }

}


/* ---------------------------------------------------------
   CALCULATE GST
   --------------------------------------------------------- */

function calculateGST() {

    const amountInput =
        document.getElementById("gstAmount");

    const rateInput =
        document.getElementById("gstRate");

    const typeInput =
        document.getElementById("gstType");

    const result =
        document.getElementById("gstResult");


    if (!amountInput || !rateInput || !typeInput || !result) {
        return;
    }


    const amount =
        parseFloat(amountInput.value);

    const rate =
        parseFloat(rateInput.value);

    const type =
        typeInput.value;


    /* ---------------------------------------------
       VALIDATION
       --------------------------------------------- */

    if (isNaN(amount) || amount < 0) {

        result.innerHTML = `

            <small>
                ERROR
            </small>

            <strong>
                Please enter a valid amount.
            </strong>

        `;

        return;
    }


    /* ---------------------------------------------
       ADD GST
       --------------------------------------------- */

    if (type === "add") {

        const gstAmount =
            amount * rate / 100;

        const finalAmount =
            amount + gstAmount;


        result.innerHTML = `

            <small>
                GST CALCULATION
            </small>

            <div class="gst-result-row">

                <span>
                    Original Amount
                </span>

                <strong>
                    ₹${formatNumber(amount)}
                </strong>

            </div>


            <div class="gst-result-row">

                <span>
                    GST (${rate}%)
                </span>

                <strong>
                    ₹${formatNumber(gstAmount)}
                </strong>

            </div>


            <div class="gst-result-total">

                <span>
                    Final Amount
                </span>

                <strong>
                    ₹${formatNumber(finalAmount)}
                </strong>

            </div>

        `;

    }


    /* ---------------------------------------------
       REMOVE GST
       --------------------------------------------- */

    else {

        const originalAmount =
            amount / (1 + rate / 100);

        const gstAmount =
            amount - originalAmount;


        result.innerHTML = `

            <small>
                GST CALCULATION
            </small>

            <div class="gst-result-row">

                <span>
                    GST-Inclusive Amount
                </span>

                <strong>
                    ₹${formatNumber(amount)}
                </strong>

            </div>


            <div class="gst-result-row">

                <span>
                    Original Amount
                </span>

                <strong>
                    ₹${formatNumber(originalAmount)}
                </strong>

            </div>


            <div class="gst-result-total">

                <span>
                    GST (${rate}%)
                </span>

                <strong>
                    ₹${formatNumber(gstAmount)}
                </strong>

            </div>

        `;

    }

}


/* ---------------------------------------------------------
   RESET GST
   --------------------------------------------------------- */

function resetGST() {

    const amount =
        document.getElementById("gstAmount");

    const rate =
        document.getElementById("gstRate");

    const type =
        document.getElementById("gstType");

    const result =
        document.getElementById("gstResult");


    if (!amount || !rate || !type || !result) {
        return;
    }


    amount.value = "";

    rate.value = "18";

    type.value = "add";


    result.innerHTML = `

        <small>
            RESULT
        </small>

        <strong>
            Enter an amount to calculate.
        </strong>

    `;

}


/* ---------------------------------------------------------
   NUMBER FORMATTER
   --------------------------------------------------------- */

function formatNumber(number) {

    return number.toLocaleString("en-IN", {

        minimumFractionDigits: 2,

        maximumFractionDigits: 2

    });

}




function closeTool() {

    const workspace = document.getElementById("toolWorkspace");
    const content = document.getElementById("toolContent");

    if (!workspace || !content) return;

    workspace.classList.remove("active");

    content.innerHTML = `
        <div class="workspace-empty">
            <span>+</span>
            <p>Select a tool above to begin.</p>
        </div>
    `;
}



/* =========================================================
   PERCENTAGE CALCULATOR
   ========================================================= */


/* =========================================================
   ADD PERCENTAGE TOOL TO OPEN TOOL
   ========================================================= */

function openPercentageTool() {

    var workspace =
        document.getElementById("toolWorkspace");

    var content =
        document.getElementById("toolContent");


    if (!workspace || !content) {
        return;
    }


    workspace.classList.add("active");


    content.innerHTML =

        '<div class="tool-interface">' +

            '<h3>' +
                'Percentage Calculator' +
            '</h3>' +

            '<p>' +
                'Calculate percentages, increases, decreases ' +
                'and percentage relationships.' +
            '</p>' +


            '<div class="tool-form">' +


                '<label>' +

                    'Calculation Type' +

                    '<select id="percentageType" ' +
                        'onchange="changePercentageType()">' +

                        '<option value="find">' +
                            'Find percentage of a number' +
                        '</option>' +

                        '<option value="change">' +
                            'Percentage increase / decrease' +
                        '</option>' +

                        '<option value="what">' +
                            'What percentage is X of Y?' +
                        '</option>' +

                    '</select>' +

                '</label>' +


                '<div id="percentageInputs">' +

                    '<label>' +

                        'Percentage (%)' +

                        '<input ' +
                            'type="number" ' +
                            'id="percentageValue" ' +
                            'placeholder="Example: 18">' +

                    '</label>' +


                    '<label>' +

                        'Number' +

                        '<input ' +
                            'type="number" ' +
                            'id="percentageNumber" ' +
                            'placeholder="Example: 10000">' +

                    '</label>' +

                '</div>' +


                '<div>' +

                    '<button ' +
                        'class="tool-button" ' +
                        'onclick="calculatePercentage()">' +

                        'Calculate →' +

                    '</button>' +


                    '<button ' +
                        'class="tool-reset" ' +
                        'onclick="resetPercentage()">' +

                        'Reset' +

                    '</button>' +

                '</div>' +

            '</div>' +


            '<div ' +
                'class="tool-result" ' +
                'id="percentageResult">' +

                '<small>RESULT</small>' +

                '<strong>' +
                    'Enter values to calculate.' +
                '</strong>' +

            '</div>' +

        '</div>';


    workspace.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================================
   CHANGE PERCENTAGE CALCULATOR TYPE
   ========================================================= */

function changePercentageType() {

    var type =
        document.getElementById("percentageType");

    var inputs =
        document.getElementById("percentageInputs");


    if (!type || !inputs) {
        return;
    }


    if (type.value === "find") {

        inputs.innerHTML =

            '<label>' +

                'Percentage (%)' +

                '<input ' +
                    'type="number" ' +
                    'id="percentageValue" ' +
                    'placeholder="Example: 18">' +

            '</label>' +


            '<label>' +

                'Number' +

                '<input ' +
                    'type="number" ' +
                    'id="percentageNumber" ' +
                    'placeholder="Example: 10000">' +

            '</label>';

    }


    else if (type.value === "change") {

        inputs.innerHTML =

            '<label>' +

                'Original Value' +

                '<input ' +
                    'type="number" ' +
                    'id="originalValue" ' +
                    'placeholder="Example: 10000">' +

            '</label>' +


            '<label>' +

                'New Value' +

                '<input ' +
                    'type="number" ' +
                    'id="newValue" ' +
                    'placeholder="Example: 12000">' +

            '</label>';

    }


    else {

        inputs.innerHTML =

            '<label>' +

                'Value (X)' +

                '<input ' +
                    'type="number" ' +
                    'id="valueX" ' +
                    'placeholder="Example: 1800">' +

            '</label>' +


            '<label>' +

                'Total (Y)' +

                '<input ' +
                    'type="number" ' +
                    'id="valueY" ' +
                    'placeholder="Example: 10000">' +

            '</label>';

    }

}


/* =========================================================
   CALCULATE PERCENTAGE
   ========================================================= */

function calculatePercentage() {

    var type =
        document.getElementById("percentageType");

    var result =
        document.getElementById("percentageResult");


    if (!type || !result) {
        return;
    }


    /* =====================================================
       TYPE 1
       FIND PERCENTAGE OF NUMBER
       ===================================================== */

    if (type.value === "find") {

        var percentage =
            parseFloat(
                document.getElementById(
                    "percentageValue"
                ).value
            );

        var number =
            parseFloat(
                document.getElementById(
                    "percentageNumber"
                ).value
            );


        if (
            isNaN(percentage) ||
            isNaN(number)
        ) {

            showPercentageError(
                result,
                "Please enter valid numbers."
            );

            return;
        }


        var answer =
            (percentage / 100) * number;


        result.innerHTML =

            '<small>RESULT</small>' +

            '<div class="gst-result-total">' +

                '<span>' +

                    percentage +
                    '% of ' +
                    formatNumber(number) +

                '</span>' +

                '<strong>₹' +

                    formatNumber(answer) +

                '</strong>' +

            '</div>';

    }


    /* =====================================================
       TYPE 2
       INCREASE / DECREASE
       ===================================================== */

    else if (type.value === "change") {

        var original =
            parseFloat(
                document.getElementById(
                    "originalValue"
                ).value
            );

        var newValue =
            parseFloat(
                document.getElementById(
                    "newValue"
                ).value
            );


        if (
            isNaN(original) ||
            isNaN(newValue)
        ) {

            showPercentageError(
                result,
                "Please enter both values."
            );

            return;
        }


        if (original === 0) {

            showPercentageError(
                result,
                "Original value cannot be zero."
            );

            return;
        }


        var difference =
            newValue - original;

        var change =
            (difference / original) * 100;


        var changeText =
            change >= 0
                ? "Increase"
                : "Decrease";


        result.innerHTML =

            '<small>RESULT</small>' +


            '<div class="gst-result-row">' +

                '<span>Difference</span>' +

                '<strong>' +

                    (difference >= 0 ? "+" : "") +

                    '₹' +
                    formatNumber(difference) +

                '</strong>' +

            '</div>' +


            '<div class="gst-result-total">' +

                '<span>' +
                    changeText +
                '</span>' +

                '<strong>' +

                    Math.abs(change).toFixed(2) +
                    '%' +

                '</strong>' +

            '</div>';

    }


    /* =====================================================
       TYPE 3
       WHAT PERCENTAGE IS X OF Y
       ===================================================== */

    else {

        var x =
            parseFloat(
                document.getElementById(
                    "valueX"
                ).value
            );

        var y =
            parseFloat(
                document.getElementById(
                    "valueY"
                ).value
            );


        if (
            isNaN(x) ||
            isNaN(y)
        ) {

            showPercentageError(
                result,
                "Please enter both values."
            );

            return;
        }


        if (y === 0) {

            showPercentageError(
                result,
                "Total value cannot be zero."
            );

            return;
        }


        var percentageResult =
            (x / y) * 100;


        result.innerHTML =

            '<small>RESULT</small>' +

            '<div class="gst-result-total">' +

                '<span>' +

                    formatNumber(x) +
                    ' is what percentage of ' +
                    formatNumber(y) +

                '</span>' +

                '<strong>' +

                    percentageResult.toFixed(2) +
                    '%' +

                '</strong>' +

            '</div>';

    }

}


/* =========================================================
   PERCENTAGE ERROR
   ========================================================= */

function showPercentageError(
    result,
    message
) {

    result.innerHTML =

        '<small>ERROR</small>' +

        '<strong>' +

            message +

        '</strong>';

}


/* =========================================================
   RESET PERCENTAGE
   ========================================================= */

function resetPercentage() {

    openPercentageTool();

}



/* =========================================================
   EMI CALCULATOR
   ========================================================= */


/* =========================================================
   OPEN EMI TOOL
   ========================================================= */

function openEMITool() {

    var workspace =
        document.getElementById("toolWorkspace");

    var content =
        document.getElementById("toolContent");


    if (!workspace || !content) {
        return;
    }


    workspace.classList.add("active");


    content.innerHTML =

        '<div class="tool-interface">' +

            '<h3>' +
                'EMI Calculator' +
            '</h3>' +

            '<p>' +
                'Estimate your monthly loan payment, ' +
                'total interest and total repayment amount.' +
            '</p>' +


            '<div class="tool-form">' +


                /* LOAN AMOUNT */

                '<label>' +

                    'Loan Amount (₹)' +

                    '<input ' +
                        'type="number" ' +
                        'id="loanAmount" ' +
                        'placeholder="Example: 500000" ' +
                        'min="0">' +

                '</label>' +


                /* INTEREST RATE */

                '<label>' +

                    'Annual Interest Rate (%)' +

                    '<input ' +
                        'type="number" ' +
                        'id="interestRate" ' +
                        'placeholder="Example: 8.5" ' +
                        'min="0" ' +
                        'step="0.01">' +

                '</label>' +


                /* TENURE */

                '<label>' +

                    'Loan Tenure (Years)' +

                    '<input ' +
                        'type="number" ' +
                        'id="loanTenure" ' +
                        'placeholder="Example: 5" ' +
                        'min="1">' +

                '</label>' +


                /* BUTTONS */

                '<div>' +

                    '<button ' +
                        'class="tool-button" ' +
                        'onclick="calculateEMI()">' +

                        'Calculate EMI →' +

                    '</button>' +


                    '<button ' +
                        'class="tool-reset" ' +
                        'onclick="resetEMI()">' +

                        'Reset' +

                    '</button>' +

                '</div>' +

            '</div>' +


            /* RESULT */

            '<div ' +
                'class="tool-result" ' +
                'id="emiResult">' +

                '<small>RESULT</small>' +

                '<strong>' +
                    'Enter loan details to calculate EMI.' +
                '</strong>' +

            '</div>' +

        '</div>';


    workspace.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================================
   CALCULATE EMI
   ========================================================= */

function calculateEMI() {

    var loanInput =
        document.getElementById("loanAmount");

    var interestInput =
        document.getElementById("interestRate");

    var tenureInput =
        document.getElementById("loanTenure");

    var result =
        document.getElementById("emiResult");


    if (
        !loanInput ||
        !interestInput ||
        !tenureInput ||
        !result
    ) {

        return;

    }


    var principal =
        parseFloat(loanInput.value);

    var annualRate =
        parseFloat(interestInput.value);

    var years =
        parseFloat(tenureInput.value);


    /* =====================================================
       VALIDATION
       ===================================================== */

    if (
        isNaN(principal) ||
        isNaN(annualRate) ||
        isNaN(years)
    ) {

        result.innerHTML =

            '<small>ERROR</small>' +

            '<strong>' +
                'Please enter all loan details.' +
            '</strong>';

        return;

    }


    if (
        principal <= 0 ||
        annualRate < 0 ||
        years <= 0
    ) {

        result.innerHTML =

            '<small>ERROR</small>' +

            '<strong>' +
                'Please enter valid positive values.' +
            '</strong>';

        return;

    }


    /* =====================================================
       EMI FORMULA
       =====================================================

       EMI = P × R × (1 + R)^N
             ----------------
                (1 + R)^N - 1

       P = Principal
       R = Monthly Interest Rate
       N = Number of Monthly Payments

       ===================================================== */


    var monthlyRate =
        annualRate / 12 / 100;

    var numberOfMonths =
        years * 12;


    var emi;


    /* -----------------------------------------------------
       ZERO INTEREST CASE
       ----------------------------------------------------- */

    if (monthlyRate === 0) {

        emi =
            principal / numberOfMonths;

    }


    /* -----------------------------------------------------
       NORMAL INTEREST CASE
       ----------------------------------------------------- */

    else {

        var power =
            Math.pow(
                1 + monthlyRate,
                numberOfMonths
            );


        emi =
            principal *
            monthlyRate *
            power /
            (power - 1);

    }


    var totalPayment =
        emi * numberOfMonths;


    var totalInterest =
        totalPayment - principal;


    /* =====================================================
       DISPLAY RESULT
       ===================================================== */

    result.innerHTML =

        '<small>LOAN SUMMARY</small>' +


        '<div class="emi-main-result">' +

            '<span>Monthly EMI</span>' +

            '<strong>₹' +
                formatNumber(emi) +
            '</strong>' +

        '</div>' +


        '<div class="gst-result-row">' +

            '<span>Loan Amount</span>' +

            '<strong>₹' +
                formatNumber(principal) +
            '</strong>' +

        '</div>' +


        '<div class="gst-result-row">' +

            '<span>Total Interest</span>' +

            '<strong>₹' +
                formatNumber(totalInterest) +
            '</strong>' +

        '</div>' +


        '<div class="gst-result-total">' +

            '<span>Total Amount Payable</span>' +

            '<strong>₹' +
                formatNumber(totalPayment) +
            '</strong>' +

        '</div>';

}


/* =========================================================
   RESET EMI
   ========================================================= */

function resetEMI() {

    openEMITool();

}



/* =========================================================
   TEXT COUNTER
   ========================================================= */


/* =========================================================
   OPEN TEXT COUNTER
   ========================================================= */

function openTextTool() {

    var workspace =
        document.getElementById("toolWorkspace");

    var content =
        document.getElementById("toolContent");


    if (!workspace || !content) {
        return;
    }


    workspace.classList.add("active");


    content.innerHTML =

        '<div class="tool-interface">' +

            '<h3>' +
                'Text Counter' +
            '</h3>' +

            '<p>' +
                'Count words, characters, sentences, lines ' +
                'and estimated reading time instantly.' +
            '</p>' +


            '<div class="tool-form">' +


                '<label>' +

                    'Enter Your Text' +

                    '<textarea ' +
                        'id="textCounterInput" ' +
                        'placeholder="Start typing or paste your text here..." ' +
                        'oninput="updateTextCounter()">' +

                    '</textarea>' +

                '</label>' +


                '<div>' +

                    '<button ' +
                        'class="tool-button" ' +
                        'onclick="clearTextCounter()">' +

                        'Clear Text' +

                    '</button>' +

                '</div>' +

            '</div>' +


            '<div ' +
                'class="text-counter-grid" ' +
                'id="textCounterResult">' +


                '<div class="text-stat">' +

                    '<small>WORDS</small>' +

                    '<strong id="wordCount">' +
                        '0' +
                    '</strong>' +

                '</div>' +


                '<div class="text-stat">' +

                    '<small>CHARACTERS</small>' +

                    '<strong id="characterCount">' +
                        '0' +
                    '</strong>' +

                '</div>' +


                '<div class="text-stat">' +

                    '<small>NO SPACES</small>' +

                    '<strong id="characterNoSpaceCount">' +
                        '0' +
                    '</strong>' +

                '</div>' +


                '<div class="text-stat">' +

                    '<small>SENTENCES</small>' +

                    '<strong id="sentenceCount">' +
                        '0' +
                    '</strong>' +

                '</div>' +


                '<div class="text-stat">' +

                    '<small>LINES</small>' +

                    '<strong id="lineCount">' +
                        '0' +
                    '</strong>' +

                '</div>' +


                '<div class="text-stat">' +

                    '<small>READING TIME</small>' +

                    '<strong id="readingTime">' +
                        '0 min' +
                    '</strong>' +

                '</div>' +


            '</div>' +

        '</div>';


    workspace.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================================
   UPDATE TEXT COUNTER
   ========================================================= */

function updateTextCounter() {

    var textInput =
        document.getElementById(
            "textCounterInput"
        );


    if (!textInput) {
        return;
    }


    var text =
        textInput.value;


    /* =====================================================
       WORD COUNT
       ===================================================== */

    var trimmedText =
        text.trim();


    var words =
        trimmedText === ""
            ? 0
            : trimmedText.split(/\s+/).length;


    /* =====================================================
       CHARACTER COUNT
       ===================================================== */

    var characters =
        text.length;


    /* =====================================================
       CHARACTER COUNT WITHOUT SPACES
       ===================================================== */

    var charactersNoSpaces =
        text.replace(/\s/g, "").length;


    /* =====================================================
       SENTENCE COUNT
       ===================================================== */

    var sentences = 0;


    if (trimmedText !== "") {

        var sentenceMatches =
            trimmedText.match(
                /[^.!?]+[.!?]+/g
            );


        if (sentenceMatches) {

            sentences =
                sentenceMatches.length;

        }

        else {

            sentences = 1;

        }

    }


    /* =====================================================
       LINE COUNT
       ===================================================== */

    var lines =
        text === ""
            ? 0
            : text.split(/\r\n|\r|\n/).length;


    /* =====================================================
       READING TIME
       =====================================================

       Average reading speed:
       approximately 200 words per minute.

       ===================================================== */

    var readingMinutes =
        words === 0
            ? 0
            : Math.ceil(words / 200);


    /* =====================================================
       UPDATE DISPLAY
       ===================================================== */

    document.getElementById(
        "wordCount"
    ).textContent = words;


    document.getElementById(
        "characterCount"
    ).textContent = characters;


    document.getElementById(
        "characterNoSpaceCount"
    ).textContent =
        charactersNoSpaces;


    document.getElementById(
        "sentenceCount"
    ).textContent =
        sentences;


    document.getElementById(
        "lineCount"
    ).textContent =
        lines;


    document.getElementById(
        "readingTime"
    ).textContent =
        readingMinutes + " min";

}


/* =========================================================
   CLEAR TEXT
   ========================================================= */

function clearTextCounter() {

    var textInput =
        document.getElementById(
            "textCounterInput"
        );


    if (!textInput) {
        return;
    }


    textInput.value = "";


    updateTextCounter();

}


/* =========================================================
   DATE CALCULATOR
   ========================================================= */


/* =========================================================
   OPEN DATE TOOL
   ========================================================= */

function openDateTool() {

    var workspace =
        document.getElementById("toolWorkspace");

    var content =
        document.getElementById("toolContent");


    if (!workspace || !content) {
        return;
    }


    workspace.classList.add("active");


    content.innerHTML =

        '<div class="tool-interface">' +

            '<h3>' +
                'Date Calculator' +
            '</h3>' +

            '<p>' +
                'Calculate the difference between two dates ' +
                'or add and subtract days from a date.' +
            '</p>' +


            '<div class="tool-form">' +


                /* CALCULATION TYPE */

                '<label>' +

                    'Calculation Type' +

                    '<select id="dateCalculationType" ' +
                        'onchange="changeDateType()">' +

                        '<option value="difference">' +
                            'Date Difference' +
                        '</option>' +

                        '<option value="addSubtract">' +
                            'Add / Subtract Days' +
                        '</option>' +

                    '</select>' +

                '</label>' +


                /* DATE INPUTS */

                '<div id="dateInputs">' +

                    '<label>' +

                        'Start Date' +

                        '<input ' +
                            'type="date" ' +
                            'id="startDate">' +

                    '</label>' +


                    '<label>' +

                        'End Date' +

                        '<input ' +
                            'type="date" ' +
                            'id="endDate">' +

                    '</label>' +

                '</div>' +


                /* BUTTONS */

                '<div>' +

                    '<button ' +
                        'class="tool-button" ' +
                        'onclick="calculateDate()">' +

                        'Calculate →' +

                    '</button>' +


                    '<button ' +
                        'class="tool-reset" ' +
                        'onclick="resetDate()">' +

                        'Reset' +

                    '</button>' +

                '</div>' +

            '</div>' +


            /* RESULT */

            '<div ' +
                'class="tool-result" ' +
                'id="dateResult">' +

                '<small>RESULT</small>' +

                '<strong>' +
                    'Select dates to calculate.' +
                '</strong>' +

            '</div>' +

        '</div>';


    workspace.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================================
   CHANGE DATE CALCULATOR TYPE
   ========================================================= */

function changeDateType() {

    var type =
        document.getElementById(
            "dateCalculationType"
        );

    var inputs =
        document.getElementById(
            "dateInputs"
        );


    if (!type || !inputs) {
        return;
    }


    /* =====================================================
       DATE DIFFERENCE
       ===================================================== */

    if (type.value === "difference") {

        inputs.innerHTML =

            '<label>' +

                'Start Date' +

                '<input ' +
                    'type="date" ' +
                    'id="startDate">' +

            '</label>' +


            '<label>' +

                'End Date' +

                '<input ' +
                    'type="date" ' +
                    'id="endDate">' +

            '</label>';

    }


    /* =====================================================
       ADD / SUBTRACT DAYS
       ===================================================== */

    else {

        inputs.innerHTML =

            '<label>' +

                'Start Date' +

                '<input ' +
                    'type="date" ' +
                    'id="startDate">' +

            '</label>' +


            '<label>' +

                'Number of Days' +

                '<input ' +
                    'type="number" ' +
                    'id="numberOfDays" ' +
                    'placeholder="Example: 30">' +

            '</label>' +


            '<label>' +

                'Operation' +

                '<select id="dayOperation">' +

                    '<option value="add">' +
                        'Add Days' +
                    '</option>' +

                    '<option value="subtract">' +
                        'Subtract Days' +
                    '</option>' +

                '</select>' +

            '</label>';

    }

}


/* =========================================================
   CALCULATE DATE
   ========================================================= */

function calculateDate() {

    var type =
        document.getElementById(
            "dateCalculationType"
        );

    var result =
        document.getElementById(
            "dateResult"
        );


    if (!type || !result) {
        return;
    }


    /* =====================================================
       DATE DIFFERENCE
       ===================================================== */

    if (type.value === "difference") {

        var start =
            document.getElementById(
                "startDate"
            ).value;

        var end =
            document.getElementById(
                "endDate"
            ).value;


        if (!start || !end) {

            showDateError(
                result,
                "Please select both dates."
            );

            return;
        }


        var startDate =
            parseDateSafely(start);

        var endDate =
            parseDateSafely(end);


        if (!startDate || !endDate) {

            showDateError(
                result,
                "Please enter valid dates."
            );

            return;
        }


        /* Make sure start is before end */

        if (startDate > endDate) {

            var temp = startDate;

            startDate = endDate;

            endDate = temp;

        }


        /* Difference in milliseconds */

        var difference =
            endDate.getTime() -
            startDate.getTime();


        var totalDays =
            Math.round(
                difference /
                (1000 * 60 * 60 * 24)
            );


        var weeks =
            Math.floor(
                totalDays / 7
            );


        var remainingDays =
            totalDays % 7;


        /* Approximate months and years */

        var years =
            endDate.getFullYear() -
            startDate.getFullYear();


        var months =
            endDate.getMonth() -
            startDate.getMonth();


        var days =
            endDate.getDate() -
            startDate.getDate();


        if (days < 0) {

            months--;

            var previousMonth =
                new Date(
                    endDate.getFullYear(),
                    endDate.getMonth(),
                    0
                );

            days +=
                previousMonth.getDate();

        }


        if (months < 0) {

            years--;

            months += 12;

        }


        result.innerHTML =

            '<small>DATE DIFFERENCE</small>' +


            '<div class="gst-result-row">' +

                '<span>Total Days</span>' +

                '<strong>' +
                    formatNumber(totalDays) +
                '</strong>' +

            '</div>' +


            '<div class="gst-result-row">' +

                '<span>Weeks + Days</span>' +

                '<strong>' +

                    weeks +
                    ' weeks ' +
                    remainingDays +
                    ' days' +

                '</strong>' +

            '</div>' +


            '<div class="gst-result-total">' +

                '<span>Calendar Difference</span>' +

                '<strong>' +

                    years +
                    ' years ' +
                    months +
                    ' months ' +
                    days +
                    ' days' +

                '</strong>' +

            '</div>';

    }


    /* =====================================================
       ADD / SUBTRACT DAYS
       ===================================================== */

    else {

        var startingDate =
            document.getElementById(
                "startDate"
            ).value;

        var numberOfDays =
            parseInt(
                document.getElementById(
                    "numberOfDays"
                ).value
            );

        var operation =
            document.getElementById(
                "dayOperation"
            ).value;


        if (
            !startingDate ||
            isNaN(numberOfDays)
        ) {

            showDateError(
                result,
                "Please enter a date and number of days."
            );

            return;
        }


        if (numberOfDays < 0) {

            showDateError(
                result,
                "Number of days cannot be negative."
            );

            return;
        }


        var calculatedDate =
            parseDateSafely(startingDate);


        if (!calculatedDate) {

            showDateError(
                result,
                "Please enter a valid date."
            );

            return;
        }


        if (operation === "add") {

            calculatedDate.setDate(
                calculatedDate.getDate() +
                numberOfDays
            );

        }

        else {

            calculatedDate.setDate(
                calculatedDate.getDate() -
                numberOfDays
            );

        }


        var formattedDate =
            formatDateReadable(
                calculatedDate
            );


        result.innerHTML =

            '<small>CALCULATED DATE</small>' +


            '<div class="gst-result-total">' +

                '<span>' +

                    (
                        operation === "add"
                            ? "Result Date"
                            : "Result Date"
                    ) +

                '</span>' +

                '<strong>' +

                    formattedDate +

                '</strong>' +

            '</div>';

    }

}


/* =========================================================
   SAFE DATE PARSER
   ========================================================= */

function parseDateSafely(dateString) {

    var parts =
        dateString.split("-");


    if (parts.length !== 3) {
        return null;
    }


    var year =
        parseInt(parts[0]);

    var month =
        parseInt(parts[1]) - 1;

    var day =
        parseInt(parts[2]);


    var date =
        new Date(
            year,
            month,
            day
        );


    /* Prevent invalid dates */

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day
    ) {

        return null;

    }


    return date;

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDateReadable(date) {

    var months = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];


    return (

        date.getDate() +
        " " +
        months[date.getMonth()] +
        " " +
        date.getFullYear()

    );

}


/* =========================================================
   DATE ERROR
   ========================================================= */

function showDateError(
    result,
    message
) {

    result.innerHTML =

        '<small>ERROR</small>' +

        '<strong>' +
            message +
        '</strong>';

}


/* =========================================================
   RESET DATE
   ========================================================= */

function resetDate() {

    openDateTool();

}


/* =========================================================
   UNIT CONVERTER
   ========================================================= */


/* =========================================================
   OPEN UNIT CONVERTER
   ========================================================= */

function openUnitTool() {

    var workspace =
        document.getElementById("toolWorkspace");

    var content =
        document.getElementById("toolContent");


    if (!workspace || !content) {
        return;
    }


    workspace.classList.add("active");


    content.innerHTML =

        '<div class="tool-interface">' +

            '<h3>' +
                'Unit Converter' +
            '</h3>' +

            '<p>' +
                'Convert length, weight, temperature and ' +
                'digital storage units quickly.' +
            '</p>' +


            '<div class="tool-form">' +


                /* CATEGORY */

                '<label>' +

                    'Conversion Category' +

                    '<select id="unitCategory" ' +
                        'onchange="changeUnitCategory()">' +

                        '<option value="length">' +
                            'Length' +
                        '</option>' +

                        '<option value="weight">' +
                            'Weight' +
                        '</option>' +

                        '<option value="temperature">' +
                            'Temperature' +
                        '</option>' +

                        '<option value="digital">' +
                            'Digital Storage' +
                        '</option>' +

                    '</select>' +

                '</label>' +


                /* VALUE */

                '<label>' +

                    'Value' +

                    '<input ' +
                        'type="number" ' +
                        'id="unitValue" ' +
                        'placeholder="Enter value">' +

                '</label>' +


                /* FROM */

                '<label>' +

                    'From' +

                    '<select id="unitFrom">' +

                        '<option value="mm">' +
                            'Millimeter (mm)' +
                        '</option>' +

                        '<option value="cm" selected>' +
                            'Centimeter (cm)' +
                        '</option>' +

                        '<option value="m">' +
                            'Meter (m)' +
                        '</option>' +

                        '<option value="km">' +
                            'Kilometer (km)' +
                        '</option>' +

                        '<option value="inch">' +
                            'Inch (in)' +
                        '</option>' +

                        '<option value="ft">' +
                            'Feet (ft)' +
                        '</option>' +

                        '<option value="yard">' +
                            'Yard (yd)' +
                        '</option>' +

                        '<option value="mile">' +
                            'Mile (mi)' +
                        '</option>' +

                    '</select>' +

                '</label>' +


                /* TO */

                '<label>' +

                    'To' +

                    '<select id="unitTo">' +

                        '<option value="mm">' +
                            'Millimeter (mm)' +
                        '</option>' +

                        '<option value="cm">' +
                            'Centimeter (cm)' +
                        '</option>' +

                        '<option value="m" selected>' +
                            'Meter (m)' +
                        '</option>' +

                        '<option value="km">' +
                            'Kilometer (km)' +
                        '</option>' +

                        '<option value="inch">' +
                            'Inch (in)' +
                        '</option>' +

                        '<option value="ft">' +
                            'Feet (ft)' +
                        '</option>' +

                        '<option value="yard">' +
                            'Yard (yd)' +
                        '</option>' +

                        '<option value="mile">' +
                            'Mile (mi)' +
                        '</option>' +

                    '</select>' +

                '</label>' +


                /* BUTTONS */

                '<div>' +

                    '<button ' +
                        'class="tool-button" ' +
                        'onclick="convertUnits()">' +

                        'Convert →' +

                    '</button>' +


                    '<button ' +
                        'class="tool-reset" ' +
                        'onclick="resetUnitTool()">' +

                        'Reset' +

                    '</button>' +

                '</div>' +

            '</div>' +


            /* RESULT */

            '<div ' +
                'class="tool-result" ' +
                'id="unitResult">' +

                '<small>RESULT</small>' +

                '<strong>' +
                    'Enter a value to convert.' +
                '</strong>' +

            '</div>' +

        '</div>';


    workspace.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================================
   CHANGE CATEGORY
   ========================================================= */

function changeUnitCategory() {

    var category =
        document.getElementById(
            "unitCategory"
        ).value;


    var from =
        document.getElementById(
            "unitFrom"
        );

    var to =
        document.getElementById(
            "unitTo"
        );


    if (!from || !to) {
        return;
    }


    /* =====================================================
       LENGTH
       ===================================================== */

    if (category === "length") {

        var lengthOptions =

            '<option value="mm">' +
                'Millimeter (mm)' +
            '</option>' +

            '<option value="cm" selected>' +
                'Centimeter (cm)' +
            '</option>' +

            '<option value="m">' +
                'Meter (m)' +
            '</option>' +

            '<option value="km">' +
                'Kilometer (km)' +
            '</option>' +

            '<option value="inch">' +
                'Inch (in)' +
            '</option>' +

            '<option value="ft">' +
                'Feet (ft)' +
            '</option>' +

            '<option value="yard">' +
                'Yard (yd)' +
            '</option>' +

            '<option value="mile">' +
                'Mile (mi)' +
            '</option>';


        from.innerHTML =
            lengthOptions;

        to.innerHTML =
            lengthOptions;


        to.value = "m";

    }


    /* =====================================================
       WEIGHT
       ===================================================== */

    else if (category === "weight") {

        var weightOptions =

            '<option value="mg">' +
                'Milligram (mg)' +
            '</option>' +

            '<option value="g" selected>' +
                'Gram (g)' +
            '</option>' +

            '<option value="kg">' +
                'Kilogram (kg)' +
            '</option>' +

            '<option value="tonne">' +
                'Tonne (t)' +
            '</option>' +

            '<option value="oz">' +
                'Ounce (oz)' +
            '</option>' +

            '<option value="lb">' +
                'Pound (lb)' +
            '</option>';


        from.innerHTML =
            weightOptions;

        to.innerHTML =
            weightOptions;


        to.value = "kg";

    }


    /* =====================================================
       TEMPERATURE
       ===================================================== */

    else if (category === "temperature") {

        var temperatureOptions =

            '<option value="celsius" selected>' +
                'Celsius (°C)' +
            '</option>' +

            '<option value="fahrenheit">' +
                'Fahrenheit (°F)' +
            '</option>' +

            '<option value="kelvin">' +
                'Kelvin (K)' +
            '</option>';


        from.innerHTML =
            temperatureOptions;

        to.innerHTML =
            temperatureOptions;


        to.value =
            "fahrenheit";

    }


    /* =====================================================
       DIGITAL STORAGE
       ===================================================== */

    else {

        var digitalOptions =

            '<option value="bit">' +
                'Bit (bit)' +
            '</option>' +

            '<option value="byte" selected>' +
                'Byte (B)' +
            '</option>' +

            '<option value="kb">' +
                'Kilobyte (KB)' +
            '</option>' +

            '<option value="mb">' +
                'Megabyte (MB)' +
            '</option>' +

            '<option value="gb">' +
                'Gigabyte (GB)' +
            '</option>' +

            '<option value="tb">' +
                'Terabyte (TB)' +
            '</option>';


        from.innerHTML =
            digitalOptions;

        to.innerHTML =
            digitalOptions;


        to.value =
            "gb";

    }

}


/* =========================================================
   CONVERT UNITS
   ========================================================= */

function convertUnits() {

    var category =
        document.getElementById(
            "unitCategory"
        ).value;


    var value =
        parseFloat(
            document.getElementById(
                "unitValue"
            ).value
        );


    var from =
        document.getElementById(
            "unitFrom"
        ).value;


    var to =
        document.getElementById(
            "unitTo"
        ).value;


    var result =
        document.getElementById(
            "unitResult"
        );


    if (!result) {
        return;
    }


    /* =====================================================
       VALIDATION
       ===================================================== */

    if (isNaN(value)) {

        result.innerHTML =

            '<small>ERROR</small>' +

            '<strong>' +
                'Please enter a value to convert.' +
            '</strong>';

        return;

    }


    var converted;


    /* =====================================================
       LENGTH
       ===================================================== */

    if (category === "length") {

        var lengthToMeter = {

            mm: 0.001,

            cm: 0.01,

            m: 1,

            km: 1000,

            inch: 0.0254,

            ft: 0.3048,

            yard: 0.9144,

            mile: 1609.344

        };


        var meters =
            value *
            lengthToMeter[from];


        converted =
            meters /
            lengthToMeter[to];

    }


    /* =====================================================
       WEIGHT
       ===================================================== */

    else if (category === "weight") {

        var weightToGram = {

            mg: 0.001,

            g: 1,

            kg: 1000,

            tonne: 1000000,

            oz: 28.349523125,

            lb: 453.59237

        };


        var grams =
            value *
            weightToGram[from];


        converted =
            grams /
            weightToGram[to];

    }


    /* =====================================================
       TEMPERATURE
       ===================================================== */

    else if (category === "temperature") {

        converted =
            convertTemperature(
                value,
                from,
                to
            );

    }


    /* =====================================================
       DIGITAL STORAGE
       ===================================================== */

    else {

        var digitalToByte = {

            bit: 0.125,

            byte: 1,

            kb: 1024,

            mb: 1024 * 1024,

            gb: 1024 * 1024 * 1024,

            tb: 1024 * 1024 * 1024 * 1024

        };


        var bytes =
            value *
            digitalToByte[from];


        converted =
            bytes /
            digitalToByte[to];

    }


    /* =====================================================
       DISPLAY RESULT
       ===================================================== */

    result.innerHTML =

        '<small>CONVERSION RESULT</small>' +


        '<div class="gst-result-total">' +

            '<span>' +

                formatNumber(value) +
                ' ' +
                from +
                ' = ' +

            '</span>' +

            '<strong>' +

                formatConvertedNumber(
                    converted
                ) +

                ' ' +
                to +

            '</strong>' +

        '</div>';

}


/* =========================================================
   TEMPERATURE CONVERSION
   ========================================================= */

function convertTemperature(
    value,
    from,
    to
) {

    var celsius;


    /* Convert FROM to Celsius */

    if (from === "celsius") {

        celsius = value;

    }

    else if (from === "fahrenheit") {

        celsius =
            (value - 32) *
            5 / 9;

    }

    else if (from === "kelvin") {

        celsius =
            value - 273.15;

    }


    /* Convert Celsius TO target */

    if (to === "celsius") {

        return celsius;

    }

    else if (to === "fahrenheit") {

        return (
            celsius *
            9 / 5
        ) + 32;

    }

    else {

        return celsius + 273.15;

    }

}


/* =========================================================
   FORMAT CONVERTED NUMBER
   ========================================================= */

function formatConvertedNumber(number) {

    if (number === 0) {
        return "0";
    }


    if (
        Math.abs(number) >= 0.000001 &&
        Math.abs(number) < 1000000000
    ) {

        return number.toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 6
            }
        );

    }


    return number.toExponential(6);

}


/* =========================================================
   RESET UNIT CONVERTER
   ========================================================= */

function resetUnitTool() {

    openUnitTool();

}


/* =========================================================
   COLOR CONVERTER
   ========================================================= */


/* =========================================================
   OPEN COLOR TOOL
   ========================================================= */

function openColorTool() {

    var workspace =
        document.getElementById("toolWorkspace");

    var content =
        document.getElementById("toolContent");


    if (!workspace || !content) {
        return;
    }


    workspace.classList.add("active");


    content.innerHTML =

        '<div class="tool-interface">' +

            '<h3>' +
                'Color Converter' +
            '</h3>' +

            '<p>' +
                'Convert HEX, RGB and HSL colors for your ' +
                'design projects.' +
            '</p>' +


            '<div class="tool-form">' +


                /* COLOR INPUT TYPE */

                '<label>' +

                    'Color Format' +

                    '<select id="colorType" ' +
                        'onchange="changeColorType()">' +

                        '<option value="hex">' +
                            'HEX' +
                        '</option>' +

                        '<option value="rgb">' +
                            'RGB' +
                        '</option>' +

                        '<option value="hsl">' +
                            'HSL' +
                        '</option>' +

                    '</select>' +

                '</label>' +


                /* COLOR INPUT */

                '<div id="colorInputs">' +

                    '<label>' +

                        'HEX Color' +

                        '<input ' +
                            'type="text" ' +
                            'id="hexInput" ' +
                            'placeholder="#2563EB" ' +
                            'maxlength="7">' +

                    '</label>' +

                '</div>' +


                /* BUTTONS */

                '<div>' +

                    '<button ' +
                        'class="tool-button" ' +
                        'onclick="convertColor()">' +

                        'Convert →' +

                    '</button>' +


                    '<button ' +
                        'class="tool-reset" ' +
                        'onclick="resetColorTool()">' +

                        'Reset' +

                    '</button>' +

                '</div>' +

            '</div>' +


            /* COLOR PREVIEW */

            '<div ' +
                'class="color-preview" ' +
                'id="colorPreview">' +

                '<span>COLOR PREVIEW</span>' +

            '</div>' +


            /* RESULT */

            '<div ' +
                'class="tool-result" ' +
                'id="colorResult">' +

                '<small>COLOR VALUES</small>' +

                '<strong>' +
                    'Enter a color to convert.' +
                '</strong>' +

            '</div>' +

        '</div>';


    workspace.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================================
   CHANGE COLOR TYPE
   ========================================================= */

function changeColorType() {

    var type =
        document.getElementById(
            "colorType"
        ).value;


    var inputs =
        document.getElementById(
            "colorInputs"
        );


    if (!inputs) {
        return;
    }


    /* =====================================================
       HEX
       ===================================================== */

    if (type === "hex") {

        inputs.innerHTML =

            '<label>' +

                'HEX Color' +

                '<input ' +
                    'type="text" ' +
                    'id="hexInput" ' +
                    'placeholder="#2563EB" ' +
                    'maxlength="7">' +

            '</label>';

    }


    /* =====================================================
       RGB
       ===================================================== */

    else if (type === "rgb") {

        inputs.innerHTML =

            '<label>' +

                'Red (R)' +

                '<input ' +
                    'type="number" ' +
                    'id="redInput" ' +
                    'placeholder="37" ' +
                    'min="0" ' +
                    'max="255">' +

            '</label>' +


            '<label>' +

                'Green (G)' +

                '<input ' +
                    'type="number" ' +
                    'id="greenInput" ' +
                    'placeholder="99" ' +
                    'min="0" ' +
                    'max="255">' +

            '</label>' +


            '<label>' +

                'Blue (B)' +

                '<input ' +
                    'type="number" ' +
                    'id="blueInput" ' +
                    'placeholder="235" ' +
                    'min="0" ' +
                    'max="255">' +

            '</label>';

    }


    /* =====================================================
       HSL
       ===================================================== */

    else {

        inputs.innerHTML =

            '<label>' +

                'Hue (°)' +

                '<input ' +
                    'type="number" ' +
                    'id="hueInput" ' +
                    'placeholder="217" ' +
                    'min="0" ' +
                    'max="360">' +

            '</label>' +


            '<label>' +

                'Saturation (%)' +

                '<input ' +
                    'type="number" ' +
                    'id="saturationInput" ' +
                    'placeholder="83" ' +
                    'min="0" ' +
                    'max="100">' +

            '</label>' +


            '<label>' +

                'Lightness (%)' +

                '<input ' +
                    'type="number" ' +
                    'id="lightnessInput" ' +
                    'placeholder="53" ' +
                    'min="0" ' +
                    'max="100">' +

            '</label>';

    }

}


/* =========================================================
   CONVERT COLOR
   ========================================================= */

function convertColor() {

    var type =
        document.getElementById(
            "colorType"
        ).value;


    var result =
        document.getElementById(
            "colorResult"
        );


    var preview =
        document.getElementById(
            "colorPreview"
        );


    if (!result || !preview) {
        return;
    }


    var rgb;


    /* =====================================================
       HEX INPUT
       ===================================================== */

    if (type === "hex") {

        var hex =
            document.getElementById(
                "hexInput"
            ).value.trim();


        if (!isValidHex(hex)) {

            showColorError(
                result,
                "Please enter a valid HEX color."
            );

            return;

        }


        rgb =
            hexToRGB(hex);

    }


    /* =====================================================
       RGB INPUT
       ===================================================== */

    else if (type === "rgb") {

        var r =
            parseInt(
                document.getElementById(
                    "redInput"
                ).value
            );


        var g =
            parseInt(
                document.getElementById(
                    "greenInput"
                ).value
            );


        var b =
            parseInt(
                document.getElementById(
                    "blueInput"
                ).value
            );


        if (
            isNaN(r) ||
            isNaN(g) ||
            isNaN(b) ||
            r < 0 || r > 255 ||
            g < 0 || g > 255 ||
            b < 0 || b > 255
        ) {

            showColorError(
                result,
                "RGB values must be between 0 and 255."
            );

            return;

        }


        rgb = {
            r: r,
            g: g,
            b: b
        };

    }


    /* =====================================================
       HSL INPUT
       ===================================================== */

    else {

        var h =
            parseFloat(
                document.getElementById(
                    "hueInput"
                ).value
            );


        var s =
            parseFloat(
                document.getElementById(
                    "saturationInput"
                ).value
            );


        var l =
            parseFloat(
                document.getElementById(
                    "lightnessInput"
                ).value
            );


        if (
            isNaN(h) ||
            isNaN(s) ||
            isNaN(l) ||
            h < 0 || h > 360 ||
            s < 0 || s > 100 ||
            l < 0 || l > 100
        ) {

            showColorError(
                result,
                "HSL values are outside the valid range."
            );

            return;

        }


        rgb =
            hslToRGB(h, s, l);

    }


    /* =====================================================
       CONVERT ALL FORMATS
       ===================================================== */

    var finalHex =
        rgbToHex(
            rgb.r,
            rgb.g,
            rgb.b
        );


    var finalHSL =
        rgbToHSL(
            rgb.r,
            rgb.g,
            rgb.b
        );


    var rgbText =
        "rgb(" +
        rgb.r +
        ", " +
        rgb.g +
        ", " +
        rgb.b +
        ")";


    var hslText =
        "hsl(" +
        finalHSL.h +
        ", " +
        finalHSL.s +
        "%, " +
        finalHSL.l +
        "%)";


    /* =====================================================
       COLOR PREVIEW
       ===================================================== */

    preview.style.backgroundColor =
        finalHex;


    preview.innerHTML =

        '<span>' +
            finalHex +
        '</span>';


    /* =====================================================
       DISPLAY RESULTS
       ===================================================== */

    result.innerHTML =

        '<small>COLOR VALUES</small>' +


        '<div class="color-value-row">' +

            '<span>HEX</span>' +

            '<strong>' +
                finalHex +
            '</strong>' +

            '<button ' +
                'class="copy-color" ' +
                'onclick="copyColorValue(\'' +
                    finalHex +
                '\')">' +

                'Copy' +

            '</button>' +

        '</div>' +


        '<div class="color-value-row">' +

            '<span>RGB</span>' +

            '<strong>' +
                rgbText +
            '</strong>' +

            '<button ' +
                'class="copy-color" ' +
                'onclick="copyColorValue(\'' +
                    rgbText +
                '\')">' +

                'Copy' +

            '</button>' +

        '</div>' +


        '<div class="color-value-row">' +

            '<span>HSL</span>' +

            '<strong>' +
                hslText +
            '</strong>' +

            '<button ' +
                'class="copy-color" ' +
                'onclick="copyColorValue(\'' +
                    hslText +
                '\')">' +

                'Copy' +

            '</button>' +

        '</div>';

}


/* =========================================================
   HEX VALIDATION
   ========================================================= */

function isValidHex(hex) {

    return /^#?([A-Fa-f0-9]{6})$/.test(hex);

}


/* =========================================================
   HEX → RGB
   ========================================================= */

function hexToRGB(hex) {

    hex =
        hex.replace("#", "");


    return {

        r: parseInt(
            hex.substring(0, 2),
            16
        ),

        g: parseInt(
            hex.substring(2, 4),
            16
        ),

        b: parseInt(
            hex.substring(4, 6),
            16
        )

    };

}


/* =========================================================
   RGB → HEX
   ========================================================= */

function rgbToHex(r, g, b) {

    return "#" +

        componentToHex(r) +

        componentToHex(g) +

        componentToHex(b);

}


function componentToHex(component) {

    var hex =
        component.toString(16);


    return hex.length === 1
        ? "0" + hex
        : hex;

}


/* =========================================================
   RGB → HSL
   ========================================================= */

function rgbToHSL(r, g, b) {

    r = r / 255;
    g = g / 255;
    b = b / 255;


    var max =
        Math.max(r, g, b);

    var min =
        Math.min(r, g, b);


    var h;
    var s;

    var l =
        (max + min) / 2;


    if (max === min) {

        h = 0;
        s = 0;

    }

    else {

        var difference =
            max - min;


        s =
            l > 0.5
                ? difference /
                    (2 - max - min)
                : difference /
                    (max + min);


        switch (max) {

            case r:

                h =
                    (g - b) /
                    difference +
                    (g < b ? 6 : 0);

                break;


            case g:

                h =
                    (b - r) /
                    difference +
                    2;

                break;


            case b:

                h =
                    (r - g) /
                    difference +
                    4;

                break;

        }


        h =
            h / 6;

    }


    return {

        h: Math.round(h * 360),

        s: Math.round(s * 100),

        l: Math.round(l * 100)

    };

}


/* =========================================================
   HSL → RGB
   ========================================================= */

function hslToRGB(h, s, l) {

    h = h / 360;
    s = s / 100;
    l = l / 100;


    var r;
    var g;
    var b;


    if (s === 0) {

        r = l;
        g = l;
        b = l;

    }

    else {

        var q =
            l < 0.5
                ? l * (1 + s)
                : l + s - l * s;


        var p =
            2 * l - q;


        r =
            hueToRGB(
                p,
                q,
                h + 1 / 3
            );


        g =
            hueToRGB(
                p,
                q,
                h
            );


        b =
            hueToRGB(
                p,
                q,
                h - 1 / 3
            );

    }


    return {

        r: Math.round(r * 255),

        g: Math.round(g * 255),

        b: Math.round(b * 255)

    };

}


/* =========================================================
   HUE HELPER
   ========================================================= */

function hueToRGB(
    p,
    q,
    t
) {

    if (t < 0) {
        t += 1;
    }


    if (t > 1) {
        t -= 1;
    }


    if (t < 1 / 6) {

        return p +
            (q - p) *
            6 *
            t;

    }


    if (t < 1 / 2) {

        return q;

    }


    if (t < 2 / 3) {

        return p +
            (q - p) *
            (2 / 3 - t) *
            6;

    }


    return p;

}


/* =========================================================
   COPY COLOR VALUE
   ========================================================= */

function copyColorValue(value) {

    navigator.clipboard.writeText(value)
        .then(function() {

            alert(
                value +
                " copied to clipboard!"
            );

        })
        .catch(function() {

            alert(
                "Unable to copy the color value."
            );

        });

}


/* =========================================================
   COLOR ERROR
   ========================================================= */

function showColorError(
    result,
    message
) {

    result.innerHTML =

        '<small>ERROR</small>' +

        '<strong>' +
            message +
        '</strong>';

}


/* =========================================================
   RESET COLOR TOOL
   ========================================================= */

function resetColorTool() {

    openColorTool();

}




/* =========================================================
   QUICK CALCULATOR
   ========================================================= */


/* =========================================================
   OPEN QUICK CALCULATOR
   ========================================================= */

function openQuickTool() {

    var workspace =
        document.getElementById("toolWorkspace");

    var content =
        document.getElementById("toolContent");


    if (!workspace || !content) {
        return;
    }


    workspace.classList.add("active");


    content.innerHTML =

        '<div class="tool-interface calculator-interface">' +

            '<h3>' +
                'Quick Calculator' +
            '</h3>' +

            '<p>' +
                'A simple calculator for everyday ' +
                'mathematical calculations.' +
            '</p>' +


            '<div class="quick-calculator">' +


                /* DISPLAY */

                '<div class="calculator-display">' +

                    '<div ' +
                        'id="calculatorHistory" ' +
                        'class="calculator-history">' +

                    '</div>' +

                    '<div ' +
                        'id="calculatorDisplay" ' +
                        'class="calculator-display-value">' +

                        '0' +

                    '</div>' +

                '</div>' +


                /* BUTTONS */

                '<div class="calculator-buttons">' +


                    '<button ' +
                        'class="calculator-button calculator-clear" ' +
                        'onclick="calculatorClear()">' +

                        'AC' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button calculator-action" ' +
                        'onclick="calculatorBackspace()">' +

                        '⌫' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button calculator-action" ' +
                        'onclick="calculatorPercent()">' +

                        '%' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button calculator-operator" ' +
                        'onclick="calculatorOperator(\'/\')">' +

                        '÷' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button" ' +
                        'onclick="calculatorNumber(\'7\')">' +

                        '7' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button" ' +
                        'onclick="calculatorNumber(\'8\')">' +

                        '8' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button" ' +
                        'onclick="calculatorNumber(\'9\')">' +

                        '9' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button calculator-operator" ' +
                        'onclick="calculatorOperator(\'*\')">' +

                        '×' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button" ' +
                        'onclick="calculatorNumber(\'4\')">' +

                        '4' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button" ' +
                        'onclick="calculatorNumber(\'5\')">' +

                        '5' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button" ' +
                        'onclick="calculatorNumber(\'6\')">' +

                        '6' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button calculator-operator" ' +
                        'onclick="calculatorOperator(\'-\')">' +

                        '−' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button" ' +
                        'onclick="calculatorNumber(\'1\')">' +

                        '1' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button" ' +
                        'onclick="calculatorNumber(\'2\')">' +

                        '2' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button" ' +
                        'onclick="calculatorNumber(\'3\')">' +

                        '3' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button calculator-operator" ' +
                        'onclick="calculatorOperator(\'+\')">' +

                        '+' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button calculator-action" ' +
                        'onclick="calculatorToggleSign()">' +

                        '+/−' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button" ' +
                        'onclick="calculatorNumber(\'0\')">' +

                        '0' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button" ' +
                        'onclick="calculatorDecimal()">' +

                        '.' +

                    '</button>' +


                    '<button ' +
                        'class="calculator-button calculator-equals" ' +
                        'onclick="calculatorEquals()">' +

                        '=' +

                    '</button>' +


                '</div>' +

            '</div>' +

        '</div>';


    workspace.scrollIntoView({
        behavior: "smooth"
    });


    calculatorResetState();

}


/* =========================================================
   CALCULATOR VARIABLES
   ========================================================= */

var calculatorCurrent = "0";

var calculatorPrevious = null;

var calculatorOperatorValue = null;

var calculatorWaitingForOperand = false;


/* =========================================================
   RESET CALCULATOR STATE
   ========================================================= */

function calculatorResetState() {

    calculatorCurrent = "0";

    calculatorPrevious = null;

    calculatorOperatorValue = null;

    calculatorWaitingForOperand = false;

    calculatorUpdateDisplay();

}


/* =========================================================
   UPDATE DISPLAY
   ========================================================= */

function calculatorUpdateDisplay() {

    var display =
        document.getElementById(
            "calculatorDisplay"
        );


    if (!display) {
        return;
    }


    display.textContent =
        formatCalculatorDisplay(
            calculatorCurrent
        );

}


/* =========================================================
   FORMAT DISPLAY
   ========================================================= */

function formatCalculatorDisplay(value) {

    if (value === "Error") {
        return value;
    }


    var number =
        Number(value);


    if (!isFinite(number)) {
        return "Error";
    }


    if (
        Math.abs(number) >= 1000000000000 ||
        (
            Math.abs(number) > 0 &&
            Math.abs(number) < 0.000001
        )
    ) {

        return number.toExponential(6);

    }


    return value;

}


/* =========================================================
   ADD NUMBER
   ========================================================= */

function calculatorNumber(number) {

    if (calculatorCurrent === "Error") {

        calculatorResetState();

    }


    if (calculatorWaitingForOperand) {

        calculatorCurrent =
            number;

        calculatorWaitingForOperand =
            false;

    }

    else {

        if (
            calculatorCurrent === "0"
        ) {

            calculatorCurrent =
                number;

        }

        else {

            calculatorCurrent +=
                number;

        }

    }


    calculatorUpdateDisplay();

}


/* =========================================================
   DECIMAL
   ========================================================= */

function calculatorDecimal() {

    if (calculatorCurrent === "Error") {

        calculatorResetState();

    }


    if (calculatorWaitingForOperand) {

        calculatorCurrent =
            "0.";

        calculatorWaitingForOperand =
            false;

        calculatorUpdateDisplay();

        return;

    }


    if (
        calculatorCurrent.indexOf(".") === -1
    ) {

        calculatorCurrent += ".";

    }


    calculatorUpdateDisplay();

}


/* =========================================================
   OPERATOR
   ========================================================= */

function calculatorOperator(operator) {

    if (calculatorCurrent === "Error") {
        return;
    }


    var currentValue =
        Number(
            calculatorCurrent
        );


    if (calculatorPrevious !== null) {

        if (
            calculatorWaitingForOperand
        ) {

            calculatorOperatorValue =
                operator;

            return;

        }


        var result =
            calculatorPerformCalculation(
                calculatorPrevious,
                currentValue,
                calculatorOperatorValue
            );


        if (result === "Error") {

            calculatorShowError();

            return;

        }


        calculatorCurrent =
            String(result);


        calculatorPrevious =
            result;

    }

    else {

        calculatorPrevious =
            currentValue;

    }


    calculatorOperatorValue =
        operator;


    calculatorWaitingForOperand =
        true;


    calculatorUpdateHistory();

    calculatorUpdateDisplay();

}


/* =========================================================
   PERFORM CALCULATION
   ========================================================= */

function calculatorPerformCalculation(
    first,
    second,
    operator
) {

    if (operator === "+") {

        return first + second;

    }


    if (operator === "-") {

        return first - second;

    }


    if (operator === "*") {

        return first * second;

    }


    if (operator === "/") {

        if (second === 0) {

            return "Error";

        }


        return first / second;

    }


    return second;

}


/* =========================================================
   EQUALS
   ========================================================= */

function calculatorEquals() {

    if (
        calculatorPrevious === null ||
        calculatorOperatorValue === null
    ) {

        return;

    }


    var second =
        Number(
            calculatorCurrent
        );


    var result =
        calculatorPerformCalculation(
            calculatorPrevious,
            second,
            calculatorOperatorValue
        );


    if (result === "Error") {

        calculatorShowError();

        return;

    }


    var history =
        calculatorPrevious +
        " " +
        getCalculatorOperatorSymbol(
            calculatorOperatorValue
        ) +
        " " +
        second +
        " =";


    calculatorCurrent =
        String(result);


    calculatorPrevious =
        null;

    calculatorOperatorValue =
        null;

    calculatorWaitingForOperand =
        true;


    var historyElement =
        document.getElementById(
            "calculatorHistory"
        );


    if (historyElement) {

        historyElement.textContent =
            history;

    }


    calculatorUpdateDisplay();

}


/* =========================================================
   PERCENTAGE
   ========================================================= */

function calculatorPercent() {

    if (
        calculatorCurrent === "Error"
    ) {

        calculatorResetState();

        return;

    }


    var value =
        Number(
            calculatorCurrent
        );


    value =
        value / 100;


    calculatorCurrent =
        String(value);


    calculatorUpdateDisplay();

}


/* =========================================================
   TOGGLE SIGN
   ========================================================= */

function calculatorToggleSign() {

    if (
        calculatorCurrent === "0" ||
        calculatorCurrent === "Error"
    ) {

        return;

    }


    if (
        calculatorCurrent.charAt(0) === "-"
    ) {

        calculatorCurrent =
            calculatorCurrent.substring(1);

    }

    else {

        calculatorCurrent =
            "-" +
            calculatorCurrent;

    }


    calculatorUpdateDisplay();

}


/* =========================================================
   BACKSPACE
   ========================================================= */

function calculatorBackspace() {

    if (
        calculatorCurrent === "Error"
    ) {

        calculatorResetState();

        return;

    }


    if (
        calculatorWaitingForOperand
    ) {

        return;

    }


    if (
        calculatorCurrent.length <= 1
    ) {

        calculatorCurrent =
            "0";

    }

    else {

        calculatorCurrent =
            calculatorCurrent.slice(
                0,
                -1
            );

    }


    calculatorUpdateDisplay();

}


/* =========================================================
   CLEAR
   ========================================================= */

function calculatorClear() {

    calculatorResetState();


    var history =
        document.getElementById(
            "calculatorHistory"
        );


    if (history) {

        history.textContent =
            "";

    }

}


/* =========================================================
   ERROR
   ========================================================= */

function calculatorShowError() {

    calculatorCurrent =
        "Error";

    calculatorPrevious =
        null;

    calculatorOperatorValue =
        null;

    calculatorWaitingForOperand =
        true;


    calculatorUpdateDisplay();


    var history =
        document.getElementById(
            "calculatorHistory"
        );


    if (history) {

        history.textContent =
            "Cannot divide by zero";

    }

}


/* =========================================================
   HISTORY
   ========================================================= */

function calculatorUpdateHistory() {

    var history =
        document.getElementById(
            "calculatorHistory"
        );


    if (!history) {
        return;
    }


    if (
        calculatorPrevious !== null &&
        calculatorOperatorValue !== null
    ) {

        history.textContent =

            calculatorPrevious +
            " " +
            getCalculatorOperatorSymbol(
                calculatorOperatorValue
            );

    }

}


/* =========================================================
   OPERATOR SYMBOL
   ========================================================= */

function getCalculatorOperatorSymbol(
    operator
) {

    if (operator === "*") {
        return "×";
    }


    if (operator === "/") {
        return "÷";
    }


    if (operator === "-") {
        return "−";
    }


    return operator;

}


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        var key =
            event.key;


        /* Numbers */

        if (
            key >= "0" &&
            key <= "9"
        ) {

            calculatorNumber(key);

            return;

        }


        /* Decimal */

        if (key === ".") {

            calculatorDecimal();

            return;

        }


        /* Operators */

        if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/"
        ) {

            calculatorOperator(key);

            return;

        }


        /* Enter */

        if (
            key === "Enter" ||
            key === "="
        ) {

            event.preventDefault();

            calculatorEquals();

            return;

        }


        /* Backspace */

        if (key === "Backspace") {

            calculatorBackspace();

            return;

        }


        /* Escape */

        if (key === "Escape") {

            calculatorClear();

            return;

        }


        /* Percentage */

        if (key === "%") {

            calculatorPercent();

        }

    }
);