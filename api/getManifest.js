const streams = [
    { name: 'DYHP RMN Cebu', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cb/DYHP_612.png', type: 'audio/mpeg', manifestUri: 'https://de3.amfmph.com/ssl/rmncebu?mp=/stream&1758366700449' },
    { name: 'Monster RX Manila', logo: 'https://static.mytuner.mobi/media/tvos_radios/209/monster-radio-rx-931-fm.bd515dec.png', type: 'audio/mpeg', manifestUri: 'https://in-icecast.eradioportal.com:8443/monsterrrx' },
    { name: 'Monster BT Cebu', logo: 'https://www.google.com/imgres?q=monster%20bt%20cebu&imgurl=https%3A%2F%2Fradyoph.com%2Fwp-content%2Fuploads%2F2024%2F11%2Fmonstercebu-1.png&imgrefurl=https%3A%2F%2Fradyoph.com%2Fstation%2Fmonster-bt-105-9-cebu%2F&docid=dz2MBLOH1TqchM&tbnid=NACEaHbwTQaKnM&vet=12ahUKEwjt4cfh6OiPAxVilFYBHedyD4gQM3oECBYQAA..i&w=750&h=750&hcb=2&ved=2ahUKEwjt4cfh6OiPAxVilFYBHedyD4gQM3oECBYQAA', type: 'audio/mpeg', manifestUri: 'https://in-icecast.eradioportal.com:8443/rxcebu' },
    { name: 'Monster BT Davao', logo: 'https://www.google.com/imgres?q=monster%20davao&imgurl=https%3A%2F%2Fradyoph.com%2Fwp-content%2Fuploads%2F2024%2F11%2Fmonsterdavao.png&imgrefurl=https%3A%2F%2Fradyoph.com%2Fstation%2Fmonster-bt-davao%2F&docid=tQ69CPC9Qh27pM&tbnid=DXxoVOmCfhnzsM&vet=12ahUKEwjIw6fw6eiPAxXQg1YBHWl8JccQM3oECBMQAA..i&w=480&h=480&hcb=2&ved=2ahUKEwjIw6fw6eiPAxXQg1YBHWl8JccQM3oECBMQAA', type: 'audio/mpeg', manifestUri: 'https://in-icecast.eradioportal.com:8443/monsterrx_davao_' },   
    { name: 'Magic 89.9 Manila', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Magic89.9_logo.gif', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/sh37pvfd938uv' },
    { name: 'MYX Radio', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/MyxRadio_logo.png/500px-MyxRadio_logo.png', type: 'audio/mpeg', manifestUri: 'https://22243.live.streamtheworld.com/MYXFMAAC.aac?tdsdk=js-2.9&swm=false&pname=tdwidgets&pversion=2.9&banners=none&burst-time=15&sbmid=b2a9af24-4449-4a95-d95d-a6cb0c1049d2' },
    { name: 'MYX P-POP Radio', logo: 'https://assets.myx.global/wp-content/uploads/2022/09/PPOP-Radio-Logo-2.png', type: 'audio/mpeg', manifestUri: 'https://tls.radyoph.com/secure.php?token=a19b75c6194f2d525228a4df5e568664' },
    { name: "Today's Hits Radio", logo: 'https://hitsradio.com/assets/public/images/open_logo.png', type: 'audio/mpeg', manifestUri: 'https://18723.live.streamtheworld.com/977_HITS_SC' },
    { name: 'Energy FM Cebu', logo: 'https://radyoph.com/wp-content/uploads/2025/03/energyfmcebu.png', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/4oa5m3ffwutuv' },
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
    return response.status(400).json({ error: 'Channel name is required' });
  }

  const streamData = streams.find(s => s.name === name);

  if (!streamData) {
    return response.status(404).json({ error: 'Stream not found' });
  }

  response.status(200).json({
    manifestUri: streamData.manifestUri,
  });
}
