// faz o cálculo dos pontos de cada time
const score = (teamAway: any) => {
  let wins = 0;
  let ties = 0;
  let losses = 0;
  let points = 0;

  teamAway.forEach(({ awayTeamGoals, homeTeamGoals }: any) => {
    if (homeTeamGoals < awayTeamGoals) {
      wins += 1;
      points += 3;
    }
    if (homeTeamGoals === awayTeamGoals) {
      ties += 1;
      points += 1;
    }
    if (homeTeamGoals > awayTeamGoals) {
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
const goals = (teamAway: any) => {
  const goalScored = teamAway.reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0);
  const goalConceded = teamAway.reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0);

  const goalDifference = (goalScored - goalConceded);

  return { goalScored, goalConceded, goalDifference };
};

export const teamAwayClassification = ({ teamName, teamAway }: any) => {
  if (teamAway) {
    const classification = {
      name: teamName,
      totalPoints: score(teamAway).points,
      totalGames: teamAway.length,
      totalVictories: score(teamAway).wins,
      totalDraws: score(teamAway).ties,
      totalLosses: score(teamAway).losses,
      goalsFavor: goals(teamAway).goalScored,
      goalsOwn: goals(teamAway).goalConceded,
      goalsBalance: goals(teamAway).goalDifference,
      efficiency: percentageOfUse(score(teamAway).points, teamAway.length),
    };

    return classification;
  }
};

export const sortAwayClassification = (classification: any) => {
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
