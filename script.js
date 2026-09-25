document.addEventListener("DOMContentLoaded", () => {
    const gradesContainer = document.getElementById("grades-container");
    const addRowBtn = document.getElementById("addRowBtn");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultBox = document.getElementById("result-box");
    const finalGpaDisplay = document.getElementById("final-gpa");
    const feedbackMessage = document.getElementById("feedback-message");

    addRowBtn.addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "grade-row";
        row.innerHTML = `
            <input type="text" class="course-name" placeholder="Course Name (optional)">
            <select class="letter-grade">
                <option value="4.0">A (93-100%)</option>
                <option value="3.7">A- (90-92%)</option>
                <option value="3.3">B+ (87-89%)</option>
                <option value="3.0">B (83-86%)</option>
                <option value="2.7">B- (80-82%)</option>
                <option value="2.3">C+ (77-79%)</option>
                <option value="2.0">C (73-76%)</option>
                <option value="1.0">D (60-69%)</option>
                <option value="0.0">F (Below 60%)</option>
            </select>
            <input type="number" class="credits" placeholder="Credits" min="1" max="6" value="3">
        `;
        gradesContainer.appendChild(row);
    });

    calculateBtn.addEventListener("click", () => {
        const grades = document.querySelectorAll(".letter-grade");
        const credits = document.querySelectorAll(".credits");

        let totalPoints = 0;
        let totalCredits = 0;

        for (let i = 0; i < grades.length; i++) {
            const gradeValue = parseFloat(grades[i].value);
            const creditValue = parseFloat(credits[i].value);

            if (!isNaN(gradeValue) && !isNaN(creditValue) && creditValue > 0) {
                totalPoints += gradeValue * creditValue;
                totalCredits += creditValue;
            }
        }

        if (totalCredits === 0) {
            alert("Please enter valid credit hours for your courses.");
            return;
        }

        const gpa = totalPoints / totalCredits;
        resultBox.classList.remove("hidden");
        finalGpaDisplay.textContent = gpa.toFixed(2);

        if (gpa >= 3.5) {
            feedbackMessage.textContent = "Dean's List material! Outstanding performance.";
        } else if (gpa >= 3.0) {
            feedbackMessage.textContent = "Good standing. Keep up the solid work.";
        } else {
            feedbackMessage.textContent = "Below average. Consider academic support options.";
        }
    });
});
