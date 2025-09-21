const streams = [
    { name: 'DYHP RMN Cebu', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cb/DYHP_612.png', type: 'audio/mpeg', manifestUri: 'https://de3.amfmph.com/ssl/rmncebu?mp=/stream&1758366700449' },
    { name: 'Magic 89.9 Manila', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Magic89.9_logo.gif', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/sh37pvfd938uv' },
    { name: 'Energy FM Cebu', logo: 'https://radyoph.com/wp-content/uploads/2025/03/energyfmcebu.png', type: 'audio/mpeg', manifestUri: 'https://stream.zeno.fm/4oa5m3ffwutuv' },
    { name: 'Love Radio Cebu', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/17/LoveRadio979.png', type: 'audio/mpeg', manifestUri: 'https://loveradiocebu.radioca.st/;' },
    { name: 'Yes! FM Cebu', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/YesFMCebu2024.png/500px-YesFMCebu2024.png', type: 'audio/mpeg', manifestUri: 'https://yesfmcebu.radioca.st/;' },
    { name: 'iFM Cebu', logo: 'https://static.mytuner.mobi/media/tvos_radios/pB5P9Q4jZX.png', type: 'audio/mpeg', manifestUri: 'https://air.doscast.com/proxy/ifmcebu/;' },    
    { name: 'FM Radio Cebu', logo: 'https://static.wikia.nocookie.net/tv-philippines/images/4/47/FMRadio_Philippines.png', type: 'audio/mpeg', manifestUri: 'https://free.rcast.net/258788' },
    { name: 'hitsradio.com', logo: 'https://hitsradio.com/assets/public/images/open_logo.png', type: 'audio/mpeg', manifestUri: 'https://18723.live.streamtheworld.com/977_HITS_SC' }
    
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
