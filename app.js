class ClassPlanner {
    constructor() {
      // Define the class options for each major
      this.classes = {
        engineering: [
          { name: 'AP Physics 1', prerequisites: ['Algebra II'] },
          { name: 'AP Computer Science A', prerequisites: ['Algebra II'] },
          { name: 'AP Calculus BC', prerequisites: ['AP Calculus AB'] },
          { name: 'AP Chemistry', prerequisites: ['AP Physics 1'] },
          { name: 'AP Statistics', prerequisites: ['Pre-Calculus'] }
        ],
        business: [
          { name: 'AP Microeconomics', prerequisites: ['None'] },
          { name: 'AP Macroeconomics', prerequisites: ['AP Microeconomics'] },
          { name: 'AP Calculus AB', prerequisites: ['Algebra II'] },
          { name: 'AP Statistics', prerequisites: ['Algebra II'] },
          { name: 'Accounting', prerequisites: ['None'] }
        ],
        finance: [
          { name: 'AP Microeconomics', prerequisites: ['None'] },
          { name: 'AP Macroeconomics', prerequisites: ['AP Microeconomics'] },
          { name: 'AP Calculus AB', prerequisites: ['Algebra II'] },
          { name: 'AP Statistics', prerequisites: ['Algebra II'] },
          { name: 'Personal Finance', prerequisites: ['None'] }
        ],
        math: [
          { name: 'AP Calculus BC', prerequisites: ['AP Calculus AB'] },
          { name: 'AP Statistics', prerequisites: ['Algebra II'] },
          { name: 'AP Computer Science A', prerequisites: ['Algebra II'] },
          { name: 'AP Physics 1', prerequisites: ['Algebra II'] },
          { name: 'Number Theory', prerequisites: ['Pre-Calculus'] }
        ],
        physics: [
          { name: 'AP Physics 1', prerequisites: ['Algebra II'] },
          { name: 'AP Physics C: Mechanics', prerequisites: ['AP Calculus AB'] },
          { name: 'AP Calculus BC', prerequisites: ['AP Calculus AB'] },
          { name: 'AP Chemistry', prerequisites: ['AP Physics 1'] },
          { name: 'AP Statistics', prerequisites: ['Algebra II'] }
        ],
        biology: [
          { name: 'AP Biology', prerequisites: ['Biology'] },
          { name: 'AP Environmental Science', prerequisites: ['None'] },
          { name: 'AP Statistics', prerequisites: ['Algebra II'] },
          { name: 'AP Psychology', prerequisites: ['None'] },
          { name: 'AP Chemistry', prerequisites: ['Biology'] }
        ],
        history: [
          { name: 'AP US History', prerequisites: ['None'] },
          { name: 'AP European History', prerequisites: ['None'] },
          { name: 'AP World History: Modern', prerequisites: ['None'] },
          { name: 'AP Human Geography', prerequisites: ['None'] },
          { name: 'AP Government and Politics: United States', prerequisites: ['None'] }
        ],
        linguistics: [
          { name: 'AP Spanish Language and Culture', prerequisites: ['Spanish III'] },
          { name: 'AP French Language and Culture', prerequisites: ['French III'] },
          { name: 'AP Chinese Language and Culture', prerequisites: ['Chinese III'] },
          { name: 'AP English Literature and Composition', prerequisites: ['None'] },
          { name: 'AP Latin', prerequisites: ['None'] }
        ],
      };
  
      // Define the
      // Define the math progression for each course
      this.mathProgression = {
        'Math 8': ['Algebra I', 'Geometry'],
        'Algebra I': ['Geometry', 'Algebra II'],
        'Geometry': ['Algebra II', 'Pre-Calculus'],
        'Honors Geometry': ['Algebra II', 'Honors Algebra II'],
        'algebra-ii': ['Pre-Calculus', 'AP Calculus AB'],
        'honors-algebra-ii': ['Honors Pre-Calculus', 'AP Calculus AB'],
        'pre-calculus': ['AP Calculus AB', 'AP Calculus BC'],
        'honors-pre-calculus': ['AP Calculus AB', 'AP Calculus BC'],
        'ap-calculus-ab': ['AP Calculus BC', 'Multivariable Calculus'],
        'ap-calculus-bc': ['Multivariable Calculus', null]
      };
    }
  
    // Define a function to get the user's preferences
    getUserPreferences() {
      const majorSelect = document.getElementById('major-select');
      const mathCourse = document.querySelector('input[name="math-course"]:checked').value;
      const difficultySlider = document.getElementById('difficulty-slider');
  
      return {
        major: majorSelect.value,
        mathCourse: mathCourse,
        difficulty: difficultySlider.value
      };
    }
  
    // Define a function to generate the four-year plan
      // Define a function to generate the four-year plan
      generateFourYearPlan(preferences) {
        const plan = [];
    
        for (let i = 0; i < 4; i++) {
          const year = {
            grade: "",
            classes: [],
          };
    
          switch (i) {
            case 0:
              year.grade = "Freshman";
              year.classes.push({ name: preferences.freshmanEnglish });
              year.classes.push({ name: preferences.healthStudy });
              year.classes.push({ name: "Physical Education" });
              year.classes.push({ name: preferences.mathCourse });
              break;
            case 1:
              year.grade = "Sophomore";
              year.classes.push({ name: preferences.sophomoreHistory });
              year.classes.push({ name: preferences.sophomoreEnglish });
              break;
            case 2:
              year.grade = "Junior";
              year.classes.push({ name: preferences.juniorHistory });
              year.classes.push({ name: preferences.juniorEnglish });
              break;
            case 3:
              year.grade = "Senior";
              year.classes.push({ name: preferences.seniorCivicsEconomics });
              year.classes.push({ name: preferences.seniorEnglish });
              break;
          }
    
          const remainingClasses = 6 - year.classes.length;
    
          for (let j = 0; j < remainingClasses; j++) {
            const elective = { name: "Elective" };
    
            if (i === 1 && j < 5) {
              elective.name = "AP " + this.classes[preferences.major][j].name;
            } else if (i > 1 && j < 5) {
              elective.name = this.classes[preferences.major][j].name;
            }
    
            if (!year.classes.some((course) => course.name === elective.name)) {
              year.classes.push(elective);
            } else {
              year.classes.push({ name: "Elective" });
            }
          }
    
          plan.push(year);
        }
    
        return plan;
      }
      
      

  
    // Define a function to render the four-year plan
    renderFourYearPlan(plan) {
      const tbody = document.querySelector('.four-year-plan table tbody');
      tbody.innerHTML = '';
    
      plan.forEach(year => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${year.grade}</td>
          <td>
            ${year.classes.map(course => course.name).join('<br>')}
          </td>
        `;
        tbody.appendChild(row);
      });
    }
    

  // Define a function to update the four-year plan
  updateFourYearPlan(event) {
    event.preventDefault();
    const preferences = this.getUserPreferences();
    const plan = this.generateFourYearPlan(preferences);
    this.renderFourYearPlan(plan);
  }
  

  // Define a function to initialize the app
  init() {
    // Select the form in the HTML
    const form = document.querySelector('.selection-tool form');

    // Add an event listener for the form submission
    form.addEventListener('submit', (event) => {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Collect user preferences from the form
      const majorSelect = document.getElementById('major-select');
      const mathCourse = document.querySelector('input[name="math-course"]:checked');
      const difficultySlider = document.getElementById('difficulty-slider');

      // Check if the user has selected a math course, if not display an alert
      if (!mathCourse) {
        alert('Please select your current math course.');
        return;
      }

      // Create a preferences object
      const preferences = {
        major: majorSelect.value,
        mathCourse: mathCourse.value,
        difficulty: difficultySlider.value
      };

      // Generate and render the four-year plan based on user preferences
      const plan = this.generateFourYearPlan(preferences);
      this.renderFourYearPlan(plan);
    });
  }
  
  
}

// Initialize the app
const app = new ClassPlanner();
app.init();

  