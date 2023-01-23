const salaries = {
  Progger: {
    salary: 1000,
    tax: "15%"
  },
  Tester: {
    salary: 1000,
    tax: "10%"
  }
};

const team = [
  {
    name: "Masha",
    specialization: "Progger"
  },
  {
    name: "Vasya",
    specialization: "Tester"
  },
  {
    name: "Taras",
    specialization: "Tester"
  },
]


const calculateTeamFinanceReport = (salaries, team) => {
  let specializationTester;
  let specializationProgger;
  let progerBudget = 0;
  let testerBudget = 0;

  for (let key in team) {

    if (team[key].specialization === 'Tester') {
      specializationTester = team[key].specialization;

      for (let key in salaries) {
        if (key === specializationTester) {
          testerBudget += ((salaries[specializationTester].salary / 90) * 100);
        }
      }
    }

    if (team[key].specialization === 'Progger') {
      specializationProgger = team[key].specialization;

      for (let key in salaries) {
        if (key === specializationProgger) {
          progerBudget += ((salaries[specializationProgger].salary / 85) * 100);
        }
      }
    }


  }

  return {
    totalBudgetTeam: Math.floor(progerBudget + testerBudget),
    totalBudgetProgger: Math.floor(progerBudget),
    totalBudgetTester: Math.floor(testerBudget)
  }
}

console.log(calculateTeamFinanceReport(salaries, team))