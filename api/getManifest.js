const streams = [
    { name: 'DYHP RMN Cebu', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cb/DYHP_612.png', type: 'audio/mpeg', manifestUri: 'https://de3.amfmph.com/ssl/rmncebu?mp=/stream&1758366700449' },
    { name: 'Monster RX Manila', logo: 'https://static.mytuner.mobi/media/tvos_radios/209/monster-radio-rx-931-fm.bd515dec.png', type: 'audio/mpeg', manifestUri: 'https://in-icecast.eradioportal.com:8443/monsterrrx' },
    { name: 'Monster BT Cebu', logo: 'https://radyoph.com/wp-content/uploads/2024/11/monstercebu-1.png', type: 'audio/mpeg', manifestUri: 'https://in-icecast.eradioportal.com:8443/rxcebu' },
    { name: 'Monster BT Davao', logo: 'https://radyoph.com/wp-content/uploads/2024/11/monsterdavao.png', type: 'audio/mpeg', manifestUri: 'https://in-icecast.eradioportal.com:8443/monsterrx_davao_' },   
    { name: 'Magic 89.9 Manila', logo: 'https://pbs.twimg.com/profile_images/1836213513766998016/2s3KAe24_400x400.jpg', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/sh37pvfd938uv' },
    { name: 'MYX Radio', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/MyxRadio_logo.png/500px-MyxRadio_logo.png', type: 'audio/mpeg', manifestUri: 'https://22243.live.streamtheworld.com/MYXFMAAC.aac?tdsdk=js-2.9&swm=false&pname=tdwidgets&pversion=2.9&banners=none&burst-time=15&sbmid=b2a9af24-4449-4a95-d95d-a6cb0c1049d2' },
    { name: 'MYX P-POP Radio', logo: 'https://assets.myx.global/wp-content/uploads/2022/09/PPOP-Radio-Logo-2.png', type: 'audio/mpeg', manifestUri: 'https://tls.radyoph.com/secure.php?token=a19b75c6194f2d525228a4df5e568664' },
    { name: "Today's Hits", logo: 'https://www.radio.net/300/hitsradiotodayshits.png', type: 'audio/mpeg', manifestUri: 'https://18723.live.streamtheworld.com/977_HITS_SC' },
    { name: 'Play FM Manila', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/99.5_Play_FM.png', type: 'audio/mpeg', manifestUri: 'https://play995.radioca.st/stream/;' },
    { name: 'Wave FM Manila', logo: 'https://cdn.manilastandard.net/wp-content/uploads/2024/04/IMG_5930-696x696.jpeg', type: 'audio/mpeg', manifestUri: 'https://p.scdn.co/mp3-preview/5df0b4ba714a553ad741bcb0f24ce1009d41c0d8' },
    { name: 'Energy FM Cebu', logo: 'https://radyoph.com/wp-content/uploads/2025/03/energyfmcebu.png', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/4oa5m3ffwutuv' },
    { name: 'MOR Entertainment', logo: 'https://yt3.googleusercontent.com/e8VGf_nX3PVpQEYXVWKlUqdOw_yTTZDkqVFYkAf4Yc0gEZvs1rnGVJmNSzALTwh5mzAxYoCRNw=s900-c-k-c0x00ffffff-no-rj', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/26ea0anpms8uv' },
    { name: 'Love Radio Cebu', logo: 'https://play-lh.googleusercontent.com/d8wsNbhsKh16YfSgqwLiql5g2LxDZ7KjMadRop1KZUixEfpUIibs4kIqD9xSkw5tvRU=w480-h960-rw', type: 'audio/mpeg', manifestUri: 'https://loveradiocebu.radioca.st/;' },
    { name: 'Yes! FM Cebu', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/YesFMCebu2024.png/500px-YesFMCebu2024.png', type: 'audio/mpeg', manifestUri: 'https://yesfmcebu.radioca.st/;' },
    { name: 'iFM Cebu', logo: 'https://static.mytuner.mobi/media/tvos_radios/pB5P9Q4jZX.png', type: 'audio/mpeg', manifestUri: 'https://air.doscast.com/proxy/ifmcebu/;' },    
    { name: 'FM Radio Cebu', logo: 'https://radyoph.com/wp-content/uploads/2024/06/fmrcebu.png', type: 'audio/mpeg', manifestUri: 'https://free.rcast.net/258788' },
    { name: 'Radyo Boholano', logo: 'https://radyoph.com/wp-content/uploads/2024/12/radyoboholano.png', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/hwr0geklhbouv' },
    { name: 'Kiss FM Bohol', logo: 'https://radyoph.com/wp-content/uploads/2024/11/kissfmbohol.png', type: 'audio/mpeg', manifestUri: 'https://tls.radyoph.com/secure.php?token=ac4f8b420a8ff19b4e6edc204b4816f3' },
    { name: 'Radyo Natin Jagna', logo: 'https://radyoph.com/wp-content/uploads/2024/12/jagna-98.1.png', type: 'audio/mpeg', manifestUri: 'https://stream.radyonatinfm.com:8030/jagna' },
    { name: 'DYTR 1116 Bohol', logo: 'https://radyoph.com/wp-content/uploads/2024/11/dytr.png', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/l6d5yvrgnauuv' },
    { name: 'DYRD 1161 Bohol', logo: 'https://zeno.fm/_ipx/_/https://images.zeno.fm/SwY364sL-I8cfYAtLj_NfaWjmQU8bhFPD97xBEmc5pc/rs:fill:288:288/g:ce:0:0/aHR0cHM6Ly9wcm94eS56ZW5vLmZtL2NvbnRlbnQvc3RhdGlvbnMvYWd4emZucGxibTh0YzNSaGRITnlNZ3NTQ2tGMWRHaERiR2xsYm5RWWdJREktYmZZOHdnTUN4SU9VM1JoZEdsdmJsQnliMlpwYkdVWWdJREl1ZW05amdnTW9nRUVlbVZ1YncvaW1hZ2UvP3U9MTY2MTQzMjY4NDAwMA.webp', type: 'audio/mpeg', manifestUri: 'https://tls.radyoph.com/secure.php?token=c6755a0fdb230b52d796035acdef5a15' },
    { name: 'Radyo Ni Sano', logo: 'https://radyoph.com/wp-content/uploads/2024/09/Radyo_Ni_Sano.png', type: 'audio/mpeg', manifestUri: 'https://cd.radyoph.com:8000/rns128' }
];

export default function handler(request, response) {
  const { name } = request.query;

  if (!name) {
    return response.status(400).json({ error: 'Station name is required' });
  }

  const streamData = streams.find(s => s.name === name);

  if (!streamData) {
    return response.status(404).json({ error: 'Stream not found' });
  }

  response.status(200).json({
    manifestUri: streamData.manifestUri,
  });
}
