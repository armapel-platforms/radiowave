const streams = [
    { name: 'DYHP RMN Cebu', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cb/DYHP_612.png', type: 'audio/mpeg', manifestUri: 'https://de3.amfmph.com/ssl/rmncebu?mp=/stream&1758366700449' },
    { name: 'Monster RX Manila', logo: 'https://static.mytuner.mobi/media/tvos_radios/209/monster-radio-rx-931-fm.bd515dec.png', type: 'audio/mpeg', manifestUri: 'https://in-icecast.eradioportal.com:8443/monsterrrx' },
    { name: 'Monster BT Cebu', logo: 'https://radyoph.com/wp-content/uploads/2024/11/monstercebu-1.png', type: 'audio/mpeg', manifestUri: 'https://in-icecast.eradioportal.com:8443/rxcebu' },
    { name: 'Monster BT Davao', logo: 'https://radyoph.com/wp-content/uploads/2024/11/monsterdavao.png', type: 'audio/mpeg', manifestUri: 'https://in-icecast.eradioportal.com:8443/monsterrx_davao_' },   
    { name: 'Magic 89.9 Manila', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Magic89.9_logo.gif', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/sh37pvfd938uv' },
    { name: 'MYX Radio', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/MyxRadio_logo.png/500px-MyxRadio_logo.png', type: 'audio/mpeg', manifestUri: 'https://22243.live.streamtheworld.com/MYXFMAAC.aac?tdsdk=js-2.9&swm=false&pname=tdwidgets&pversion=2.9&banners=none&burst-time=15&sbmid=b2a9af24-4449-4a95-d95d-a6cb0c1049d2' },
    { name: 'MYX P-POP Radio', logo: 'https://assets.myx.global/wp-content/uploads/2022/09/PPOP-Radio-Logo-2.png', type: 'audio/mpeg', manifestUri: 'https://tls.radyoph.com/secure.php?token=a19b75c6194f2d525228a4df5e568664' },
    { name: "Today's Hits Radio", logo: 'https://scontent.fmnl25-1.fna.fbcdn.net/v/t39.30808-6/339657052_739615340995180_595484754788356710_n.png?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KtXk2wFTl4sQ7kNvwHar13N&_nc_oc=AdmwmmDsC6UNl2G33Qy94GHWqbTZkwR8O-Bte0C73rhcR_hCQfEZeMJK9WXdUNDCprQ&_nc_zt=23&_nc_ht=scontent.fmnl25-1.fna&_nc_gid=srBbRrTxZhCeZsElG5o0gg&oh=00_AfamlA6B48v7yCG9jSN9pMI86R8mp0zbOFuOyrckFFR8zw&oe=68D5BB0D', type: 'audio/mpeg', manifestUri: 'https://18723.live.streamtheworld.com/977_HITS_SC' },
    { name: 'Play FM Manila', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/99.5_Play_FM.png', type: 'audio/mpeg', manifestUri: 'https://play995.radioca.st/stream/;' },
    { name: 'Wave FM Manila', logo: 'https://scontent.fmnl25-5.fna.fbcdn.net/v/t39.30808-6/358662164_816796513220793_8513228373085785806_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=wdf0_XtrGDEQ7kNvwFWxBV1&_nc_oc=AdnIFNvTyYDsXD-nG_j3vNQ3tvwG8x_jZGtx_btrFg1sja2W6qH_47doUJTeC7cgIwk&_nc_zt=23&_nc_ht=scontent.fmnl25-5.fna&_nc_gid=NYS-2QsgkzZS66KUHWHNlg&oh=00_Afa-gJZzm8KlaHIZFYU6D_GU-w8dtLDLPIY4jcuiW5ndwQ&oe=68D5A20E', type: 'audio/mpeg', manifestUri: 'https://p.scdn.co/mp3-preview/5df0b4ba714a553ad741bcb0f24ce1009d41c0d8' },
    { name: 'Energy FM Cebu', logo: 'https://radyoph.com/wp-content/uploads/2025/03/energyfmcebu.png', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/4oa5m3ffwutuv' },
    { name: 'MOR Entertainment', logo: 'https://yt3.googleusercontent.com/e8VGf_nX3PVpQEYXVWKlUqdOw_yTTZDkqVFYkAf4Yc0gEZvs1rnGVJmNSzALTwh5mzAxYoCRNw=s900-c-k-c0x00ffffff-no-rj', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/26ea0anpms8uv' },
    { name: 'Love Radio Cebu', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/17/LoveRadio979.png', type: 'audio/mpeg', manifestUri: 'https://loveradiocebu.radioca.st/;' },
    { name: 'Yes! FM Cebu', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/YesFMCebu2024.png/500px-YesFMCebu2024.png', type: 'audio/mpeg', manifestUri: 'https://yesfmcebu.radioca.st/;' },
    { name: 'iFM Cebu', logo: 'https://static.mytuner.mobi/media/tvos_radios/pB5P9Q4jZX.png', type: 'audio/mpeg', manifestUri: 'https://air.doscast.com/proxy/ifmcebu/;' },    
    { name: 'FM Radio Cebu', logo: 'https://static.wikia.nocookie.net/tv-philippines/images/4/47/FMRadio_Philippines.png', type: 'audio/mpeg', manifestUri: 'https://free.rcast.net/258788' },
    { name: 'Radyo Boholano', logo: 'https://radyoph.com/wp-content/uploads/2024/12/radyoboholano.png', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/hwr0geklhbouv' },
    { name: 'Kiss FM Bohol', logo: 'https://radyoph.com/wp-content/uploads/2024/11/kissfmbohol.png', type: 'audio/mpeg', manifestUri: 'https://tls.radyoph.com/secure.php?token=ac4f8b420a8ff19b4e6edc204b4816f3' },
    { name: 'Radyo Natin Jagna', logo: 'https://radyoph.com/wp-content/uploads/2024/12/jagna-98.1.png', type: 'audio/mpeg', manifestUri: 'https://stream.radyonatinfm.com:8030/jagna' },
    { name: 'DYTR 1116 Bohol', logo: 'https://radyoph.com/wp-content/uploads/2024/11/dytr.png', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/l6d5yvrgnauuv' },
    { name: 'DYRD 1161 Bohol', logo: 'https://scontent.fceb6-4.fna.fbcdn.net/v/t39.30808-6/352200910_807821603857316_1534422446158156286_n.png?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9FgjcbDBZF8Q7kNvwGd3eLs&_nc_oc=AdmShgTAhnAUydTl4uTHsF1ofjYoGv5CB528ZKb1NxZMZl2S4w92JY-OKliodOKIQyI&_nc_zt=23&_nc_ht=scontent.fceb6-4.fna&_nc_gid=ra46tn51u-TrAvSjYic8rQ&oh=00_AfYhSmS78urxSOumjZvfzifeWUA5hjU9CbAx8w2sIHmOSQ&oe=68D53D4A', type: 'audio/mpeg', manifestUri: 'https://tls.radyoph.com/secure.php?token=c6755a0fdb230b52d796035acdef5a15' },
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
