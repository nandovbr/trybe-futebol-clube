// faz o cálculo dos pontos de cada time
const score = (teamHome: any) => {
  let wins = 0;
  let ties = 0;
  let losses = 0;
  let points = 0;

  teamHome.forEach(({ homeTeamGoals, awayTeamGoals }: any) => {
    if (homeTeamGoals > awayTeamGoals) {
      wins += 1;
      points += 3;
    }
    if (homeTeamGoals === awayTeamGoals) {
      ties += 1;
      points += 1;
    }
    if (homeTeamGoals < awayTeamGoals) {
      losses += 1;
    }
  });

  return { wins, ties, losses, points };
};

// faz o cálculo do aproveeitamento de cada time
const percentageOfUse = (points: any, games: any) => {
  const percentage = (points / (games * 3)) * 100;
  return percentage.toFixed(2);
};

// faz o cálculo do saldo de gols de cada time
const goals = (teamHome: any) => {
  const goalScored = teamHome.reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0);
  const goalConceded = teamHome.reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0);

  const goalDifference = (goalScored - goalConceded);

  return { goalScored, goalConceded, goalDifference };
};

export const teamClassification = ({ teamName, teamHome }: any) => {
  if (teamHome) {
    const classification = {
      name: teamName,
      totalPoints: score(teamHome).points,
      totalGames: teamHome.length,
      totalVictories: score(teamHome).wins,
      totalDraws: score(teamHome).ties,
      totalLosses: score(teamHome).losses,
      goalsFavor: goals(teamHome).goalScored,
      goalsOwn: goals(teamHome).goalConceded,
      goalsBalance: goals(teamHome).goalDifference,
      efficiency: percentageOfUse(score(teamHome).points, teamHome.length),
    };

    return classification;
  }
};

export const sortClassification = (classification: any) => {
  ['goalsOwn', 'goalsFavor', 'goalsBalance', 'totalVictories', 'totalPoints'].forEach((index) => {
    classification.sort((a: any, b: any) => {
      if (a[index] === undefined || b[index] === undefined) {
        return 0;
      }
      if (a[index] > b[index]) {
        return -1;
      }
      if (a[index] < b[index]) {
        return 1;
      }
      return 0;
    });
  });

  return classification;
};
