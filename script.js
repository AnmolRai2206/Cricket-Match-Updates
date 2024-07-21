async function getMatchData() {
    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=4baa5e7b-bdd5-4d22-ab66-401b7e3e2d3c&offset=0")
        .then(data => data.json())
        .then(data => {
            if (data.status != "success") return;

            const matchesList = data.data;
            if (!matchesList) return [];

            const relevantData = matchesListmap(match => ({
                title: match.name,
                teamA: `${match.teamInfo[0].name}: ${match.score[0]?.r} / ${match.score[0]?.w} (${match.score[0]?.o} overs)`,
                teamB: `${match.teamInfo[1].name}: ${match.score[1]?.r} / ${match.score[1]?.w} (${match.score[1]?.o} overs)`,
                status: match.status
            }));

            const matchesElement = document.getElementById("matches");
            matchesElement.innerHTML = relevantData.map(match => `
                <li class="match-card">
                    <div class="match-title">${match.title}</div>
                    <div class="team">${match.teamA}</div>
                    <div class="team">${match.teamB}</div>
                    <div class="status">${match.status}</div>
                </li>
            `).join('');
        })
        .catch(e => console.log(e));
}
getMatchData();
