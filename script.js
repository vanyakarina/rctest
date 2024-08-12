let songwriters = [];

function addSongwriter() {
    const songTitle = document.getElementById('songTitle').value;
    const recordLabel = document.getElementById('recordLabel').value;
    const name = document.getElementById('songwriterName').value;
    const share = parseFloat(document.getElementById('sharePercentage').value);
    const role = document.getElementById('role').value;
    const isSigned = document.getElementById('isSigned').value === 'true';

    const songwriter = {
        songTitle,
        recordLabel,
        name,
        share,
        role,
        isSigned
    };

    songwriters.push(songwriter);
    displaySongwriters();
}

function displaySongwriters() {
    const songwriterList = document.getElementById('songwriterList');
    songwriterList.innerHTML = '';
    songwriters.forEach((writer, index) => {
        songwriterList.innerHTML += `<li>${writer.name} - ${writer.share}% (${writer.isSigned ? 'Signed' : 'Unsigned'})</li>`;
    });
}

function calculateRoyalties() {
    const totalRoyalty = parseFloat(document.getElementById('totalRoyalty').value);
    const signedWriters = songwriters.filter(writer => writer.isSigned);
    const totalSignedShare = signedWriters.reduce((acc, writer) => acc + writer.share, 0);
    const royaltyDistribution = signedWriters.map(writer => {
        const adjustedShare = (writer.share / totalSignedShare) * 100;
        const royalty = (adjustedShare / 100) * totalRoyalty;
        return { name: writer.name, royalty: royalty.toFixed(2) };
    });

    displayRoyalties(royaltyDistribution);
}

function displayRoyalties(royaltyDistribution) {
    const royaltyList = document.getElementById('royaltyDistribution');
    royaltyList.innerHTML = '';
    royaltyDistribution.forEach(dist => {
        royaltyList.innerHTML += `<li>${dist.name} - $${dist.royalty}</li>`;
    });
}
