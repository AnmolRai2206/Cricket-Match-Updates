async function getMatchData() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=4baa5e7b-bdd5-4d22-ab66-401b7e3e2d3c&offset=0");
        const data = await response.json();
        
        if (data.status !== "success") return;

        const matchesList = data.data;
        if (!matchesList) return [];

        const relevantData = matchesList.map(match => {
            const teamA = match.teamInfo[0];
            const teamB = match.teamInfo[1];
            const scoreA = match.score[0] || {};
            const scoreB = match.score[1] || {};

            return {
                title: match.name,
                teamA: `${teamA?.name || 'Team A'}: ${scoreA.r || 0} / ${scoreA.w || 0} (${scoreA.o || 0} overs)`,
                teamB: `${teamB?.name || 'Team B'}: ${scoreB.r || 0} / ${scoreB.w || 0} (${scoreB.o || 0} overs)`,
                status: match.status
            };
        });

        const matchesElement = document.getElementById("matches");
        matchesElement.innerHTML = relevantData.map(match => `
            <li class="match-card">
                <div class="match-title">${match.title}</div>
                <div class="team">${match.teamA}</div>
                <div class="team">${match.teamB}</div>
                <div class="status">${match.status}</div>
            </li>
        `).join('');
    } catch (e) {
        console.log(e);
    }
}

getMatchData();
